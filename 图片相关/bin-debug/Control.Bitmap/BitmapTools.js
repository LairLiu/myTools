var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 图片相关工具类
 * @author lair
 * @version 0.0.1 20180420
 */
var BitmapTools = (function () {
    function BitmapTools() {
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
    BitmapTools.scaleImg = function (texture, img, data) {
        var W, H;
        // 通过传入的遮罩获取宽高
        if (data.mask) {
            W = data.mask.width;
            H = data.mask.height;
        }
        else {
            // 通过传入的宽高获取宽高
            if (!data.width) {
                console.error("data.width is notFound");
                return false;
            }
            ;
            if (!data.height) {
                console.error("data.height is notFound");
                return false;
            }
            ;
            W = data.width;
            H = data.height;
        }
        // 调整图片，根据遮罩的大小来适应显示的大小
        if (img.width <= img.height) {
            img.width = W;
            var h_1 = W / texture.textureWidth;
            img.height = h_1 * texture.textureHeight;
        }
        else if (img.height < img.width) {
            img.height = H;
            var h = H / texture.textureHeight;
            img.width = h * texture.textureWidth;
        }
    };
    return BitmapTools;
}());
__reflect(BitmapTools.prototype, "BitmapTools");
