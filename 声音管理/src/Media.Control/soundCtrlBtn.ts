class soundCtrlBtn extends egret.Bitmap {

    private onBtnTextureName: string;
    private offBtnTextureName: string;

    private playType: string;

    private playFunc: Function;
    private pauseFunc: Function;

    constructor(onBtnTextureName: string, offBtnTextureName: string, playFunc: Function, pauseFunc: Function, pause: boolean = false) {
        super();

        this.onBtnTextureName = onBtnTextureName;
        this.offBtnTextureName = offBtnTextureName;

        this.playFunc = playFunc;
        this.pauseFunc = pauseFunc;

        this.createBtn(pause);
    }

    private createBtn(pause?) {
        if (pause) {

            this.playType = "pause";
            this.texture = RES.getRes(this.offBtnTextureName);
        } else {
            this.playFunc();

            this.playType = "paly";
            this.texture = RES.getRes(this.onBtnTextureName);
        }

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeType, this);
    }

    public changeType() {

        if (this.playType == "paly") {
            this.pauseFunc();

            this.playType = "pause";

            this.texture = RES.getRes(this.offBtnTextureName);
        } else {
            this.playFunc();

            this.playType = "paly";

            this.texture = RES.getRes(this.onBtnTextureName);
        }
    }
}