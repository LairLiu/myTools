/**
 * 选择图片，返回其base64
 * 
 * 编写该方法时需注意this的指向问题
 * 
 * @author lka
 * @version 0.0.1 0428
 * @class UploadImage
 * @example UploadImage.select(callback,thisObj);
 */
class UploadImage {

    /**
     * 被创建的input标签
     * 
     * @private
     * @static
     * @type {HTMLInputElement}
     * @memberof UploadImage
     */
    private static fileInput: HTMLInputElement;

    /**
     * 回调函数
     * 
     * @private
     * @static
     * @type {Function}
     * @memberof UploadImage
     */
    private static callbackFunc: Function;

    /**
     * thisObj
     * 
     * @private
     * @static
     * @type {*}
     * @memberof UploadImage
     */
    private static thisObj: any;

    /**
     * 选择图片
     * 
     * @static
     * @param {Function} callback 回调函数
     * @param {*} thisObj thisObj
     * @memberof UploadImage
     */
    public static select(callback: Function, thisObj: any) {
        this.callbackFunc = callback;
        this.thisObj = thisObj;

        // 获取到fileinput标签
        this.fileInput = <HTMLInputElement>document.getElementById("fileInput");
        if (this.fileInput == null) {
            this.fileInput = document.createElement("input");
            this.fileInput.id = "fileInput";
            this.fileInput.type = "file";
            this.fileInput.style.height = "0";
            this.fileInput.style.width = "0";
            this.fileInput.style.display = "none";
            document.body.insertBefore(this.fileInput, document.body.firstChild);// 将input标签插入到最下方
            this.fileInput.onchange = e => this.readFile();// 次数使用匿名函数调用，不然this指向会转为input标签 TODO
        }

        setTimeout(() => { this.fileInput.click(); }, 50);// 等待100ms之后触发点击事件，开始选择图片
    }

    /**
     * 解析用户选择的数据
     * 在解析完成后执行回调函数传
     * 
     * @static
     * @memberof UploadImage
     */
    public static readFile() {
        console.log("reader file");

        var file = this.fileInput.files[0];

        // 解析选择的文件
        var reader = new FileReader();
        reader.onload = () => {
            var base64 = reader.result;

            this.base64ToTexture(base64);
        };
        reader.readAsDataURL(file);
    }


    public static base64ToTexture(base64) {
        var img: HTMLImageElement = new Image();
        img.src = base64;
        img.onload = () => {
            console.log(img.width, img.height);

            var texture = new egret.Texture;
            var bitmapData = new egret.BitmapData(img);
            texture._setBitmapData(bitmapData);
            this.callbackFunc(texture);
        }
    }
}