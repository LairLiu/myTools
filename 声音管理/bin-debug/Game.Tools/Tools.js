var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Tools = (function () {
    function Tools() {
    }
    Tools.createBitmapByName = function (textureName) {
        var bitmap = new egret.Bitmap();
        bitmap.texture = RES.getRes(textureName);
        return bitmap;
    };
    Tools.sleep = function (time) {
        var _this = this;
        return new Promise(function (resolve) {
            egret.setTimeout(function () {
                resolve();
            }, _this, time);
        });
    };
    return Tools;
}());
__reflect(Tools.prototype, "Tools");
