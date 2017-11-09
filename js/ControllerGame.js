class ControllerGame {

    constructor(Robot1, Robot2,map,graphics) {
        this.robot1 = Robot1;
        this.robot2 = Robot2;
        this.map = map;
        this.graphics = graphics;
        this.turn = 0;
    }

    run(){
        var running = true;
        while(running) {

        }
    }

    updateTurn(){
        if(turn == 1) {
            turn = 2;
        }else {
            turn = 1;
        }
    }


    actionEventKeyBoard(Robot) {
        console.log('case');
        map = this.map;
        var event = function (e) {
            console.log('case1');
            var x, y;
            if (e.keyCode == 38) {
                // up
                x = Robot.x + Robot.directX[0];
                y = Robot.y + Robot.directY[0];
                if (!map.checkMap(x, y))
                    return;
                map.updateMap(x,y,Robot.key);
                Robot.updateRobotTop(e.keyCode);
                graphics.animateRorate(Robot);
            }else if (e.keyCode == 40) {
                // down
                x = Robot.x + Robot.directX[1];
                y = Robot.y + Robot.directY[1];
                if(!map.checkMap(x,y)) return;
                map.updateMap(x,y,Robot.key);
                Robot.updateRobotTop(e.keyCode);
                graphics.animateRorate(Robot);
            }else if(e.keyCode == 37) {
                //left
            }else if(e.keyCode == 39) {
                //right
            }
        }
       // if(this.turn == Robot.key) {
        document.addEventListener('keydown', event);
        //}
     //   document.removeEventListener('keydown', event);
    }


    getMap(){
        return this.map;
    }
    setMap(map) {
        this.map = map;
    }
    getGraphics() {
        return this.graphics;
    }
    setGraphics(graphics) {
        this.graphics = graphics;
    }
    getRobot1() {
        return this.robot1
    }
    setRobot1(robot) {
        this.robot1 = robot;
    }
    getRobot2() {
        return this.robot1
    }
    setRobot2(robot) {
        this.robot1 = robot;
    }

}
