var resultState = {
    init: function(p) {
        if (p) {
            this.opts = p.opts;
            this.bigMom_score = p.bigMom_score;
            this.my_score = p.my_score;
            this.isWin = p.isWin;
            this.isSuperGoodsCatched = p.isSuperGoodsCatched;
        }
    },
    create: function() {
        // 半透明背景
        var bg = mainLogic.add.graphics();
        bg.lineStyle(0);
        bg.beginFill(0x000000, 0.9);
        bg.drawRect(0, 0, mainLogic.world.width, mainLogic.world.height);
        bg.endFill();
        mainLogic.add.sprite(0, 0, bg.generateTexture());
        bg.destroy(true);

        this.result = mainLogic.add.group();
        if (this.isSuperGoodsCatched) {
            if (this.isWin) {
                this.result.create(130, 230, 'result', 'result_suc');
            } else {
                this.result.create(180, 80, 'result', 'result_fail');
            }
        }

        var move = this.isSuperGoodsCatched ? 0 : -350;
        if (game.hasUserImage) {
            this.result.create(160, 880 + move, 'result', 'image_wrapper');
            this.user = this.result.create(162, 882 + move, 'user');
            this.userMask = mainLogic.add.graphics(162, 882 + move);
            this.result.add(this.userMask);
            this.userMask.beginFill(0xffffff);
            this.userMask.drawCircle(85, 85, 170);
            this.user.mask = this.userMask;
            this.user.scale.setTo(0.85);
        } else {
            this.result.create(160, 880 + move, 'result', 'user');
        }

        this.result.create(428, 880 + move, 'result', 'default_image');
        this.result.create(548, 986 + move, 'result', 'bm_tag')
        this.result.create(142, 986 + move, 'result', 'me_tag');
        this.result.create(285, 950 + move, 'result', 'vs')

        // 我抢了几件
        var text1 = mainLogic.add.text(137, 1090 + move, '共抢了     件', { fontSize: '30px', fill: '#fff' }),
            text2 = mainLogic.add.text(245, 1110 + move, this.my_score, { fontSize: '48px', fill: '#f20040' }),
            // 大妈抢了几件
            text3 = mainLogic.add.text(425, 1090 + move, '共抢了     件', { fontSize: '30px', fill: '#fff' }),
            text4 = mainLogic.add.text(533, 1110 + move, this.bigMom_score, { fontSize: '48px', fill: '#f20040' });

        text2.anchor.setTo(0.5);
        text4.anchor.setTo(0.5)
        this.result.add(text1);
        this.result.add(text2);
        this.result.add(text3);
        this.result.add(text4);

        mainLogic.time.events.add(1000, function() {
            mainLogic.input.onDown.addOnce(function() {
                this.showResult();
            }, this);
        }, this)

        mainLogic.time.events.add(Phaser.Timer.SECOND * 2, function() {
            this.showResult();
        }, this);
    },
    showResult: function() {
    	if (!this.result.isDestroy) {
    		this.result.destroy(true);
    		this.result.isDestroy = true;
    		// 抽奖
            if (this.my_score>this.bigMom_score) {
                this.opts.draw();
            }else{
                game.popup.lose();
            }
            bgMusic.pause();
    	}
    }
};

module.exports = resultState;