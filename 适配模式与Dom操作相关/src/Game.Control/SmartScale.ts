/** 
 * @author lka
 * @version 0.0.1 
 * 
 * 屏幕适配控制类
 */
class SmartScale {

    /**body宽 */
    public static innerWidth: number;
    /**body高 */
    public static innerHeight: number;
    /**白鹭场景层 */
    public static egretStage: HTMLDivElement;
    /**设计稿的白鹭场景层宽 */
    public static egretWidth: number;
    /**设计稿的白鹭场景层高 */
    public static egretHeight: number;
    /**适配后白鹭canvas实际的宽 */
    public static stageWidth: number;
    /**适配后白鹭canvas实际的高 */
    public static stageHeight: number;

    /** 
     * 开启适配
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
            console.log("执行适配操作");

            egret.MainContext.instance.stage.scaleMode = egret.StageScaleMode.FIXED_NARROW;

            // this.egretStage.style.top = "50%";
            // this.egretStage.style.transform = " translateY(-50%)";
            // this.egretStage.style["-webkit-transform"] = " translateY(-50%)";
        }
        if (this.innerWidth / this.innerHeight > this.egretWidth / this.egretHeight) {
            egret.MainContext.instance.stage.scaleMode = "exactFit";
        }
         if (!this.isAndroid() && !this.isiOS()) {
            egret.MainContext.instance.stage.scaleMode = "showAll";

            console.log("检测系统，不进行适配，并替换模式");
            // return;
        }

        this.stageWidth = egret.MainContext.instance.stage.stageWidth;
        this.stageHeight = egret.MainContext.instance.stage.stageHeight;

        wy.GameInterface.sceneContainer.y -= this.topDistance() / 2;
        wy.GameInterface.viewContainer.y -= this.topDistance() / 2;
        wy.GameInterface.PopUpContainer.y -= this.topDistance() / 2;
        wy.GameInterface.MsgContainer.y -= this.topDistance() / 2;

        console.log("适配操作：原始尺寸：", this.egretWidth, this.egretHeight, "适配后尺寸:", this.stageWidth, this.stageHeight, "模式：", egret.MainContext.instance.stage.scaleMode);
    }
    /**
     * 检测设计尺寸与实际尺寸的差值
     * @return {number} dis 差值
     */
    public static topDistance(): number {
        let dis = (1236 - this.stageHeight);

        return dis;
    }

    /**
     * 图片适配，填满整个显示区域
     * 
     * @static
     * @param {egret.Texture} texture 用户选择的纹理
     * @param {egret.Bitmap} img 需要装载纹理的容器
     * @param {{ mask?: egret.DisplayObject, width?: number, height?: number }} data 需要用来做宽高限定的遮罩或宽高
     * @returns error 当传值错误时打印错误
     * @memberof SmartScale
     */
    public static scaleImg(texture: egret.Texture, img: egret.Bitmap, data: { mask?: egret.DisplayObject, width?: number, height?: number }) {
        let W: number, H: number;
        if (data.mask) {
            W = data.mask.width;
            H = data.mask.height;
        } else {
            if (!data.width) return console.error("data.width is notFound");
            if (!data.height) return console.error("data.height is notFound");

            W = data.width;
            H = data.height;
        }

        // 调整图片，根据遮罩的大小来适应显示的大小
        if (img.width <= img.height) {

            img.width = W;
            let h = W / texture.textureWidth;
            img.height = h * texture.textureHeight;
        } else if (img.height < img.width) {

            img.height = H;
            var h = H / texture.textureHeight;
            img.width = h * texture.textureWidth;
        }
    }


    private static isAndroid() {
        let u = navigator.userAgent;
        return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端    
    }
    private static isiOS() {
        let u = navigator.userAgent;
        return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端  
    }
}