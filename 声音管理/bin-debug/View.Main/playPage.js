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
var playPage = (function (_super) {
    __extends(playPage, _super);
    function playPage() {
        var _this = _super.call(this) || this;
        _this.createChildren();
        return _this;
    }
    playPage.getInstance = function () {
        if (!this.playPage)
            this.playPage = new playPage();
        return this.playPage;
    };
    playPage.prototype.createChildren = function () {
        var bg = new egret.Shape();
        bg.graphics.beginFill(0xffffff, 1);
        bg.graphics.drawRect(0, 0, 640, 1136);
        bg.graphics.endFill();
        this.addChild(bg);
        var bgm = RES.getRes("bgm_mp3");
        var bgmText = new egret.TextField();
        var btn = new soundCtrlBtn("btn_on_png", "btn_off_png", bgm);
        this.addChild(btn);
        // btn.startPlay();
        btn.x = 400;
        btn.y = 200;
    };
    return playPage;
}(egret.DisplayObjectContainer));
__reflect(playPage.prototype, "playPage");
