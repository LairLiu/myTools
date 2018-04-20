class ScaleView extends egret.DisplayObjectContainer {
    constructor() {
        super();
        this.initView();
    }

    private initView() {
        for (let i = 0; i < 123; i++) {
            var lineSpr = new egret.Sprite();
            lineSpr.graphics.beginFill(0xffffff, 1);
            lineSpr.graphics.drawRect(0, 0, 640, 10);
            lineSpr.graphics.endFill();
            this.addChild(lineSpr);
        }
    }
}