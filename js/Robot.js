DEPTHLIMIT = 20;
DIEMTHUONG = 1000;
LIMIT = Number.MAX_SAFE_INTEGER;

class Point {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    getX() {
        return this.x;
    }
    setX(x) {
        this.x = x;
    }
    setY() {
        this.y = y;
    }
    getY() {
        return this.y;
    }
}

class Robot {
    constructor(x,y,key,direct ,map) {
        this.px = x;
        this.py = y;
        this.x = x;
        this.y = y;
        this.key = key;
        this.arc = 0;
        this.direct = direct;
        this.directX = [0, 0, -1, 1]; // up: '0'    down: '1'    left: '2'  right: '3'
        this.directY = [-1, 1, 0, 0];
        this.d = 0;
        this.map = map;
        this.createArc();
    }


    createArc() {
        if(this.direct == 'up') {
            this.arc = 180;
        }else if(this.direct == 'down') {
            this.arc = 0;
        }
    }
    getDirect(){
        return this.direct;
    }
    getDirectX() {
        return this.directX;
    }
    getDirectY() {
        return this.directY;
    }
    /*updatePosition(x,y) {
        this.px = this.x;
        this.py = this.y;
        this.x = x;
        this.y = y;
    }
*/
    updateRobotTop(e) {
        this.px = this.x;
        this.py = this.y;
        if(e == 38) {
            // up
            this.x = this.x + this.directX[0];
            this.y = this.y + this.directY[0];
            if(this.direct == 'left'){
                this.arc = this.arc + 90;
            }else if(this.direct == 'right'){
                this.arc = this.arc - 90;
            }
            this.direct = 'up';
            //if(d)
        }else if(e == 40) {
            //down
            this.x = this.x + this.directX[1];
            this.y = this.y + this.directY[1];
            if(this.direct == 'left') {
                this.arc = this.arc - 90;
            }else if(this.direct == 'right') {
                this.arc = this.arc + 90;
            }
            this.direct = 'down';
        }else if(e == 37) {
            // left
            this.x = this.x + this.directX[2];
            this.y = this.y + this.directY[2];
            if(this.direct == 'up') {
                this.arc = this.arc - 90;
            }else if(this.direct == 'down') {
                this.arc = this.arc + 90;
            }
            this.direct = 'left';

        }else if(e == 39) {
            //right
            this.x = this.x + this.directX[3];
            this.y = this.y + this.directY[3];
            if(this.direct == 'up') {
                this.arc = this.arc + 90;
            }else if(this.direct == 'down') {
                this.arc = this.arc - 90;
            }
            this.direct = 'right';
        }
    }

    getX() {
        return this.x;
    }
    setX(x) {
        this.x = x;
    }
    getY() {
        return this.y;
    }
    setY(y) {
        this.y = y;
    }

    getPX() {
        return this.x;
    }
    setPX(x) {
        this.x = x;
    }
    getPY() {
        return this.y;
    }
    setPY(y) {
        this.y = y;
    }

    setArc(arc) {
        this.arc = arc;
    }
    getArc() {
        return this.arc;
    }

    getKey() {
        return this.key;
    }

    setKey(key) {
        this.key = key;
    }

    getMap(){
        return this.map;
    }

    setMap(map) {
        this.map = map;
    }

    checkTerminal(x,y) {
        var newX = 0;
        var newY = 0;
        for(var i = 0;i < 4;i++) {
            newX = x + this.directX[i];
            newY = y + this.directY[i];
            if(this.map.checkMap(newX,newY)) {
                return false;
            }
        }
        return true;
    }

    move(RobotEnemy) {
        var ac = this.alphaBetaSearch(new StateRobot(0, this.x, this.y),RobotEnemy);
        if(ac.direction == -1) {
            return -1;
        }
        var e;
        var x,y;
        if(ac.direction == 0) {
            e = 38;
            x = this.x + this.directX[0];
            y = this.y + this.directY[0];
        }else if(ac.direction == 1) {
            e = 40;
            x = this.x + this.directX[1];
            y = this.y + this.directY[1];
        }else if(ac.direction == 2) {
            e = 37;
            x = this.x + this.directX[2];
            y = this.y + this.directY[2];
        }else if(ac.direction == 3) {
            e = 39;
            x = this.x + this.directX[3];
            y = this.y + this.directY[3];
        }
        this.map.updateMap(x,y,this.key);
        this.updateRobotTop(e);
        return ac.direction;
    }

