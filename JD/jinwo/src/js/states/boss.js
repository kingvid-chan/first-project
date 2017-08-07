var common = require('../common');
var bossState = {
    init: function(p) {
        if (p) {
        	this.opts = p.opts;
            this.bigMom_score = p.bigMom_score;
            this.my_score = p.my_score;
        }
        this.minSpeed = 20;
        this.maxSpeed = 30;
        this.mySpeed = 35;
        this.isGameOver = false;
        this.isClicked = false;
        this.isWin = false;
    },
    update: function() {
        if (!this.isGameOver) {
            var y = this.bar_line.y;
            if (y <= 500 || y >= 650) {
                this.bar_yellow.play('red');
            }else{
                this.bar_yellow.play('yellow');
            }
            if (y <= 427 || y >= 723) {
                this.isGameOver = true;
                this.me.body.velocity.y = 0;
                this.bar_line.body.velocity.y = 0;
                mainLogic.time.removeAll();

                if (y >= 723) {
                    this.my_score += 2;
                    this.isWin = true;
                    common.report(CONF.trackPrefix+'WinEgg');
                } else {
                    this.bigMom_score += 2;
                    common.report(CONF.trackPrefix+'LoseEgg');
                }

                mainLogic.state.start('result', true, false, {
                	opts: this.opts,
                    bigMom_score: this.bigMom_score,
                    my_score: this.my_score,
                    isWin: this.isWin,
                    isSuperGoodsCatched: true
                })
            }
        }
    },
    create: function() {
        // 半透明背景
        var bg = mainLogic.add.graphics();
        bg.lineStyle(0);
        bg.beginFill(0x000000, 0.9);
        bg.drawRect(0, 0, mainLogic.world.width, mainLogic.world.height);
        bg.endFill();
        this.bg = mainLogic.add.sprite(0, 0, bg.generateTexture());
        bg.destroy(true);
        // 准备页
        this.pre = mainLogic.add.group();
        this.pre.create(190, 0, 'elements', 'woerma');
        this.pre.create(130, 300, 'boss', 'pre-bg');
        this.myImage = this.pre.create(70, 245, 'boss', 'pre-me');
        this.bmImage = this.pre.create(173, 410, 'boss', 'pre-bm');
        this.fire = this.pre.create(390, 525, 'boss', 'pre-fire');
        this.fire.anchor.setTo(0.5);
        this.startBtn = this.pre.create(250, 1005, 'elements', 'btn1');
        this.startBtn.inputEnabled = true;
        mainLogic.time.events.add(1000, function() {
            this.startBtn.events.onInputDown.add(function() {
                if (this.pre.alive) {
                    this.pre.destroy(true);
                    this.FIGHT.visible = true;
                    this.reduceVelocity.start();
                    this.bg.destroy(true);
                }
            }, this);
        }, this);

        this.tips = this.pre.create(400, 910, 'elements', 'click-tips');
        mainLogic.add.tween(this.myImage).from({ x: 0, y: 0 }, 500, Phaser.Easing.Bounce.Out, true, 0);
        mainLogic.add.tween(this.bmImage).from({ x: 530, y: 850 }, 500, Phaser.Easing.Bounce.Out, true, 0);
        mainLogic.add.tween(this.fire.scale).from({ x: 0, y: 0 }, 500, Phaser.Easing.Bounce.Out, true, 0);

        // 拉锯页
        // 白色背景
        this.white_bg = mainLogic.add.graphics();
        this.white_bg.lineStyle(0);
        this.white_bg.beginFill(0xffffff, 1);
        this.white_bg.drawRect(0, 0, mainLogic.world.width, mainLogic.world.height);
        this.white_bg.endFill();
        this.bigMom = mainLogic.add.sprite(160, 216, 'boss', 'boss-bm1');
        this.bigMom.animations.add('pull', ['boss-bm2'], 5, false, false);
        this.bigMom.animations.add('loosen', ['boss-bm1'], 5, false, false);
        this.bigMom_bg = mainLogic.add.sprite(0, 0, 'boss', 'boss-bm-shake1');
        this.bigMom_bg.animations.add('pull', ['boss-bm-shake2'], 5, false, false);
        this.bigMom_bg.animations.add('loosen', ['boss-bm-shake1'], 5, false, false);
        mainLogic.physics.arcade.enable(this.bigMom);
        mainLogic.physics.arcade.enable(this.bigMom_bg);

        this.me = mainLogic.add.sprite(200, 640, 'boss', 'boss-pre-superGoods');
        this.myHand = mainLogic.add.sprite(-170, 70, 'boss', 'myHand');
        this.myHandShake = mainLogic.add.sprite(-190, 300, 'boss', 'myHand-shake1');
        this.myHandShake.animations.add('pull', ['myHand-shake2'], 5, false, false);
        this.myHandShake.animations.add('loosen', ['myHand-shake1'], 5, false, false);
        this.me.addChild(this.myHand);
        this.me.addChild(this.myHandShake);
        mainLogic.physics.arcade.enable(this.me);
        this.bar = mainLogic.add.group();
        this.bar.enableBody = true;
        this.bar_yellow = mainLogic.add.sprite(55, 430, 'elements', 'bar_yellow');
        this.bar_yellow.animations.add('red', ['bar-red'], 5, false, false);
        this.bar_yellow.animations.add('yellow', ['bar_yellow'], 5, false, false);
        this.bar.add(this.bar_yellow);
        this.bar_line = this.bar.create(47, 576, 'elements', 'bar_line');
        this.btn = mainLogic.add.sprite(280, 1005, 'elements', 'btn1');
        this.btn.animations.add('click', ['btn2', 'btn1'], 15, false, false);

        this.btn.inputEnabled = true;
        this.btn.events.onInputDown.add(function() {
            this.btn.play('click');
            if (!game.closeBgMusic){
                catchMusic.play();
            }
            
            if (!this.isGameOver) {
                this.bigMom.play('loosen');
                this.bigMom_bg.play('loosen');
                this.myHandShake.play('pull');
                this.me.body.velocity.y = this.bigMom.body.velocity.y = this.bigMom_bg.body.velocity.y = this.mySpeed;
                this.bar_line.body.velocity.y = (this.mySpeed * 4);
            }
            if (!this.isClicked) {
                common.report(CONF.trackPrefix+'GrabEgg');
                this.isClicked = true;
            }
        }, this);

        // add到同一个group中，方便统一管理
        this.FIGHT = mainLogic.add.group();
        this.FIGHT.add(this.white_bg);
        this.FIGHT.add(this.bigMom);
        this.FIGHT.add(this.bigMom_bg);
        this.FIGHT.add(this.me);
        this.FIGHT.add(this.bar);
        this.FIGHT.add(this.btn);
        this.FIGHT.visible = false;

        this.autoHideReady();

        // 循环增加商品向大妈的速度
        this.reduceVelocity = mainLogic.time.create(false);
        this.reduceVelocity.loop(Phaser.Timer.SECOND*0.3, function() {
            this.bigMom.play('pull');
            this.bigMom_bg.play('pull');
            this.myHandShake.play('loosen');
            var speed = mainLogic.rnd.integerInRange(this.minSpeed, this.maxSpeed);
            this.me.body.velocity.y = this.bigMom.body.velocity.y = this.bigMom_bg.body.velocity.y = -this.mySpeed;
            this.bar_line.body.velocity.y = -(speed * 4);
        }, this);
    },
    autoHideReady: function() {
        mainLogic.time.events.add(Phaser.Timer.SECOND * 4, function(){
            if (this.pre.alive) {
                this.pre.destroy(true);
                this.FIGHT.visible = true;
                this.reduceVelocity.start();
                this.bg.destroy(true);
            }
        }, this);
    }
};

module.exports = bossState;