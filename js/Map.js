class Map {

    constructor(height, width, k) {
        this.heigth = height;
        this.width = width;
        this.k = k;
        this.map = [];
        this.mapZero();
        this.initMap(k);
    }

    mapZero() {
        for(var i = 0;i < this.heigth;i++) {
            var array = [];
            for(var j = 0;j < this.width;j++) {
                array.push(0);
            }
            this.map.push(array)
        }
    }

    updateMap(x,y,key) {
        this.map[x][y] = key;
    }

    checkMap(x,y) {;
        if(x > this.getHeight || y > this.getHeight || x < 0 || y < 0) {
            return false;
        }
        if(this.map[x][y] !== 0) {
            return false;
        }
        return true;
    }

    getHeigth() {
        return this.heigth;
    }

    setHeight(height) {
        this.heigth = height;
    }

    getWidth() {
        return this.width;
    }

    setWidth(width) {
        return this.width = width;
    }

    getMap() {
        return this.map;
    }

    setK(k){
        this.k = k;
    }

    getK(k) {
        return this.k;
    }

    setMap(map) {
        this.map = map;
    }

    Random(minInt,maxInt) {
        return Math.floor(Math.random()*(maxInt - minInt + 1) + minInt);
    }

    initMap(k){
        k = k/2;
        for(var i = 0;i < k;i++) {
            this.map[0][0] = 2;
            this.map[this.heigth - 1][this.heigth - 1] = 3;
            var x = this.Random(0,this.heigth - 1);
            var y = this.Random(0,this.heigth - 1 - x);
           /* if(this.map[x][y] == 2 || this.map[x][y] == 3)
                continue;*/
            this.map[x][y] = 1;
            this.map[this.heigth - 1 - x][this.heigth - 1 - y] = 1;
        }
    }

    checkWin() {
        var count2 = 0;
        var count3 = 0;
        for(var i = 0;i < this.heigth;i++) {
            for(var j = 0;j < this.width;j++) {
                if(this.map[i][j] == 2) count2 = count2 + 1;
                if(this.map[i][j] == 3) count3 = count3 + 1;
            }
        }
    }

}
