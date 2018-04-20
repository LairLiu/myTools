/** 
 * 屏幕适配控制类,需配合框架使用
 * 
 * @author lka
 * @version 0.0.1 20180418
 * @class SmartScale
 */
class SmartScale {

    /**body宽 */
    public static innerWidth: number;
    /**body高 */
    public static innerHeight: number;
    /**白鹭场景层 */
    public static egretStage: HTMLDivElement;
    /**白鹭场景层宽 */
    public static egretWidth: number;
    /**白鹭场景层高 */
    public static egretHeight: number;
    /**白鹭canvas舞台宽度 */
    public static stageWidth: number;
    /**白鹭canvas舞台高度 */
    public static stageHeight: number;

    /**
     * 开启适配
     * 
     * @static
     * @memberof SmartScale
     */
    public static open() {
        // 白鹭容器
        this.egretStage = <HTMLDivElement>document.getElementsByClassName("egret-player")[0];
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

        // 此处为需要适配的四个场景层
        // wy.GameInterface.sceneContainer.y -= this.topDistance() / 2;
        // wy.GameInterface.viewContainer.y -= this.topDistance() / 2;
        // wy.GameInterface.PopUpContainer.y -= this.topDistance() / 2;
        // wy.GameInterface.MsgContainer.y -= this.topDistance() / 2;

        console.log("适配操作：",
            "原始尺寸：", this.egretWidth, this.egretHeight,
            "适配后尺寸:", this.stageWidth, this.stageHeight,
            "适配值:", this.topDistance() / 2,
            "模式：", egret.MainContext.instance.stage.scaleMode);
    }

    /**
     * 检测设计尺寸与实际尺寸的差值
     * 
     * @static
     * @returns {number} 差值
     * @memberof SmartScale
     */
    public static topDistance(): number {
        let dis = (egret.MainContext.instance.stage.height - this.stageHeight);

        return dis;
    }
}