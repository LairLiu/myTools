class soundCtrlBtn extends egret.Bitmap {

    private onBtnTextureName: string;
    private offBtnTextureName: string;

    private _playNum: number;
    private _startTime: number;

    constructor(onBtnTextureName: string, offBtnTextureName: string, sound: egret.Sound, playNum: number = -1) {
        super();

        this.onBtnTextureName = onBtnTextureName;
        this.offBtnTextureName = offBtnTextureName;
        this._playNum = playNum;
        this._sound = sound;

        this.playType = "pause";

        this.createBtn();
    }

    private createBtn() {
        this.setTexture();

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startPlay, this);
        // this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.clickFunc, this);
    }

    private setTexture() {
        let textureName = this.playType == "play" ? this.onBtnTextureName : this.offBtnTextureName;

        this.texture = RES.getRes(textureName);
    }

    public startPlay() {
        if (this.playType == "pause") {
            this.playType = "play";

            if (!this._startTime) this._startTime = 0;

            if (this._sound)
                this._soundChannel = this._sound.play(this._startTime, this._playNum);

        } else {
            if (this._soundChannel) {
                this._startTime = this._soundChannel.position;

                this._soundChannel.stop();
            } else {

                // console.log(this.sound['name'], "没有声音可供停止");
            }
            this.playType = "pause";
        }

        this.setTexture();
    }

    private _playType: string;
    public set playType(type: string) {
        this._playType = type;
    }
    public get playType(): string {
        return this._playType;
    }

    private _soundChannel: egret.SoundChannel;
    private _sound: egret.Sound;
}