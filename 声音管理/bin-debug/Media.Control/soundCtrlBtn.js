var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var soundCtrlBtn = (function (_super) {
    __extends(soundCtrlBtn, _super);
    function soundCtrlBtn(onBtnTextureName, offBtnTextureName, sound, playNum) {
        if (playNum === void 0) { playNum = -1; }
        var _this = _super.call(this) || this;
        _this.onBtnTextureName = onBtnTextureName;
        _this.offBtnTextureName = offBtnTextureName;
        _this._playNum = playNum;
        _this._sound = sound;
        _this.playType = "pause";
        _this.createBtn();
        return _this;
    }
    soundCtrlBtn.prototype.createBtn = function () {
        this.setTexture();
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startPlay, this);
        // this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.clickFunc, this);
    };
    soundCtrlBtn.prototype.setTexture = function () {
        var textureName = this.playType == "play" ? this.onBtnTextureName : this.offBtnTextureName;
        this.texture = RES.getRes(textureName);
    };
    soundCtrlBtn.prototype.startPlay = function () {
        if (this.playType == "pause") {
            this.playType = "play";
            if (!this._startTime)
                this._startTime = 0;
            if (this._sound)
                this._soundChannel = this._sound.play(this._startTime, this._playNum);
        }
        else {
            if (this._soundChannel) {
                this._startTime = this._soundChannel.position;
                this._soundChannel.stop();
            }
            else {
                // console.log(this.sound['name'], "没有声音可供停止");
            }
            this.playType = "pause";
        }
        this.setTexture();
    };
    Object.defineProperty(soundCtrlBtn.prototype, "playType", {
        get: function () {
            return this._playType;
        },
        set: function (type) {
            this._playType = type;
        },
        enumerable: true,
        configurable: true
    });
    return soundCtrlBtn;
}(egret.Bitmap));
__reflect(soundCtrlBtn.prototype, "soundCtrlBtn");
