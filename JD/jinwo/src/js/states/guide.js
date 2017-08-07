var common = require('../common');
var guideState = {
	init: function(p){
		if (p) {
		    this.opts = p.opts;
		}
	},
	create: function(){
		// 半透明背景
		var bg = mainLogic.add.graphics();
		bg.lineStyle(0);
		bg.beginFill(0x000000, 0.9);
		bg.drawRect(0, 0, mainLogic.world.width, mainLogic.world.height);
		bg.endFill();
		mainLogic.add.sprite(0, 0, bg.generateTexture());
		bg.destroy(true);

		mainLogic.add.sprite(115, 500, 'elements', 'guide-tit');
		this.sound = mainLogic.add.sprite(40, this.getRelativePos(50, 0), 'widget', 'sound-btn-on');
		this.sound.animations.add('closeBgMusic', ['sound-btn-close'], 5, false, false);
		this.sound.animations.add('openBgMusic', ['sound-btn-on'], 5, false, false);
		this.sound.inputEnabled = true;
		this.sound.closeBgMusic = game.closeBgMusic ? true : false;
		this.soundTips = mainLogic.add.sprite(100, 0, 'widget', 'close-sound-tips');
		this.sound.addChild(this.soundTips);

		bgMusic.onDecoded.addOnce(function(){
			this.checkRulesShow();
			
			if (game.closeBgMusic) {
				this.sound.play('closeBgMusic');
				this.soundTips.visible = false;
				bgMusic.pause();
			}
		}, this);

		this.sound.events.onInputDown.add(function() {
			if (this.sound.closeBgMusic) {
				this.sound.play('openBgMusic');
				this.soundTips.visible = true;
				bgMusic.play();
				common.report(CONF.trackPrefix+'MusicOn');
			}else{
				this.sound.play('closeBgMusic');
				this.soundTips.visible = false;
				bgMusic.pause();
				common.report(CONF.trackPrefix+'MusicOff');
			}
			game.closeBgMusic = this.sound.closeBgMusic = !game.closeBgMusic;
		}, this);

		this.rule = mainLogic.add.sprite(40, this.getRelativePos(50, 100), 'widget', 'act-rule');
		this.rule.inputEnabled = true;
		this.rule.events.onInputDown.add(function() {
			$(".rules").removeClass('hide');
			common.report(CONF.trackPrefix+'Rule')
		}, this);

		this.btn = mainLogic.add.sprite(250, 980, 'elements', 'start-btn');
		this.btn.inputEnabled = true;
		this.btn.events.onInputDown.add(function() {
		    this.closeGuide();
		    common.report(CONF.trackPrefix + 'StartGame',CONF.trackParam.activityId+'_'+CONF.trackParam.advertIds['StartGame']+'_'+CONF.trackParam.groupId+'_1')
		}, this);

		this.hand = mainLogic.add.sprite(430, 1000, 'elements', 'hand');
		this.handShake = mainLogic.add.tween(this.hand).to({ y: 950}, 1000, Phaser.Easing.Linear.None, true, 0, Number.POSITIVE_INFINITY, true);
		this.handShake.start();

	},
	closeGuide: function(){
		mainLogic.state.start('countDown', true, false, {
            opts: this.opts
        });
	},
	checkRulesShow: function(){
		mainLogic.time.events.add(Phaser.Timer.SECOND * 5, function(){
			if ($(".rules").hasClass('hide')) {
				this.closeGuide();
		    	common.report(CONF.trackPrefix + 'AutoStart',CONF.trackParam.activityId+'_'+CONF.trackParam.advertIds['AutoStart']+'_'+CONF.trackParam.groupId+'_1')
			}else{
				this.checkRulesShow();
			}
		}, this);
	},
	getRelativePos: function(basic, y){
	    if (!game.env.xview) {
	        return (basic+100+y);
	    }else return (basic + y);
	}
}

module.exports = guideState;