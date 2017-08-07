/** @module gameCustom */

require('../css/reset.css'); //若项目内嵌在其他页面中，则不建议引入reset.css，避免引起其他页面其他部分的样式问题
require('../css/common.css');
require('../css/popup.css');
require('../css/popup.custom.scss');
require('../css/game.custom.scss');

//start:常用模块
//game.custom并不依赖这些模块，但是项目开发中常常都会用到，因此就直接写在这里了
var common = require('./common'),
    popup = require('./popup');
//end:常用模块

// Phaser 模块
require('p2');
require('pixi.js');
require('phaser');

module.exports = {
    /**
     * @callback draw
     *		@param {Number} [idx = 1] - 要调用的抽奖组件在CONF.gameConf的moduleId中的索引
     */

    /**
     * 初始化
     * @param {Object} opts - 参数
     *		@param {module:gameCustom~draw} opts.draw - 调用该方法后会立即抽奖并根据抽奖结果显示对应的弹框
     *		@param {String} type - 初始化类型，可能的值：normal（一般情况）、login（登录成功后返回）、back（跳转后返回）
     *		@param {Object} opts.custom - 自定义参数
     */
    init: function(opts) {
        require('./preload')({
            urls: [
            	'//img30.360buyimg.com/cms/jfs/t5803/223/9122787090/123725/d9925d5e/5981adaaNc68c6025.png', // boss.png
            	'//img13.360buyimg.com/cms/jfs/t5674/334/9185706579/152878/ed11022/59844327N0bbd7af2.png', 	// elements.png
            	'//img11.360buyimg.com/cms/jfs/t6046/361/7742397589/17240/a2e0f8e8/5981adb3Ne08feb96.png',  // hand.png
            	'//img10.360buyimg.com/cms/jfs/t5932/61/8405788283/25286/8df23e70/59882517N3bab4be2.png', 	// loading.png
            	'//img12.360buyimg.com/cms/jfs/t5767/117/9116630312/203843/fcf53400/5981adb4N02391330.png',	// scene.png
            	'//img30.360buyimg.com/cms/jfs/t6931/100/1497615206/38263/51aca5d3/5981adb3N15e3490e.png',	// result.png
            	'//img13.360buyimg.com/cms/jfs/t7057/117/1428840388/69949/eefc001c/5981ada8Ne43ddb1b.jpg',	// scene.jpg
            	'//img11.360buyimg.com/cms/jfs/t7159/341/773145467/90611/f4129043/59843376N14431695.jpg',	// loading-bg.jpg

            	'//img13.360buyimg.com/cms/jfs/t5959/292/7922950879/14326/8a3d1611/5981adb3N120ca97a.png',	// getCoupon.png
            	'//img13.360buyimg.com/cms/jfs/t5833/154/8975072761/4814/15d30568/5981ada2Nc56a1d96.png',	// go_woerma.png
            	'//img13.360buyimg.com/cms/jfs/t5710/101/9010419462/631/3d48d72f/5981adb3Naf1c6f4b.png',	// bar-bg.png
            	'//img11.360buyimg.com/cms/jfs/t6097/15/7727117610/1366/492f2b46/5981adb3N4041b74e.png', 	// coupon-con.png
            	'//img13.360buyimg.com/cms/jfs/t6121/233/8300960817/14040/550d3f2a/59881f0bN655af1b1.png', 	// loginBack_noCoupon.png
            	'//img20.360buyimg.com/cms/jfs/t5890/307/8960089288/20959/d9f60607/5981adb3N814c4b78.png', 	// network_err.png
            	'//img13.360buyimg.com/cms/jfs/t5740/57/9011229372/21327/d5c6ef1/5981adb3N94d61ac8.png',  	// noLogin.png	
            	'//img20.360buyimg.com/cms/jfs/t7024/100/1448198743/16943/5e203382/5981adb3Naff042dc.png',	// result_goOut.png
            	'//img13.360buyimg.com/cms/jfs/t6847/330/1455601544/20042/e895e3ab/5981adb4Na4c78d0f.png',	// result_noCoupon.png
            	'//img14.360buyimg.com/cms/jfs/t5773/99/8959901263/5971/64b85909/5981adb0Nfa55dd43.png',	// use_coupon.png
                '//img13.360buyimg.com/cms/jfs/t7204/52/778863465/445/fede2d3c/598432a4Nec09b1af.png',      // black-bar.png
                '//img11.360buyimg.com/cms/jfs/t5950/198/8005368774/826/7011fcd7/598432a5N7c9e416e.png'     // loading-tips.png
            ],
            onProgress: function(progress) {
                $("#progress").width((progress.completedCount / progress.total) * 21.85 + 'rem');
                $("#progress .loader-progress span").text(parseInt((progress.completedCount / progress.total) * 99) + '%');
            },
            onComplete: function() {
                
            }
        });

        // 拉取用户信息
        function getCookie(name) {
	        var strCookie = document.cookie;
	        var arrCookie = strCookie.split("; ");
	        for (var i = 0; i < arrCookie.length; i++) {
	            var arr = arrCookie[i].split("=");
	            if (name == arr[0]) {
	                return arr[1];
	            }
	        }
	        return "";
	    }
        $.ajax({
        	url: 'https://api.m.jd.com/client.action',
        	type: 'GET',
        	dataType: 'jsonp',
        	data: {
        		functionId: 'queryUserInfoAndData',
        		body: JSON.stringify({
        			uuid: getCookie('uuid')
        		}),
        		client: 'wh5',
        		clientVersion: '1.0.0',
        		_: Date.now()
        	},
        	success: function(data){
        		if (data.code==='0' && data.subCode === '0') {
        			if (data.data.headimgurl) {
        				game.hasUserImage = true;
        				game.userImageUrl = data.data.headimgurl;
        			}
        			game.userName = data.data.petName;
        		}
        	}
        })
        

        // 绑定关闭背景音乐以及弹出活动规则事件
        $(".loader .act-rule").click(function() {
            if ($(".loader").hasClass('active')) {
                if ($(".rules").hasClass('hide')) {
                    common.report(CONF.trackPrefix+'Rule')
                }else{
                    common.report(CONF.trackPrefix+'CloseRule')
                }
                $(".rules").toggleClass('hide');
            }
        });
        $(".rules").click(function() {
            $(this).toggleClass('hide');
            if ($(this).attr('data-ready')) {
                removeLoading();
            } else {
                $(this).attr('data-ready', false);
            }
        })
        $(".loader .sound").click(function() {
            if ($(".loader").hasClass('active')) {
                if ($(this).hasClass('off')) {
                    common.report(CONF.trackPrefix+'MusicOn');
                }else{
                    common.report(CONF.trackPrefix+'MusicOff');
                }
                $(this).toggleClass('off');
                game.closeBgMusic = !game.closeBgMusic;
            }
        })

        function removeLoading() {
            $('#loader').removeClass('active').addClass('scaleOut');
            setTimeout(function() {
                $('#loader').remove();
            }, 800);
        }

        // 添加跳转商品
        // popup.onShow(function(type, info, noAnim, $popup) {
        //     $popup.append([
        //     	'<div class="padt_p_goods">',
        //         	'<a class="padt_p_hide_btn" padt-handler="sku0">商详0</a>',
        //     		'<a class="padt_p_hide_btn" padt-handler="sku1">商详1</a>',
        //     		'<a class="padt_p_hide_btn" padt-handler="sku2">商详2</a>',
        //     	'</div>'
        //     ].join(''));
        // });
        popup.setTpl('popup', [
            '<div class="padt_p">',
            	'<p class="padt_p_overlay"></p>',
            	'<div class="padt_p_content" padt-role="content"></div>',
            	'<div class="padt_p_goods">',
            		'<a class="padt_p_hide_btn" padt-handler="sku0" style="background-image: url('+CONF.custom.goodsImgUrl[0]+')"></a>',
            		'<a class="padt_p_hide_btn" padt-handler="sku1" style="background-image: url('+CONF.custom.goodsImgUrl[1]+')"></a>',
            		'<a class="padt_p_hide_btn" padt-handler="sku2" style="background-image: url('+CONF.custom.goodsImgUrl[2]+')"></a>',
            	'</div>',
            '</div>'
        ].join(''));

        // 判断用户是否是登录返回
        if (opts.type === 'login') $('body').addClass('loginBack');
        popup.onTapHideBtn(function(popupType, $popup, event) {
        	if (popupType==='login') {
        		popup.fail();
        	}
        });
    },

    /**
     * 初始化“开始游戏”（第1次“开始游戏”前的处理函数）
     * @param {Object} opts - 参数
     *		@param {Boolean} opts.isFirst - 是否是第1次“开始游戏”
     *		@param {module:gameCustom~draw} opts.draw - 调用该方法后会立即抽奖并根据抽奖结果显示对应的弹框
     *		@param {String} type - 初始化类型，可能的值：normal（一般情况）、login（登录成功后返回）、back（跳转后返回）
     *		@param {Object} opts.custom - 自定义参数
     */
    initStart: function(opts) {
        if (!game.env.xview) {
        	game.wH = $(window).height();
        	var _top = (1334*$(window).width()/750 - game.wH)/2;
        	$("#game").css('top', '-'+_top+'px');
        }

        var mainLogic = new Phaser.Game({
            "width": 750,
            "height": 1334,
            "renderer": Phaser.CANVAS,
            "parent": 'game',
            "transparent": true
        });

        mainLogic.state.add('boot', require('./states/boot'));
        mainLogic.state.add('guide', require('./states/guide'));
        mainLogic.state.add('countDown', require('./states/countDown'));
        mainLogic.state.add('play', require('./states/play'));
        mainLogic.state.add('boss', require('./states/boss'));
        mainLogic.state.add('result', require('./states/result'));

        window.mainLogic = mainLogic;

        window.webviewVisible = function(isVisible){
            if (isVisible=='1') {
                mainLogic.paused = false;
            }else if (isVisible=='0') {
                mainLogic.paused = true;
            }
        }
    },

    /**
     * 由“普通流程”触发的“开始游戏”的处理函数
     * @param {Object} opts - 参数
     *		@param {Boolean} opts.isFirst - 是否是第1次“开始游戏”
     *		@param {module:gameCustom~draw} opts.draw - 调用该方法后会立即抽奖并根据抽奖结果显示对应的弹框
     *		@param {String} type - 初始化类型，可能的值：normal（一般情况）、login（登录成功后返回）、back（跳转后返回）
     *		@param {Object} opts.custom - 自定义参数
     */
    start: function(opts) {
        mainLogic.state.start('boot', true, false, {
            opts: opts
        });
    },

    /**
     * 由点击“再玩一次”触发的“开始游戏”的处理函数
     * @param {Object} opts - 参数
     *		@param {Boolean} opts.isFirst - 是否是第1次“开始游戏”
     *		@param {module:gameCustom~draw} opts.draw - 调用该方法后会立即抽奖并根据抽奖结果显示对应的弹框
     *		@param {String} type - 初始化类型，可能的值：normal（一般情况）、login（登录成功后返回）、back（跳转后返回）
     *		@param {Object} opts.custom - 自定义参数
     */
    restart: function(opts) {
    	if (opts.type!=='normal') {
    		mainLogic.state.start('boot', true, false, {
    		    opts: opts,
    		    skipGuide: true
    		});
    	}else{
            if (!game.closeBgMusic) {
                bgMusic.play();
            }
    		mainLogic.state.start('countDown', true, false, {
    		    opts: opts
    		});
    	}
    }
};