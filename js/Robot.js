class Robot {
    constructor(x,y,key,direct) {
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
    updateRobotBottom(e) {
        this.px = this.x;
        this.py = this.y;
        if(e == 38) {
            // up
            this.direct = 'up';
            //if(d)
        }else if(e == 40) {
            //down
            this.direct = 'down';
        }else if(e == 37) {
            // left
            this.direct = 'left';
        }else if(e == 39) {
            //right
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
}
