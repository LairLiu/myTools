var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 创建dom对象，用于在index中进行操作
 */
var Dom = (function () {
    function Dom() {
    }
    Object.defineProperty(Dom, "parent", {
        /**存放标签的父级标签 */
        get: function () {
            return document.getElementById("gameID");
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Dom, "positionFlag", {
        /**标签位置所对应的标识 */
        get: function () {
            return document.getElementsByTagName("canvas")[0];
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Dom, "positionLeft", {
        /**初始left值 */
        get: function () {
            return Number(this.positionFlag.style.left.replace("px", ""));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dom, "positionTop", {
        /**初始top值 */
        get: function () {
            return Number(this.positionFlag.style.top.replace("px", ""));
        },
        enumerable: true,
        configurable: true
    });
    /**创建IMG标签 */
    Dom.createImgElement = function (id, src, left, top, width, height, clickFunc) {
        var img;
        if (!this.getDomById(id)) {
            img = document.createElement("img");
            img.id = id;
            this.staticDomList[id] = img;
        }
        else {
            img = this.getDomById(id);
            this.showDom(id);
        }
        img.src = src;
        img.onclick = function () {
            clickFunc();
        }; // 别问我为什么要多写个匿名方法，我也不知道 20180418
        this.setDomPosition(id, left, top, width, height);
        this.parent.appendChild(img);
    };
    /**设置标签位置 */
    Dom.setDomPosition = function (id, left, top, width, height) {
        var dom = this.getDomById(id);
        dom.style.position = "absolute";
        var wScale = Number(this.positionFlag.style.width.replace("px", "")) / 640;
        var hScale = document.body.clientHeight / wy.GameInterface.stage.stageHeight;
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
        dom.style.top = (top - SmartScale.topDistance() / 2) * hScale + "px"; // 根据适配方案，需要对创建的标签在body中进行位置调整，主要通过调整top值保持设计稿不变
        // }
    };
    /**根据id获取dom对象 */
    Dom.getDomById = function (id) {
        return this.staticDomList[id];
    };
    Dom.hideDom = function (id) {
        this.getDomById(id).style.display = "none";
    };
    Dom.showDom = function (id) {
        this.getDomById(id).style.display = "block";
    };
    return Dom;
}());
/**存放Dom对象的数组 */
Dom.staticDomList = [];
__reflect(Dom.prototype, "Dom");
