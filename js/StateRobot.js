class StateRobot {

    constructor(depth, x,y) {
        this.depth = depth;
        this.x = x;
        this.y = y;
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

    setDepth(depth) {
        this.depth = depth;
    }

    getDepth() {
        return this.depth;
    }
}
