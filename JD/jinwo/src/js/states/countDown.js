var countDownState = {
    init: function(p) {
        if (p) {
            this.opts = p.opts;
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

        // 速度线背景
        mainLogic.add.sprite(0, 0, 'scene', 'speed-line');

        var number = mainLogic.add.group();
        number.create(375, 655, 'elements', 'count3').isCounted = true;
        number.create(375, 655, 'elements', 'count2').visible = false;
        number.create(375, 655, 'elements', 'count1').visible = false;
        number.create(375, 655, 'elements', 'count0').visible = false;
        number.setAll('anchor.x', 0.5);
        number.setAll('anchor.y', 0.5);
        number.forEach(function(ele) {
            if (ele.isCounted) {
                mainLogic.add.tween(ele.scale).from({ x: 0, y: 0 }, 500, Phaser.Easing.Bounce.Out, true, 0);
            }
        }, this);
        var timer = mainLogic.time.create(true);
        var toBreak = false;
        timer.repeat(Phaser.Timer.SECOND, 4, function() {
            toBreak = false;
            number.forEach(function(ele) {
                if (!toBreak) {
                    if (!ele.visible && !ele.isCounted) {
                        ele.visible = true;
                        mainLogic.add.tween(ele.scale).from({ x: 0, y: 0 }, 500, Phaser.Easing.Bounce.Out, true, 0);
                        ele.isCounted = true;
                        toBreak = true;
                    } else {
                        ele.visible = false;
                    }
                }
            }, this);
        }, this);
        timer.onComplete.add(function() {
            mainLogic.state.start('play', true, false, {
                opts: this.opts
            });
        }, this);
        timer.start();
    }
};

module.exports = countDownState;