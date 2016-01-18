define({ "api": [
  {
    "type": "JSHOP",
    "url": "none",
    "title": "base()",
    "name": "base",
    "group": "PromptRecommend",
    "description": "<p>none</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "none",
        "type": "json"
      },
      {
        "title": "code",
        "content": "base : function(arg){\n\tvar _this = $(this),\n\t\t_arg = $.extend({\n\t\t\tnode : 'li',\n\t\t\tclick_node : '.jBtnArea a'\n\t\t},arg || {}),\n\t\t_ids = [],\n\t\t_base_url = INTERFACE.actJshop.ms;\n\t\n\tfunction _init(){\n\t\t_get_ids();\n\t\t_get_state();\n\t}\n\t\n\tfunction _get_ids(){\n\t\t_this.find(_arg.node).each(function(index,n){\n\t\t\t_ids.push($(n).attr('prompt-id'));\n\t\t});\t\t\t\t\n\t}\n\t\n\tfunction _get_state(){\n\t\t$.ajax({\n\t\t\turl : _base_url,\n\t\t\ttype : 'POST',\n\t\t\tdata : {promoId : _ids.join(',')},\n\t\t\tdataType : 'jsonp',\n\t\t\tsuccess : function(data){\n\t\t\t\tif(data.result){\n\t\t\t\t\tdata.values.each(function(index,n){\n\t\t\t\t\t\tif(n.status == '0'){\n\t\t\t\t\t\t\t$(_this).find('li[prompt-id=\"' + n.id + '\"]').attr('class',_arg.overCls).find(_arg.click_node).attr('href','#none');\n\t\t\t\t\t\t}\n\t\t\t\t\t\telse if(n.status == '1'){\n\t\t\t\t\t\t\t$(_this).find('li[prompt-id=\"' + n.id + '\"]').attr('class',_arg.underwayCls);\n\t\t\t\t\t\t}\n\t\t\t\t\t\telse{\n\t\t\t\t\t\t\t$(_this).find('li[prompt-id=\"' + n.id + '\"]').attr('class',_arg.waitCls).find(_arg.click_node).attr('href','#none');;\n\t\t\t\t\t\t}\n\t\t\t\t\t});\n\t\t\t\t}\n\t\t\t}\n\t\t});\n\t}\n\t_init();\n}",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "PromptRecommend"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "jingdou()",
    "name": "jingdou",
    "group": "PromptRecommend",
    "description": "<p>none</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "none",
        "type": "json"
      },
      {
        "title": "code",
        "content": "jingdou : function(arg){\n\tvar _this = $(this),\n\t\t_args = $.extend({\n\t\t\tpprice:'.Jpprice',\n\t\t\tjingNum:'.Jjnum'\n\t\t},arg || {}),\n\t\t_ids = [];\n\t\n\tfunction _init(){\n\t\t_get_skuids();\n\t\tif(!_ids.length) return;\n\t\t_get_jindou_info();\n\t}\n\t\n\tfunction _get_skuids(){\n\t\t_this.find('[prompt-id]').each(function(index,n){\n\t\t\t_ids.push($(n).attr('skuid') + '-' + $(n).attr('prompt-id'));\n\t\t});\n\t}\n\t\n\tfunction _get_jindou_info(){\n\t\t$.ajax({\n\t\t\turl : '//jprice.360buy.com/skuprice/' + _ids.join(',') + '-1-1.html',\n\t\t\tdataType : 'jsonp',\n\t\t\tcache : false,\n\t\t\tsuccess : function(data){\n\t\t\t\tif(data&&data.length){\n\t\t\t\t\tdata.each(function(index,n){\n\t\t\t\t\t\tif(n.s != 1) return;\n\t\t\t\t\t\tvar __node = _this.find('[skuid=' + n.sid + ']');\n\t\t\t\t\t\t__node.find(_args.pprice).html(n.pp);\n\t\t\t\t\t\t__node.find(_args.jingNum).html(n.jbn || 0);\n\t\t\t\t\t});\n\t\t\t\t}\n\t\t\t}\n\t\t})\n\t}\n\t_init();\n}",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "PromptRecommend"
  },
  {
    "type": "ATTENTION",
    "url": "UserDefine模块还扩展了公共模块中的所有函数",
    "title": "ATTENTION!!!",
    "name": "ATTENTION___",
    "group": "UserDefine",
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "UserDefine"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "addFavorite()",
    "name": "addFavorite",
    "group": "UserDefine",
    "description": "<p>添加收藏--将链接地址添加到浏览器收藏夹，方便以后访问。</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "title:字符串，自定义名字\nurl:自定义链接地址",
        "type": "json"
      },
      {
        "title": "code",
        "content": "addFavorite: function(args) {\n\tif(args == undefined){\n\t\tif(validateData($(this).attr('module-param'))){\n\t\t\tvar args = eval('('+$(this).attr('module-param')+')');\n\t\t}\n\t}\n\t\n\tvar _this = this,\n\t\tparam = $.extend({title:'京东商城', url:'//www.jd.com'},args),\n\t\ttitle = param.title,\n\t\turl = param.url;\n\t\n\t$(_this).css('cursor','pointer');\n\t$(_this).click(function(e){\n\t\tif (document.all) {\n\t        window.external.AddFavorite(url, title);\n\t    } else if (window.sidebar) {\n\t        window.sidebar.addPanel(title, url, \"\");\n\t    } else {\n\t        alert(\"对不起，您的浏览器不支持此操作!\\n请您使用菜单栏或Ctrl+D收藏本站。\");\n\t    }\n\t});\t\t    \n}",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "UserDefine"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "autoCenter()",
    "name": "autoCenter",
    "group": "UserDefine",
    "description": "<p>none</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "none",
        "type": "json"
      },
      {
        "title": "code",
        "content": "autoCenter : function(args){\n\tvar _this = $(this),\n\t\tparam = $.extend({autoMiddleNode:'.userDefinedArea', isOwnLink : true} , args || {}),\n\t\tnode = _this.find(param.autoMiddleNode),\n\t\tisOwnLink = param.isOwnLink;\n\t\n\talignCenter();\n\t$(window).resize(function(){\n\t\talignCenter();\n\t});\n\t\n\tfunction alignCenter(){\n\t\tvar extra = node.width()-_this.width();\n\t\tif(extra>0){\n\t\t\tnode.css({'margin-left':-extra/2});\n\t\t}else{\n\t\t\tnode.css('margin','0 auto');\n\t\t}\n\t}\n\t\n\t//判断自定义编辑器里面的图片是否有链接  20150907 by cdwanchuan@jd.ccom\n\tif(isOwnLink && location.href.indexOf('visualEditing')!= -1){\n\t\tvar img = node.find('img');\n\t\timg.each(function(i,e){\n\t\t\tif((jQuery(e).parent()[0].tagName!= 'A') && !jQuery(e).attr('usemap')){\n\t\t\t\tvar relativePar = jQuery(jQuery(e)[0].offsetParent);\n\t\t\t\tif(relativePar.length && jQuery(e).length){\n\t\t\t\t\tvar top = jQuery(e).offset().top - relativePar.offset().top + jQuery(e).height()/2 -11,\n\t\t\t\t\t\tleft = jQuery(e).width()/2 - 31;\n\t\t\t\t\tnode.append('<img src=\"//img11.360buyimg.com/cms/jfs/t2353/241/73326232/691/b8435b2b/55ed2da1N0a73abac.png\" width=\"62\" height=\"23\" style=\"position:absolute; left:' + left +'px; top:' + top + 'px;\" />');\n\t\t\t\t}\n\t\t\t}\n\t\t});\n\t}",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "UserDefine"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "sideSlip()",
    "name": "sideSlip",
    "group": "UserDefine",
    "description": "<p>侧滑--用于当页链接锚点或专题入口跳转</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "vertical:字符串，样式里面的垂直位置参数，可选值top、bottom\nverticalValue:数字，当垂直位置为top时，此值必须大于170，不然无效。（因京东头高度为170px，此功能展示界面不能遮挡京东头）\nhorizontal:字符串，样式里面的水平位置参数，可选值left、right\nhorizontalValue:数字，无限制\nzindex:数字，前后位置",
        "type": "json"
      },
      {
        "title": "param-Example",
        "content": "<div class=\"j-module\" module-function=\"sideSlip\" module-param=\"{vertical:'top', verticalValue:170, horizontal:'left', horizontalValue:0}\">\n也可以不传使用默认参数: <div class=\"j-module\" module-function=\"sideSlip\" module-param=\"{}\">;",
        "type": "json"
      },
      {
        "title": "code",
        "content": "sideSlip:function(args){\n   \n   \t//此方法应用的图片不使用懒加载\n\t   var imgs = $(this).find('img');\n\t   imgs.each(function(index,n){\n\t\t  $(n).attr('src',$(n).attr('original'));\n\t\t  $(n).removeAttr('original');\n\t\t  $(n).removeClass('J_imgLazyload');\n\t   });\n\t   \n\t\tif(args == undefined){\n\t\t\tif(validateData($(this).attr('module-param'))){\n\t\t\t\tvar args = eval('('+$(this).attr('module-param')+')');\n\t\t\t}\n\t\t}\n\t\t\n\t\tvar _this = this,\n\t\t\tparam = $.extend({vertical:'top', verticalValue:170, horizontal:'left', horizontalValue:0, zindex:10},args),\n\t\t\tvertical = param.vertical,\n\t\t\tverticalValue = param.verticalValue,\n\t\t\thorizontal = param.horizontal,\n\t\t\thorizontalValue = param.horizontalValue,\n\t\t\tzindex = param.zindex;\n\t\t\n\t\t//判断参数个数\n\t\tvar count = 0;\n\t\tfor(var i in param){\n\t\t\tcount++;\n\t\t}\n\t\t//如果垂直是top，水平是right\n\t\tif(count == 5 && vertical == 'top' && verticalValue >= 170 && horizontal == 'right'){\n\t\t\tsetInterval(function(){\n\t\t\t\tverticalValue += (getTop() + param.verticalValue - verticalValue)/20;\n\t\t\t\t$(_this).css({'position':'absolute', 'top':verticalValue, 'right':horizontalValue, 'zIndex':zindex});\n\t\t\t},20);\n\t\t}\n\t\t//如果垂直是top，水平是left\n\t\tif(count == 5 && vertical == 'top' && verticalValue >= 170 && horizontal == 'left'){\n\t\t\tsetInterval(function(){\n\t\t\t\tverticalValue += (getTop() + param.verticalValue - verticalValue)/20;\n\t\t\t\t$(_this).css({'position':'absolute', 'top':verticalValue, 'left':horizontalValue, 'zIndex':zindex});\n\t\t\t},20);\n\t\t}\n\t\t//如果垂直是bottom，水平是right\n\t\tif(count == 5 && vertical == 'bottom' && horizontal == 'right'){\n\t\t\tvar a = $(window).height()-$(_this).height()-param.verticalValue,\n\t\t\t\tb = a;\n\t\t\tsetInterval(function(){\n\t\t\t\ta += (getTop() + b - a)/20;\n\t\t\t\t$(_this).css({'position':'absolute', 'top':a, 'right':horizontalValue, 'zIndex':zindex});\n\t\t\t},20);\n\t\t}\n\t\t//如果垂直是bottom，水平是left\n\t\tif(count == 5 && vertical == 'bottom' && horizontal == 'left'){\n\t\t\tvar a = $(window).height()-$(_this).height()-param.verticalValue,\n\t\t\t\tb = a;\n\t\t\tsetInterval(function(){\n\t\t\t\ta += (getTop() + b - a)/20;\n\t\t\t\t$(_this).css({'position':'absolute', 'top':a, 'left':horizontalValue, 'zIndex':zindex});\n\t\t\t},20);\n\t\t}\n\t\t//如果垂直是bottom，水平是middle\n\t\tif(count == 5 && vertical == 'bottom' && horizontal == 'middle'){\n\t\t\tvar a = $(window).height()-$(_this).height()-param.verticalValue,\n\t\t\t\tb = a;\n\t\t\t\n\t\t\tsetInterval(function(){\n\t\t\t\ta += (getTop() + b - a)/20;\n\t\t\t\t$(_this).css({'position':'absolute','top':a, 'left':horizontalValue, 'margin-left':-($(_this).width()/2), 'zIndex':zindex});\n\t\t\t},20);\n\t\t}\n\t\tfunction getTop(){\n\t\t\treturn (document.documentElement.scrollTop||document.body.scrollTop||0)-(document.documentElement.clientTop||document.body.clientTop||0);\n\t\t}\n\t}",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "UserDefine"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "addEllipsis()",
    "name": "addEllipsis",
    "group": "public_modules",
    "description": "<p>新EPT商品名称截断处理，自动添加省略号</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "none",
        "type": "json"
      },
      {
        "title": "code",
        "content": "addEllipsis:function(args){\n\n       if(!args)return;\n       var _this = this,\n               param = jQuery.extend({title:'li', count:20, text:'...'}, args),\n               elem = jQuery(_this).find(param.title),\n               reg = /\\s|\\,|\\.|\\!|\\'|\\\"|\\;|\\:|\\t|\\n|\\r/g;\n//               reg = new RegExp(\"\\\\s|\\\\,|\\\\.|\\\\!|\\\\'|\\\\\\\"|\\\\;|\\\\:|\\\\t|\\\\n|\\\\r\", \"g\");\n       elem.each(function(index, ele){\n           var _textNode = ele.firstChild,\n                   _textValue = _textNode.nodeValue;\n           if(_textNode && _textNode.nodeType == 3 && _textNode.length >= param.count){\n               var _tempValue = _textValue.substring(0, param.count - param.text.length);\n               var _char = _textValue.charAt(param.count - param.text.length);\n               if(reg.test(_char)){\n                   _textNode.nodeValue = _tempValue + param.text;\n               }else{\n                   var _arr = _tempValue.match(reg);\n                   _tempValue = _tempValue.substring(0, _tempValue.lastIndexOf(_arr[_arr.length - 1]) + 1) + param.text;\n                   _textNode.nodeValue = _tempValue;\n               }\n           }\n       });\n\n   }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "public_modules"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "addToCart()",
    "name": "addToCart",
    "group": "public_modules",
    "description": "<p>飞入购物车--点击购物车，获取商品图片飞入购物车特效</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "none",
        "type": "json"
      },
      {
        "title": "code",
        "content": "addToCart : function(args){\n        var param = $.extend({\n            node : 'li',\n            img : '.jPic img',//飞入节点\n            cart : '.jBtnArea a',//点击节点\n            property : 'data-sku',//获取节点li上的skuid\n            jdCart : '#settleup-2013',//购物车\n            cartNum : '#shopping-amount',//购物车数量\n            timer : 500\n        }, args || {}),\n            that = $(this),\n            node = that.find(param.node),\n            jdCart = $(param.jdCart),\n            cartNum = jdCart.find(param.cartNum);\n\n        node.each(function(i, e){\n            var img = $(e).find(param.img),\n                cart = $(e).find(param.cart);\n\n            cart.click(function(){\n                smarket.add(cart, $(e).attr(param.property), img, jdCart, cartNum, param.timer);\n            });\n        });\n\n        var smarket = {\n            ele : null,\n            sku : null,\n            ptype : null,\n            pcount : null,\n            add : function(a,b,img, jdCart, cartNum, timer, c,d){\n                0 != b &&(this.ele = a, this.sku = b, this.ptype = d || 1, this.pcount = c || 1, this.img = img, this.jdCart = jdCart, this.cartNum = cartNum, this.timer = timer, this.versonAnimate());\n            },\n\n            versonAnimate : function(){\n                var a = this;\n                clearTimeout(a.timer);\n                a.timer = null;\n                this.addToCart();\n                var b = a.img,\n                    c = b.height(),\n                    d = b.width(),\n                    e = b.offset().left,\n                    f = b.offset().top,\n                    g = $(document).scrollTop(),\n                    h = a.jdCart.offset().left + 50,\n                    i = a.jdCart.offset().top,\n                    j = $('<div class=\"flyGoods jGoodsRecommend20140909\" style=\"position:absolute;z-index: 10;\"></div>'),\n                    l = 25;\n\n            var t = $(a.ele);\n                j.html(b.clone()).css({\n                    left: e + d / 2 - l + Math.round(40Math.random() + 0 - 20),\n                    top: f + c/2 - 1 + Math.round(40Math.random() + 0 - 20)\n                });\n\n                j.appendTo('body');\n                j.animate({\n                    top : t.offset().top,\n                    left : t.offset().left + t.width() - 50\n                    },a.timer,'easeOutCirc',function(){\n                        j.animate({\n                            left : h,\n                            top : i,\n                            opacity : 0.1\n                        },a.timer,'easeInOutQuint',function(){\n                            a.getCartNum();\n                            j.remove();\n                        });\n                    });\n            },\n\n            addToCart : function(){\n                var a = INTERFACE.reBuyForOrderCenter + \"?wids={PID}&nums={PCOUNT}\";\n                a = a.replace(\"{PID}\", this.sku).replace(\"{PCOUNT}\", this.pcount).replace(\"{PTYPE}\", this.ptype),\n                jQuery.ajax({\n                    url: a,\n                    dataType: \"jsonp\"\n                });\n            },\n            getCartNum : function(){\n                var that = this;\n                jQuery.ajax({\n                    url : INTERFACE.miniCartServiceNew,\n                    data : {\n                        method : 'GetCart'\n                    },\n                    dataType : 'jsonp',\n                    success : function(data){\n                        try{\n                            that.cartNum.html(data.Cart.Num);\n                        }\n                        catch(e){\n                        }\n                    }\n                });\n            }\n        }\n    }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "public_modules"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "attentStoreOrAct()",
    "name": "attentStoreOrAct",
    "group": "public_modules",
    "description": "<p>关注店铺或活动</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "none",
        "type": "json"
      },
      {
        "title": "code",
        "content": "attentStoreOrAct: function(args) {\n        var param = jQuery.extend({\n                attentNode: 'a',  //点击元素\n                shopId: 'shop-id', //店铺ID（绑定在节点伪属性，可为空）\n                actId: 'act-id',  //活动ID（绑定在节点伪属性，可为空）\n                typeUrl: 'url'    //活动或店铺链接（绑定在节点伪属性）\n            }, args || {}),\n            followUrl = '',\n\t\t\tdata = {},\n            _this = $(this),\n            _node = _this.find(param.attentNode),\n            appType = 0; //链接类型\n        _node.each(function(){\n            var $this = $(this),\n                $parent = $this.parent();\n            // 调用公共方法获取链接类型（0表示采销活动，1表示店铺活动，2表示店铺）\n            appType =returnUrlType($this.attr(param.typeUrl));\n            $this.attr('data-type', 2); //表示默默关注\n            $parent.addClass('attentScope');\n            switch (appType) {\n                case 0:\n                case 1:\n                    // 活动\n                    $parent.saleAttent({\n                        attentType: 'activity',\n                        node: param.attentNode,\n                        dataId: 'act-id',\n                        current: 'favor-handle',\n                        activityType: appType\n                    });\n                    break;\n                case 2:\n                    // 店铺\n                    $parent.saleAttent({\n                        attentType: 'vender',\n                        node: param.attentNode,\n                        dataId: 'shop-id',\n                        current: 'favor-handle'\n                    });\n                    break;\n                default:\n                    break;\n            }\n        });\n    }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "public_modules"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "autoFill()",
    "name": "autoFill",
    "group": "public_modules",
    "description": "<p>自动填充宽度：通过传入不同的参数，让商品呈现不同的间距排列--可应用于列表类模块</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "如{autoFillNode:'li', xInner:0, yInner:0, minWidth:' ', xOuter:' ', yOuter:' '}\n1、autoFillNode为需要计算宽度的节点，默认为li；xInner为节点之间的横向间距；yInner为节点之间的纵向间距;\n2、minWidth为节点除内外边距、边框之后的宽度，如果没传则自动获取。如果最终算出来的宽度小于最小宽度，则不做改变;\n3、xOuter为节点父级左右边距，默认为空，表示两边没有间距；如果传入值大于0，则两边增加传入的间距值；如果等于0，则表示两边完全不要间距，包括每一行第一个节点和最后一个节点的边距。yOuter和xOuter相反;\n4、length 每一行的数量有三种方式：1是自定义传；2是根据每一行的宽度和单个的宽度计算能放下的数量；3是当一行的数量不够占一行的数量",
        "type": "json"
      },
      {
        "title": "code",
        "content": "autoFill : function(args){\n        var param = $.extend({autoFillNode:'li', xInner:0, yInner:0, minWidth:' ', xOuter:' ', yOuter:' ', isEqual:false, length:''} , args||{}),\n            _this = $(this),\n            node = _this.find(param.autoFillNode),\n            xInner = parseInt(param.xInner),\n            yInner = parseInt(param.yInner),\n            minWidth = parseInt(param.minWidth)?parseInt(param.minWidth):node.width(),\n            xOuter = param.xOuter,\n            yOuter = param.yOuter,\n            isEqual = param.isEqual,\n            length;\n\n\n        //有最外层横向两边距\n        if(xOuter !== 0){\n            //是否需要平均节点宽度\n            if(isEqual){\n                length = node.length;\n            }else if(param.length > 0){\n                length = param.length;\n            }else{\n                length = parseInt((_this.width() - xOuter*2)/minWidth);\n            }\n\n            var width = (_this.width() - (length+1)*xInner - xOuter*2 - length*(parseFloat(node.css('padding-left')) + parseFloat(node.css('padding-right')) + parseFloat(node.css('border-left-width')) + parseFloat(node.css('border-right-width'))))/length;\n\n            if(width < minWidth)return;};\n\n            init();\n            _this.css('padding-left',xOuter);\n        }\n\n        //不要最外层横向两边距\n        if(xOuter === 0){\n            //是否需要平均节点宽度\n            if(isEqual){\n                length = node.length;\n            }else if(param.length > 0){\n                length = param.length;\n            }else{\n                length = parseInt(_this.width()/minWidth);\n            }\n\n            var width = (_this.width() - (length-1)*xInner - length*(parseFloat(node.css('padding-left')) + parseFloat(node.css('padding-right')) + parseFloat(node.css('border-left-width')) + parseFloat(node.css('border-right-width'))))/length;\n\n            if(width < minWidth)return;};\n\n            init();\n            getRowFirst();\n        }\n\n        //默认状态，最外层横向两边距不存在\n        if(xOuter ===' '){\n            //是否需要平均节点宽度\n            if(isEqual){\n                length = node.length;\n            }else if(param.length > 0){\n                length = param.length;\n            }else{\n                length = parseInt(_this.width()/minWidth);\n            }\n\n            var width = (_this.width() - (length+1)*xInner - length*(parseFloat(node.css('padding-left')) + parseFloat(node.css('padding-right')) + parseFloat(node.css('border-left-width')) + parseFloat(node.css('border-right-width'))))/length;\n\n            if(width < minWidth)return;};\n\n            init();\n        }\n\n        //有最外层纵向两边距\n        if(yOuter != 0){\n            _this.css('padding-bottom',yInner+yOuter);\n            _this.css('padding-top',yOuter);\n        }\n\n        //不要最外层纵向两边距\n        if(yOuter === 0){\n            getRow();\n        }\n\n        //默认状态，最外层纵向两边距不存在\n        if(yOuter === ' '){\n            _this.css('padding-bottom',yInner);\n        }\n\n\n        node.css('width', width);\n\n        //初始化节点\n        function init(){\n            _this.css('overflow','hidden');\n\n            if(node.css('margin-left')||node.css('margin-right')){\n                node.css({'margin-left':0, 'margin-right':0});\n            }\n\n            node.css('margin-top',yInner);\n            node.css('margin-left',xInner);\n        }\n\n        //获取每一行的第一个节点\n        function getRowFirst(){\n            node.each(function(i,e){\n                if(i % length === 0){\n                    $(e).css('margin-left',0);\n                }\n            });\n        }\n\n        //获取任意多行节点\n        function getRow(){\n            var number = [1];\n            node.each(function(i,e){\n                for(var j = 0; j < number.length; j++){\n                    if(i >= length(number[j] - 1) && i < lengthnumber[j]){\n                        $(e).css('margin-top',0);\n                    }\n                }\n            });\n        }\n\n    }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "public_modules"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "autoTag()",
    "name": "autoTag",
    "group": "public_modules",
    "description": "<p>给a链接增加埋点</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "none",
        "type": "json"
      },
      {
        "title": "code",
        "content": "autoTag:function(args){\n        var param = jQuery.extend({\n\t\t\t\tnode:'a'\n\t\t\t\t}, args || {}),\n            _this = jQuery(this),\n\t\t\tnode = _this.find(param.node),\n\t\t\tinstanceid = _this.closest('div[instanceid]').attr('instanceid');\n\t\t\t\n\t\tnode.each(function(i,e){\n\t\t\tjQuery(e).attr('clstag','sale|keycount|'+instanceid+'|'+i);\n\t\t});\n    }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "public_modules"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "autoWidth()",
    "name": "autoWidth",
    "group": "public_modules",
    "description": "<p>自适应布局：自适应布局宽度，根据布局的宽度判断能放下的一行数量，并将多余的宽度赋给每一个列表。支持css对象传入</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "如{_this:'.template-area', node:'.item', extra:{}}",
        "type": "json"
      },
      {
        "title": "code",
        "content": "autoWidth:function(args){\n        var _para = $.extend({node:'li', extra:{}}, args || {}),\n            _this = this,\n            elems = $(_this).find(_para.node),\n            elem = elems.eq(0);\n\n        elems.css(_para.extra);\n\n        var outerWidth = parseInt(elem.data('outerWidth') || elem.outerWidth(true)),\n            width = parseInt(elem.data('width') || elem.css('width')),\n            qty = parseInt(elem.parent().parent().width()/outerWidth);\n\n        elem.data({'outerWidth':outerWidth, 'width':width});\n\n        var extraWidth = outerWidth - width;\n        var newWidth = (elem.parent().parent().width()-extraWidth*qty-0.03)/qty;\n        elems.css({width:newWidth});\n  }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "public_modules"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "brandAttent()",
    "name": "brandAttent",
    "group": "public_modules",
    "description": "<p>关注品牌--支持多个品牌关注</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "一、业务\n      0、关注店铺和关注品牌街活动，传的都是“品牌街”那边的品牌活动ID，当前活动的“品牌活动ID”可以在隐藏域#tb_id里面获取\n      1、点击元素：系统用j-attention（用此class名做唯一区分），用户自定义用e-attention\n      2、品牌活动ID：data-id（节点伪属性，将品牌活动ID保存在此）,品牌街活动是“品牌街活动ID”，商家是shopId\n      3、区分关注功能类型：data-type（节点伪属性，用户手动传入），0表示不需要改变文案及取消功能，1表示需要改变文案和要取消功能\n      4、currentDom：当前点击的元素\n      5、临时状态data-state ：0未关注；1关注成功；2已经关注；3关注数量达到上限；4关注失败\n      6、逻辑业务：\n          1）页面打开时，获取页面上所有带有点击class节点上的data-id，整体初始化；\n          2）点击某一个元素时，将此元素设置为当前元素，获取元素上的data-id，和data-state发送不同请求（关注或取消关注）\n          3）当元素是关注状态1和已经关注状态2时，hover上去都显示取消关注\n          4）根据不同的请求状态，修改按钮文案\n\n  二、系统使用（引入attent_bp.js）：\n      1、点击元素：j-attention（用此class名做唯一区分）\n      2、品牌活动ID：data-id（节点伪属性，将品牌活动ID保存在此）,品牌街活动是“品牌街活动ID”\n      3、区分关注功能类型：data-type（节点伪属性，用户手动传入），0表示不需要改变文案及取消功能，1表示需要改变文案和要取消功能\n\n 三、公共方法（Module.js里面增加brandAttent方法）\n      1、点击元素：e-attention（用此class名做唯一区分）\n      2、品牌活动ID：data-id（节点伪属性，将品牌活动ID保存在此）,品牌街活动是“品牌街活动ID”\n      3、区分关注功能类型：data-type（节点伪属性，用户手动传入），0表示不需要改变文案及取消功能，1表示需要改变文案和要取消功能\n      4、点击元素，受限于模块module-name，只有在模块下才能使用\n      5、使用方法：<div class=\"j-module\" public modules=\"brandAttent\" module-param=\"{}\">自定义代码</div>",
        "type": "json"
      },
      {
        "title": "code",
        "content": "brandAttent : function(args){\n        var param = jQuery.extend({\n            node : '.e-attention', //关注点击元素\n            pageIdValue : '#tb_id',\n            dataId : 'data-id',//（节点伪属性，将品牌活动ID保存在此）,品牌街活动是“品牌街活动ID”\n            dataState : 'data-state',\n            dataType : 'data-type'//关注类型，如果是1，则只需要关注和已经关注2个状态\n        }, args || {}),\n            _this = jQuery(this),\n            node = _this.find(param.node),\n            dataTye,//全局变量，获取点击元素上的类型  0只要关注和已经关注，非0则默认有取消功能，且修改按钮文案\n            currentDom,//全局变量，获取当前点击的元素\n            para = []; //传入参数\n\n        if(!node.length)return;}\n\n        var attentHtml = '<div class=\"follow-dialog-mask\"></div>'\n        +'<div class=\"follow-dialog\">'\n        +   '<div class=\"attent-mt\">'\n        +       '<span class=\"attent-close\" title=\"关闭\">关闭</span>'\n        +       '<span class=\"attent-title\">提示</span>'\n        +   '</div>'\n        +   '<div class=\"attent-mc\">'\n        +       '<div class=\"attent-con\">'\n        +           '<span class=\"attent-msg\"></span>'\n        +           '<span class=\"attent-other\"></span>'\n        +       '</div>'\n        +   '</div>'\n        +'</div>';\n\n        var attentCss = '<style id=\"followCls\">'\n        +'.follow-dialog-mask{position:fixed; _position:absolute; left:0; top:0; right:0; bottom:0; background:#000; opacity:0.3; filter:alpha(opacity=30); z-index:100; display:none;}'\n        +'.follow-dialog-mask.current{display:block;}'\n        +'.follow-dialog{width:310px; height:185px; border:solid 5px #ccc; background:#fff; position:fixed; _position:absolute; left:50%; top:50%; margin:-92px 0 0 -155px; z-index:101; display:none;}'\n        +'.follow-dialog.current{display:block;}'\n        +'.follow-dialog .attent-mt{height:32px; line-height:32px; background:#f5f5f5; font-size:16px; color:#222; text-indent:10px; overflow:hidden;}'\n        +'.follow-dialog .attent-close{float:right; width:32px; height:32px; text-indent:-9999px; background:url(//img10.360buyimg.com/cms/jfs/t1420/84/156758085/1080/d48a39fe/555e9e79N85386290.png) center center no-repeat; cursor:pointer;}'\n        +'.follow-dialog .attent-ok, .follow-dialog .attent-repeat, .follow-dialog .attent-error, .follow-dialog .attent-max{margin:48px 0 0 55px; height:40px; padding-left:48px;}'\n        +'.follow-dialog .attent-ok{background:url(//img12.360buyimg.com/cms/jfs/t1435/352/153421548/1347/d377c92d/555e9e71Nb767e906.png) left center no-repeat;}'\n        +'.follow-dialog .attent-repeat, .follow-dialog .attent-error, .follow-dialog .attent-max{background:url(//img14.360buyimg.com/cms/jfs/t1516/358/164942511/1418/e0c25f0c/555e9e75Nfca9da16.png) left center no-repeat;}'\n        +'.follow-dialog .attent-ok .attent-msg{font-size:14px; color:#009900; font-weight:bold;}'\n        +'.follow-dialog .attent-repeat .attent-msg, .follow-dialog .attent-error .attent-msg, .follow-dialog .attent-max .attent-msg{font-size:14px; color:#ff771e; font-weight:bold;}'\n        +'.follow-dialog .attent-other{color:#6f6363; display:block; margin-top:3px;}'\n        +'.follow-dialog .attent-other a{color:#004499;}'\n        +'.follow-dialog.attent-mall .attent-other a{margin:0 5px;}'\n        +'</style>';\n\n        var attentInfo = {\n            brand : {\n                msgOk : '&#x5173;&#x6CE8;&#x54C1;&#x724C;&#x6210;&#x529F;',\n                msgRepeat : '&#x5DF2;&#x7ECF;&#x5173;&#x6CE8;',\n                msgError : '&#x5173;&#x6CE8;&#x54C1;&#x724C;&#x5931;&#x8D25;',\n                msgMax : '&#x5173;&#x6CE8;&#x7684;&#x54C1;&#x724C;&#x8FBE;&#x5230;&#x6700;&#x5927;&#x6570;&#x91CF;',\n                msgOther : '<a href=\"//t.jd.com/follow/brand/list.action\" target=\"_blank\">&#x67E5;&#x770B;&#x6211;&#x7684;&#x5173;&#x6CE8;>></a>'\n            },\n            mall : {\n                msgOk : '&#x5173;&#x6CE8;&#x6210;&#x529F;',\n                msgRepeat : '&#x5DF2;&#x7ECF;&#x5173;&#x6CE8;',\n                msgError : '&#x5173;&#x6CE8;&#x5931;&#x8D25;',\n                msgOther : '&#x67E5;&#x770B;&#x6211;&#x5173;&#x6CE8;&#x7684;<a href=\"//t.jd.com/vender/followVenderList.action\" target=\"_blank\">&#x5E97;&#x94FA;</a>&#x548C;<a href=\"//t.jd.com/follow/brand/list.action\" target=\"_blank\">&#x54C1;&#x724C;</a>'\n            }\n        };\n\n        //临时状态data-state ：0未关注；1关注成功；2已经关注；3关注数量达到上限；4关注失败\n        function domOperate(){\n            //取消关注\n            if(currentDom.attr(param.dataState) == 0){\n                if(dataType == 1){currentDom.html('\\u5173\\u6ce8\\u54c1\\u724c');}//如果当前需要取消关注功能，就需要修改文案\n               return;\n            }\n\n            jQuery('body').append(attentHtml,attentCss);\n            var _this = jQuery('.follow-dialog'),\n                mask = jQuery('.follow-dialog-mask'),\n                con = _this.find('.attent-con'),\n                msg = _this.find('.attent-msg'),\n                other = _this.find('.attent-other'),\n                close = _this.find('.attent-close'),\n\t\t\t\tcssDom = jQuery('#followCls'),\n                current = 'current';\n\n            //关注成功\n            if(currentDom.attr(param.dataState) == 1){\n                if(dataType == 1){currentDom.html('\\u5df2\\u5173\\u6ce8');}//如果当前需要取消关注功能，就需要修改文案\n                msg.html(attentInfo.brand.msgOk);\n                other.html(attentInfo.brand.msgOther);\n                con.addClass('attent-ok');\n                _this.addClass(current);\n                mask.addClass(current);\n            }\n            //已经关注\n            if(currentDom.attr(param.dataState) == 2){\n                msg.html(attentInfo.brand.msgRepeat);\n                other.html(attentInfo.brand.msgOther);\n                con.addClass('attent-repeat');\n                _this.addClass(current);\n                mask.addClass(current);\n            }\n            //关注达到最大数量\n            if(currentDom.attr(param.dataState) == 3){\n                msg.html(attentInfo.brand.msgMax);\n                other.html(attentInfo.brand.msgOther);\n                con.addClass('attent-repeat');\n                _this.addClass(current);\n                mask.addClass(current);\n            }\n            //关注失败\n            if(currentDom.attr(param.dataState) == 4){\n                msg.html(attentInfo.brand.msgError);\n                other.html(attentInfo.brand.msgOther);\n                con.addClass('attent-error');\n                _this.addClass(current);\n                mask.addClass(current);\n            }\n            close.click(function(){\n                _this.remove();\n                mask.remove();\n\t\t\t\tcssDom.remove();\n            });\n        }\n\n        //获取参数ID，此段供初始化元素状态及文案所用\n        !function getActivityId(){\n            for(var i = 0, len = node.length; i<len; i+=1){\n                para.push({activityId : jQuery(node[i]).attr(param.dataId)});\n            }\n        }();\n\n        //获取预览页面活动ID\n        function getAppId(){\n             var args=new Object(),\n                qry=location.search.substring(1),\n                pairs=qry.split(\"&\");\n            for(var i=0;i<pairs.length;i++)\n             {\n                var pos=pairs[i].indexOf('=');\n                    if(pos==-1)   continue;\n                    var argname=pairs[i].substring(0,pos),\n                        val=pairs[i].substring(pos+1);\n                    args[argname]=unescape(val);\n             }\n           return args['veBean.appId'];\n        }\n\n        function init(){\n            getState();\n            event();\n        }\n\n        function event(){\n            node.mouseenter(function(){\n                var _state = jQuery(this).attr(param.dataState),\n                    dataType = jQuery(this).attr(param.dataType);\n\n                if(_state == 1 || _state == 2){\n                    if(dataType!=0){jQuery(this).html('\\u53d6\\u6d88\\u5173\\u6ce8');}//如果当前需要取消关注功能，就需要修改文案\n                }\n            }).mouseleave(function(){\n                var _state = jQuery(this).attr(param.dataState),\n                    dataType = jQuery(this).attr(param.dataType);\n\n                if(_state == 1 || _state == 2){\n                    if(dataType!=0){jQuery(this).html('\\u5df2\\u5173\\u6ce8');}//如果当前需要取消关注功能，就需要修改文案\n                }\n            });\n\n            node.click(function(){\n                //获取当前点击元素上的品牌活动ID伪属性data-id\n                currentDom = jQuery(this);\n                para = [{activityId:currentDom.attr(param.dataId)}],\n                dataType = currentDom.attr(param.dataType);\n\n                if(dataType!=0){//如果当前需要取消关注功能\n                    if(currentDom.attr(param.dataState) == 1 || currentDom.attr(param.dataState) == 2){\n                        thick_login(abortAttent); \n                    }else{\n                        thick_login(attent);\n                    }\n                }else{\n                    thick_login(attent);\n                }\n            });\n        }\n\n        function getState(){\n            $.ajax({\n                url : INTERFACE.brandFollow.batchIsFollow,\n\t\t\t\tdata : {brandId : JSON.stringify(para), sysName : 'sale.jd.com'},\n                dataType : 'jsonp',\n                success : function(data){\n                    if(data.code == 'F10000'){\n                        for(var i = 0, len = node.length; i < len; i+=1){\n                            var _node = jQuery(node[i]),\n                                dataId = _node.attr(param.dataId),\n                                dataType = _node.attr(param.dataType);\n\n                            if(data.data[dataId]){\n                                if(dataType == 1){_node.html('\\u5df2\\u5173\\u6ce8');}//如果当前需要取消关注功能，就需要修改文案\n                                _node.attr(param.dataState,1);//已关注\n                            }else{\n                                if(dataType == 1){_node.html('\\u5173\\u6ce8\\u54c1\\u724c');}//如果当前需要取消关注功能，就需要修改文案\n                                _node.attr(param.dataState,0);//未关注\n                            }\n                        }\n                    };\n                }\n            });\n        }\n\n        function attent(){\n            $.ajax({\n                url : INTERFACE.brandFollow.batchfollow,\n\t\t\t\tdata : {brandId : JSON.stringify(para), sysName : 'sale.jd.com'},\n                dataType : 'jsonp',\n                success : function(data){\n                    if(data.code == 'F10000'){\n                        if(data.data){\n                            currentDom.attr(param.dataState,1);\n                            domOperate();\n                        }\n                    }else if(data.code == 'F0402'){\n                        if(!data.data){\n                            currentDom.attr(param.dataState,2);\n                            domOperate();\n                        }\n                    }else if(data.code == 'F0410'){\n                        currentDom.attr(param.dataState,3);\n                        domOperate();\n                    }else{\n                        currentDom.attr(param.dataState,4);\n                        domOperate();\n                    }\n                }\n            });\n        }\n\n        function abortAttent(){\n            $.ajax({\n                url : INTERFACE.brandFollow.batchUnfollow,\n\t\t\t\tdata : {brandId : JSON.stringify(para), sysName : 'sale.jd.com'},\n                dataType : 'jsonp',\n                success : function(data){\n                    if(data.code == 'F10000'){\n                        if(data.data){\n                            currentDom.attr(param.dataState,0);\n                            domOperate();\n                        }\n                    }\n                }\n            });\n        }\n\n        init();\n    }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "public_modules"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "changePageUrl()",
    "name": "changePageUrl",
    "group": "public_modules",
    "description": "<p>页面跳转--应用场景：装修、预览、浏览</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "param：value页面地址中的关键字；url需要跳转的地址",
        "type": "json"
      },
      {
        "title": "code",
        "content": "changePageUrl : function(args){\n        var param = jQuery.extend({\n            value : 'sale',\n            url : '//www.jd.com'\n        }, args || {});\n        if(location.href.indexOf(param.value)!=-1){\n            location.href = param.url;\n        }\n    }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "public_modules"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "changePhoto()",
    "name": "changePhoto",
    "group": "public_modules",
    "description": "<p>改变图片，点击小图看大图</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "none",
        "type": "json"
      },
      {
        "title": "code",
        "content": "changePhoto : function(args){\n        var param = $.extend({changePhotoNode:'.jPic img' , smallPhoto:'.jScrollWrap li', title:'.jDesc a', defaultClass:'jCurrent', eventType:'click'} , args || {}),\n            _this = $(this),\n            largePhoto = _this.find(param.changePhotoNode),\n            smallPhoto = _this.find(param.smallPhoto),\n            title = _this.find(param.title);\n\n        //初始化\n        largePhoto.attr('src' , smallPhoto.eq(0).attr('data-src'));\n        largePhoto.parent().attr('href' , smallPhoto.eq(0).attr('data-href'));\n        title.attr('href' , smallPhoto.eq(0).attr('data-href'));\n\n        smallPhoto.eq(0).addClass(param.defaultClass);\n\n        //触发小图\n        smallPhoto[param.eventType](function(){\n            var _target = this;\n\n            largePhoto.attr('src' , $(_target).attr('data-src'));\n            largePhoto.parent().attr('href' , $(_target).attr('data-href'));\n            title.attr('href' , $(_target).attr('data-href'));\n\n            $(_target).addClass(param.defaultClass).siblings().removeClass(param.defaultClass);\n        });\n    }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "public_modules"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "changeStyle()",
    "name": "changeStyle",
    "group": "public_modules",
    "description": "<p>给鼠标当前出发的节点增加一个样式：主要应用在鼠标移动到节点，节点伸缩与展开等。</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "如{node:'li', defaultClass:'jCurrent', defaultShow:0}。\n1、参数node为单个节点名；\n2、参数defaultClass可任意命名，只要css里面有这个名字。",
        "type": "json"
      },
      {
        "title": "code",
        "content": "changeStyle:function(args){\n        var param = $.extend({node:'li', defaultClass:'jCurrent', defaultShow:0}, args),\n            elem = $(this).find(param.node),\n            defaultClass = param.defaultClass,\n            defaultShow = param.defaultShow;\n\n        elem.eq(defaultShow).addClass(defaultClass);\n\n        elem.each(function(index,n){\n            $(n).mouseenter(function(e){\n                $(this).addClass(defaultClass).siblings().removeClass(defaultClass);\n            });\n        });\n  }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "public_modules"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "clickToFly()",
    "name": "clickToFly",
    "group": "public_modules",
    "description": "<p>点击元素飞入，目标元素显示+1</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "none",
        "type": "json"
      },
      {
        "title": "code",
        "content": "clickToFly: function(args) {\n        var param = jQuery.extend({\n            clickToFlyNode: 'a', //点击元素\n            desNode: '.fly-des em', //目标元素\n            flyNode: '.fly-elems img', //飞行元素\n            tipNode: '.fly-elems .tip' //显隐元素\n        }, args || {}),\n            $this = this;\n        jQuery(param.clickToFlyNode).click(function() {\n            var _this = jQuery(this),\n                des = jQuery(param.desNode),\n                flyElm = jQuery($this).find(param.flyNode).clone(),\n                tipElm = jQuery($this).find(param.tipNode).clone();\n            if (des.length != 0) {\n                flyElm.css({\n                    'z-index': 9000,\n                    'display': 'block',\n                    'position': 'absolute',\n                    'top': _this.offset().top + 'px',\n                    'left': _this.offset().left + 'px',\n                    'width': '13px',\n                    'height': '12px'\n                });\n                jQuery('body').append(flyElm).append(tipElm);\n                flyElm.animate({\n                    top: des.offset().top + 13,\n                    left: des.offset().left + 11,\n                    opacity: 0\n                }, 1000);\n                setTimeout(function() {\n                    tipElm.html('+1').css({\n                        'z-index': 2147483647,\n                        'display': 'block',\n                        'position': 'absolute',\n                        width: '37px',\n                        height: '37px',\n                        top: des.offset().top,\n                        left: des.offset().left,\n                        color: '#FFF116',\n                        opacity: 1,\n                        'text-align': 'center',\n                        'font-size': '18px'\n                    }).animate({\n                        top: des.offset().top - 15,\n                        opacity: 0\n                    }, 800);\n\n                    setTimeout(function() {\n                        tipElm.remove();\n                        flyElm.remove();\n                    }, 800);\n                }, 1000);\n            }\n        });\n    }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "public_modules"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "createQrCode()",
    "name": "createQrCode",
    "group": "public_modules",
    "description": "<p>创建二维码--可应用于所有模块。</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "如{node:'li', defaultClass:'jCurrent', defaultShow:0}。\n1、参数node为单个节点名；\n2、参数defaultClass可任意命名，只要css里面有这个名字。",
        "type": "json"
      },
      {
        "title": "code",
        "content": "createQrCode : function(args){\n        var param = jQuery.extend({\n            node : 'li',\n            iconQrCode : '.iconQrCode',\n            qrCodeArea : '.jQrCode',\n            dataHref : 'qrHref',\n            qrCode : '.qrPic',\n            qrcJsImport : '//static.360buyimg.com/jshop/common/widget/qrCode/qrcode.min.js',\n            current : 'current'\n        }, args || {}),\n            _this = jQuery(this),\n            node = _this.find(param.node),\n            iconQrCode = _this.find(param.iconQrCode),\n            qrcJsImport = param.qrcJsImport,\n            eventType = param.eventType,\n            close = _this.find(param.close),\n            current = param.current;\n\n        //判断页面是否引入了二维码JS文件\n        isQrcJsImport = typeof isQrcJsImport === \"undefined\"? false: isQrcJsImport;\n        if (isQrcJsImport === false) {\n            isQrcJsImport = true;\n            jQuery.getScript(qrcJsImport, function (){});\n        }\n\n        //鼠标移动到节点上显示二维码\n        iconQrCode.hover(function () {\n            var dom = jQuery(this).closest(param.node);\n            domOperate(dom);\n        },function () {\n            //var dom = jQuery(this).closest(param.node);\n            //dom.removeClass(current);\n        });\n\n        //二维码主逻辑\n        function domOperate(dom){\n            var activityId,\n                qrCodeArea = dom.find(param.qrCodeArea),\n                qrCode = qrCodeArea.find(param.qrCode),\n                urlText,\n                qrCodeText;\n            if(qrCode.html() === '') {\n                urlText = qrCodeArea.attr(param.dataHref).replace(/ /g, \"\");\n                if (param.activityId) {\n                    activityId = $(\"#\" + param.activityId).val();\n                    qrCodeText = urlText + \"&resourceType=Jshop_pc_scan&resourceValue=Jshop_\" + activityId;\n                } else {\n                    qrCodeText = urlText;\n                }\n                new QRCode(qrCode[0], {\n                    text: qrCodeText,\n                    width: qrCode.width(),\n                    height: qrCode.height()\n                });\n                qrCodeArea.removeAttr(param.dataHref);\n            }\n            dom.addClass(current);\n\n            qrCodeArea.mouseleave(function(){\n                dom.removeClass(current);\n            });\n        }\n    }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "public_modules"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "equallyWidth()",
    "name": "equallyWidth",
    "group": "public_modules",
    "description": "<p>根据父节点宽度，平均分配子节点宽度</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "如{equallyNode:'.jSortTab span'}。\n参数equallyNode为单个节点名。",
        "type": "json"
      },
      {
        "title": "code",
        "content": "equallyWidth:function(args){\n        var param = $.extend({equallyNode:'.jSortTab span', equallyParentNode:null}, args),\n            _this = $(this),\n            nodeParent = (_this.find(param.equallyParentNode).length > 0) ? _this.find(param.equallyParentNode) : _this,\n            elems = _this.find(param.equallyNode),\n            elem = elems.eq(0);\n\n        var outerWidth = parseInt(elem.data('outerWidth') || elem.outerWidth(true)),\n            width = parseInt(elem.data('width') || elem.css('width')),\n            qty = elems.length;\n\n        elem.data({'outerWidth':outerWidth, 'width':width});\n\n        var extraWidth = outerWidth - width;\n        var newWidth = (nodeParent.width()-extraWidth*qty-0.03)/qty;\n        elems.css({width:newWidth});\n    }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "public_modules"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "estimation()",
    "name": "estimation",
    "group": "public_modules",
    "description": "<p>获取商品评论相关信息--评价星级规则：五星，好评度≥95%，四星，好评度≥90%，三星，好评度≥85%，二星，好评度≥80%，一星，好评度≥75%</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "注意：skuNode节点需要位于starNode、commentNode节点层级之上\n1、item         存放skuid商品单元节点选择器\n2、j-star       星级评价节点选择器\n3、j-rate       好评率节点选择器\n4、j-count      评论数节点选择器\n5、j-comment    评论内容节点选择器\n6、skuid        存放skuid的属性名称",
        "type": "json"
      },
      {
        "title": "code",
        "content": "estimation: function(args){\n        var _param = $.extend({skuNode: 'li', starNode: '.j-star', rateNote: '.j-rate', countNode: '.j-count', commentNode: '.j-comment', skuName: 'skuid'}, args),\n            _this = $(this),\n            _jItemNodes = _this.find(_param.skuNode),\n            _skuArr = [];\n        if(_jItemNodes.length === 0)return;\n        _jItemNodes.each(function(index, dom){\n            _skuArr.push(dom.getAttribute(_param.skuName));\n        });\n        for(var i = 0; i < _skuArr.length; i+=10){\n            $.ajax({\n                url: INTERFACE.actJshop.recommend,\n                type: \"GET\",\n                dataType: \"jsonp\",\n                data: {\"type\": 0, \"skuIds\": _skuArr.slice(i, i+10).join(\",\")},\n                success: function(arr){\n                    if(arr && arr.length > 0){\n                        for(var i = 0; i < arr.length; i++){\n                            var _jItem = _this.find(_param.skuNode + \"[\" + _param.skuName + \"='\" + arr[i].skuId + \"']\"),\n                                _class = \"\";\n                            _jItem.find(_param.rateNote).text(arr[i].rate10000 / 100);\n                            _jItem.find(_param.countNode).text(arr[i].count);\n                            _jItem.find(_param.commentNode).text(arr[i].comment).attr(\"title\", arr[i].comment);\n                            if(arr[i].rate >= 0.95){\n                                _class = \"star5\";\n                            }else if(arr[i].rate >= 0.9 && arr[i].rate < 0.95){\n                                _class = \"star4\";\n                            }else if(arr[i].rate >= 0.85 && arr[i].rate < 0.9){\n                                _class = \"star3\";\n                            }else if(arr[i].rate >= 0.8 && arr[i].rate < 0.85){\n                                _class = \"star2\";\n                            }else if(arr[i].rate >= 0.75 && arr[i].rate < 0.8){\n                                _class = \"star1\";\n                            }else{\n                                _class = \"star0\";\n                            }\n                            _jItem.find(_param.starNode).addClass(_class);\n                        }\n                    }\n                }\n            });\n        }\n\n    }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "public_modules"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "fullHeight()",
    "name": "fullHeight",
    "group": "public_modules",
    "description": "<p>撑满高度--用在相对定位里面有绝对定位时，背景透明图层以父节点为基准将高度撑满</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "none",
        "type": "json"
      },
      {
        "title": "code",
        "content": "fullHeight:function(args){\n        var param = $.extend({fullHeightNode:'li', fullNode:'.jShade'}, args),\n            elem = $(this).find(param.fullHeightNode),\n            fullNode;\n\n        elem.bind({\n            mouseenter:function(){\n                fullNode =$(this).find(param.fullNode);\n                fullNode.css({height:$(this).height()});\n\n            }\n        });\n    }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "public_modules"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "getGoodsAttentCount()",
    "name": "getGoodsAttentCount",
    "group": "public_modules",
    "description": "<p>获取商品关注数</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "none",
        "type": "json"
      },
      {
        "title": "code",
        "content": "getGoodsAttentCount: function(args){\n        var j = $,\n            _param = j.extend({skuNode: 'li', countNode: '.JAttentCount', skuName: 'skuid'}, args),\n            _this = j(this),\n            _jItemNodes = _this.find(_param.skuNode),\n            _skuArr = [];\n        if(_jItemNodes.length === 0)return;\n        _jItemNodes.each(function(index, dom){\n            _skuArr.push(dom.getAttribute(_param.skuName));\n        });\n        for(var i = 0; i < _skuArr.length; i+=10){\n            j.ajax({\n                url: INTERFACE.actJshop.attentionCount,\n                type: \"GET\",\n                dataType: \"jsonp\",\n                data: {\"type\": 0, \"attentionIds\": _skuArr.slice(i, i+10).join(\",\")},\n                success: function(arr){\n                    if(arr && arr.length > 0){\n                        for(var i = 0; i < arr.length; i++){\n                            var _jItem = _this.find(_param.skuNode + \"[\" + _param.skuName + \"='\" + arr[i].productId + \"']\");\n                            _jItem.find(_param.countNode).text(arr[i].count);\n                        }\n                    }\n                }\n            });\n        }\n    }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "public_modules"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "getProTag()",
    "name": "getProTag",
    "group": "public_modules",
    "description": "<p>获取促销标签--根据获取的促销标签编号显示促销标签，应用场景：带有SKUID商品的模块</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "1、node方法应用节点；\n2、tagNode标签节点；\n3、tagValue标签键值；\n4、dataNum每次最多能获取的商品数量；\n5、url接口；\n6、urlNum可用接口长度",
        "type": "json"
      },
      {
        "title": "code",
        "content": "getProTag : function(arg){\n        var param = $.extend({\n                node : 'li',\n                tagNode : '.jSlogan',\n                tagValue : {1:'直降', 3:'返券', 4:'赠京豆', 5:'赠品', 11:'会员特价', 22:'京豆优惠购'} ,//标签键值\n                dataNum : 40,//每次最多能获取的商品数量\n                url : INTERFACE.promoTag + '?callback=getPromotionTag&skuids=J_981821,J_1057746',//接口\n                urlNum : 26//可用接口长度\n            },arg),\n            that = $(this),\n            dom_node = that.find(param.node);\n\n        if(!dom_node.length)return;\n\n        function getTag(){\n            var a_skuid = [];\n            dom_node.each(function(index,n){\n                a_skuid.push('J_' + $(n).attr('skuid'));\n            });\n\n            var len = Math.ceil(a_skuid.length/param.dataNum);\n\n            for(var i=0; i<len; i++){\n                var a_single_skuid =  a_skuid.slice(i*param.dataNum , Math.min(a_skuid.length , (i+1)*param.dataNum));\n\n                $.ajax({\n                    url : param.url.substr(0,param.urlNum),\n                    data : {\n                        skuids : a_single_skuid.join(',')\n                    },\n                    dataType : 'jsonp',\n                    success : function(data){\n                        $.each(data,function(index,n){\n                            var dom = '';\n                            for(var i = 0; i<n.pf.length; i++){\n                                if(param.tagValue[n.pf[i]]){\n                                    dom += '<span>' + param.tagValue[n.pf[i]] + '</span>';\n                                }\n                            }\n                            that.find(param.node + '[skuid=' + n.pid + ']').find(param.tagNode).html(dom);\n                        });\n                    }\n                });\n            }\n        }\n        getTag();\n    }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "public_modules"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "getWechatPrice()",
    "name": "getWechatPrice",
    "group": "public_modules",
    "description": "<p>获取微信专享价</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "none",
        "type": "json"
      },
      {
        "title": "code",
        "content": "getWechatPrice: function(args){\n        var j = $,\n            _param = j.extend({skuNode: 'li', wechatPriceNode: '.jQrCode .wechatNum', skuName: 'skuid'}, args),\n            _this = j(this),\n            _jItemNodes = _this.find(_param.skuNode),\n            url = '//pe.3.cn/prices/pcpmgets',\n            _skuArr = [];\n        if(_jItemNodes.length === 0)return;\n        _jItemNodes.each(function(index, dom){\n            _skuArr.push(dom.getAttribute(_param.skuName));\n        });\n        for(var i = 0; i < _skuArr.length; i+=10){\n            j.ajax({\n                url: url,\n                type: \"GET\",\n                dataType: \"jsonp\",\n                data: {\n                    'skuids': _skuArr.slice(i, i+10).join(','),\n                    'origin': 5,\n                    'source': 'jshop'\n                },\n                success: function(arr){\n                    if(arr && arr.length > 0){\n                        for(var i = 0; i < arr.length; i++){\n                            var _jItem = _this.find(_param.wechatPriceNode + \"[\" + _param.skuName + \"='\" + arr[i].id + \"']\"),\n                                price = '';\n                            if (arr[i].p && arr[i].p > 0) {\n                                _jItem.text(arr[i].p);\n                            } else {\n                                _jItem.text('暂无价格');\n                            }\n                        }\n                    }\n                }\n            });\n        }\n    }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "public_modules"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "goodsFollow()",
    "name": "goodsFollow",
    "group": "public_modules",
    "description": "<p>none</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "none",
        "type": "json"
      },
      {
        "title": "code",
        "content": "goodsFollow : function(arg){\n        var that = this,\n            options = $.extend({\n                node : '.J-follow',\n                showNum : '.J-follow-num'\n            },arg);\n        $(that).find(options.node).JFollow(options);\n    }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "public_modules"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "goodsShare()",
    "name": "goodsShare",
    "group": "public_modules",
    "description": "<p>none</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "none",
        "type": "json"
      },
      {
        "title": "code",
        "content": "goodsShare : function(arg){\n        var that = this,\n            options = $.extend({\n                node : '.J-share',\n                eventType : 'mouseover',\n                offset :{\n                    top : 0,\n                    left : 0\n                }\n            },arg);\n        $(that).find(options.node).JShare({\n            eventType : options.eventType,\n            offset : options.offset\n        });\n    }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "public_modules"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "hideNode()",
    "name": "hideNode",
    "group": "public_modules",
    "description": "<p>隐藏节点--鼠标移动到某个节点时，隐藏传入的其他参数节点</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "none",
        "type": "json"
      },
      {
        "title": "code",
        "content": "hideNode : function(args){\n        var param = $.extend({currentNode:'.jLeftPic' , changeNode:'.jMiddlePic', defaultClass:'jCurrent', enterTime:200, leaveTime:100} , args || {}),\n            _this = $(this),\n            currentNode = _this.find(param.currentNode),\n            changeNode = _this.find(param.changeNode);\n\n        if(param.enterTime < 0 || param.leaveTime < 0 ){\n           return;\n        }\n\n        currentNode.mouseenter(function(){\n            changeNode.animate({\n                opacity:0\n            },param.enterTime,function(){\n                changeNode.addClass(param.defaultClass);\n            });\n        });\n        currentNode.mouseleave(function(){\n            changeNode.removeClass(param.defaultClass);\n            changeNode.animate({\n                opacity:1\n            },param.leaveTime,function(){\n\n            });\n        });\n    }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "public_modules"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "hoverAnimate()",
    "name": "hoverAnimate",
    "group": "public_modules",
    "description": "<p>移入动画--对节点的移入及移出执行不同的CSS属性动画，应用场景：所有。</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "1、hoverNode执行css动画的节点；\n2、cssValueOne和cssValueTwo数组对象--css value: backgroundPosition, borderWidth, borderBottomWidth, borderLeftWidth, borderRightWidth, borderTopWidth, borderSpacing, margin, marginBottom, marginLeft, marginRight, marginTop, outlineWidth, padding, paddingBottom, paddingLeft, paddingRight, paddingTop, height, width, maxHeight, maxWidth, minHeight, maxWidth, font, fontSize, bottom, left, right, top, letterSpacing, wordSpacing, lineHeight, textIndent, opacity\n3、timerOne和timerTwo为时间值",
        "type": "json"
      },
      {
        "title": "code",
        "content": "hoverAnimate : function(args){\n        var param = $.extend({\n                node : 'li .jItem',\n                cssValueOne : [\n                    {width: 235, height: 365, marginTop: -10, opacity:1},\n                    {width: 235, height: 355, marginTop: -5, opacity:0.9},\n                    {width: 235, height: 365, marginTop: -10, opacity:1}\n                ],\n                cssValueTwo : [\n                    {width: 235, height: 345, marginTop: 0, opacity:1}\n                ],\n                timerOne : 100,\n                timerTwo : 100\n            } , args||{}),\n            _this = $(this),\n            dom_node = _this.find(param.node),\n            a_css_value_enter = param.cssValueOne,\n            a_css_value_leave = param.cssValueTwo;\n\n        dom_node.bind({\n            mouseenter: function(){\n                var count = a_css_value_enter.length,\n                    index = 0,\n                    target = $(this);\n\n                function animate(){\n                    var caller = arguments.callee;\n                    target.animate(a_css_value_enter[index] , param.timerOne, function(){\n                        index++;\n                        if(index == count)return;\n                        caller();\n                    });\n                }\n                animate();\n            },\n            mouseleave: function(){\n                var count = a_css_value_leave.length,\n                    index = 0,\n                    target = $(this);\n\n                target.stop(true);\n\n                function animate(){\n                    var caller = arguments.callee;\n                    target.animate(a_css_value_leave[index], param.timerTwo, function(){\n                        index++;\n                        if(index == count)return;\n                        caller();\n                    });\n                }\n                animate();\n            }\n        });\n    }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "public_modules"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "marqueeLeft()",
    "name": "marqueeLeft",
    "group": "public_modules",
    "description": "<p>向左移动--可应用于图片类模块。</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "none",
        "type": "json"
      },
      {
        "title": "code",
        "content": "marqueeLeft : function(args){\n        var param = $.extend({\n                node : '.scroll-area',\n                tr : 'tr',\n                td : 'td',\n                speed : 20\n            },args || {}),\n            that = $(this),\n            par = that.find(param.node)[0],\n            tr = $(par).find(\"tr\")[0],\n            chi =$(par).find(\"td\")[0];\n\n        if(chi.offsetWidth>=par.offsetWidth){\n            copyChild();\n            var mar = setInterval(marquee, param.speed);\n            par.onmouseover = function(){clearInterval(mar)};\n            par.onmouseout = function(){mar = setInterval(marquee,param.speed)};\n        }\n        function copyChild(){\n            var copy=document.createElement(\"td\");\n            copy.innerHTML=chi.innerHTML;\n            tr.appendChild(copy);\n        }\n\n        function marquee(){\n            if(chi.offsetWidth-par.scrollLeft<=0){\n                par.scrollLeft-=chi.offsetWidth;\n            }else{\n                par.scrollLeft++;\n            }\n        }\n    }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "public_modules"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "middle()",
    "name": "middle",
    "group": "public_modules",
    "description": "<p>none</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "none",
        "type": "json"
      },
      {
        "title": "code",
        "content": "middle : function(obj){\n        var bIsIE6 = $.browser.msie&&$.browser.version == \"6.0\",\n            sPos = bIsIE6? 'absolute' : 'fixed',\n            w = $(window).width(),\n            h = $(window).height();\n        $(obj).css({\n            left : parseInt((w - $(obj).outerWidth())/2) + 'px',\n            top : parseInt((h - $(obj).outerHeight())/2) + (this.bIsIE6?$(window).scrollTop():0) + 'px',\n            position : sPos\n        });\n       return obj;\n    }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "public_modules"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "moveNode()",
    "name": "moveNode",
    "group": "public_modules",
    "description": "<p>移动节点--点击左右箭头移动节点，可移动单个节点，也可移动一屏节点，可左右移动，也可左右循环移动</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "注意：如果是移动一屏，则需要的节点总数量必须为每一屏可显示的整数倍；如果是循环切换，disabled参数可不用。 \n1、moveNode需要移动的节点；\n2、arrowPrev左箭头；\n3、arrowNext右箭头；\n4、disabled箭头不可用样式；\n5、showNum一屏显示数量，可传入正确的一屏数量，没传则程序计算；\n6、cssValue改变的css属性名；\n7、isLoop是否循环，默认为真；\n8、isScreen是否是移动一屏，默认为真；\n9、timer每一次移动的时间，默认为1，值取0-4之间。",
        "type": "json"
      },
      {
        "title": "code",
        "content": "moveNode : function(args){\n        var param = $.extend({moveNode:'.scroll-area li' , arrowPrev:'.arrow-left', arrowNext:'.arrow-right', disabled:'disabled', showNum:'', cssValue:'margin-left', isLoop:true, isScreen:true, timer:1} , args || {}),\n            _this = $(this),\n            node = _this.find(param.moveNode),\n            prev = _this.find(param.arrowPrev),\n            next = _this.find(param.arrowNext),\n            //当前父级宽度可以放下的节点个数\n            showNum = (param.showNum> 0)? parseInt(param.showNum) : Math.ceil(node.parent().parent().width()/node.outerWidth(true)),\n            index = 0,\n            length = param.isScreen ? Math.ceil(node.length/showNum) : node.length,\n            eventFlag = true,\n            moveWidth = param.isScreen ? showNum*node.eq(0).outerWidth(true) : node.eq(0).outerWidth(true),\n            visibleNum = param.isScreen ? 1 : showNum,\n            timer = !(param.timer > -1 && param.timer < 5) ? 1000 : param.timer*1000;\n\n        //初始化结构\n        if(length > visibleNum){\n            prev.show().addClass(param.disabled);\n            next.show();\n            node.parent().css('width',moveWidth*length*10);//初始化移动节点父级元素宽度，解决父级元素被css定义宽度导致放不下的问题\n\n            if(param.isLoop){initLoop();}//如果是循环，则初始化循环所需结构\n        }\n\n        //循环初始化\n        function initLoop(){\n            //复制前面3个节点及后面3个节点\n            for(var i=0; i<showNum; i++){\n                node.eq(i).clone().appendTo(node.parent());\n                node.eq(node.length-1-i).clone().prependTo(node.parent());\n            }\n            //初始化第一个节点显示位置\n            node.parent().css(param.cssValue,-moveWidth*visibleNum + parseInt(node.parent().css(param.cssValue)));\n        }\n\n        //移动的css属性可传margin-left或left\n        var cssJson = {};\n        node.parent().data('cssInitValue', parseInt(node.parent().css(param.cssValue)));\n\n        //向右移动\n        next.click(function(){\n            //如果不是循环\n            if(!param.isLoop){\n                if(index == 0) eventFlag = true;\n            }\n\n            if(eventFlag){\n                eventFlag = false;\n                index++;\n                cssJson[param.cssValue] = -moveWidth*index + node.parent().data('cssInitValue');\n\n                node.parent().animate(cssJson, timer, function(){\n                    eventFlag = true;\n                    //如果不是循环\n                    if(!param.isLoop){\n                        if(index > 0){\n                            prev.removeClass(param.disabled);\n                        }\n                        if(index+visibleNum == length){\n                            next.addClass(param.disabled);\n                            eventFlag = false;\n                        }\n                    }else{\n                        if(index == length){\n                            index = 0;\n                            node.parent().css(param.cssValue,node.parent().data('cssInitValue'));\n                        }\n                    }\n                });\n            }\n        });\n\n        //向左移动\n        prev.click(function(){\n            //如果不是循环\n            if(!param.isLoop){\n                eventFlag = (index > 0) ? true :false;\n            }\n\n            if(eventFlag){\n                eventFlag = false;\n                index--;\n                cssJson[param.cssValue] = -moveWidth*index + node.parent().data('cssInitValue');\n\n                node.parent().animate(cssJson, timer, function(){\n                    eventFlag = true;\n                    //如果不是循环\n                    if(!param.isLoop){\n                        if(index < length - 1){\n                            next.removeClass(param.disabled);\n                        }\n                        if(index == 0){\n                            prev.addClass(param.disabled);\n                            eventFlag = false;\n                        }\n                    }else{\n                        if(index < 0){\n                            index = length-1;\n                            node.parent().css(param.cssValue,node.parent().data('cssInitValue')+(-moveWidth*index));\n                        }\n                    }\n                });\n            }\n        });\n    }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "public_modules"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "movePhoto()",
    "name": "movePhoto",
    "group": "public_modules",
    "description": "<p>移动图片，点击左右箭头移动图片</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "none",
        "type": "json"
      },
      {
        "title": "code",
        "content": "movePhoto : function(args){\n        var param = $.extend({movePhotoNode:'.jScrollWrap li' , arrowPrev:'.jScrollPrev', arrowNext:'.jScrollNext', defaultClass:'disabled'} , args || {}),\n            _this = $(this),\n            node = _this.find(param.movePhotoNode),\n            prev = _this.find(param.arrowPrev),\n            next = _this.find(param.arrowNext),\n            visibleNode = parseInt(node.parent().parent().width()/node.width()),\n            index = 0,\n            length = node.length;\n\n        //初始化结构\n        if(length > visibleNode){\n            prev.addClass(param.defaultClass).show();\n            next.show();\n            node.parent().css('width',node.width()*length);\n        }\n\n        //向右移动\n        next.click(function(){\n            var _this = this;\n\n            if(length - visibleNode){\n                prev.removeClass(param.defaultClass);\n            }\n\n            if(index < length - visibleNode){\n                index++;\n                node.parent().animate({\n                    left:-node.eq(0).outerWidth(true)*index\n                },function(){\n                    if(index + visibleNode == length){\n                        $(_this).addClass(param.defaultClass);\n                    }\n                });\n            }\n        });\n\n        //向左移动\n        prev.click(function(){\n            var _this = this;\n            if(index  + visibleNode <= length){\n                next.removeClass(param.defaultClass);\n            }\n\n            if(index > 0){\n                index--;\n                node.parent().animate({\n                    left:-node.eq(0).outerWidth(true)*index\n                },function(){\n                    if(!index){\n                        $(_this).addClass(param.defaultClass);\n                    }\n                });\n            }\n        });\n    }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "public_modules"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "notity()",
    "name": "notity",
    "group": "public_modules",
    "description": "<p>none</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "none",
        "type": "json"
      },
      {
        "title": "code",
        "content": "notity : function(arg){\n        var _para = $.extend({\n            notityNode : '.jshop_jiangjia'\n        }, arg || {}),\n            _this = this;\n\n        NotifyPop.init = function(c,e){\n            var b = this,\n            f = this.serializeUrl(location.href),\n            d = /from=weibo/.test(location.href) ? location.search.replace(/\\?/, \"\") : \"\",\n            a;\n            if (/from=weibo/.test(location.href)) {\n                a = f.param.type;\n                this.setThickBox(a, d);\n            }\n            c.bind(\"click\",\n                    function() {\n                        var j = this,\n                        h = $(this).attr(\"id\"),\n                        g = $(this).attr(\"data-type\") || 2;\n                        b.sku = $(this).attr(\"data-sku\");\n                        b.checkLogin(function(k) {\n                        if (!k.IsAuthenticated) {\n                            thick_login(function(l){\n                                b._userPin = l.Identity.Name;\n                                b.setThickBox(g, d);\n                            });\n                        } else {\n                            b._userPin = k.Name;\n                            b.setThickBox(g, d);\n                        }\n             });\n           return false;\n            }).attr(\"href\", \"#none\").removeAttr(\"target\");\n        };\n\n        $(_this).find(_para.notityNode).each(function(index,n){\n            NotifyPop.init($(n));\n        });\n    }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "public_modules"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "operateNode()",
    "name": "operateNode",
    "group": "public_modules",
    "description": "<p>操作节点：通过不同的条件，调用不同的方法，查找对象里面的某一个或一些节点，并对这些节点做操作，默认为增加一个样式--可应用于任意模块，只要有使用场景。</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "如{operateNode:'li', operateParentNode:null, defaultClass:'jCurrent', length:0, subFunction:null, number:[], callBack:null}\n1、operateNode为需要查找的节点；\n2、operateParentNode为查找节点的父级节点；\n3、defaultClass为默认样式名；\n4、length为每一行的节点个数；\n5、subFunction为此方法里面的子方法；\n6、number为数组对象，当使用getNode方法时，表示数组里面指定的节点，当使用getColumn方法时，表示指定的列节点。当使用getRow方法时，表示指定的行节点；\n7、callBack为函数体，参数接收一个节点对象，可在函数体里对接收的这个对象做操作。",
        "type": "json"
      },
      {
        "title": "code",
        "content": "operateNode: function(args){\n        var param = $.extend({operateNode:'li', operateParentNode:null, defaultClass:'jCurrent', length:0, subFunction:null, number:[], callBack:null},args||{}),\n        _this = $(this),\n        node = _this.find(param.operateNode),\n        nodeParent = (_this.find(param.operateParentNode).length > 0) ? _this.find(param.operateParentNode) : _this.parent().parent().parent(),\n        defaultClass = param.defaultClass,\n        number = param.number,\n        length = (param.length != 0) ? param.length : parseInt(nodeParent.outerWidth(true)/node.outerWidth(true)),\n        callBack = typeof(param.callBack) === 'function' ? param.callBack : function(a){a.addClass(defaultClass);};\n\n        if(node.length === 0)return;\n\n        //ie9下获取nodeParent.outerWidth(true)有差异。为避免此问题，1、可传入明确知道宽度的节点；2、程序会取this的父级的父级的父级定义了宽度的层。\n        //此段尚未使用，当元素隐藏后获取不到元素的偏移值\n        var rowLen = 0;\n        var nowTop = $(node[0]).offset().top;\n        node.each(function(index, dom){\n            if(index > 0){\n                rowLen++;\n                var _top = $(dom).offset().top;\n                if(nowTop !== _top){\n                   return false;\n                }else{\n                    nowTop = _top;\n                }\n            }\n        });\n\n        var operate = {\n            //获取任意节点\n            getNode : function(){\n               return node.map(function(i,e){\n                    for(var j = 0; j < number.length; j++){\n                        if(i + 1 === number[j]){\n                           return e;\n                        }\n                    }\n                });\n            },\n            //获取所有奇数列节点\n            getAllOdd : function (){\n               return node.map(function(i, e){\n                    if(i % 2 === 0){\n                       return e;\n                    }\n                });\n            },\n            //获取所有偶数列节点\n            getAllEven : function(){\n               return node.map(function(i,e){\n                    if(i % 2 === 1){\n                       return e;\n                    }\n                });\n            },\n            //获取任意多列节点\n            getColumn : function(){\n               return node.map(function(i,e){\n                    for(var j = 0; j < number.length; j++){\n                        if(i % length === number[j] - 1){\n                           return e;\n                        }\n                    }\n                });\n            },\n            //获取任意多行节点\n            getRow : function(){\n               return node.map(function(i,e){\n                    for(var j = 0; j < number.length; j++){\n                        if(i >= length(number[j] - 1) && i < lengthnumber[j]){\n                           return e;\n                        }\n                    }\n                });\n            },\n            //获取每一行的奇数节点\n            getRowOdd : function(){\n               return node.map(function(i,e){\n                    if(i % length % 2 === 0){\n                       return e;\n                    }\n                });\n            },\n            //获取每一行的偶数节点\n            getRowEven : function(){\n               return node.map(function(i,e){\n                    if(i % length % 2 === 1){\n                       return e;\n                    }\n                });\n            },\n            //获取第一个节点\n            getFirst : function(){\n               return node.eq(0);\n            },\n            //获取最后一个节点\n            getLast : function(){\n               return node.eq(node.length - 1);\n            },\n            //获取每一行的第一个节点\n            getRowFirst : function(){\n               return node.map(function(i,e){\n                    if(i % length === 0){\n                       return e;\n                    }\n                });\n            },\n            //获取每一行的最后一个节点\n            getRowLast : function(){\n               return node.map(function(i,e){\n                    if(i % length === length - 1){\n                       return e;\n                    }\n                });\n            },\n            //获取每一行的第一个节点和最后一个节点\n            getRowFirstAndLast : function(){\n               return node.map(function(i,e){\n                    if(i % length === 0 || i % length === length - 1){\n                       return e;\n                    }\n                });\n            }\n        };\n\n        if(operate[param.subFunction]){\n            callBack(operate[param.subFunction]());\n        }\n    }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "public_modules"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "positionLayout()",
    "name": "positionLayout",
    "group": "public_modules",
    "description": "<p>none</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "none",
        "type": "json"
      },
      {
        "title": "code",
        "content": "positionLayout:function(args){\n        // 定义传入的CSS调用变量\n        var _this=this,\n            param=$.extend({node:'.btn-coll', nodeParent:'.d-layout'}, args),\n            node = $(_this).find(param.node),\n            nodeParent = $(_this).parents(param.nodeParent);\n        nodeParent.css({position:\"relative\"});\n        node.appendTo(nodeParent).siblings(param.node).remove();\n    }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "public_modules"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "removeBg()",
    "name": "removeBg",
    "group": "public_modules",
    "description": "<p>给每行最后一个节点增加样式：主要应用在每一行有多个节点，并且想给最后一个节点如改变背景、边框等</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "如{node:'li', defaultClass:'noBg'}。\n1、参数node为单个节点名；\n2、参数defaultClass可任意命名，只要css里面有这个名字。",
        "type": "json"
      },
      {
        "title": "code",
        "content": "removeBg:function(args){\n       var param=$.extend({defaultClass:\"noBg\"}, args),\n          elem = $(this).find(param.node),\n          qty = parseInt(elem.parent().width()/elem.outerWidth(true)),\n          defaultClass=param.defaultClass;\n \n       elem.each(function(index, e){\n          if(index && !(((index+1)/qty).toString().indexOf(\".\")>=0) ){\n              $(e).addClass(defaultClass);\n          }else if((index+1)/qty==1){\n              $(e).addClass(\"noBgOne\");\n          }\n       });\n }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "public_modules"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "renderHTML()",
    "name": "renderHTML",
    "group": "public_modules",
    "description": "<p>简单模板渲染--根据html模板及数据拼接html片段，应用场景任意。</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "none",
        "type": "json"
      },
      {
        "title": "code",
        "content": "renderHTML : function(tpl, data) {\n        var subTpl = tpl,\n            reg = /{([\\w-_]+)}/,\n            mArr;\n        while (mArr = subTpl.match(reg)) {\n            subTpl = subTpl.replace(reg, data[mArr[1]]);\n        }\n       return subTpl;\n    }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "public_modules"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "rid()",
    "name": "rid",
    "group": "public_modules",
    "description": "<p>none</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "none",
        "type": "json"
      },
      {
        "title": "code",
        "content": "rid : function(){\n        jshop.module.ridLazy(this);\n  }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "public_modules"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "ridLazy()",
    "name": "ridLazy",
    "group": "public_modules",
    "description": "<p>none</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "none",
        "type": "json"
      },
      {
        "title": "code",
        "content": "ridLazy : function(obj) {\n        $(obj).find('img.J_imgLazyload').each(function(){\n            $(this).attr('src',$(this).attr('original'));\n            $(this).removeAttr('original');\n            $(this).removeClass('J_imgLazyload');\n        });\n        setTimeout(function(){\n            skuIdPriceObj.localPriceRefresh(obj);\n        },0);\n    }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "public_modules"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "saleAttent()",
    "name": "saleAttent",
    "group": "public_modules",
    "description": "<p>关注--活动关注、店铺关注、商品关注，依赖module/utils.js</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "none",
        "type": "json"
      },
      {
        "title": "code",
        "content": "saleAttent : function(args){\n        jQuery(this).saleAttent(args);\n    }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "public_modules"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "seamlessScroll()",
    "name": "seamlessScroll",
    "group": "public_modules",
    "description": "<p>none</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "none",
        "type": "json"
      },
      {
        "title": "code",
        "content": "seamlessScroll: function(args) {\n        var args = jQuery.extend({\n            box: jQuery('.marquee'),\n            step: 5,\n            el: 'ul',\n            itemClass: '.item',\n            inteval: 30\n        }, args || {});\n        var scr = new SeamlessScroll(args);\n        scr.init();\n    }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "public_modules"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "showAppPriceCoupon()",
    "name": "showAppPriceCoupon",
    "group": "public_modules",
    "description": "<p>显示App专享价及相对于京东价的优惠金额</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "jdPriceNode    京东价格节点选择器\nappPriceNode    app价格节点选择器\ncouponPriceNode 优惠额度节点选择器\ncouponType      优惠额度计算类型，1：算优惠了多少金额（京东价 - App专享价），2：算相当于打了几折（App专享价 / 京东价10）\nskuAttName      价格节点上的sku标示\nitemNode        单个sku最外层的节点\nnoAppPriceClass 没有app专享价时给itemNode添加的样式",
        "type": "json"
      },
      {
        "title": "code",
        "content": "showAppPriceCoupon: function(param){\n\n        var jTarget = $(this),\n            arrSku = [],   //请求专享价时的arr\n            jprice_arr=[], //请求京东价时的arr\n            url = INTERFACE.price.jdMobile;\n        param = $.extend({\n            jdPriceNode: \".j-jd-price\",\n            appPriceNode: \".j-app-price\",\n            couponPriceNode: \".j-coupon-price\",\n            couponType: 1,\n            skuAttName: \"sku\",\n            itemNode: \"li\",\n            noAppPriceHandle: \"\"\n        }, param);\n\n        //返回优惠额度或者折扣\n        function getYh(jdPrice, appPrice){\n            var val = 0,\n                jdPrice = parseFloat(jdPrice),\n                appPrice = parseFloat(appPrice);\n            if(param.couponType === 1){\n                val = parseInt(100jdPrice - 100appPrice, 10) / 100;\n            }else if(param.couponType === 2){\n                val = parseInt(appPrice100 / jdPrice, 10) / 10;\n            }\n           return val;\n        }\n\n        /**\n        使用jsonp方式请求价格\n        param arr\n        param type\n        private;\n        \n        function jsonpPrice(arr) {\n            for(var i = 0; i < arr.length; i+=20){\n                //请求app专享价\n                $.ajax({\n                    url: url+\"?skuids=\"+arr.slice(i, i+20).join(\",\")+\"&origin=2\",\n                    type: \"get\",\n                    dataType: \"jsonp\",\n                    success: function(data) {\n                        if (data && data.constructor === Array) {\n                            for (var i = 0; i < data.length; i++) {\n                                var price = data[i],\n                                    id = price.id,\n                                    appPrice = +price.p <=0 ? \"暂无价格\" : price.p,\n                                    skuName = \"[\" + param.skuAttName + \"='\" + id + \"']\",\n                                    jJdPriceNode = jTarget.find(param.jdPriceNode + skuName),\n                                    jAppPriceNode = jTarget.find(param.appPriceNode + skuName).text(appPrice);\n                                //京东价已经请求响应完成\n                                if(jJdPriceNode.text() !== \"\"){\n                                    var yh = getYh(jJdPriceNode.text(), appPrice),\n                                        jItem = jAppPriceNode.closest(param.itemNode),\n                                        jCouponPriceNode = jTarget.find(param.couponPriceNode + skuName);\n                                    //如果没有专享价\n                                    if(isNaN(yh) || yh <= 0 || (param.couponType === 2 && yh === 10)){\n                                        jItem.addClass(param.noAppPriceClass);\n                                    }else{\n                                        jCouponPriceNode.text(yh);\n                                    }\n                                }\n                            }\n                        }\n                    }\n                });\n\n                //请求jd价\n                $.ajax({\n                    url: INTERFACE.price.jd + \"?skuids=\"+jprice_arr.slice(i, i+20).join(\",\"),\n                    type: \"get\",\n                    dataType: \"jsonp\",\n                    success: function(data) {\n                        if (data && data.constructor === Array) {\n                            for (var i = 0; i < data.length; i++) {\n                                var price = data[i],\n                                    id = price.id.substring(2, price.id.length),\n                                    jdPrice = price.p === \"-1\" ? \"暂无价格\" : price.p,\n                                    skuName = \"[\" + param.skuAttName + \"='\" + id + \"']\",\n                                    jAppPriceNode = jTarget.find(param.appPriceNode + skuName);\n                                jTarget.find(param.jdPriceNode + skuName).text(jdPrice);\n                                //专享价已经请求响应完成\n                                if(jAppPriceNode.text() !== \"\"){\n                                    var yh = getYh(jdPrice, jAppPriceNode.text()),\n                                        jItem = jAppPriceNode.closest(param.itemNode),\n                                        jCouponPriceNode = jTarget.find(param.couponPriceNode + skuName);\n                                    //如果没有专享价\n                                    if(isNaN(yh) || yh <= 0 || (param.couponType === 2 && yh === 10)){\n                                        jItem.addClass(param.noAppPriceClass);\n                                    }else{\n                                        jCouponPriceNode.text(yh);\n                                    }\n                                }\n                            }\n                        }\n                    }\n                });\n            }\n        }\n\n        $(this).find(param.appPriceNode).each(function(){\n            arrSku.push($(this).attr(\"sku\"));\n            jprice_arr.push(\"J_\"+$(this).attr(\"sku\"));\n        });\n\n        arrSku.length && jsonpPrice(arrSku, 1);\n\n    }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "public_modules"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "showNode()",
    "name": "showNode",
    "group": "public_modules",
    "description": "<p>显示节点：触发一个元素，根据设定的数量按先后顺序显示元素--可应用于任意模块，只要有使用场景。</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "如{par : '.jSaleAttention20150423-1', node : 'li', btn : '.jBtn', pageNum : 10, className : 'current'}\n1、par为被显示元素的父级元素；\n2、node被显示元素；btn触发元素；\n3、pageNum每一次显示数量；\n4、className被显示元素增加的class名",
        "type": "json"
      },
      {
        "title": "code",
        "content": "showNode : function(args){\n    var _this = this,\n        param = jQuery.extend({\n        par : '.jSaleAttention20150423-1',\n        node : 'li',\n        btn : '.jBtn',\n        pageNum : 10,\n        className : 'current'\n     }, args || {}),\n        par = jQuery(param.par),\n        node = jQuery(_this).find(param.node),\n        btn = jQuery(_this).find(param.btn),\n        index = 0,\n        pageTotal = Math.ceil(node.length/param.pageNum);\n\n    function showData(){\n        node.removeClass(param.className);\n        for(var i = index*param.pageNum; i <= index*param.pageNum +param.pageNum - 1; i+=1){\n            node.eq(i).addClass(param.className);\n        }\n    }\n    showData();\n\n    btn.click(function(){\n        if((index+1) == pageTotal) {\n            index = 0;\n        }else{\n            index +=1;\n        }\n        showData();\n    });\n    },\n    countdown : (function(){\n        var timer = null,\n            countList = [],\n            sysTime = 0;\n       return function(arg){\n            var that = this,\n                args = $.extend({\n                    hasDay : true,\n                    dayCnt : '.days',\n                    hourCnt : 'hours',\n                    minuteCnt : '.minutes',\n                    secondCnt : '.seconds'\n                },arg || {}),\n                cutTime = [];\n\n            function init(){\n                if(!args.countdownInfo)return;\n\n                getCutTime();\n                $(that).data('cutTime',cutTime).data('arg',args);\n                setTimeout(function(){\n                    countList = $('[public modules*=\"countdown\"]').toArray();\n                },0);\n                if(!timer){\n                    getServerTime(function(data){\n                        sysTime = new Date() - data;\n                        count();\n                    });\n                }\n            }\n\n            function timeStrHandler(str){\n                var rowTemp = str.split(' '),\n                    inplicit = rowTemp[0].split('-'),\n                    explicit = rowTemp[1].split(':');\n               return new Date(Number(inplicit[0]),(Number(inplicit[1]) + 11)%12,Number(inplicit[2]),Number(explicit[0]),Number(explicit[1]),Number(explicit[2]));\n            }\n\n            function getCutTime(){\n                var temp = args.countdownInfo;\n                if(temp.constructor == String){\n                    cutTime.push(timeStrHandler(temp));\n                }\n                else{\n                    $.each(temp,function(index,data){\n                        cutTime.push(timeStrHandler(data));\n                    });\n                }\n            }\n\n            function count(){\n                timer = setInterval(function(){\n                    for(var i = 0, len = countList.length; i < len; i++){\n                        var item = $(countList[i]),\n                            cT = item.data('cutTime'),\n                            options = item.data('arg'),\n                            leftTime = parseInt((cT[0] - new Date() + sysTime)/1000);\n                        if(leftTime < 0){\n                            cT.shift();\n                            if(cT.length === 0){\n                                countList.splice(i,1);\n                                len -- ;\n                                i--;\n                            }\n                            else{\n                                item.data('cutTime',cT);\n                            }\n                            item.closest('[module-name]').trigger('countdownchange');\n                        }\n                        else{\n                            var day = Math.floor(leftTime/(24*3600)),\n                                hour = Math.floor(leftTime/3600) - (options.hasDay?day*24 : 0),\n                                minute = Math.floor(leftTime%3600/60),\n                                second = leftTime%60;\n\n                            if(options.hasDay){\n                                item.find(options.dayCnt).html(day > 9?day : '0' + day);\n                            }\n\n                            item.find(options.hourCnt).html(hour > 9?hour : '0' + hour);\n                            item.find(options.minuteCnt).html(minute > 9?minute : '0' + minute);\n                            item.find(options.secondCnt).html(second > 9?second : '0' + second);\n                        }\n                    }\n                },1000);\n            }\n\n            init();\n        };\n    })(),\n\n    loop : function(arg){\n        var that = this,\n        root = $(that),\n        options = $.extend({\n            auto : false,\n            next : '.next',\n            prev : '.prev',\n            container : '.con',\n            item : '.item'\n        },arg),\n        container = root.find(options.container),\n        itemWidth = 0,\n        total = 0,\n        animating = false,\n        index = 0,step = 1,\n        itemContainer = null,\n        duration = options.duration || 1000;\n\n        function css(){\n            container.css({\n                overflow : 'hidden',\n                position : 'relative'\n            });\n            root.find(options.item).css('float','left');\n        }\n\n        function dom(){\n            var html = container.html(),\n                height = options.height || container.height();\n            root.find(options.item).remove();\n            container.height(height);\n            itemContainer = $('<div></div>').prependTo(container).css({\n                width : (total + 2*step)*itemWidth,\n                height : height,\n                position : 'absolute',\n                left : 0,\n                top :0\n            }).html(html);\n            if(options.conCls){\n                itemContainer.addClass(options.conCls);\n            }\n            var node = root.find(options.item);\n            for(var i = total - 1, little = total - step; i >= little; i--){\n                node.eq(i).clone(true).prependTo(itemContainer);\n            }\n            for(var i = 0;i < step; i++){\n                node.eq(i).clone(true).appendTo(itemContainer);\n            }\n            itemContainer.css('left',-step*itemWidth);\n        }\n\n        function event(){\n            root.find(options.next).click(function(){\n                if(animating)return;\n                animating = true;\n                index += step;\n                itemContainer.animate({\n                    left : -index*itemWidth\n                },duration,function(){\n                    if(index >= total + step){\n                        index = index - total;\n                        itemContainer.css('left',-(index)*itemWidth);\n                    }\n                    animating = false;\n                });\n            });\n\n            root.find(options.prev).click(function(){\n                if(animating)return;\n                animating = true;\n                index -= step;\n                itemContainer.animate({\n                    left : -index*itemWidth\n                },duration,function(){\n                    if(index < step){\n                        index = index + total;\n                        itemContainer.css('left',-index*itemWidth);\n                    }\n                    animating = false;\n                });\n            });\n\n            if(options.eventType){\n                root.find(options.item).each(function(index,n){\n                    $(n)[options.eventType](function(){\n                        options.handle(n,index,step);\n                    });\n                });\n            }\n\n        }\n\n        function init(){\n            css();\n            if(!root.find(options.item).length)return;\n            step = Math.ceil(container.width()/root.find(options.item).outerWidth(true));\n            itemWidth = root.find(options.item).outerWidth(true);\n            total = root.find(options.item).length;\n            index = step;\n            if(root.find(options.item).length < step)return;\n            dom();\n            event();\n        }\n\n        init();\n    }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "public_modules"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "slide()",
    "name": "slide",
    "group": "public_modules",
    "description": "<p>none</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "none",
        "type": "json"
      },
      {
        "title": "code",
        "content": "slide:function(args){\n        // 定义传入的CSS调用变量\n        var _this=this,\n            param=$.extend({imgArea:'.jbannerImg', imgNodeArea:'.jImgNodeArea', imgNode:'.jbannerImg li', tabArea:'.jbannerTab', tabNode:'.jbannerTab span', arrowLeft:'.jPreOut', arrowRight:'.jNextOut', arrowLeftOver:'jPreOver', arrowRightOver:'jNextOver', defaultClass:'show', slideDirection:'left', timer:'3', subFunction:'transparentEffect', eventType:'click',showArrow:1, isCircular:false, isTabAvailable:true, isHoverStop:true}, args),\n            imgArea = $(_this).find(param.imgArea),\n            imgNode = $(_this).find(param.imgNode),\n            tabArea = $(_this).find(param.tabArea),\n            tabNode = $(_this).find(param.tabNode),\n            defaultClass = param.defaultClass,\n            eventType = param.eventType,\n            timer = !param.timer*1000?3000:param.timer*1000,\n            scroll,\n            ul = $(_this).find(param.imgNodeArea + '>ul'),\n            imgNodeArea = $(_this).find(param.imgNodeArea),\n            isFull = param.isFull;\n\n        //全局变量\n        var index = 0,direction = 1,time = null,moveRange = 0,partTime = null,animate = null,enterFlag = false;\n        if(!imgNode.length)return;\n        jshop.module.ridLazy($(_this));\n\n        //是否鼠标移动到内容区域时，停止轮播\n        if(param.isHoverStop){\n            imgArea.bind({\n                mouseenter:function(){\n                    enterFlag = true;\n                    _stop();\n                },\n                mouseleave:function(){\n                    enterFlag = false;\n                    time = setTimeout(imgMove, timer);\n                }\n            });\n        }\n\n        /**\n        轮播图所有效果\n        \n        var banner = {\n            transparentEffect : function(){\n                //初始化\n                $(_this).css({'background-color':imgNode.eq(index).attr('background')});\n\n                // 调用函数\n                init();\n                if(param.isTabAvailable){triggerThumbnail();}//如果切换切点可用\n                triggerDirection();\n                if(param.showArrow!=1){triggerArrow();}\n                animate = transparent;\n                time = setTimeout(imgMove, timer);\n            },\n            moveEffect : function(){\n                var isTop = (param.slideDirection == 'top')?true:false;\n                scroll = (isTop)?\"scrollTop\":\"scrollLeft\";\n\n                //初始化\n                $(_this).css({'background-color':imgNode.eq(index).attr('background')});\n                if(isTop){\n                    imgNodeArea.css({height:20000});\n                    imgNode.css({width:imgNode.attr(\"width\"),height:imgNode.attr(\"height\")});\n                    moveRange = imgNode.height();\n                    imgArea[0][scroll] = indexmoveRange;\n                }else{\n                    imgNodeArea.css({width:20000});\n                    imgNode.css({width:imgNode.attr(\"width\"),height:imgNode.attr(\"height\"),'float':\"left\"});//将这个宽度写在css里，在ie6下面，获取到的父级宽度是被这个元素撑开的宽度\n                    moveRange = imgNode.width();\n                    imgArea[0][scroll] = indexmoveRange;\n                };\n\n                // 调用函数\n                init();\n                if(param.isTabAvailable){triggerThumbnail();}//如果切换切点可用\n                triggerDirection();\n                if(param.showArrow!=1){triggerArrow();}\n                animate = oneImgMove;\n                time = setTimeout(imgMove, timer);\n            }\n        };\n\n        /**\n        根据传入的子方法名执行对应的子方法\n        \n        if(banner[param.subFunction])\n            banner[param.subFunction].call(_this);\n\n        /**\n        轮播图初始化\n        \n        function init(){\n            imgArea.css({width:imgNode.attr(\"width\"),height:imgNode.attr(\"height\")});\n            imgNode.eq(0).addClass(defaultClass);\n            tabNode.eq(0).addClass(defaultClass);\n            autoMiddle();\n            $(window).resize(function(){\n                autoMiddle();\n            });\n        }\n\n        /**\n        轮播图自适应居中于屏幕中间\n        \n        function autoMiddle(){\n            var extra = imgArea.width()-$(_this).width();\n            if(extra>0){\n                imgArea.css({'margin-left':-extra/2});\n            }else{\n                imgArea.css('margin','0 auto');\n            }\n        }\n\n        /**\n        给每个tab缩略图绑定事件\n        \n        function triggerThumbnail(){\n            tabNode.each(function(i,elem){\n                $(elem)[eventType](function(){\n                    imgNode.eq(index).removeClass(defaultClass);\n                    tabNode.eq(index).removeClass(defaultClass);\n                    index = i;\n                    imgNode.eq(index).addClass(defaultClass);\n                    tabNode.eq(index).addClass(defaultClass);\n                    animate();\n                   return false;\n                });\n            });\n        }\n\n        /**\n        点击箭头或数字时，重置时间\n        \n        function _stop(){\n            clearTimeout(time);\n            time = null;\n            //clearTimeout(partTime);\n            //partTime = null;\n            ul.clearQueue();\n            imgNode.eq(index).clearQueue();\n        }\n\n        /**\n        切换图片和缩略图\n        \n        function imgMove(){\n            //判断是否是圆形循环，只支持渐变方式\n            if(param.isCircular){\n                if (index < imgNode.length - 1){\n                    classOper([imgNode,tabNode],defaultClass,true);\n                }else{\n                    index = -1;\n                    classOper([imgNode,tabNode],defaultClass,true);\n\n                }\n            }else{\n                if (direction == 1){\n                    if (index < imgNode.length - 1){\n                        classOper([imgNode,tabNode],defaultClass,true);\n                    }else{\n                        direction = 0;\n                        classOper([imgNode,tabNode],defaultClass,false);\n                    }\n                }else{\n                    if (index > 0){\n                        classOper([imgNode,tabNode],defaultClass,false);\n                    }else{\n                        direction = 1;\n                        classOper([imgNode,tabNode],defaultClass,true);\n                    }\n                }\n            }\n            animate();\n        }\n\n        /**\n        鼠标移动显示左右移动箭头\n        \n        function triggerArrow(){\n            var arrowLeft = $(_this).find(param.arrowLeft),arrowRight = $(_this).find(param.arrowRight);\n            $(_this).bind({\n                mouseover:function(){\n                    arrowLeft.show();\n                    arrowRight.show();\n                },\n                mouseout:function(){\n                    arrowLeft.hide();\n                    arrowRight.hide();\n                }\n             });\n        }\n\n        /**\n        处理左右移动箭头\n        \n        function triggerDirection(){\n            var arrowLeft = $(_this).find(param.arrowLeft),arrowRight = $(_this).find(param.arrowRight),\n                arrowLeftOver = param.arrowLeftOver, arrowRightOver = param.arrowRightOver;\n\n            arrowLeft.bind({\n                click:function(){\n                    if(index != 0){// 判断当前是不是第一张\n                        classOper([imgNode,tabNode],defaultClass,false);\n                        animate();\n                    }else{\n                        //判断是否是圆形循环，只支持渐变方式\n                        if(param.isCircular){\n                            classOper([imgNode,tabNode],defaultClass,false);\n                            index = imgNode.length;\n                            classOper([imgNode,tabNode],defaultClass,false);\n                            animate();\n                        }\n                    }\n                   return false;\n                },\n                mouseover:function(){$(this).addClass(arrowLeftOver);},\n                mouseout:function(){$(this).removeClass(arrowLeftOver);}\n            });\n            arrowRight.bind({\n                click:function(){\n                    if(index < imgNode.length - 1){// 判断当前是不是最后一张\n                        classOper([imgNode,tabNode],defaultClass,true);\n                        animate();\n                    }else{\n                        //判断是否是圆形循环，只支持渐变方式\n                        if(param.isCircular){\n                            index = -1;\n                            classOper([imgNode,tabNode],defaultClass,true);\n                            animate();\n                        }\n                    }\n                   return false;\n                },\n                mouseover:function(){$(this).addClass(arrowRightOver);},\n                mouseout:function(){$(this).removeClass(arrowRightOver);}\n            });\n        }\n\n        /**\n        透明效果\n        \n        function transparent(){\n            imgNode.animate({\n                opacity: 0\n              }, 0, function() {\n              });\n            $(_this).css({'background-color':imgNode.eq(index).attr('background')});\n            imgNode.eq(index).animate({\n                opacity: 1\n              }, 1000, function() {\n                  _stop();\n                  if(enterFlag)return;\n                  time = setTimeout(imgMove, timer);\n              });\n\n        }\n\n        /**\n        移动效果：每一张图片分10次移动\n        \n        function oneImgMove(){\n            var nowMoveRange = (indexmoveRange) - imgArea[0][scroll],\n            partImgRange = nowMoveRange > 0 ? Math.ceil(nowMoveRange / 10) : Math.floor(nowMoveRange / 10);\n            imgArea[0][scroll] += partImgRange;\n            if (partImgRange == 0){\n                imgNode.eq(index).addClass(defaultClass);\n                tabNode.eq(index).addClass(defaultClass);\n                partImgRange = null;\n                _stop();\n                if(!enterFlag)\n                    time = setTimeout(imgMove, timer);\n            }\n            else{\n                partTime = setTimeout(oneImgMove,30);\n            }\n            $(_this).css({'background-color':imgNode.eq(index).attr('background')});\n        }\n\n        /**\n        节点css类名操作\n        \n        function classOper(arr,className,flag){\n            arr.each(function(ind,n){\n                n.eq(index).removeClass(className);\n            });\n            flag?(index++):(index--);\n            arr.each(function(ind,n){\n                n.eq(index).addClass(className);\n            });\n        }\n    }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "public_modules"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "tab()",
    "name": "tab",
    "group": "public_modules",
    "description": "<p>none</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "none",
        "type": "json"
      },
      {
        "title": "code",
        "content": "tab:function(args){\n        var param = $.extend({tabNode:'.jSortTab span', arrow:'.jSortTabArrow', defaultClass:'current', tabContent:'.jSortContent ul',isNeedWidth:true, eventType:'mouseenter'}, args),\n            _this = this,\n            tabNode = $(_this).find(param.tabNode),\n            tabContent = $(_this).find(param.tabContent),\n            arrow = $(_this).find(param.arrow), index = 0;\n\n        var eventFlag = true;\n\n        //初始化结构\n        tabNode.eq(0).addClass(param.defaultClass);\n         tabContent.eq(0).addClass(param.defaultClass).data('lazyload',true);\n\n        var width = (tabNode.parent().parent().width()-0.03)/tabNode.length;\n        if(param.isNeedWidth){\n            tabNode.css({width: width});\n        }\n        arrow.css({width: width});\n\n        //绑定鼠标移动事件\n        tabNode.each(function(ind,n){\n            $(n)[param.eventType](function(){\n                index = ind;\n                if(eventFlag){\n                    eventFlag = false;\n                    $(this).addClass(param.defaultClass).siblings().removeClass(param.defaultClass);\n                    tabContent.eq(index).addClass(param.defaultClass).siblings().removeClass(param.defaultClass);\n                    if(arrow.length){\n                        arrow.animate({\n                            left: (index)width\n                        },\n                        300,\n                        function() {\n                            eventFlag=true;\n                            if(index != ind){\n                                tabNode.eq(index).trigger(param.eventType);\n                            }\n                        });\n                    }\n                    else{\n                        eventFlag = true;\n                        if(index != ind){\n                            tabNode.eq(index).trigger(param.eventType);\n                        }\n                    }\n                }\n                if(!tabContent.eq(index).data('lazyload')){\n                    jshop.module.ridLazy(tabContent.eq(index).data('lazyload',true));\n                }\n            });\n        });\n    }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "public_modules"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "tabClass()",
    "name": "tabClass",
    "group": "public_modules",
    "description": "<p>none</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "none",
        "type": "json"
      },
      {
        "title": "code",
        "content": "tabClass:function(args){\n        var param = $.extend({node:'li', defaultClass:'current'}, args),\n            elem = $(this).find(param.node),\n            defaultClass = param.defaultClass,\n            defaultShow = param.defaultShow;\n\n        if(defaultShow){\n            elem.eq(defaultShow).addClass(defaultClass);\n        }\n\n        elem.bind({\n            mouseenter:function(){\n                $(this).addClass(defaultClass).siblings().removeClass(defaultClass);\n            },\n            mouseleave:function(){\n                $(this).removeClass(defaultClass);\n            }\n        });\n    }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "public_modules"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "tabShow()",
    "name": "tabShow",
    "group": "public_modules",
    "description": "<p>切换显示--通过触发一个元素，切换其他元素的显示。可选择闭环切换、前进后退及随机切换显示--可应用于任意模块，只要有使用场景。</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "如{eventNode:'.jClick', parentNode:'.jSortContent', childNode:'ul', defaultClass:'current', eventType:'click', num:0, tabTime:500, subFunction:'circle'}\n1、eventNode触发切换的节点；\n2、parent切换节点的父节点；\n3、child切换节点；\n4、defaultClass显示样式；\n5、eventType触发的事件类型；\n6、num初始显示第几个；\n7、tabTime每一屏切换的时间；\n8、subFunction显示方式：闭环circle、前进倒退direction、随机random。",
        "type": "json"
      },
      {
        "title": "code",
        "content": "tabShow : function(args){\n        var param = $.extend({eventNode:'.jClick', parentNode:'.jSortContent', childNode:'ul', defaultClass:'current', eventType:'click', num:0, tabTime:500, subFunction:'circle'},args),\n            _this = $(this),\n            eventNode = _this.find(param.eventNode),//触发切换的节点\n            parent = _this.find(param.parentNode),//切换节点的父节点\n            child = _this.find(param.childNode),//切换节点\n            defaultClass = param.defaultClass,//显示样式\n            eventType = param.eventType,//触发的事件类型\n            num = (param.num === Number && param.num <= len) ? param.num : 0,//初始显示第几个\n            tabTime = param.tabTime,//每一屏切换的时间\n            subFunction = param.subFunction,//显示方式：闭环circle、前进倒退direction、随机random\n            len = child.length,\n            isLeft = true;\n\n        //初始化显示\n        child.eq(num).addClass(defaultClass);\n\n        //事件触发\n        eventNode[eventType](function(){\n            if(param.subFunction){\n                showStyle[param.subFunction].call(_this);\n            }\n            callBack();\n        });\n\n        var showStyle = {\n            circle : function(){\n                num = (num + 1)%len;\n            },\n            direction : function(){\n                if(isLeft){\n                    num++;\n                    if(num == len - 1){\n                        isLeft = false;\n                    }\n                }else{\n                    num--;\n                    if(num  == 0){\n                        isLeft = true;\n                    }\n                }\n            },\n            random : function(){\n                num = parseInt(Math.random()len);\n            }\n        };\n\n        function callBack(){\n            child.eq(num).addClass(defaultClass).siblings().removeClass(defaultClass);\n            child.animate({opacity:0},0,function(){});\n            child.eq(num).animate({opacity:1},param.tabTime,function(){});\n        }\n    }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "public_modules"
  },
  {
    "type": "data",
    "url": "http://active.coupon.jd.com/ilink/couponActiveFront/ifram_index.action?key=79566ba7fcee44e8924a4354cdeda7ce&roleId=1422862&to=sale.jd.com/act/syji8khazyfjwluq.html",
    "title": "userGetCoupon()",
    "name": "userGetCoupon",
    "group": "public_modules",
    "description": "<p>优惠券iframe调用--支持public modules调用（里面除A链接外每一个结构上设置伪属性data-href）；a链接调用需在href里填写javascript:void(0)。应用场景：公用调用（采用public modules方式）；a链接调用。</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "none",
        "type": "json"
      },
      {
        "title": "code",
        "content": "userGetCoupon : function(args){\n        var param = jQuery.extend({\n            node : 'a',\n            dataAttr : 'data-href'\n        } , args || {}),\n            _this = jQuery(this),\n            node = _this.find(param.node);\n\n        if(!node.length){\n           return;\n        }\n\n        var activeCoupon= function(source){\n            $.jdThickBox({\n                type: 'iframe',\n                title: '免费抢券',\n                source: source,\n                width: 800,\n                height: 450,\n                _title: 'thicktitler',\n                _close: 'thickcloser',\n                _con: 'thickconr'\n            })\n        };\n\n        var activeCouponLogin= function(source){\n            thick_login(function(){\n                activeCoupon(source);\n             });\n        };\n\n        node.click(function(){\n            var href = jQuery(this).attr(param.dataAttr);\n            activeCouponLogin(href);\n        });\n    }",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "public_modules"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "waterfallFlow()",
    "name": "waterfallFlow",
    "group": "public_modules",
    "description": "<p>瀑布流--主要应用在商品列表图片交错布局，就像瀑布一样</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "如{node:'li', topSpac:15}。\n1、参数node为单个节点名；\n2、参数topSpac为第一行与顶部的距离",
        "type": "json"
      },
      {
        "title": "code",
        "content": "waterfallFlow:function(args){\n   var _this = this,\n        param = jQuery.extend({node:\"li\", topSpac:10}, args),\n        elem = jQuery(_this).find(param.node),\n        qty = parseInt(elem.parent().width()/parseInt(elem.outerWidth(true))),\n        topPos,\n        array = [];\n\n   elem.each(function(index, e){\n       //获取行数\n        var row = parseInt(index/qty),\n            //获取列数：通过每一个的位置除去每一行的数量，剩下的余数就是每一列\n            col = index%qty,\n            //获取每一个的左边距：离最左边的距离\n            leftPos = col*jQuery(e).outerWidth(true);\n\n        //如果是第一行\n       if(row == 0){\n           topPos = parseInt((col%2)*param.topSpac);\n       }\n       else{\n           var topNode = jQuery(elem.get((row-1)*qty+col));\n           topPos = topNode.outerHeight(true)+parseInt(topNode.css(\"top\"));\n       }\n       jQuery(e).css({left:leftPos,top:topPos});\n\n        //将每一个的top和自身的高度之和保存到数组里\n        array.push(parseInt(jQuery(e).css(\"top\"))+jQuery(e).outerHeight(true));\n   });\n\n    //数组排序，获取最大的高度\n    function compare(value1, value2){\n        if(value1<value2){\n           return -1;\n        }else if(value1>value2){\n           return 1;\n        }else{\n           return 0;\n        }\n    }\n    array.sort(compare);\n\n    //重设父级的高度，以达到背景自适应\n    jQuery(_this).css(\"height\",array[array.length-1]);\n}",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "public_modules"
  },
  {
    "type": "JSHOP",
    "url": "none",
    "title": "follow()",
    "name": "follow",
    "group": "shopAtten",
    "description": "<p>none</p>",
    "examples": [
      {
        "title": "module-param",
        "content": "none",
        "type": "json"
      },
      {
        "title": "code",
        "content": "\t\tfollow : function(args){\n\t\t\tvar _para = $.extend({\n\t\t\t\tcoll : '.jshop-btn-coll',\n\t\t\t\tnode : 'li',\n\t\t\t\tdefault_pop : '.j_default'\n\t\t\t},args || {}), _this = this,\n\t\t\t\t_follow_url = INTERFACE.venderFollow.follow,\n\t\t\t\t_shop_id = null,\n\t\t\t\t_followVM = null, _loaded = false, _user_cnt = null,_msg_timer,_node,_shop_url;\n\t\t\t\n\t\t\t//数据初始化\n\t\t\tfunction _init(){\n\t\t\t\tif($(_this).parents('.mc:first').find('#j-follow-cnt').length){\n\t\t\t\t\t_user_cnt = $(_this).parents('.mc:first').find('#j-follow-cnt');\n\t\t\t\t\t_user_cnt.find('.icon_close').unbind('click').click(function(){\n\t\t\t\t\t\t_close_box();\n\t\t\t\t\t});\n\t\t\t\t}\n\t\t\t}\n\t\t\t// 事件初始化\n\t\t\tfunction _event_init(){\n\t\t\t\t$(_this).find(_para.node + ' ' + _para.coll).click(function(){\n\t\t\t\t\t_shop_url = $(this).attr('shopurl');\n\t\t\t\t\tif(_user_cnt){\n\t\t\t\t\t\t_user_cnt.find('.p1>a,.p3>a').attr('href',_shop_url);\n\t\t\t\t\t}\n\t\t\t\t\t_login_and_follow.call(this);\n\t\t\t\t});\n\t\t\t};\n\t\t\t\n\t\t\t//登录及关注店铺\n\t\t\tfunction _login_and_follow(){\n\t\t\t\t_shop_id = $(this).attr('shopid'),\n\t\t\t\tdata = {venderId : _shop_id, sysName : 'mall.jd.com'};\n\t\t\t\tfunction __follow(){\n\t\t\t\t\t$.ajax({\n\t\t\t\t\t\tasync : false,\n\t\t\t\t\t\turl : _follow_url,\n\t\t\t\t\t\tdata : data,\n\t\t\t\t\t\tdataType : 'jsonp',\n\t\t\t\t\t\tsuccess : function(data){\n\t\t\t\t\t\t\t_follow_handle(data);\n\t\t\t\t\t\t},\n\t\t\t\t\t\terror : function(){\n\t\t\t\t\t\t\t_follow_error(data);\n\t\t\t\t\t\t}\n\t\t\t\t\t}); \n\t\t\t\t}\n\t\t\t\t\n\t\t\t\tthick_login(__follow);\n\t\t\t\t\n\t\t\t\t\n//\t\t\t$.login({\n//\t\t            modal: true,\n//\t\t            complete: function(result) {\n//\t\t                if (result != null && result.IsAuthenticated != null && result.IsAuthenticated) {\n//                            jdModelCallCenter.settings.fn();//已经登陆后。增加关注\n//                            jdModelCallCenter.settings.fn = null;\n//\t\t                }\n//\t\t            }\n//\t\t\t\t });\n//\t\t\t\t jdModelCallCenter.settings.fn = function() {\n//\t\t\t\t\t __follow();//登录后回调函数 。增加关注\n//\t\t\t\t };\n\t\t\t\t \n\t\t\t}\n\t\t\t\n\t\t\t//关注返回处理逻辑\n\t\t\tfunction _follow_handle(data){\n\n\t\t\t\t$('<link rel=\"stylesheet\" type=\"text/css\" href=\"//misc.360buyimg.com/product/skin/2012/product-attention.css\"/>').appendTo('head');\n\t\t\t\t_followVM = $(_this).parents('.mc:first').find(_para.default_pop);\n\t\t\t\t\n\t\t\t\t_check(data);\n\t\t\t}\n\t\t\t//根据关注返回数据转移逻辑\n\t\t\tfunction _check(data){\n\t\t\t\tswitch(data.code){\n\t\t\t\t\tcase 'F10000' : {\n\t\t\t\t\t\t_follow_success();\n\t\t\t\t\t\tbreak;\n\t\t\t\t\t}\n\t\t\t\t\tcase 'F0402' : {\n\t\t\t\t\t\t_followed();\n\t\t\t\t\t\tbreak;\n\t\t\t\t\t}\n\t\t\t\t\tcase 'F0410' : {\n\t\t\t\t\t\t_follow_error('followMaxDiv',1);\n\t\t\t\t\t\tbreak;\n\t\t\t\t\t}\n\t\t\t\t\tdefault : {\n\t\t\t\t\t\t_follow_error('followFailDiv',2);\n\t\t\t\t\t\t\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\t\n\t\t\tfunction _follow_error(cnt,type){\n\t\t\t\tif(_user_cnt){\n\t\t\t\t\ttry{\n\t\t\t\t\t\t_user_cnt.find('.p1,.p2,.p3').hide();\n\t\t\t\t\t\tif(type == 1){\n\t\t\t\t\t\t\t_user_cnt.find('.p3').show();\n\t\t\t\t\t\t}\n\t\t\t\t\t\telse{\n\t\t\t\t\t\t\t_user_cnt.find('.p2').show();\n\t\t\t\t\t\t}\n\t\t\t\t\t\t_open_box();\n\t\t\t\t\t}\n\t\t\t\t\tcatch(e){\n\t\t\t\t\t\t_show_box(cnt);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\telse{\n\t\t\t\t\t_show_box(cnt);\n\t\t\t\t}\n\t\t\t}\n\t\t\t\n\t\t\tfunction _follow_success(){\n\t\t\t\t_get_follow_num(function(){\n\t\t\t\t\tif(_user_cnt){\n\t\t\t\t\t\t_user_cnt.find('.p2,.p3').hide();\n\t\t\t\t\t\t_user_cnt.find('.p1').show();\n\t\t\t\t\t\t_open_box();\n\t\t\t\t\t}\n\t\t\t\t\telse{\n\t\t\t\t\t\t_get_follow_tags();\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t\t}\n\t\t\t\n\t\t\tfunction _open_box(){\n\t\t\t\t_center(_user_cnt);\n\t\t\t\t_mask();\n\t\t\t\t$('.thickdiv').show();\n\t\t\t\t_user_cnt.show();\n\t\t\t}\n\t\t\t\n\t\t\tfunction _close_box(){\n\t\t\t\t_user_cnt.hide();\n\t\t\t\t$('.thickdiv').hide();\n\t\t\t}\n\t\t\tfunction _show_success(html,handle){\n                $('.thickbox').html('');\n\t\t\t\t$.jdThickBox({\n\t\t\t\t\twidth : 510,\n\t\t\t\t\theight : 260,\n\t\t\t\t\ttitle : '关注店铺',\n\t\t\t\t\t_box : 'btn_coll_shop_pop',\n\t\t\t\t\tsource : html\n\t\t\t\t},function(){\n\t\t\t\t\thandle();\n\t\t\t\t});\n\t\t\t}\n\t\t\t\n\t\t\tfunction _get_follow_tags(){\n\t\t\t\tvar __url = INTERFACE.venderFollow.queryTagForListByCount + '?count=5';\n\t\t\t\t$.ajax({\n\t\t\t\t\tasync : false,\n\t\t\t\t\turl : __url,\n\t\t\t\t\tdataType : 'jsonp',\n\t\t\t\t\tsuccess : function(data){\n\t\t\t\t\t\t_fill_in_tags(data);\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t\t}\n\t\t\t\n\t\t\tfunction _fill_in_tags(data){\n\t\t\t\tvar _data = data.data,\n\t\t\t\t\t_cnt = '<ul id=\"oldTags\" class=\"att-tag-list\">';\n\t\t\t\tfor(var i = 0, len = _data.length; i < len; i++){\n                    _cnt += '<li isnewadd=\"true\"><a href=\"javascript:;\" isCheck=\"false\">' + decodeURIComponent(_data[i]) + '</a><li>';\n\t\t\t\t}\n\t\t\t\t_cnt +='</ul><ul id=\"newTags\" class=\"att-tag-list att-tag-list-save\">';\n\t\t\t\t_cnt +='<li id=\"att-tag-new\" class=\"att-tag-new\"><input id=\"newTag\" type=\"text\" placeholder=\"自定义\" maxLength=\"10\" /><span>保存</span></li></ul>';\n\t\t\t\t_followVM.find('#followTags').html(_cnt);\n\t\t\t\t_show_success(_followVM.find('#followSuccessDiv').html(),function(){\n\t\t\t\t    var pop = $('#btn_coll_shop_pop'),\n\t\t\t        \ttarget = $('#attention-tags').find('.mc');\n\t\t\t\t    pop.find('.thickcon').css('height', 'auto');\n\t\t\t\t    pop.css('height', 'auto');\n\t\t\t\t    //IE下占位符不起作用的补偿方式\n\t\t\t\t    $('#newTag').val( $('#newTag').attr('placeholder'));\n\t\t\t\t    $('#newTag').focus(function(){\n\t\t\t\t    \tif($.trim($(this).val()) == $(this).attr('placeholder'))\n\t\t\t\t    \t\t$(this).val('');\n\t\t\t\t    }).keyup(function(){\n\t\t\t\t    \t$(this).val($(this).val().substring(0,10));\n\t\t\t\t    }).blur(function(){\n\t\t\t\t    \tif($(this).val() == ''){\n\t\t\t\t    \t}\n\t\t\t\t    });\n\t\t\t\t    \n\t\t\t\t    $('#newTag').next('span').click(function(){\n\t\t\t\t    \t_check_tags();\n\t\t\t\t    });\n\n                    $('#oldTags li').click(function(){\n                        _chooseTag(this);\n                    });\n\n\t\t\t\t    $('#attention-tags .att-tag-btn>a:first').click(function(){\n\t\t\t\t    \tvar __names = '', __count = 0;\n\t\t\t\t    \t$('#oldTags,#newTags').find('a').each(function(index,n){\n\t\t\t\t    \t\tif($(n).attr('ischeck') == 'true'){\n\t\t\t\t    \t\t\t__count ++;\n\t\t\t\t    \t\t\tif(__names != ''){\n                                    __names += ',';\n\t\t\t\t    \t\t\t}\n\t\t\t\t    \t\t\t__names += $(n).html();\n\t\t\t\t    \t\t}\n\t\t\t\t    \t});\n\t\t\t\t    \t\n\t\t\t\t    \tif(__names == ''){\n\t\t\t\t    \t\t_show_message('请至少提供一个标签');\n\t\t\t\t    \t}\n\t\t\t\t    \tif(__count > 3){\n\t\t\t\t    \t\t_show_message('标签最多可选3个');\n\t\t\t\t    \t}\n\t\t\t\t    \t__names = encodeURIComponent(__names);\n\t\t\t\t    \tvar __url = INTERFACE.venderFollow.editTag;\n\t\t\t\t    \t\n\t\t\t\t    \t$.ajax({\n\t\t\t\t    \t\turl : __url,\n\t\t\t\t    \t\tdataType : 'jsonp',\n\t\t\t\t    \t\tdata : {\n\t\t\t\t    \t\t\tvenderId : _shop_id,\n\t\t\t\t    \t\t\ttagNames : __names\n\t\t\t\t    \t\t},\n\t\t\t\t    \t\tsuccess : function(data){\n\t\t\t\t    \t\t\tif(data.code == 'F10000'){\n\t\t\t\t    \t\t\t\t$('#follow_error_msg').removeClass();\n\t\t\t\t    \t\t\t\t$('#follow_error_msg').addClass('hl_green fl');\n\t\t\t\t    \t\t\t\t$('#follow_error_msg').html(\"设置成功\");\n\t\t\t\t\t   \t\t    \t$('#follow_error_msg').show();\n\t\t\t\t\t   \t\t    \tsetTimeout(function(){\n\t\t\t\t\t   \t\t    \t\t$('#follow_error_msg').hide();\n                                        $('.thickclose').click();\n                                    }, 5000);\n                                }\n                                else if(data.code == 'F0410'){\n                                    _show_message('设置的标签数超过最大限制');\n                                }\n                                else{\n                                    _show_message('设置失败');\n                                }\n                            },\n                            error : function(){\n                                _show_message('设置失败');\n                            }\n\t\t\t\t    \t});\n\t\t\t\t    });\n\t\t\t\t});\n\t\t\t\t\n\t\t\t\t\n\t\t\t}\n\t\t\t\n\t\t\t\n\t\t\tfunction _check_tags(){\n\t\t\t\tvar _val = $('#newTag').val(),\n\t\t\t\t\t_tips = '标签由数字、字母、汉字组成';\n\t\t\t\t\n\t\t\t\tfunction __validate(value){\n\t\t\t\t\tvar __reg = /[\\u4e00-\\u9fa5]|[0-9]|[a-z]|[A-Z]+/g,\n\t\t\t\t\t\t__result = value.match(__reg);\n\t\t\t\t\treturn !!__result;\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\tif(_val.length > 10 || _val.trim().length > 10){\n\t\t\t\t\t_show_message(_tips);\n\t\t\t\t\treturn false;\n\t\t\t\t}\n\t\t\t\tif(!__validate(_val)){\n\t\t\t\t\t_show_message(_tips);\n\t\t\t\t\treturn false;\n\t\t\t\t}\n\t\t\t\tif(_val == $('#newTag').attr('placeholder'))\n\t\t\t\t\treturn false;\n\t\t\t\t$('<li isNewAdd=\"true\"><a class=\"current\" href=\"javascript:;\" isCheck=\"true\">' + _val + '</a></li>').click(function(){\n\t\t\t\t\t_chooseTag(this);\n\t\t\t\t}).insertBefore( $('#att-tag-new'));\n                if($('#newTags li[isNewAdd]').length >= 3){\n\t\t\t\t\t$('#att-tag-new').hide();\n\t\t\t\t}\n                $('#newTag').val('');\n\t\t\t}\n\t\t\t\n\t\t\tfunction _chooseTag(obj){\n\t\t\t\tvar isCheck=$(obj).find('a').attr(\"isCheck\");\n\t\t\t\tif( 'undefined' == typeof isCheck || isCheck=='false' ){\n\t\t\t\t\t$(obj).find('a').attr(\"isCheck\",\"true\");\n\t\t\t\t\t$(obj).find('a').addClass(\"current\");\n\t\t\t\t}else{\n\t\t\t\t\t$(obj).find('a').attr(\"isCheck\",\"false\");\n\t\t\t\t\t$(obj).find('a').removeClass(\"current\");\n\t\t\t\t}\n\t\t\t}\n\t\t\t\n\t\t\tfunction _show_message(msg){\n\t\t\t\t$('#follow_error_msg').html(msg);\n\t\t    \t $('#follow_error_msg').show();\n\t\t    \t if(_msg_timer){\n\t\t    \t\t clearTimeout(_msg_timer);\n\t\t    \t }\n\t    \t\t _msg_timer = setTimeout(function(){\n\t\t    \t\t  $('#follow_error_msg').hide();\n\t\t     \t }, 3000);\n\t\t\t}\n\t\t\t\n\t\t\tfunction _followed(){\n\t\t\t\tif(_user_cnt){\n\t\t\t\t\t_user_cnt.find('.p1,.p2,.p3').hide();\n\t\t\t\t\t_user_cnt.find('.p3').show();\n\t\t\t\t\t_open_box();\n\t\t\t\t}\n\t\t\t\telse{\n\t\t\t\t\t_get_follow_num(function(){\n\t\t\t\t\t\t_show_box('followedDiv','已关注过该店铺');\n\t\t\t\t\t});\n\t\t\t\t}\n\t\t\t}\n\t\t\t\n\t\t\tfunction _get_follow_num(handle){\n\t\t\t\tvar __url = INTERFACE.venderFollow.queryForCount,\n\t\t\t\t\tdata = {sysName : 'mall.jd.com'};\n\t\t\t\t$.ajax({\n\t\t\t\t\turl : __url,\n\t\t\t\t\tdata : data,\n\t\t\t\t\tdataType : 'jsonp',\n\t\t\t\t\tasync : false,\n\t\t\t\t\tsuccess : function(data){\n\t\t\t\t\t\t_followVM.find('#followSuccessDiv #followedNum,#followedDiv #followedNum').html('您已关注' + data.data + '个店铺，');\n\t\t\t\t\t\thandle();\n\t\t\t\t\t\t\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t\t}\n\t\t\t\n\t\t\tfunction _show_box(cnt,title){\n                $('.thickbox').html('');\n\t\t\t\t$.jdThickBox({\n\t\t\t\t\twidth : 300,\n\t\t\t\t\theight : 80,\n\t\t\t\t\ttitle : title || '关注失败',\n\t\t\t\t\tsource : _followVM.find('#' + cnt).html()\n\t\t\t\t});\n\t\t\t} \n\t\t\t\n\t\t\tfunction _center(obj){\n\t\t\t\tvar __w = obj.outerWidth(),__h = obj.outerHeight();\n\t\t\t\tobj.css({\n\t\t\t\t\tposition:'absolute',\n\t\t\t\t\tleft : ($(window).width() - __w)/2 + $(window).scrollLeft() + 'px',\n\t\t\t\t\ttop : ($(window).height() - __h)/2 + $(window).scrollTop() + 'px',\n\t\t\t\t\tzIndex : 10000005\n\t\t\t\t});\n\t\t\t}\n\t\t\t\n\t\t\tfunction _mask(){\n\t\t\t\tif(!$('.thickdiv').length){\n\t\t\t\t\t$('<div class=\"thickdiv\"></div>').appendTo('body');\n\t\t\t\t}\n\t\t\t}\n\t\t\t_init();\n\t\t\t_event_init();\t\n\t\t}",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "input/test.js",
    "groupTitle": "shopAtten"
  }
] });