
/** 
 * @class Dom
 * @author lair
 * @version 0.0.1 20180420
 * 
 * 创建dom对象，用于在index中进行操作
 */
class Dom {

    /**
     * 存放所有被创建的Dom对象的数组
     * 
     * @static
     * @type {HTMLElement[]}
     * @memberof Dom
     */
    public static staticDomList: HTMLElement[] = [];

    /**
     * 通过id获取dom值
     * 
     * @static
     * @param {string} id 
     * @returns {HTMLElement} 
     * @memberof Dom
     */
    public static getDomById(id: string): HTMLElement {

        let domObj = this.staticDomList[id];
        if (!domObj) document.getElementById(id);

        return domObj;
    }

    /**
     * 通过id显示标签
     * 
     * @static
     * @param {string} id 
     * @memberof Dom
     */
    public static showDomById(id: string) {
        this.getDomById(id).style.display = "block";
    }

    /**
     * 通过id隐藏标签
     * 
     * @static
     * @param {string} id 
     * @memberof Dom
     */
    public static hideDomById(id: string) {
        this.getDomById(id).style.display = "none";
    }

    /**
     * 标签位置所对应的标识
     * 在index中白鹭引擎绘制的canvas标签，通过获取标签来获取初始位置
     * 
     * @readonly
     * @static
     * @type {HTMLCanvasElement}
     * @memberof Dom
     */
    public static get positionFlag(): HTMLCanvasElement {
        return <HTMLCanvasElement>document.getElementsByTagName("canvas")[0]
    };

    /**
     * 获取初始位置，距离左边的值
     * 
     * @readonly
     * @static
     * @type {number}
     * @memberof Dom
     */
    public static get positionLeft(): number {
        return Number(this.positionFlag.style.left.replace("px", ""));
    }

    /**
     * 获取初始位置，距离右边的值
     * 
     * @readonly
     * @static
     * @type {number}
     * @memberof Dom
     */
    public static get positionTop(): number {
        return Number(this.positionFlag.style.top.replace("px", ""));
    }

    /**
     * 设置被创建出来的标签的位置
     * 所有的位置都是相对于整个白鹭canvas层设置的，会自动进行适配
     * 
     * @static
     * @param {string} id Dom id，用于获取或操作
     * @param {number} left 
     * @param {number} top 
     * @param {number} width 
     * @param {number} height 
     * @memberof Dom
     */
    public static setDomPosition(id: string, left: number, top: number, width: number, height: number) {

        let dom: HTMLElement = this.getDomById(id);

        let wScale: number = Number(this.positionFlag.style.width.replace("px", "")) / 640;
        // 因为已经小于1036，所以再继续使用canvas的高度做适配的话还会有问题
        let hScale: number = document.body.clientHeight / egret.MainContext.instance.stage.stageHeight;

        // 按比例显示大小
        var w = width * wScale + "px";
        var h = height * hScale + "px";
        var x = (this.positionLeft + left * wScale) + "px";
        var y = (top - SmartScale.topDistance() / 2) * hScale + "px";// 根据适配方案，需要对创建的标签在body中进行位置调整，主要通过调整top值保持设计稿不变

        this.setStyle(id, ["position", "absolute"], ["width", w], ["height", h], ["left", x], ["top", y]);
    }

    /**
     * 装载被创建的标签的父Div
     * 此处取值为装载白鹭canvas的div
     * 
     * @readonly
     * @static
     * @type {HTMLDivElement}
     * @memberof Dom
     */
    public static get parent(): HTMLDivElement {
        return <HTMLDivElement>document.getElementsByClassName("egret-player")[0];
    };

    /**
     * 创建img标签，单位为白鹭使用的宽高
     * 
     * @static
     * @param {string} id id
     * @param {string} src src
     * @param {number} left left
     * @param {number} top top
     * @param {number} width width
     * @param {number} height height
     * @param {Function} [clickFunc] 点击事件
     * @memberof Dom
     */
    public static createImgElement(id: string, src: string, left: number, top: number, width: number, height: number, clickFunc?: Function) {
        var img: HTMLImageElement;
        if (!this.getDomById(id)) {
            img = document.createElement("img");
            img.id = id;
            this.staticDomList[id] = img;
        } else {
            img = <HTMLImageElement>this.getDomById(id);
            this.showDomById(id);
        }
        img.src = src;
        img.onclick = function () {
            clickFunc();
        }// 别问我为什么要多写个匿名方法，我也不知道 20180418

        this.setDomPosition(id, left, top, width, height);

        this.parent.appendChild(img);
    }

    /**
     * 创建Html标签
     * 
     * @static
     * @param {string} id 
     * @param {number} left 
     * @param {number} top 
     * @param {number} width 
     * @param {number} height 
     * @memberof Dom
     */
    public static createHtmlElement(id: string, elementType: string, left: number, top: number, width: number, height: number, clickFunc?: Function) {

        var element = document.createElement(elementType);
        element.id = id;

        this.staticDomList[id] = element;
        this.parent.appendChild(element);

        this.setDomPosition(id, left, top, width, height);
    }

    /**
     * 设置标签属性
     * 
     * @static
     * @param {string} id 
     * @param {[string, string]} [key, value] [属性,值]
     * @param {...[string, string][]} option [属性,值][] 
     * @memberof Dom
     */
    public static setAttribute(id: string, [key, value]: [string, string], ...option: [string, string][]) {
        var element = this.getDomById(id);
        element.setAttribute(key, value);
        for (let i = 0, len = option.length; i < len; i++) {
            element.setAttribute(option[i][0], option[i][1]);
        }
    }

    /**
     * 设置style
     * 
     * @static
     * @param {string} id 
     * @param {[string, string]} [key, value] [属性,值]
     * @param {...[string, string][]} option [属性,值][] 
     * @memberof Dom
     */
    public static setStyle(id: string, [key, value]: [string, string], ...option: [string, string][]) {
        var element = this.getDomById(id);

        element.style[key] = value;
        for (let i = 0, len = option.length; i < len; i++) {
            element.style[option[i][0]] = option[i][1];
        }
    }
}