class game extends egret.DisplayObjectContainer {
    constructor() {
        super();

        this.createChirldren();
    }

    private map: Map;
    private createChirldren() {
        this.map = new Map();
        this.addChild(this.map);
    }
}