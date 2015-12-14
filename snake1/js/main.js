Crafty.init(windowWidth, windowHeight, document.getElementById('game'));

var windowWidth = $(window).width(),
    windowHeight = $(window).height(),
    SnakeArr =[],           //存储碰撞到的黑球变量，方便做处理
    FoodsArr = [],          //缓存食物（待碰撞黑球）
    Score =0,               //得分
    TargetScore = 50,       //目标分数
    hitNum = 0,             //吃到的食物的个数
//蛇头初始化
    snakeHead = Crafty.e("2D, DOM, Draggable, Collision")
                        .attr({x:windowWidth/2-10,y:windowHeight/2-10,w:20,h:20,posX:0,posY:0})
                        .enableDrag()
                        .bind("Dragging",function(e){
                            snakeHead.posY = this.y = e.realY-50;
                            snakeHead.posX = e.realX;
                        })
                        .checkHits("SnakeBody")
                        .bind("HitOn",function(){
                            Game_Loop.over();
                        }),
//游戏开始前缓存50个球
    Balls_Cache = function(){
        for (var i = 0; i < 50; i++) {
            FoodsArr[i] = Crafty.e("2D, DOM, Collision, Tween, Food")
                                    .attr({x:Crafty.math.randomNumber(20, windowWidth-40),y:Crafty.math.randomNumber(20, windowHeight-40),w:0,h:20})
                                    .css({"border-radius":"999px","background-color":"black"})
                                    .checkHits("Draggable")
                                    .bind("HitOn",function(){
                                        this.ignoreHits("Draggable");
                                        SnakeArr.push(this);
                                        if (hitNum>=1) {
                                            SnakeArr[hitNum-1].addComponent('SnakeBody');
                                        };
                                        hitNum++;
                                        Score++;
                                        $("#title span").text(Score);
                                        if (Score>=TargetScore) {
                                            $("#win").removeClass('hide');
                                        };
                                    });
        }
    },
//食物初始化
    Food_Init = function(){
        var i = 0;
        FoodsArr[i].attr({w:20});
        i++;
        var FoodInterval = setInterval(function(){
            FoodsArr[i].attr({w:20});
            i++;
            if (i>=49) {
                clearInterval(FoodInterval);
            }
        },3000);
    },
//另外一个canvas,原生canvas,用来实现基于两点坐标画线
    ctx,
    Another_Canvas_Init = function(){
        var c = document.getElementById('cas');
        c.width = windowWidth;
        c.height = windowHeight;
        ctx = c.getContext('2d');
    },
//基于两点坐标划线    
    DrawLine = function(){
        ctx.beginPath();
        ctx.clearRect(0,0,windowWidth,windowHeight);
        ctx.moveTo(SnakeArr[0].x+10,SnakeArr[0].y+10);
        for (var i = 1; i < SnakeArr.length; i++) {
            ctx.lineTo(SnakeArr[i].x+10,SnakeArr[i].y+10);
        }
        ctx.stroke();
        ctx.closePath();
        var i = SnakeArr.length-1;
        if (i>=0) {
            var sX = SnakeArr[i].x+10;
            var sY = SnakeArr[i].y+10;
            ctx.beginPath();
            ctx.moveTo(sX,sY);
            ctx.lineTo(snakeHead.posX+5,snakeHead.posY+5);
            ctx.stroke();
            ctx.closePath();
        }else return;
    },
//让蛇动起来
    MoveSnake = function(){
        var len = SnakeArr.length-1;
        if (len >=0) {
            for (var i = 0; i < len; i++) {
                SnakeArr[i].tween({x:SnakeArr[i+1].x,y:SnakeArr[i+1].y},150);
            };
            SnakeArr[len].tween({x:(snakeHead.posX + SnakeArr[len].x)/2,y:(snakeHead.posY + SnakeArr[len].y)/2},150);
        }
    },
//游戏主循环    
    Game_Loop = {
        loading : function(){
            window.onload =function(){
                $('#loading').addClass('hide');
                $('#start').removeClass('hide');
            };
            return this;
        },
        start : function(){
            $('#start button').click(function(){
                Food_Init();
                $('#start').addClass('hide');
            })
            return this;
        },
        over : function(){
            $('#over').removeClass('hide');
            Crafty.stop();
            $('#over button,#win button').click(function(){
                window.location.reload();
            });
            return this;
        },
        playing : function(){
            Crafty.bind("EnterFrame",function(){
                this.timer.FPS(150);
                MoveSnake();    //蛇移动的帧
                if (SnakeArr.length>=1) {
                    DrawLine(); //两个球之间的连线  变化的帧
                }
            });
        },
        mainLoop : function(){
            this.loading();
            Balls_Cache();
            Another_Canvas_Init();
            this.start().playing();
        }
    };
//游戏开始
Game_Loop.mainLoop();