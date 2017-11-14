function RandomTurn(minInt,maxInt) {
    return Math.floor(Math.random()*(maxInt - minInt + 1) + minInt);
}

class ControllerGame {

    constructor(Robot1, Robot2,map,graphics) {
        this.robot1 = Robot1;
        this.robot2 = Robot2;
        this.map = map;
        this.graphics = graphics;
        this.turn = RandomTurn(2,3);
    }


    run(){
        console.log('turn is: ' + this.turn);
        this.actionEventKeyBoard(this.robot2);
        var running = true;
        var robot1 = this.robot1;
        var robot2 = this.robot2;
       // while(running) {
        function runS() {
            var checkWin = false;
            if (this.turn == 2) {
                var robotEnmey = new Point(robot2.x, robot2.y);
                var value = robot1.move(robotEnmey);
                if (value !== -1) {
                    this.actionRobot(robot1);
                    this.turn = 3;
                } else {
                    checkWin = true;
                }
            } else {
                checkWin = robot2.checkTerminal(robot2.x, robot2.y);
                //            console.log('window is: ' + window.event);
            }
            if (checkWin) {
                var win = this.map.checkWin(this.turn);
                console.log('Win is: ' + win);
                running = false;
            }
        }
        setInterval(runS, 2000);
        //}
    }

    updateTurn(){
        if(turn == 1) {
            turn = 2;
        }else {
            turn = 1;
        }
    }

    actionRobot(Robot) {
        graphics.animateRorate(Robot);
    }

    actionEventKeyBoard(Robot) {
        var map = this.map;
        var turn = this.turn;
        var event = function (e) {
            if(turn !== Robot.key) return;
            var x, y;
            if (e.keyCode == 38) {
                // up
                x = Robot.x + Robot.directX[0];
                y = Robot.y + Robot.directY[0];
                /*if (!map.checkMap(x, y))
                    return;
                map.updateMap(x,y,Robot.key);
                Robot.updateRobotTop(e.keyCode);
                graphics.animateRorate(Robot);*/
            }else if (e.keyCode == 40) {
                // down
                x = Robot.x + Robot.directX[1];
                y = Robot.y + Robot.directY[1];
                /*if(!map.checkMap(x,y)) return;
                map.updateMap(x,y,Robot.key);
                Robot.updateRobotTop(e.keyCode);
                graphics.animateRorate(Robot);*/
            }else if(e.keyCode == 37) {
                //left
                x = Robot.x + Robot.directX[2];
                y = Robot.y + Robot.directY[2];
                /*if(!map.checkMap(x,y))
                    return;
                map.updateMap(x,y,Robot.key);
                Robot.updateRobotTop(e.keyCode);
                graphics.animateRorate(Robot);*/
            }else if(e.keyCode == 39) {
                //right
                x = Robot.x + Robot.directX[3];
                y = Robot.y + Robot.directY[3];
            }
            if(typeof(x) == 'undefined' || typeof(y) == 'undefined')
                return;
            if (!map.checkMap(x, y))
                return;
            map.updateMap(x,y,Robot.key);
            Robot.updateRobotTop(e.keyCode);
            graphics.animateRorate(Robot);
        }
       // if(this.turn == Robot.key) {
        document.addEventListener('keydown', event, false);
        //}
      /*  if(check) {
            document.removeEventListener('keydown',event);
        }
        return check;*/
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
    getTurn() {
        return this.turn;
    }
    setTurn(turn) {
        this.turn = turn;
    }

}

