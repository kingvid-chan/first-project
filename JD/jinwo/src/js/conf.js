var ENV = (function() {
        var ua = navigator.userAgent;
        return {
            xview: typeof XView != 'undefined', //是否是在xview中
            app: /jdapp/i.test(ua), //是否在京东app中
            wx: /MicroMessenger/i.test(ua), //是否在微信中
            qq: /MQQBrowser/i.test(ua) //是否在QQ中
        }
    })(), //当前环境
    CONF = {
        custom: { //自定义配置参数
            gameTime: 20, // 单位：秒
            // 大妈的名字
            bigMomName: [
                '老司机',
                '张大妈',
                '李大妈',
                '王大妈'
            ],
            goodsImgUrl:{
                0: '//img13.360buyimg.com/cms/jfs/t5926/336/8396067390/8637/c0d9b548/59880fe9N3032017c.jpg',
                1: '//img11.360buyimg.com/cms/jfs/t5620/359/9606508447/12252/957fcee6/59880fe9Na3bc2b28.jpg',
                2: '//img12.360buyimg.com/cms/jfs/t5683/85/9546258323/14607/c3e6d4b/59880fe9N557c34d2.jpg'
            }
        },
        popup: { //弹框的配置参数
            common: {
                prefix: 'efgy', //活动前缀标识
                end: {
                    year: 2017,
                    month: 8,
                    day: 8,
                    hour: 23,
                    minute: 59,
                    second: 59
                }, //活动结束时间
                preloads: [

                ]
            },
            default: {
                orders: [
                    'title',
                    'btns'
                ],
                linkTxt: '文字链文案',
                linkType: 'go',
                shareBtnTxt: '分享给好友',
                couponBtnTxt: '“去优惠券”按钮文案',
                loginBtnTxt: '',
                homeBtnTxt: '“回首页”按钮文案',
                goBtnTxt: '',
                replayBtnTxt: '再玩一次',
                retryBtnTxt: ''
            },
            //优惠券
            coupon: {
                orders: [
                    'title',
                    'subtitle',
                    'pack',
                    'btns'
                ],
                title: '',
                subtitle: '优惠券已发放至您的京东账户<br>可在“我的-优惠券”中查看',
                pack: [{
                    type: 'val',
                    val: '{val}'
                }, {
                    type: 'cond',
                    val: '满<span>{cond}</span>可用'
                }, {
                    type: 'cate',
                    val: '{cate}'
                }],
                packItemClass: 'padt_p_pack_item_{cls}',
                btns: ['go', 'share', 'replay']
            },
            //未中奖
            fail: {
                orders: [
                    'title',
                    'subtitle',
                    'btns'
                ],
                title: '',
                subtitle: '{title}',
                btns: ['go', 'share', 'replay']
            },
            //未登录
            login: {
                title: '',
                btns: ['login', 'hide']
            },
            //重试
            retry: {
                title: '',
                btns: ['retry']
            },
            // 自定义弹框 没抢赢弹层
            lose : {
                orders: [
                    'title',
                    'btns'
                ],
                title : '',
                btns: ['go', 'share', 'replay']
            }
        },

        functionId: 'babelActivityLuckDraw', //可选值：babelActivityLuckDraw、leGaoDrawCoupon

        //接口超时
        timeout: 7000,

        //主会场地址，如果按钮是回首页，可以置空
        mallURL: 'https://pro.m.jd.com/mall/active/2G88Je8mQ52ByHqPEEsMT3pvqZav/index.html',

        //指定商详id
        skuIds: {
            0: '1983951278',
            1: '12204202298',
            2: '12205137722'
        },

        //抽奖接口中的页面信息配置及默认抽奖moduleId配置
        lotteryConf: {
            activityId: '3z2VUGQhvS7tShyVe9c1jtPvTTUY',
            pageId: '96029',
            moduleId: [
                '34hayP2C9MkkuLGVtRR56L4WTg2y'
            ]
        },

        //客户端版本
        clientVersion: 540,

        //分享配置
        shareConf: {
            //缩略图图片地址
            img: '//img11.360buyimg.com/cms/jfs/t5680/268/9118706252/2311/c970c17f/5983d601Nba0e4a89.png',

            //长图分享图片地址
            longImg: '',

            //分享地址
            url: 'https://h5.m.jd.com/dev/3z2VUGQhvS7tShyVe9c1jtPvTTUY/index.html',

            //分享随机文案
            random: {
                //app
                app: {
                    key1: [{
                            url: 'https://h5.m.jd.com/dev/3z2VUGQhvS7tShyVe9c1jtPvTTUY/index.html',
                            title: '召唤我可爱的小伙伴，速速来！',
                            content: '快点来pk 赢了有优惠',
                            timeline_title: '震惊！竟然还有这种操作....'
                        },
                        {
                            url: 'https://h5.m.jd.com/dev/3z2VUGQhvS7tShyVe9c1jtPvTTUY/index.html',
                            title: '快来！鉴证你手速的时刻到啦~',
                            content: '我有个宝贝要给你...',
                            timeline_title: '什么抢东西还能再得优惠券？'
                        },
                        {
                            url: 'https://h5.m.jd.com/dev/3z2VUGQhvS7tShyVe9c1jtPvTTUY/index.html',
                            title: '嘿 快来为我疯狂打call',
                            content: '走过路过不能错过的抢购之战',
                            timeline_title: '一人我饮酒醉 88购物节来相惠'
                        }
                    ]
                },

                //微信，微信侧分享文案，不要配置{score}这种坑
                wx: [{
                            title: '召唤我可爱的小伙伴，速速来！',
                            content: '快点来pk 赢了有优惠',
                            timeline_title: '震惊！竟然还有这种操作....'
                        },
                        {
                            title: '快来！鉴证你手速的时刻到啦~',
                            content: '我有个宝贝要给你...',
                            timeline_title: '什么抢东西还能再得优惠券？'
                        },
                        {
                            title: '嘿 快来为我疯狂打call',
                            content: '走过路过不能错过的抢购之战',
                            timeline_title: '一人我饮酒醉 88购物节来相惠'
                        }
                ]
            }
        },

        //埋点前缀配置
        trackPrefix: 'Babel_dev_adv_',

        //埋点参数
        trackParam: {
            activityId: '00044275',
            groupId: '00582321',
            advertIds: {
                LotteryInterface: '05751780',
                InterfaceSucceed: '',
                Egg: '05751779',
                AutoStart: '05751778',
                StartGame: '05751777',
                Grab: '',
                GrabSucceed: ''
            }
        },

        //状态码文案
        subTitleConf: {
            default: '优惠券被领光\n下次记得早点来', //默认文案，用于code!=0情况
            content: [

                //code
                '没有可领的券啦\n下次记得早点来', //1
                '优惠券被领光\n下次记得早点来', //-1
                '优惠券被领光\n下次记得早点来', //-701

                //subcode
                '优惠券被领光\n下次记得早点来', //1
                '优惠券被领光\n下次记得早点来', //-1
                '优惠券被领光\n下次记得早点来', //1-1;1-2;1-3;1-4
                '没有可领的券啦\n下次记得早点来', //3-1;3-2
                '优惠券被领光\n下次记得早点来', //2-1
                '您已经领到\n足够多的优惠券啦', //4-2
                '您已经领到\n足够多的优惠券啦', //4-5
                '优惠券被领光\n下次记得早点来', //5-1;5-2;5-3;5-4
                '优惠券被领光\n下次记得早点来', //6-2;6-3;6-4
                '优惠券被领光\n下次记得早点来', //6-1
                '优惠券被领光\n下次记得早点来' //else
            ]
        }
    };