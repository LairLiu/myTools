var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ScaleView = (function (_super) {
    __extends(ScaleView, _super);
    function ScaleView() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    ScaleView.prototype.initView = function () {
        for (var i = 0; i < 123; i++) {
            var lineSpr = new egret.Sprite();
            lineSpr.graphics.beginFill(0xffffff, 1);
            lineSpr.graphics.drawRect(0, 0, 640, 10);
            lineSpr.graphics.endFill();
            this.addChild(lineSpr);
        }
    };
    return ScaleView;
}(egret.DisplayObjectContainer));
__reflect(ScaleView.prototype, "ScaleView");
