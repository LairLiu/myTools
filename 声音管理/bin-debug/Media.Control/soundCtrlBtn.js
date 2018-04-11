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
    function soundCtrlBtn(onBtnTextureName, offBtnTextureName, playFunc, pauseFunc, pause) {
        if (pause === void 0) { pause = false; }
        var _this = _super.call(this) || this;
        _this.onBtnTextureName = onBtnTextureName;
        _this.offBtnTextureName = offBtnTextureName;
        _this.playFunc = playFunc;
        _this.pauseFunc = pauseFunc;
        _this.createBtn(pause);
        return _this;
    }
    soundCtrlBtn.prototype.createBtn = function (pause) {
        if (pause) {
            this.playType = "pause";
            this.texture = RES.getRes(this.offBtnTextureName);
        }
        else {
            this.playFunc();
            this.playType = "paly";
            this.texture = RES.getRes(this.onBtnTextureName);
        }
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeType, this);
    };
    soundCtrlBtn.prototype.changeType = function () {
        if (this.playType == "paly") {
            this.pauseFunc();
            this.playType = "pause";
            this.texture = RES.getRes(this.offBtnTextureName);
        }
        else {
            this.playFunc();
            this.playType = "paly";
            this.texture = RES.getRes(this.onBtnTextureName);
        }
    };
    return soundCtrlBtn;
}(egret.Bitmap));
__reflect(soundCtrlBtn.prototype, "soundCtrlBtn");
