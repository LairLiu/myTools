class playPage extends egret.DisplayObjectContainer {
    constructor() {
        super();

        this.createChildren();
    }

    private static playPage: playPage;
    public static getInstance(): playPage {
        if (!this.playPage)
            this.playPage = new playPage();

        return this.playPage;
    }

    private async createChildren() {

        var bg: egret.Shape = new egret.Shape();
        bg.graphics.beginFill(0xffffff, 1);
        bg.graphics.drawRect(0, 0, 640, 1136);
        bg.graphics.endFill();
        this.addChild(bg);

        var bgm: egret.Sound = RES.getRes("bgm_mp3");

        var bgmText: egret.TextField = new egret.TextField();

        var btn = new soundCtrlBtn("btn_on_png", "btn_off_png", () => { SoundControl.play("kick", 1, 0) }, () => { SoundControl.stop() });
        this.addChild(btn);

        btn.x = 400;
        btn.y = 200;
    }
}