
/** 
 * 创建dom对象，用于在index中进行操作
 */
class Dom {

    /**存放标签的父级标签 */
    public static get parent(): HTMLDivElement {
        return <HTMLDivElement>document.getElementById("gameID");
    };

    /**标签位置所对应的标识 */
    public static get positionFlag(): HTMLCanvasElement {
        return <HTMLCanvasElement>document.getElementsByTagName("canvas")[0]
    };

    /**初始left值 */
    public static get positionLeft(): number {
        return Number(this.positionFlag.style.left.replace("px", ""));
    }
    /**初始top值 */
    public static get positionTop(): number {
        return Number(this.positionFlag.style.top.replace("px", ""));
    }

    /**存放Dom对象的数组 */
    public static staticDomList: HTMLElement[] = [];

    /**创建IMG标签 */
    public static createImgElement(id: string, src: string, left: number, top: number, width: number, height: number, clickFunc: Function) {
        var img;
        if (!this.getDomById(id)) {
            img = document.createElement("img");
            img.id = id;
            this.staticDomList[id] = img;
        } else {
            img = this.getDomById(id);
            this.showDom(id);
        }
        img.src = src;
        img.onclick = function () {
            clickFunc();
        }// 别问我为什么要多写个匿名方法，我也不知道 20180418

        this.setDomPosition(id, left, top, width, height);

        this.parent.appendChild(img);
    }

    /**设置标签位置 */
    public static setDomPosition(id: string, left: number, top: number, width: number, height: number) {
        let dom: HTMLElement = this.getDomById(id);

        dom.style.position = "absolute";

        let wScale: number = Number(this.positionFlag.style.width.replace("px", "")) / 640;
        let hScale: number = document.body.clientHeight / wy.GameInterface.stage.stageHeight;

        // 按比例显示大小
        // dom.style.width = width * wScale + "px";
        // dom.style.height = height * hScale + "px";

        // // 根据canvas所在位置以及适配之后的位置进行设置
        // dom.style.left = `${this.positionLeft + left * wScale}px`;
        // dom.style.top = `${this.positionTop + (top - SmartScale.topDistance() / 2 * wScale)}px`;
        // if (egret.MainContext.instance.stage.scaleMode == "exactFit") {
        // if (id == "poster") {

        //     dom.style.height = "100%";
        // } else {

        //     dom.style.height = height * hScale + "px";
        //     dom.style.top = `${this.positionTop + (top - (1036 * (wScale - hScale) + SmartScale.topDistance() / 2) * hScale)}px`;
        // }
        // 因为已经小于1036，所以再继续使用canvas的高度做适配的话还会有问题
        // wScale = document.body.clientWidth / wy.GameInterface.stage.stageWidth;
        hScale = document.body.clientHeight / wy.GameInterface.stage.stageHeight;
        dom.style.width = width * wScale + "px";
        dom.style.height = height * hScale + "px";
        dom.style.left = (this.positionLeft + left * wScale) + "px";
        dom.style.top = (top - SmartScale.topDistance() / 2) * hScale + "px";// 根据适配方案，需要对创建的标签在body中进行位置调整，主要通过调整top值保持设计稿不变
        // }
    }

    /**根据id获取dom对象 */
    public static getDomById(id: string): HTMLElement {

        return this.staticDomList[id];
    }

    public static hideDom(id: string) {
        this.getDomById(id).style.display = "none";
    }

    public static showDom(id: string) {
        this.getDomById(id).style.display = "block";
    }
}