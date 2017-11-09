class Graphics {

    constructor(map, canvas) {
        this.map = map;
      //  console.log(map.getMap().toString());
        this.canvas = canvas;
        this.srcImg = "../img/Image/image/map.png";
        this.srcRock = "../img/Image/image/matran.png";
        this.srcRobot = "../img/Image/image/robot.png";
        this.arc1 = 0;
        this.srcRobot1 = "../img/Image/image/robot2.png";
        this.arc2 = 180;
        this.srcx = "../img/Image/image/x.png";
        this.srcd = "../img/Image/image/d.png";
      //  this.canvasMap(this.canvas);
    }

    canvasMap() {
        this.canvas.setBackgroundImage(this.srcImg,this.canvas.renderAll.bind(this.canvas));
        var array = this.map.getMap();
        var n = this.map.getHeigth();
        var arc = 0;
        var canvas2 = this.canvas;
        for (var i = 0;i < n;i++) {
            for (var j = 0; j < n; j++) {
                if (array[i][j] == 1) {
                    var x = i * 50 + 25;
                    var y = j * 50 + 25;
                    //console.log('(x,y)=' +'('+i+','+j+')');
                    fabric.Image.fromURL(this.srcRock, function (im) {
                        canvas2.add(im).renderAll.bind(canvas2);
                    }, {
                        left: x,
                        top:  y,
                        angle: arc,
                        hasControls: false,
                        selectable: false,
                        originX: 'center',
                        originY: 'center',
                        zIndex: 0
                    });
                }
            }
        }
        fabric.Image.fromURL(this.srcRobot, function (im) {
            canvas2.insertAt(im,canvas2.getObjects().length).renderAll.bind(canvas2);
        }, {
            left: 25,
            top: 25,
            angle: this.arc1,
            hasControls: false,
            selectable: false,
            originX: 'center',
            originY: 'center',
            zIndex: 1
        });
        fabric.Image.fromURL(this.srcRobot1, function (im) {
            canvas2.insertAt(im,canvas2.getObjects().length).renderAll.bind(canvas2);
           // console.log(canvas2.getObjects());
        }, {
            left: 10*50 + 25,
            top: 10*50 + 25,
            angle: this.arc2,
            hasControls: false,
            selectable: false,
            originX: 'center',
            originY: 'center',
            zIndex: 1
        });
    }

    animateRorate(Robot) {
        var src = "";
        if(Robot.key == 2) {
            src = this.srcx;
        }else {
            src = this.srcd;
        }
        var canvas = this.canvas;
        function goto() {
            fabric.Image.fromURL(src, function (image) {
                var item;
                if(Robot.key == 2) {
                    item = canvas.item(canvas.getObjects().length - 2);
                }else {
                    item = canvas.item(canvas.getObjects().length - 1);
                }
                if(Robot.direct == 'up' || Robot.direct == 'down') {
                    var y;
                    if(Robot.direct == 'down') {
                        y = Robot.py*50 + 75;
                    }else {
                        y = Robot.py*50 - 25;
                    }
                    item.animate('top',y,{
                        duration: 500,
                        onChange: canvas.renderAll.bind(canvas)
                    });

                }else {
                    var x;
                    if(Robot.direct == 'left') {
                        x = Robot.px * 50 - 25;
                    }else {
                        x = Robot.px * 50 + 75;
                    }
                    item.animate('left',x,{
                        duration: 500,
                        onChange: canvas.renderAll.bind(canvas)
                    });
                }
            });
        }
        fabric.Image.fromURL(src, function (image) {
            canvas.insertAt(image,0);
            if(Robot.key == 2) {
                canvas.item(canvas.getObjects().length - 2).animate('angle',Robot.arc, {
                    duration: 1000,
                    onChange: canvas.renderAll.bind(canvas),
                    onComplete: goto
                });
            }else {
                canvas.item(canvas.getObjects().length - 1).animate('angle',Robot.arc, {
                    duration: 1000,
                    onChange: canvas.renderAll.bind(canvas),
                    onComplete: goto
                });
            }
        }, {
            left: Robot.px*50 + 25,
            top: Robot.py*50 + 25,
            hasControls: false,
            selectable: false,
            zIndex: 0,
            originX: 'center',
            originY: 'center',
        });
    }

    getCanvas() {
        return this.canvas;
    }

}
