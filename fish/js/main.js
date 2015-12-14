Crafty.init(windowWidth, windowHeight, document.getElementById('game'));
Crafty.sprite(50,"images/ball.png",{
    ball:[0,0]
});

var windowWidth = $(window).width(),
    windowHeight = $(window).height(),
    Balls_Num = 120,     //飞动的球的数量
    Balls_Arr =[],      //数组  存储飞动的球
    HitNum = 0,         //大鱼已吃小鱼的数量
    BallWidth,          //飞动的球的宽度
    MAXBallWidth = 80,  //飞动的球的最大宽度
//初始化拖动的小球    
    DragBall = Crafty.e('2D, DOM, Draggable, Collision')
                      .attr({x: windowWidth/2-10, y: windowHeight/2-10, w: 20, h: 20})
                      .enableDrag()
                      .bind("Dragging",function(e){
                        this.y = e.realY - 80;
                      }),
//缓存 Balls_Num 个飞动的球                     
    FlyBalls_Init = function(){
        for (var i = 0; i < Balls_Num; i++) {
            if (i<15 || i>20&&i<35 || i>50&&i<80 || i>100&&i<120)   BallWidth = Crafty.math.randomInt(5,30);
                else   BallWidth = Crafty.math.randomInt(5,MAXBallWidth);
            var Ball = Crafty.e("2D, Canvas, ball, Collision")
                                .attr({
                                    x:-80,
                                    y:Crafty.math.randomInt(0,windowHeight),
                                    w:BallWidth,
                                    h:BallWidth,
                                    dX:0,
                                    dY:MAXBallWidth/(BallWidth+20)
                                })
                                .bind('EnterFrame', function () {
                                    if (this.y < -100 || this.y > windowHeight+100)    this.dY *= -1;
                                    if (this.x > windowWidth+100 || this.x < -100)  this.dX *= -1;

                                    this.x += this.dX;
                                    this.y += this.dY;
                                })
                                .onHit("Draggable",function(){
                                	var m = this.hit("Draggable");
                                	if (this.attr('w')<=DragBall.attr('w')) {
                                	    this.attr({
                                	        w:0,
                                	        h:0
                                	    })
                                	    var _w=DragBall.attr('w');
                                	    DragBall.attr({
                                	        w:_w+0.5,
                                	        h:_w+0.5
                                	    });
                                	    HitNum++;
                                	    $("#Ltitle span").text(HitNum);
                                	}else if(m[0].overlap <= -9.5){
                                	    console.log(m[0].overlap);
                                	    Crafty.stop();
                                	    $("body").addClass("red");
                                	    $("#game").addClass("shake");
                                	    setTimeout(function(){
                                	        Game_Loop.over();
                                	    },500);
                                	}
                                });
            Balls_Arr.push(Ball);
        };

    },
//使球间歇性出现
    average = 1,  //所有球分批， 每批10个球
    modifyDX = function (){
        var time = 5000;
        var addSpeedInterval = setInterval(function(){
            for (var i = average-1; i <average; i++) {
                Balls_Arr[i].attr('dX',Crafty.math.randomInt(1,2));
            };
            average +=1;
            time += 1000;
            if (Balls_Arr[average]===undefined) {
                clearInterval(addSpeedInterval);
                return;
            };
        },time);
    },
    Game_Loop = {
        loading : function(){
            window.onload =function(){
                $('#loading').addClass('hide');
                $('#start').removeClass('hide');
            };
            return this;
        },
        start : function(){
            $('#start button').click(function(e){
                modifyDX();
                e.stopPropagation();
                $('#start').addClass('hide');
            })
            return this;
        },
        playing : function(){
            FlyBalls_Init();
            modifyDX();
            return this;
        },
        over : function(){
            $('#over').removeClass('hide');
            Crafty.stop();
            $('#over button').click(function(e){
                e.stopPropagation();
                window.location = "index.html";
            })
        },
        mainLoop : function(){
            this.loading().playing().start();
        }
    };
//游戏开始
Game_Loop.mainLoop();