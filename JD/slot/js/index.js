/**
 * @Author: Created By McChen
 * @Date: 2016/5/12
 * @Mail: chenjiahao@jd.com
 * @Version: V1.0.0
 */

(function () {
    var CLICKROCK = false;
    var ua = navigator.userAgent.toLowerCase();
    var isIos = ua.indexOf('ipad') > -1 || ua.indexOf('iphone') > -1 || false;
    var jrApp = ua.indexOf('jdjr') > -1 || ua.indexOf('android-async-http') > -1 || false;

    var token = "";
    var indexController = {
        timer: null,
        init: function () {
            var self = this;
            self.lightInit(800);   // 跑马灯初始化
            self.bindEvent();   // 绑定事件
            // 请求中奖信息列表
            //self.getAjaxData("../data/result.json", {}, "get", "json", self.successFn, self.failFn);
            self.getAjaxData("//btrim.jd.com/tiger/rewardRecords", {}, "get", "jsonp", self.successFn, self.failFn);
        },


        lightInit: function (t) {
            var self = this;
            self.timer = setInterval(function () {
                $(".light").toggleClass("move");
            }, t);
        },

        bindEvent: function () {
            var self = this;
            var count = 2;
            $("body").on("click", ".button", function (e) {  // 点击按钮 摇杆动
                if (CLICKROCK) return false;
                CLICKROCK = true;   // 锁定防止多次点击
                self.pageLock();    // 锁定页面

                userDetective.isLogin({ // 判断登录
                    autoLogin: true,
                    trueFn: successFn,
                    wqLoginUrl: "//wq.jd.com/pinbind/pintokenredirect?biz=hbrainactive&url="     // TODO: 上线删除-- 测试微信手Q专用
                    //loginUrl: "//passport.m.jd.com/user/login.action?v=1&returnurl="
                });
                function successFn(sid) {
                    token = decodeURIComponent(sid);
                    if (isIos) {
                        clearInterval(self.timer);
                        self.lightInit(100);
                    }

                    var $button = $(".button");
                    var $handler = $(".handler");
                    $button.off("transitionend webkitTransitionEnd").addClass("active").on("transitionend webkitTransitionEnd", function () {
                        $button.removeClass("active")
                    });
                    $handler.off("transitionend webkitTransitionEnd").addClass("active").on("transitionend webkitTransitionEnd", function () {
                        $handler.removeClass("active")
                    });
                    //self.getAjaxData("../data/price.json", {sid: token}, "get", "json", self.getDataFn, self.failFn);
                    self.getAjaxData("//btrim.jd.com/tiger/mobileDraw", {sid: token}, "get", "jsonp", self.getDataFn, self.failFn);
                }

            }).on("click", ".btn-close", function () {  // 关闭弹层
                CLICKROCK = false;
                if (isIos) {
                    clearInterval(self.timer);
                    self.lightInit(800);
                }
                //$(".alertLayer").removeClass("bounceIn").addClass("bounceOut");
                $(".windowMask").removeClass("show").children().remove();
                //$(".windowMask").hide();
                self.pageUnlock();  // 解锁页面
            }).on("click", ".btn-goShare", function () {    // 去分享按钮
                if (jrApp && window.jsBridgeV3 != undefined) {
                    window.jrBridge = window.jrBridge || jsBridgeV3.onReady();
                    var shareDate = {
                        appId: '',
                        img: 'http://img30.360buyimg.com/jr_image/jfs/t2731/93/1324176414/18178/c44f561e/573a8860Ndc426fab.png',
                        link: (window.location.origin + window.location.pathname),
                        desc: '打白条，狂购618！玩游戏抽大奖，最高得618元白条直降券，还有一大波福利正在袭来！！',
                        title: '[白条618]慎点！这个福利你很难拒绝！',
                        friendesc: '打白条，狂购618！玩游戏抽大奖，最高得618元白条直降券，还有一大波福利正在袭来！！',
                        type:''
                    }                    ;
                    window.jrBridge.then(function (res) {
                        this.jsToGetResp(function (d) {
                            d = typeof d == 'object' ? d : $.parseJSON(d);
                            if (d.data) {
                                return
                            }
                        }, {type: 4, shareDate: shareDate})
                    })
                } else {
                    $(".shareGuide").show();
                }
                if(count >0) {
                    self.getAjaxData("//btrim.jd.com/tiger/addCount", {sid: token}, "get", "jsonp", function (json) {
                        if(json.code == 200){
                            console.log("增加成功");
                        } else {
                            console.log("增加失败");
                        }
                    });
                    count--;
                }
            }).on("click", ".shareGuide", function () {
                $(this).hide();
            })
        },

        // 展示结果ajax成功回调
        successFn: function (json) {
            var $list = $(".result-list");
            var data = json || null;
            var list = data.prizeInfoLsit || [];
            var length = list.length;
            var tpl = $("#tpl_resultList").html();
            var str = "";
            for (var i = 0; i < length; i++) {
                var d = list[i];
                d.name = d.Id;
                d.coupon = d.Info;
                str += Tools.format(tpl, d);
            }
            $list.children().remove();
            $list.append(str);
            $(".slot-machine").off().on("animationEnd webkitAnimationEnd", function () {
                resultInit($list);  // 中奖区域初始化
            });

            // 结果轮播
            function resultInit(e) {
                var self = this;
                var dis = e.children().height();
                if (e.children().length < 4) {
                    return false;
                }
                var timer = setInterval(function () {
                    indexController.animate(e, "translate(0, -" + dis + "px) translateZ(0)", 0.5, "linear");
                    e.off().on("transitionend webkitTransitionEnd", function () {
                        indexController.animate(e, "translate(0,0) translateZ(0)", 0, "linear").find("li").eq(0).appendTo(e);
                    })
                }, 1000)
            }
        },

        // 抽奖ajax成功回调
        getDataFn: function (json) {
            var data = json || null;
            var args = null;
            switch (data.AccessType) {
                case "200":   // 已激活
                    if (data.PrizeCount > 0) {  // 可以抽奖
                        indexController.roll(data.GiftLevel); // 摇奖
                        var timerRoll = setTimeout(function () {
                            if (data.Prize) { // 中奖
                                args = {
                                    top: "恭喜您",
                                    bottom: data.PrizeMessage + "~",
                                    btnLeft: "去分享",
                                    leftSrc: "javascript:;",
                                    leftClass: "btn-goShare",
                                    shareClstag: "jr|keycount|newbthome|mlhjfx",
                                    btnRight: "关闭",
                                    rightSrc: "javascript:;",
                                    rightClass: "btn-close"
                                };
                            } else {    // 未中奖
                                args = {
                                    top: "谢谢参与",
                                    bottom: "白条君感谢您的参与~",
                                    btnLeft: "去分享",
                                    leftSrc: "javascript:;",
                                    leftClass: "btn-goShare",
                                    shareClstag: "jr|keycount|newbthome|mlhjfx",
                                    btnRight: "关闭",
                                    rightSrc: "javascript:;",
                                    rightClass: "btn-close"
                                };
                            }

                            indexController.fillAlert(args, timerRoll);
                        }, 2000);
                    } else if (data.PrizeCount == 0) {  // 不可抽奖
                        args = {
                            top: "已参加",
                            bottom: "您已参与过活动啦~",
                            btnLeft: "去分享",
                            leftSrc: "javascript:;",
                            leftClass: "btn-goShare",
                            shareClstag: "jr|keycount|newbthome|mlhjfx",
                            btnRight: "关闭",
                            rightSrc: "javascript:;",
                            rightClass: "btn-close"
                        };
                        indexController.fillAlert(args);
                    }
                    break;
                case "201":   // 未激活
                    args = {
                        top: "未激活",
                        bottom: "激活白条，送100元礼包~",
                        btnMiddle: "激活白条",
                        middleSrc: "//s.jr.jd.com/baitiao/index.action",
                        middleClass: "btn-activateBaitiao",
                        activateClstag: "jr|keycount|newbthome|mlhjjh"
                    };
                    indexController.fillAlert(args);
                    break;
                case "202":   // 账户异常
                    args = {
                        top: "账户异常",
                        bottom: "请及时查看账户信息",
                        btnMiddle: "查看账户",
                        middleSrc: "//m.jr.jd.com/jdbt/whitenotev4/index.html",
                        middleClass: "btn-lookAccount",
                        activateClstag: ""
                    };
                    indexController.fillAlert(args);
                    break;
                case "203":   // 网络错误
                    args = {
                        top: "网络错误",
                        bottom: "请收下我的膝盖，网络出错啦~",
                        btnMiddle: "关闭",
                        middleSrc: "javascript:;",
                        middleClass: "btn-close",
                        activateClstag: ""
                    };
                    indexController.fillAlert(args);
                    break;
                case "204":   // 系统错误
                    args = {
                        top: "系统错误",
                        bottom: "请收下我的膝盖，系统出错啦~",
                        btnMiddle: "关闭",
                        middleSrc: "javascript:;",
                        middleClass: "btn-close",
                        activateClstag: ""
                    };
                    indexController.fillAlert(args);
                    break;
                case "205":   // 活动结束
                    args = {
                        top: "活动已结束",
                        bottom: "更多活动等您光临~",
                        btnMiddle: "去看看",
                        middleSrc: "//ms.jr.jd.com/jrpmobile/baitiao/extend/portal?source=jdapp&sid=",
                        middleClass: "btn-lookMore",
                        activateClstag: ""
                    };
                    indexController.fillAlert(args);
                    break;
                case "206":   // 登录失效
                    userDetective.isLogin({ // 判断登录
                        haveLogin: true,
                        wqLoginUrl: "//wq.jd.com/pinbind/pintokenredirect?biz=hbrainactive&url="     // TODO: 上线删除-- 测试微信手Q专用
                        //loginUrl: "//passport.m.jd.com/user/login.action?v=1&returnurl="
                    });
                    break;
                case "207":   // 逾期用户
                    args = {
                        top: "逾期",
                        bottom: "抱歉，您有逾期订单~",
                        btnMiddle: "去还款",
                        middleSrc: "//m.jr.jd.com/jdbt/whitenotev4/index.html",
                        middleClass: "btn-payment",
                        activateClstag: ""
                    };
                    indexController.fillAlert(args);
                    break;
                case "208":   // 止付用户
                    args = {
                        top: "止付",
                        bottom: "抱歉，您有止付订单~",
                        btnMiddle: "去还款",
                        middleSrc: "//m.jr.jd.com/jdbt/whitenotev4/index.html",
                        middleClass: "btn-payment",
                        activateClstag: ""
                    };
                    indexController.fillAlert(args);
                    break;
                case "102":   // 活动未开始
                    args = {
                        top: "活动未开始",
                        bottom: "更多活动等您光临~",
                        btnMiddle: "去看看",
                        middleSrc: "//ms.jr.jd.com/jrpmobile/baitiao/extend/portal?source=jdapp&sid=",
                        middleClass: "btn-lookMore",
                        activateClstag: ""
                    };
                    indexController.fillAlert(args);
                    break;
                default :   // 默认

                    break;
            }
        },

        // ajax失败回调
        failFn: function () {
            var args = {
                top: "网络错误",
                bottom: "请收下我的膝盖，网络出错啦~",
                btnMiddle: "关闭",
                middleSrc: "javascript:;",
                middleClass: "btn-close"
            };
            indexController.fillAlert(args);
        },

        // 弹层数据填充
        fillAlert: function (d, timer) {
            var self = this;
            var tpl = $("#tpl_alertLayer").html();
            var str = "";
            str += Tools.format(tpl, d);
            $(".windowMask").append(str);

            if (isIos) {    // IOS增加飘落效果
                self.dropElement();
            } else {
                $(".leaves-inAndroid").css("display", "block")
            }

            if (!d.btnLeft) {
                $(".btn-left").remove();
            }
            if (!d.btnMiddle) {
                $(".btn-middle").remove();
            }
            if (!d.btnRight) {
                $(".btn-right").remove();
            }
            $(".windowMask").addClass("show");
            $(".alertLayer").css("display","block");
            var timerBounce = setTimeout(function () {
                $(".alertLayer").addClass("bounceIn");
                clearTimeout(timerBounce);
            },10);
            clearTimeout(timer)
        },

        // 抽奖
        roll: function (resultIdxArr) {
            resultIdxArr = resultIdxArr.sort();
            var self = this;
            var size = parseInt($("html").css("font-size"));
            var $rollItem = $(".roll-item");
            var dis = $rollItem.children().height();
            var startPos = 5.2 * size;
            var endPos = [(resultIdxArr[0] + 12) * dis + startPos, (resultIdxArr[1] + 12) * dis + startPos, (resultIdxArr[2] + 12) * dis + startPos];

            scroll(0, 1.1 + 0.02 * resultIdxArr[0]);
            scroll(1, 1.3 + 0.02 * resultIdxArr[1]);
            scroll(2, 1.5 + 0.02 * resultIdxArr[2]);

            function scroll(idx, time) { // 运动函数
                self.animate($rollItem.eq(idx), "translate(0, -" + startPos + "px) translateZ(0)", 0, "linear");
                setTimeout(function () {
                    self.animate($rollItem.eq(idx), "translate(0, -" + startPos + "px) translateZ(0)", 0, "linear");
                }, 10);
                var timer = setTimeout(function () {
                    self.animate($rollItem.eq(idx), "translate(0, -" + endPos[idx] + "px) translateZ(0)", time, "linear");
                    $rollItem.eq(idx).off("transitionend webkitTransitionEnd").on("transitionend webkitTransitionEnd", function () {
                        clearTimeout(timer)
                    })
                }, 100);
            }
        },

        // 掉漂浮物
        dropElement: function () {
            // 元素掉落效果
            new DropElement({
                sizeArr: [[9, 11], [15, 15], [12, 10], [12, 12], [17, 15], [25, 14], [12, 8]],
                count: 20,
                during: 3000,
                splitTime: 300,
                loop: true
            });
        },

        // 动画兼容处理
        animate: function (obj, target, time, type) {
            obj.css({
                "transition": time + "s",
                "-webkit-transition": time + "s",
                "transform": target,
                "-webkit-transform": target,
                "transition-timing-function": type,
                "-webkit-transition-timing-function": type
            });
            return obj;
        },

        // 发ajax请求
        getAjaxData: function (url, data, type, dataType, callback, fail) {
            $.ajax({
                url: url,
                data: data,
                type: type,
                dataType: dataType,
                success: function (data) {
                    callback && callback(data);
                },
                error: function () {
                    fail && fail();
                }
            })
        },

        // 锁定页面
        pageLock: function () {
            var self = this;
            document.addEventListener("touchmove", self.pageLockHandler, false)
        },

        // 解锁页面
        pageUnlock: function () {
            var self = this;
            document.removeEventListener("touchmove", self.pageLockHandler, false)
        },

        pageLockHandler: function (e) {
            e.preventDefault();
        }
    };

    $(function () {
        if (typeof module !== 'undefined' && module.exports) {
            module.exports.FastClick && module.exports(document.body);
        } else {
            FastClick && FastClick.attach(document.body);
        }

        window.share.setShare({
            "title": "[白条618]慎点！这个福利你很难拒绝！",
            "desc": "打白条，狂购618！玩游戏抽大奖，最高得618元白条直降券，还有一大波福利正在袭来！！",
            "link": (window.location.origin + window.location.pathname),
            "imgUrl": "http://img30.360buyimg.com/jr_image/jfs/t2731/93/1324176414/18178/c44f561e/573a8860Ndc426fab.png"
        });

        new PreLoad({
            tasks: [
                "../images/building.png",
                "../images/button.png",
                "../images/handler.png",
                "../images/logo.png",
                "../images/slot_machine.png",
                "../images/surrounding.png",
                "../images/title.png",
                "../css/img/light.png",
                "../css/img/light2.png",
                "../css/img/result.png",
                "../css/img/shine.png"
            ],
            finishedFn: function (total) {
                console.info("加载完成，共" + total + "个资源");

                $(".index-html").addClass("animate");

                indexController.init();
            }
        });
    })
}).call(window);

(function () {
    var Tools = {
        format: function (str) {
            var pattern = /\{([\w\-_]+)\}/gm;
            var arr = Array.prototype.slice.call(arguments, 1);
            var args = /\{(\d+)\}/.test(str) ? arr : arr[0];
            var formatStr = str.replace(pattern, function () {
                return args[arguments[1]];
            });
            return formatStr;
        }
    };
    window.Tools || (window.Tools = Tools);
}).call(window);