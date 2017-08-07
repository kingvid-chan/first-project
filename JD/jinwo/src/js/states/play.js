var common = require('../common');
var playState = {
    init: function(p) {
        if (p) {
            this.opts = p.opts;
        }
        // 统计用户点击次数
        this.clicks = 0;
        this.winClicks = 0;
        // 清理部分会影响restart的缓存
        this.checkSuperGoodsCollide = undefined;
        this.superGoods = undefined;
        this.isWin = false;

        this.superPos = [500, 600];
        this.superCatchTimes = 1;

        this.bigMom_score = this.my_score = 0;
        this.superGoodsIsReady = this.superGoodsIsCatched = false;
        // 手抓时的速度
        this.catchAniTime = 100;
        // 大妈抓 的最大时间间隔
        this.bigMom_catchMinTime = 200;
        this.bigMom_catchMaxTime = 2000;
        // 总游戏时间
        this.gameTime = CONF.custom.gameTime;
        // 大妈的名字
        this.bm_name = this.trimName(CONF.custom.bigMomName[Math.floor(Math.random() * CONF.custom.bigMomName.length + 1)-1]);
        // 我的名字
        this.myname = game.userName ? this.trimName(game.userName) : '我';
    },
    update: function() {
        // 检测是否抓取成功
        mainLogic.physics.arcade.overlap(this.collideBlock, this.goods, function(collideBlock, goods) {
            if (!this.superGoodsIsReady) {
                if (!goods.isCatched) {
                    goods.isCatched = true;
                    goods.body.velocity.x = 0;
                    var tween = mainLogic.add.tween(goods);
                    tween.onComplete.add(function() {
                        goods.kill();
                    });
                    if (!collideBlock.win) {
                        tween.to({ y: 500, alpha: 0 }, 150, Phaser.Easing.Linear.None, true);
                        if (!goods.isWrong) {
                            this.bigMom_score++;
                            this.bigMom_report.setText(this.bigMom_score);
                        }
                    } else {
                        tween.to({ y: 870, alpha: 0 }, 150, Phaser.Easing.Linear.None, true);
                        if (!goods.isWrong) {
                            this.my_score++;
                            this.winClicks++;
                            this.my_report.setText(this.my_score);
                        }
                    }
                }
            }
        }, null, this);

        if (this.checkSuperGoodsCollide && this.superGoods && Phaser.Rectangle.intersects(this.checkSuperGoodsCollide.getBounds(), this.superGoods.getBounds())) {
            this.superGoodsIsCatched = true;
        } else {
            this.superGoodsIsCatched = false;
        }

        // 升级大妈  第二版
        mainLogic.physics.arcade.overlap(this.superBigMom, this.goods, function(superBigMom, goods){
            if (!this.superGoodsIsReady && !this.isTips) {
                if (!goods.isChecked) {
                    goods.isChecked = true;
                    if (!goods.isWrong) {
                        this.activeBigMom2();
                    }
                    this.superCatchTimes = Math.floor(Math.random() * 2 + 1);
                    this.superBigMom.x = this.superPos[this.superCatchTimes-1]+mainLogic.rnd.integerInRange(-100, 100);
                }
            }
        }, null, this);
    },
    create: function() {
        // 超市背景
        mainLogic.add.sprite(0, 0, 'scene', 'supermarket');

        // 倒计时
        mainLogic.add.sprite(560, this.getRelativePos(110, 0, true), 'elements', 'time-con');
        mainLogic.add.text(597, this.getRelativePos(110, 35, true), '剩      秒', { fontSize: '25px', fill: '#000' });
        this.countDown = mainLogic.add.text(643, this.getRelativePos(110, 50, true), this.gameTime, { fontSize: '36px', fill: '#f20040' });
        this.countDown.anchor.setTo(0.5);
        // 大妈
        this.bigMom = mainLogic.add.sprite(137, 316, 'elements', 'bm_hand1');
        this.bigMom.animations.add('catch', ['bm_hand2', 'bm_hand3', 'bm_hand1'], 15, false, false);
        this.bigMom.animations.add('halfCatch', ['bm_hand2'], 15, false.false);

        // 传送带上的商品
        this.goods = mainLogic.add.group();
        this.goods.enableBody = true;

        var movingGoods = mainLogic.time.create(true);
        movingGoods.repeat(Phaser.Timer.SECOND, this.gameTime - 2, function() {
            this.countDown.setText(--this.gameTime);
            this.createGoods();
        }, this);
        movingGoods.onComplete.add(function() {
            mainLogic.time.events.add(Phaser.Timer.SECOND, function() {
                this.createGoods(false, true);
                this.countDown.setText(--this.gameTime);

                mainLogic.time.events.add(Phaser.Timer.SECOND, function() {
                    this.createGoods(true);
                    this.countDown.setText(--this.gameTime);

                    this.checkSuperGoodsCollide = mainLogic.add.sprite(375, 750, this.cache_collideBlock.generateTexture());
                    mainLogic.physics.arcade.enable(this.checkSuperGoodsCollide);

                    mainLogic.time.events.add(Phaser.Timer.SECOND*3, function(){
                        common.report(CONF.trackPrefix+'Grab', this.clicks);
                        common.report(CONF.trackPrefix+'GrabSucceed', this.winClicks);
                        this.goods.destroy(true);
                        mainLogic.state.start('result', true, false, {
                            bigMom_score: this.bigMom_score,
                            my_score: this.my_score,
                            isWin: false,
                            opts: this.opts
                        })
                    }, this);
                }, this);
            }, this);
        }, this);
        movingGoods.start();

        // 我
        this.leftHand = mainLogic.add.sprite(175, 1200, 'hand', 'myHand-left');
        this.leftHand.anchor.setTo(0.5);
        this.leftHandTween = mainLogic.add.tween(this.leftHand).to({ y: 950, angle: 15 }, this.catchAniTime).to({ y: 1200, angle: 0 }, this.catchAniTime);
        this.leftHandTween.onComplete.add(function() {
            this.btn.isCatching = false;
        }, this);
        this.rightHand = mainLogic.add.sprite(568, 1200, 'hand', 'myHand-right');
        this.rightHand.anchor.setTo(0.5);
        this.rightHandTween = mainLogic.add.tween(this.rightHand).to({ y: 950, angle: -15 }, this.catchAniTime).to({ y: 1200, angle: 0 }, this.catchAniTime);
        this.leftHalfTween = mainLogic.add.tween(this.leftHand).to({ y: 950, angle: 15 }, this.catchAniTime);
        this.leftHalfTween.onComplete.add(function() {
            this.superGoods.body.velocity.x = 0;
            mainLogic.time.events.add(Phaser.Timer.SECOND*0.2, function() {
                common.report(CONF.trackPrefix+'Grab', this.clicks);
                common.report(CONF.trackPrefix+'GrabSucceed', this.winClicks);
                this.goods.destroy(true);
                mainLogic.state.start('boss', true, false, {
                    bigMom_score: this.bigMom_score,
                    my_score: this.my_score,
                    opts: this.opts
                });
            }, this);
        }, this);
        this.rightHalfTween = mainLogic.add.tween(this.rightHand).to({ y: 950, angle: -15 }, this.catchAniTime);
        // 检测碰撞的代替块
        this.cache_collideBlock = mainLogic.add.graphics();
        this.cache_collideBlock.boundsPadding = 0;
        this.cache_collideBlock.lineStyle(1, 0x000000, 0);
        this.cache_collideBlock.beginFill();
        this.cache_collideBlock.moveTo(0, 0);
        this.cache_collideBlock.lineTo(0, 1);
        this.cache_collideBlock.endFill();
        this.collideBlock = mainLogic.add.group();
        this.collideBlock.enableBody = true;

        // 已抢 统计
        mainLogic.add.sprite(5, 425, 'elements', 'report-con');
        mainLogic.add.sprite(5, this.getRelativePos(1168, 0), 'elements', 'report-con');
        mainLogic.add.text(123, 449, this.bm_name, { fill: "#1c1c1c", fontSize: '25px' })
        mainLogic.add.text(123, this.getRelativePos(1168, 25), this.myname, { fill: "#1c1c1c", fontSize: '25px' });
        mainLogic.add.text(123, 490, '已抢      个', { fill: '#1c1c1c', fontSize: '25px' })
        mainLogic.add.text(123, this.getRelativePos(1168, 63), '已抢      个', { fill: '#1c1c1c', fontSize: '25px' })
        this.bigMom_report = mainLogic.add.text(195, 505, '0', { fill: '#f20040', fontSize: '36px' });
        this.bigMom_report.anchor.setTo(0.5);
        this.my_report = mainLogic.add.text(195, this.getRelativePos(1168, 78), '0', { fill: '#f20040', fontSize: '36px' });
        this.my_report.anchor.setTo(0.5);
        // 大妈默认头像
        mainLogic.add.sprite(22, 441, 'elements', 'default_image_small');
        // 我的头像
        if (game.hasUserImage) {
            this.user = mainLogic.add.sprite(22, this.getRelativePos(1168, 12), 'user');
            this.useMmask = mainLogic.add.graphics(22, this.getRelativePos(1168, 12));
            this.useMmask.beginFill(0xffffff);
            this.useMmask.drawCircle(47, 47, 94);
            this.user.mask = this.useMmask;
            this.user.scale.setTo(0.475);
        } else {
            mainLogic.add.sprite(22, this.getRelativePos(1168, 12), 'elements', 'user-small');
        }

        // 按钮
        this.btn = mainLogic.add.sprite(250, 1005, 'elements', 'btn1');
        this.btn.animations.add('click', ['btn2', 'btn1'], 15, false, false);
        this.btn.inputEnabled = true;
        this.btn.events.onInputDown.add(function() {
            this.btn.play('click');
            this.clicks++;
            if (!game.closeBgMusic){
                catchMusic.play();
            }
            
            if (this.superGoodsIsCatched) {
                this.i_catch(true);
            } else {
                if (!this.btn.isCatching) {
                    this.i_catch();
                }
            }
        }, this);

        this.sound = mainLogic.add.sprite(40, this.getRelativePos(50, 0, true), 'widget', 'sound-btn-on');
        this.sound.animations.add('closeBgMusic', ['sound-btn-close'], 5, false, false);
        this.sound.animations.add('openBgMusic', ['sound-btn-on'], 5, false, false);
        if (game.closeBgMusic) {
            this.sound.play('closeBgMusic');
        }
        this.sound.inputEnabled = true;
        this.sound.events.onInputDown.add(function() {
            if (game.closeBgMusic) {
                this.sound.play('openBgMusic');
                bgMusic.play();
                common.report(CONF.trackPrefix+'MusicOn');
            }else{
                this.sound.play('closeBgMusic');
                bgMusic.pause();
                common.report(CONF.trackPrefix+'MusicOff');
            }
            game.closeBgMusic = !game.closeBgMusic;
        }, this);

        // 激活大妈的抓取动作
        // mainLogic.time.events.add(1000, function() {
        //     this.activeBigMom();
        // }, this);

        /*
        * 升级大妈 第二版
        */
        this.superBigMom = mainLogic.add.sprite(500, 750, this.cache_collideBlock.generateTexture());
        mainLogic.physics.arcade.enable(this.superBigMom);
        /*
        * 第二版 end
        */

        window.catchMusic = new Phaser.Sound(mainLogic, 'catch', 0.5, false);
    },
    getRelativePos: function(basic, y, isPlus) {
        if (!game.env.xview) {
            return isPlus ? basic + 100 + y : basic - 150 + y;
        } else return (basic + y);
    },
    createGoods: function(isBoss, isTips) {
        if (isBoss) {
            console.log('终极争夺战开始!');
            this.superGoodsIsReady = true;
            // 终极争夺大战之商品
            this.superGoods = this.goods.create(mainLogic.world.width + 1, 630, 'elements', 'superGoods');
            this.superGoods.checkWorldBounds = true;
            this.superGoods.outOfBoundsKill = true;
            this.superGoods.body.velocity.x = -400;
        } else if (isTips) {
            // 终极争夺大战的文字提示
            var tips = this.goods.create(mainLogic.world.width + 1, 757, 'elements', 'tips');
            tips.checkWorldBounds = true;
            tips.outOfBoundsKill = true;
            tips.body.velocity.x = -400;
            tips.isTips = true;
        } else {
            var num = mainLogic.rnd.integerInRange(1, 4);
            var goods = this.goods.create(mainLogic.world.width + 1, 600, 'elements', 'goods' + num);
            if (num === 1) goods.isWrong = true;
            var radius = 20;

            goods.body.setCircle(
                radius,
                (-radius + 0.5 * goods.width / goods.scale.x),
                (-radius + 0.5 * goods.height / goods.scale.y)
            );
            goods.checkWorldBounds = true;
            goods.outOfBoundsKill = true;
            goods.body.velocity.x = -400;
        }
    },
    bigMom_catch: function() {
        this.bigMom.animations.play('catch');
        if (!game.closeBgMusic) {
            catchMusic.play();
        }
        this.activeCollideBlock(true);
    },
    i_catch: function(isBoss) {
        this.btn.isCatching = true;
        if (!isBoss) {
            this.leftHandTween.start();
            this.rightHandTween.start();
            this.activeCollideBlock();
        } else {
            this.bigMom.animations.play('halfCatch');
            this.leftHalfTween.start();
            this.rightHalfTween.start();
            common.report(CONF.trackPrefix+'Egg', CONF.trackParam.activityId+'_'+CONF.trackParam.advertIds['Egg']+'_'+CONF.trackParam.groupId+'_1');
        }
    },
    activeCollideBlock: function(isBigMom) {
        var _this = this;
        setTimeout(function() {
            var block = _this.collideBlock.create(375, 750, _this.cache_collideBlock.generateTexture());
            block.win = isBigMom ? false : true;
            // 显示碰撞块之后  100毫秒之后自动隐藏
            setTimeout(function() {
                block.kill();
            }, 100);
        }, _this.catchAniTime);
    },
    // activeBigMom: function() {
    //     var _this = this;
    //     setTimeout(function() {
    //         if (!_this.superGoodsIsReady) {
    //             _this.bigMom_catch();
    //             _this.activeBigMom();
    //         }
    //     }, mainLogic.rnd.integerInRange(_this.bigMom_catchMinTime, _this.bigMom_catchMaxTime));
    // },
    activeBigMom2: function(){
        mainLogic.time.events.repeat(Phaser.Timer.SECOND * 0.25, this.superCatchTimes, function(){
            if (!this.superGoodsIsReady) {
                this.bigMom_catch();
            }
        }, this);
    },
    trimName: function(name){
        /* 处理过长的字符串，截取并添加省略号
         * 注：半角长度为1，全角长度为2
         * str:字符串
         * len:截取长度
         * return: 截取后的字符串
         */
        function cutbytestr(str, len) {
            var str_length = 0;
            var str_len = 0;
            var str_cut = new String();
            str_len = str.length;
            for (var i = 0; i < str_len; i++) {
                var a = str.charAt(i);
                str_length++;
                if (escape(a).length > 4) {
                    //中文字符的长度经编码之后大于4
                    str_length++;
                }
                str_cut = str_cut.concat(a);
                if (str_length >= len) {
                    str_cut = str_cut.concat("…");
                    return str_cut;
                }
            }
            //如果给定字符串小于指定长度，则返回源字符串；
            if (str_length < len) {
                return str;
            }
        }
        /* 取字符串长度
         * 注：汉字算两个字符，英文算一个字符
         * str:字符串
         * return: 长度
         */
        function getStrLength(str) {   
            var cArr = str.match(/[^\x00-\xff]/ig);   
            return str.length + (cArr == null ? 0 : cArr.length);   
        }

        if (getStrLength(name)>6) {
            return cutbytestr(name, 6);
        }else return name;
    },
    render: function() {
        // this.goods.forEachAlive(function(member) {
        //     mainLogic.debug.body(member)
        // }, this);

        // mainLogic.debug.body(this.bigMom);

        // mainLogic.debug.body(this.cache_collideBlock)
    }
};

module.exports = playState;