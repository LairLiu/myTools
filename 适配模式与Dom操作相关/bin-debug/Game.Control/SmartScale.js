var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * @author lka
 * @version 0.0.1 20180418
 *
 * 屏幕适配控制类,需配合框架使用
 */
var SmartScale = (function () {
    function SmartScale() {
    }
    /**
     * 开启适配
     */
    SmartScale.open = function () {
        // 白鹭容器
        this.egretStage = document.getElementsByClassName("egret-player")[0];
        // H5设计的宽度
        this.egretWidth = Number(this.egretStage.getAttribute("data-content-width"));
        // H5设计的高度
        this.egretHeight = Number(this.egretStage.getAttribute("data-content-height"));
        this.innerWidth = window.innerWidth;
        this.innerHeight = window.innerHeight;
        // 改变适配模式 ，使白鹭div居中
        if (this.innerWidth / this.innerHeight < this.egretWidth / this.egretHeight) {
            egret.MainContext.instance.stage.scaleMode = egret.StageScaleMode.FIXED_NARROW;
        }
        // 尺寸小于1036，做铺满处理
        if (this.innerWidth / this.innerHeight > this.egretWidth / this.egretHeight) {
            egret.MainContext.instance.stage.scaleMode = "exactFit";
        }
        // 电脑端，做适配
        if (!System.isAndroid() && !System.isiOS()) {
            egret.MainContext.instance.stage.scaleMode = "showAll";
        }
        this.stageWidth = egret.MainContext.instance.stage.stageWidth;
        this.stageHeight = egret.MainContext.instance.stage.stageHeight;
        // 此处为四个场景层
        // wy.GameInterface.sceneContainer.y -= this.topDistance() / 2;
        // wy.GameInterface.viewContainer.y -= this.topDistance() / 2;
        // wy.GameInterface.PopUpContainer.y -= this.topDistance() / 2;
        // wy.GameInterface.MsgContainer.y -= this.topDistance() / 2;
        console.log("适配操作：", "原始尺寸：", this.egretWidth, this.egretHeight, "适配后尺寸:", this.stageWidth, this.stageHeight, "适配值:", this.topDistance() / 2, "模式：", egret.MainContext.instance.stage.scaleMode);
    };
    /**
     * 检测设计尺寸与实际尺寸的差值
     * @return {number} dis 差值
     */
    SmartScale.topDistance = function () {
        var dis = (1236 - this.stageHeight);
        return dis;
    };
    return SmartScale;
}());
__reflect(SmartScale.prototype, "SmartScale");