    alphaBetaSearch(stateRobot,RobotEnemy) {
        var ac = this.maxValue(stateRobot, -LIMIT,LIMIT,RobotEnemy, this.key);
        return ac;
    }

    maxValue(state, alpha, beta, RobotEnemy, value, MaxDepth) {
        var currentScore = 0;
        if(this.checkTerminal(state.x,state.y)) {
            var r = new ActionRobot(-1, -DIEMTHUONG + state.depth);
            return r;
        }
        if(state.depth == DEPTHLIMIT) {
            var a = this.BFS(state.x, state.y);
            var b = this.BFS(RobotEnemy.x,RobotEnemy.y);
            currentScore = a - b;
            var size = this.map.getHeigth();
            for(var i = 0;i < size;i++) {
                for(var j = 0; j < size;j++) {
                    if (this.map.getMap()[i][j] == 4) {
                        this.map.updateMap(i,j,0);
                    }
                }
            }
            return new ActionRobot(-2,currentScore);
        }
        var v = -LIMIT;
        var vtv = -1;
        var xNew,yNew;
        for(var i = 0;i < 4;i++) {
            xNew = state.x + this.directX[i];
            yNew = state.y + this.directY[i];
            if (!this.map.checkMap(xNew, yNew)) {
                continue;
            }
            this.map.updateMap(xNew, yNew, value);
            var tmp = this.minValue(new StateRobot(state.depth + 1, RobotEnemy.x, RobotEnemy.y), alpha, beta, new Point(xNew, yNew),
                swap(value)).score;
            if(v < tmp) {
                v = tmp;
                vtv = i;
            }
            this.map.updateMap(xNew,yNew,0);
            if(v >= beta) return new ActionRobot(i,v);
            alpha = Math.max(v,alpha);
        }
        return new ActionRobot(vtv,v);
    }

    minValue(state, alpha, beta, RobotEnemy, value, MinDepth) {
        var currentScore = 0;
        if(this.checkTerminal(state.x,state.y)) {
            var r = new ActionRobot(-1, DIEMTHUONG - state.depth/2);
            return r;
        }
        if(state.depth == DEPTHLIMIT) {
           // console.log('min depth');
            currentScore = this.BFS(RobotEnemy.x,RobotEnemy.y) - this.BFS(state.x, state.y);
            var size = this.map.getHeigth();
            for(var i = 0;i < size;i++) {
                for(var j = 0;j < size;j++) {
                    if(this.map.getMap()[i][j] == 4){
                        this.map.updateMap(i,j,0);
                    }
                }
            }
            return new ActionRobot(-2, currentScore);
        }
     //   console.log('min depth 1');
        var v = LIMIT;
        var vtv = -1;
        var newX;
        var newY;
        for(var i = 0;i < 4;i++) {
            newX = state.x + this.directX[i];
            newY = state.y + this.directY[i];
            if(!this.map.checkMap(newX,newY)) {
                continue;
            }
            this.map.updateMap(newX,newY,value);
            var tmp = this.maxValue(new StateRobot(state.depth + 1,RobotEnemy.x, RobotEnemy.y), alpha, beta,
                new Point(newX, newY), swap(value)).score;
            if(v > tmp) {
                v = tmp;
                vtv = i;
            }
            this.map.updateMap(newX,newY, 0);
            if (v <= alpha) return new ActionRobot(i,v);
            beta = Math.min(v,beta);
        }
        return new ActionRobot(vtv,v);
    }

    BFS(x,y) {
        var res = 0;
        var xNew;
        var yNew;
        for(var i = 0;i < 4;i++) {
            var res1 = 0;
            xNew = x + this.directX[i];
            yNew = y + this.directY[i];
            if(this.map.checkMap(xNew, yNew) == false) continue;
            this.map.updateMap(xNew,yNew,4);
            res1 = res1 + this.BFS(xNew, yNew);
            if(res1 > res) res = res1;
        }
        return res + 1;
    }

}

function swap(x) {
    if(x == 2) return 3;
    return 2;
}
