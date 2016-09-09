/**
 * [JDNavTab]
 * @Author:CAISENLEI
 * @DateTime         2016-03-28T16:37:18+0800
 */

    /*<div class="JDNavTab"  id="J_JDNavTab">
        <!-- 导航下拉列表 -->
        <div class="JDNavTab_list"></div> 
        <!-- /导航下拉列表 -->
        
        <!-- 导航下拉按钮 -->
        <div class="JDNavTab_btn">
            <span></span>
        </div>
        <!-- /导航下拉按钮 -->

        <!-- 导航滚动区域 -->
        <div class="JDNavTab_nav">
            <div class="JDNavTab_nav_bd">
                <ul>
                    <li> <a>今日上新</a> </li> 
                </ul>
                <i class="JDNavTab_arrow"></i>
            </div>
            <!-- 导航下拉列表标题 -->
            <span class="JDNavTab_list_hd">切换分类</span>
            <!-- /导航下拉列表标题 -->
        </div>
        <!-- /导航滚动区域 -->
    </div>*/


;;(function (root,factory){
    if(typeof define === 'function' && define.amd){
        define(["./iscroll"],factory);
    }else if(typeof module != 'undefined' && module.exports){
        module.exports = factory(require("./iscroll"));
    }else{
        root.JDNavTab = factory(IScroll);
    }
}(window,function (__IScroll){
    var IScroll = __IScroll,
        win = window,
        doc = document;

    // class名
    var __className = {
        root:'JDNavTab',
        cur:'JDNavTab_cur',
        list:'JDNavTab_list',
        btn:'JDNavTab_btn',
        hd:'JDNavTab_list_hd',
        nav:'JDNavTab_nav',
        navbd:'JDNavTab_nav_bd',
        arrow:'JDNavTab_arrow'
    };

    // DOM结构
    var __dom  = {
        list : $('<div class="'+__className.list+'"></div>'),
        btn : $('<div class="'+__className.btn+'"><span></span></div>'),
        hd : $('<span class="'+__className.hd+'"></span>'),
        nav: $('<div class="'+__className.nav+'"><div class="'+__className.navbd+'"><ul></ul></div></div>'),
        li: $('<li><a></a></li>'),
        arrow:$('<i class="'+__className.arrow+'"></i>')
    },
    // 监听事件队列
    __fn = [];


    // 4 = 000224466
    // 5 = 0000333666
    // 6 = 0000044448888
    // 7 = 000000555551010101010
    // 滚动位置
    // function __getIndex(n,now){
    //     var zn = n - 1,
    //         bn = n - 2,
    //         target = now - zn;
    //     if(now < zn){
    //         return 0;
    //     }else{
    //         return bn * (Math.floor(target/bn) + 1);
    //     }
    // };

    // 回掉函数
    function __callBack(){
        var arg = arguments;
        if(arg.length == 2){
            arg[0] && typeof arg[0] === 'function' && arg[0].call(arg[1]);
        }else if(arg.length == 3){
            arg[0] && typeof arg[0] === 'function' && arg[0].call(arg[1],arg[2]);
        }  
    };

    // 事件绑定
    function __bind(type,callback){
        if(typeof(__fn[type]) == 'undefined'){
            __fn[type] = [];
        }
        __fn[type].push(callback);
    };

    // 触发事件
    function __trigger(type){
        if(__fn[type] instanceof Array){
            var _fn = __fn[type];
            for(var i=0,len=_fn.length;i<len;i++){
                _fn[i].call(null,type);
            }
        }
    };


    ;;(function(){
        // 监听全局关闭事件
        doc.addEventListener('click',function(){
            __trigger('hide');
        },false);

        // 移除禁止滚动
        doc.addEventListener('touchend',function(){
            __trigger('removeEnd');
        },false);
    })();

    var nav = function(option){ 
        var config = $.extend({
            // 组件的dom节点
            id:"",  
            // 展示几个tab  当前TAB个数少于等于显示个数 不滚动
            num:4,
            // TAB数据
            data:[],
            // 默认切换到第几个
            current:0,
            // 下拉列表标题
            title:"切换分类",
            // 只需要滚动 不需要下拉列表
            onlyScroll:false,
            // 是否需要全局关闭
            globalClose:true,
            // 定制样式前缀 
            prefix:null,
            // 是否初始化后就执行当前tab事件
            firstTab:true,
            // 滚动偏移量
            scrollOffset:true,
            // 是否需要横线下标
            bottomLine:false,
            // 如果没有设置填充边距 默认为固定宽度
            marginWidth:0,
            // 列表打开的方位,默认为下拉打开,反之为上拉打开
            openUp:false,
            // 手动来控制nav状态的切换以及滚动，直接触发tab回调
            triggerState:false,
            // 自定义html
            customHtml:false,
            // 初始化之前回调函数
            before:function(){},
            // 初始化之后回调函数
            after:function(){},
            // TAB点击回调函数
            tab:function(){},
            // 下拉点击回调函数
            drop:function(){},
            // 显示下拉回调函数
            show:function(){},
            // 隐藏下拉回调函数
            hide:function(){},
            // 滚动开始
            scrollStart:function(){},
            // 滚动结束
            scrollEnd:function(){}
        },option);

        // 保存根节点 
        var oc = $(config.id) || "";

        // 判断是否数据格式正确
        if(!oc.length || Object.prototype.toString.call(config.data) != '[object Array]'){ 
            return; 
        }
        // 判断是否有数据 && 不是自定义html
        if(!config.data.length && !config.customHtml){return;}
        // 根节点
        this.oCon = oc;
        // 配置参数
        this._setting = config;
        // 初始化
        this._init();
    };

    // 初始化 
    nav.prototype._init = function(){
        var __t = this,
            os = __t._setting;

        // 如果设置了手动控制的话 默认也不触发第一次tab
        if(os.triggerState){
            os.firstTab = false;
        }

        // 当前tab的索引值 
        __t.navIndex = null;

        // 回调before函数
        __callBack(os.before,__t.oCon);

        // 如果不是自定义html 初始化数据 
        !os.customHtml && __t._initData(os.data);
        // 初始化DOM
        __t._initDom();
        // 初始化样式
        __t._initStyle();

        // 方法对象
        __t.events = {};

        // 是否需要滚动
        if(__t.isRoll){

            // 初始化iscroll
            __t._initIScroll();

            // 如果不是设置只有滚动，暴露出show和hide方法
            !__t.onlyRoll && (__t.events = __t._initSwitch());

            // 如果设置了 firstTab=true  _scrollTo方法内置执行当前tab的回调函数
            // 第二个参数为 true 只是滚动到当前tab 不执行 回调函数
            if(os.firstTab){
                __t._scrollTo(os.current);
            }else{
                // 手动触发不执行初始化滚动
                !os.triggerState && __t._scrollTo(os.current,true);
            }
            
        }else{
            // 重置tab状态
            __t._reset(os.current);

            // 如果设置了 firstTab=true 立即执行当前tab的回调函数
            os.firstTab && __callBack(os.tab,__t.aNavItem.eq(os.current));
        }

        // 初始化tab事件
        __t._initTab();

        // 回调after函数
        __callBack(os.after,__t.oCon);

        // 暴露scrollTo方法
        __t.events.scrollTo = __t._scrollTo.bind(__t);
    };

    // 返回定制样式
    nav.prototype._initPrefix = function(_str){
        var os = this._setting;
        return os.prefix ? os.prefix + _str : _str; 
    };

    // 转换class
    nav.prototype._prefixClass = function(dom,clName){
        var _reg = new RegExp("\\b"+clName+"\\b");
        dom.attr('class',dom.attr('class').replace(_reg,this._setting.prefix+clName));
    }

    // 数据格式化
    nav.prototype._initData = function(_data){
        var __t = this,
            os = __t._setting;
            _str = "",
            _dLi = __dom.li.clone(),
            _dNav = __dom.nav.clone(),
            _dArrow = __dom.arrow.clone();

        // 转换dom的class 
        if(os.prefix){
            __t._prefixClass(_dNav,__className.nav);
            __t._prefixClass(_dNav.find('div'),__className.navbd);
            os.bottomLine && __t._prefixClass(_dArrow,__className.arrow);  
        }

        for(var i=0,len=_data.length;i<len;i++){
            _str += _createLi(_data[i]);
        }
        function _createNav(){
            var $nav = _dNav.clone();
            $nav.find("ul").html(_str);
            os.bottomLine && $nav.find('div').append(_dArrow);
            __t.oCon.empty().append($nav);
        }

        function _createLi(_val){
            var $li = _dLi.clone(),
                $a = $li.find("a");
            $a.text(_val.name);
            for(var _at in _val.attr){
                $li.attr(_at,_val.attr[_at]);
            }
            return $li[0].outerHTML;
        }
        _createNav();    
    };

    // 初始化DOM
    nav.prototype._initDom = function(){
        var __t = this,
            oc = __t.oCon,
            os = __t._setting;

        // 转换dom的class 
        __t.clsCur = __t._initPrefix(__className.cur);
        __t.oNav = oc.find("div."+__t._initPrefix(__className.nav));
        __t.oNavBd = oc.find("div."+__t._initPrefix(__className.navbd));
        os.bottomLine && ( __t.oArrow = oc.find("i."+__t._initPrefix(__className.arrow)) );

        if(os.prefix){
            __t._prefixClass(oc,__className.root);
        }

        __t.aNavItem = __t.oNavBd.find("li");
        // 显示项大于数据则不滚动
        __t.isRoll = __t.aNavItem.length > os.num;
        // 是否设置只要滚动不要下拉列表
        __t.onlyRoll = os.onlyScroll && __t.isRoll;
        // 是否需要构建下拉列表
        __t.needList = __t.isRoll && !__t.onlyRoll;
        // 是否有自定义标题
        __t.hasTitle = os.title;
        // 下拉列表当前状态
        __t.listState = false;
        __t.iScrollObj = __t.oList = __t.oNavBtn = null;

        if(__t.needList){
            __t.aListItem = __t._createList();
        }     
    };

    // 创建下拉面板
    nav.prototype._createList = function(){
        var __t = this,
            os = __t._setting,
            _list = __dom.list.clone(),
            _btn = __dom.btn.clone(),
            _hd = __dom.hd.clone();

        // 转换dom的class 
        if(os.prefix){
            __t._prefixClass(_list,__className.list);
            __t._prefixClass(_btn,__className.btn);
            __t._prefixClass(_hd,__className.hd);      
        }   

        __t.oCon.prepend(_btn).prepend(_list);
        __t.hasTitle && __t.oNav.append(_hd.text(__t.hasTitle));

        __t.oList = _list;
        __t.oNavBtn = _btn;

        return __t._initList();
    };

    // 下拉列表渲染
    nav.prototype._initList = function(){
        try{
            var _list = this.oList;
            _list.html(this.oNavBd.html());
            _list.on('touchmove',function(e){
                e.stopPropagation();
                return false;
            });
            return _list.find("li");
        }catch(e){
            console.log(e);
            return [];
        }
    };

    // 重置样式
    nav.prototype._initStyle = function(){
        var __t = this,
            liW,listW,
            os = __t._setting,
            winW = win.innerWidth,
            len = __t.aNavItem.length,
            max = os.num,
            _btn = __t.oNavBtn;

        if(__t.isRoll){
            // 滚动区域比例
            liW = winW * 0.8667/max;
            listW = winW/max;
            if(__t.onlyRoll){
                __t.oNav.css({width:"100%"});
            }else{
                // 改变按钮图标 上拉显示
                os.openUp && _btn.find('span').css({
                    '-webkit-transform':'translate(-50%,-50%) rotate(180deg)',
                    'transform':'translate(-50%,-50%) rotate(180deg)'
                });
                _btn.show();
            }
        }else{
            __t.oNav.css({width:"100%"});
            liW = winW/len;
            listW = 0;
        }        

        // 如果设置了填充边距 则不做自适应处理
        if(os.marginWidth > 0){
            var _oNavWidth = 0,
                mmw = os.marginWidth,
                marginW = mmw*2;
            __t.aNavItem.css({marginLeft:mmw,marginRight:mmw});
            __t.oCon.css({opacity:0}).show();
            __t.aNavItem.each(function(t, n) {
                var nw = $(n).width();
                _oNavWidth+= nw + marginW;
                $(n).attr("data-bottomWidthn",nw);
                $(n).attr("data-bottomMaxn",_oNavWidth - nw - mmw);
            });
            __t.oNavBd.width(_oNavWidth);
            __t.oCon.css({opacity:1});
        }else{
            __t.aNavItem.width(liW);
            __t.oNavBd.width(liW*len);
            os.navWidth = liW;
            __t.oCon.show();
        }


        if(__t.needList){
            __t.aListItem.width(listW);
            // 改为上拉显示
            os.openUp && __t.oList.css({bottom:__t.aNavItem.height(),top:'auto'});
        }
    };


    // 初始化iscroll
    nav.prototype._initIScroll = function(){
        var __t = this,
            os = __t._setting,
            _endFlag = false;

        if(!IScroll || __t.aNavItem.length <= os.num) { return; }
        __t.iScrollObj = new IScroll(__t.oNav[0], { 
            deceleration:0.003,
            eventPassthrough: true, 
            tap:false,
            preventDefault: false,
            scrollX: true, 
            scrollY: false,
            useTransition:window.FastClick ? false : true
        });  


        // 兼容魅族等手机移动问题
        function _hackMove(){
            var fnTouchMove = function(e){
                    e.preventDefault(); 
                },
                fnFlag = false;
            
            __t.iScrollObj.on('beforeScrollStart',function(e){
                fnFlag = true;
                doc.addEventListener('touchmove',fnTouchMove,false);
            });

            __bind('removeEnd',function(){
                if(!fnFlag){ return; }
                doc.removeEventListener('touchmove',fnTouchMove,false);
                fnFlag = false;
            });
        }
        _hackMove();

        __t.iScrollObj.on('scrollStart',function(){
           !_endFlag && (_endFlag = true); 
            // 下拉列表隐藏状态 || 无标题 
            if(!__t.listState || !__t.hasTitle){
                 __callBack(os.scrollStart,__t.oNav);
            } 
        });   

        __t.iScrollObj.on('scrollEnd',function(){
            if(_endFlag){
                if(!__t.listState || !__t.hasTitle){
                    __callBack(os.scrollEnd,__t.oNav); 
                }
                _endFlag = false;
            }
        });   
    };

    // 初始化开关
    nav.prototype._initSwitch = function(){
         var __t = this, 
            os = __t._setting,
            _btn = __t.oNavBtn,
            _list = __t.oList,
            _title = __t.oCon.find('span.'+__t._initPrefix(__className.hd)),
            _icon = _btn.find('span'),
            _flag = os.openUp ? 2 : 1,
            iListH = Math.ceil(__t.aNavItem.length/os.num) * __t.aNavItem.height();


        // 绑定hide事件 
        if(os.globalClose){
            __bind('hide',function(){
                if(!__t.listState){ return; }
                _hide();
            });
        }

        // 下拉列表
        _btn.on("click",function(e){
            !__t.listState ? _show() : _hide();
            __callBack(os.drop,$(this),__t.listState);
            e.stopPropagation();
        });

        // 禁止标题移动
        _title.on('touchmove',function(e){
            e.stopPropagation();
            return false;
        });

        // 禁止标题点击冒泡
        _title.on('click',function(e){
            e.stopPropagation();
            return false;
        });
        
        // 下拉显示
        function _show(){
            if(__t.listState){ return;}
            // 下拉显示状态
            __t.listState = true;
            __callBack(os.show,_list);
            _title.show();
            __tranform(true);         
            _list.css({height:iListH})
        }

        // 下拉隐藏
        function _hide(){
            if(!__t.listState){ return;}
            // 下拉显示状态
            __t.listState = false;
            __callBack(os.hide,_list);
            _title.hide();
            __tranform(false);
            _list.css({height:0})
        }

        // ICON动画函数
        function __tranform(type){
            _icon.css({
                '-webkit-transform':'translate(-50%,-50%) rotate('+(_flag*180)+'deg)',
                'transform':'translate(-50%,-50%) rotate('+(_flag*180)+'deg)'
            });
            _flag++;
        }

        return {
            hide:_hide,
            show:_show
        } 
    };

    // 初始化tab切换
    nav.prototype._initTab = function(){
        var __t = this,
            os = __t._setting;

        // 滚动条tab点击事件
        __t.oNav.on('click','li',function(e){
            e.stopPropagation(); 
            if(!_tabEvent($(this))){
                return;
            }   
            !__t.hasTitle && __t.events.hide && __t.events.hide();   
        });


        if(!__t.isRoll || __t.onlyRoll){ return;}
        
        // 下拉列表点击事件
        __t.oList.on('click','li',function(e){
            if(!_tabEvent($(this))){
                return;
            }
            __t.events.hide && __t.events.hide();
        });

        // 下拉列表禁止冒泡
         __t.oList.on('click',function(e){
            e.stopPropagation();
            return false;
        });

        //  tab事件
        function _tabEvent(_this){
            if(_this.hasClass(__t.clsCur)){
                return false;
            }
            // 不需要自动触发scrollTo 直接回调自己处理剩下的逻辑
            if(os.triggerState){
                __callBack(os.tab,_this);
                return false;
            }else{
                __t._scrollTo(_this.index());
            }
            
            return true;
        }; 
    };

    // 重置
    nav.prototype._reset = function(idx){
        var __t = this,
            os = __t._setting;
            _width = os.navWidth,
            _navItem = __t.aNavItem.eq(idx);


        __t.navIndex = idx;
        __t.aNavItem.removeClass(__t.clsCur);
        _navItem.addClass(__t.clsCur);

        if(__t.needList){
            __t.aListItem.removeClass(__t.clsCur);
            __t.aListItem.eq(idx).addClass(__t.clsCur);
        } 

        if(os.bottomLine){
            if(_width){
                __t.oArrow.css({"width":_width+"px","transition":"400ms","-webkit-transform":"translate3d("+_width*idx+"px,0,0)"});
            }else{
                __t.oArrow.css({"width":_navItem.attr('data-bottomwidthn')+"px","transition":"400ms","-webkit-transform":"translate3d("+_navItem.attr('data-bottommaxn')+"px,0,0)"});
            }
        }        
    };

    // 滚动
    nav.prototype._scrollTo = function(idx,_trigger){
        var __t = this,
            os = __t._setting;

         // 如果与之前的index相同 则返回
         if(__t.navIndex == idx){
            return;
         }   
            
         __t._reset(idx);
         // 第二个参数为非true || 不是设置了手动触发的
         if(!_trigger && !os.triggerState){
            __callBack(os.tab,__t.aNavItem.eq(idx));
         }
        
        if(!__t.iScrollObj){return;}
        try{
            // iscroll自带居中
            // __t.iScrollObj.scrollToElement(__t.aNavItem.eq(__getIndex(os.num,idx))[0],200);
            __t.iScrollObj.scrollToElement(__t.aNavItem.eq(idx)[0],200,os.scrollOffset);
        }catch(e){
            console.log(e);
        }
    }; 

    return nav;
}));;;
