var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * @class Dom
 * @author lair
 * @version 0.0.1 20180420
 *
 * 创建dom对象，用于在index中进行操作
 */
var Dom = (function () {
    function Dom() {
    }
    /**
     * 通过id获取dom值
     *
     * @static
     * @param {string} id
     * @returns {HTMLElement}
     * @memberof Dom
     */
    Dom.getDomById = function (id) {
        var domObj = this.staticDomList[id];
        if (!domObj)
            document.getElementById(id);
        return domObj;
    };
    /**
     * 通过id显示标签
     *
     * @static
     * @param {string} id
     * @memberof Dom
     */
    Dom.showDomById = function (id) {
        this.getDomById(id).style.display = "block";
    };
    /**
     * 通过id隐藏标签
     *
     * @static
     * @param {string} id
     * @memberof Dom
     */
    Dom.hideDomById = function (id) {
        this.getDomById(id).style.display = "none";
    };
    Object.defineProperty(Dom, "positionFlag", {
        /**
         * 标签位置所对应的标识
         * 在index中白鹭引擎绘制的canvas标签，通过获取标签来获取初始位置
         *
         * @readonly
         * @static
         * @type {HTMLCanvasElement}
         * @memberof Dom
         */
        get: function () {
            return document.getElementsByTagName("canvas")[0];
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Dom, "positionLeft", {
        /**
         * 获取初始位置，距离左边的值
         *
         * @readonly
         * @static
         * @type {number}
         * @memberof Dom
         */
        get: function () {
            return Number(this.positionFlag.style.left.replace("px", ""));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dom, "positionTop", {
        /**
         * 获取初始位置，距离右边的值
         *
         * @readonly
         * @static
         * @type {number}
         * @memberof Dom
         */
        get: function () {
            return Number(this.positionFlag.style.top.replace("px", ""));
        },
        enumerable: true,
        configurable: true
    });
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
    Dom.setDomPosition = function (id, left, top, width, height) {
        var dom = this.getDomById(id);
        var wScale = Number(this.positionFlag.style.width.replace("px", "")) / 640;
        // 因为已经小于1036，所以再继续使用canvas的高度做适配的话还会有问题
        var hScale = document.body.clientHeight / egret.MainContext.instance.stage.stageHeight;
        // 按比例显示大小
        var w = width * wScale + "px";
        var h = height * hScale + "px";
        var x = (this.positionLeft + left * wScale) + "px";
        var y = (top - SmartScale.topDistance() / 2) * hScale + "px"; // 根据适配方案，需要对创建的标签在body中进行位置调整，主要通过调整top值保持设计稿不变
        this.setStyle(id, ["position", "absolute"], ["width", w], ["height", h], ["left", x], ["top", y]);
    };
    Object.defineProperty(Dom, "parent", {
        /**
         * 装载被创建的标签的父Div
         * 此处取值为装载白鹭canvas的div
         *
         * @readonly
         * @static
         * @type {HTMLDivElement}
         * @memberof Dom
         */
        get: function () {
            return document.getElementsByClassName("egret-player")[0];
        },
        enumerable: true,
        configurable: true
    });
    ;
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
    Dom.createImgElement = function (id, src, left, top, width, height, clickFunc) {
        var img;
        if (!this.getDomById(id)) {
            img = document.createElement("img");
            img.id = id;
            this.staticDomList[id] = img;
        }
        else {
            img = this.getDomById(id);
            this.showDomById(id);
        }
        img.src = src;
        img.onclick = function () {
            clickFunc();
        }; // 别问我为什么要多写个匿名方法，我也不知道 20180418
        this.setDomPosition(id, left, top, width, height);
        this.parent.appendChild(img);
    };
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
    Dom.createHtmlElement = function (id, elementType, left, top, width, height, clickFunc) {
        var element = document.createElement(elementType);
        element.id = id;
        this.staticDomList[id] = element;
        this.parent.appendChild(element);
        this.setDomPosition(id, left, top, width, height);
    };
    /**
     * 设置标签属性
     *
     * @static
     * @param {string} id
     * @param {[string, string]} [key, value] [属性,值]
     * @param {...[string, string][]} option [属性,值][]
     * @memberof Dom
     */
    Dom.setAttribute = function (id, _a) {
        var key = _a[0], value = _a[1];
        var option = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            option[_i - 2] = arguments[_i];
        }
        var element = this.getDomById(id);
        element.setAttribute(key, value);
        for (var i = 0, len = option.length; i < len; i++) {
            element.setAttribute(option[i][0], option[i][1]);
        }
    };
    /**
     * 设置style
     *
     * @static
     * @param {string} id
     * @param {[string, string]} [key, value] [属性,值]
     * @param {...[string, string][]} option [属性,值][]
     * @memberof Dom
     */
    Dom.setStyle = function (id, _a) {
        var key = _a[0], value = _a[1];
        var option = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            option[_i - 2] = arguments[_i];
        }
        var element = this.getDomById(id);
        element.style[key] = value;
        for (var i = 0, len = option.length; i < len; i++) {
            element.style[option[i][0]] = option[i][1];
        }
    };
    return Dom;
}());
/**
 * 存放所有被创建的Dom对象的数组
 *
 * @static
 * @type {HTMLElement[]}
 * @memberof Dom
 */
Dom.staticDomList = [];
__reflect(Dom.prototype, "Dom");
