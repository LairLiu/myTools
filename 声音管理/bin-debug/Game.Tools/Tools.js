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
    return Tools;
}());
__reflect(Tools.prototype, "Tools");
