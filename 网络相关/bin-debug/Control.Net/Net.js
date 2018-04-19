var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Net = (function () {
    function Net() {
    }
    /**
     * post请求
     *
     * @static
     * @param {*} thisObj this
     * @param {Function} callback 回调函数
     * @param {Function} errorCallback 错误时回调函数
     * @param {string} rtype 接口名
     * @param {string} value 参数
     * @param {string} [type=egret.HttpResponseType.TEXT] 请求数据的类型
     * @memberof Net
     */
    Net.doPostReq = function (callback, rtype, value, type) {
        if (type === void 0) { type = egret.HttpResponseType.TEXT; }
        var req = new egret.HttpRequest(), timerCount = 0;
        req.responseType = type;
        req.open(window["gameUrl"] + "api.php?a=" + rtype, egret.HttpMethod.POST);
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.send(value);
        req.addEventListener(egret.Event.COMPLETE, onPostComplete, this);
        req.addEventListener(egret.IOErrorEvent.IO_ERROR, onPostIOError, this);
        req.addEventListener(egret.ProgressEvent.PROGRESS, onPostProgress, this);
        // 加载完成
        function onPostComplete(e) {
            var data = JSON.parse(e.target.response);
            console.log(rtype, "request complete");
            return callback(data);
        }
        // 加载失败
        function onPostIOError(event) {
            console.log(rtype, "request error:", event);
            // 重新请求
            timerCount++;
            if (timerCount <= 5) {
                req.send(value);
            }
            else {
                alert("网络错误，请退出重试！");
            }
        }
        // 加载进度
        function onPostProgress(event) {
            var pro = Math.floor(100 * event.bytesLoaded / event.bytesTotal);
            // console.log(`post progress : ${pro}%`);
        }
    };
    Net.test = function (callback) {
        var value = "&mark=";
        console.log("user_get_ranklist() post data is", value);
        this.doPostReq(callback, "rankList", value);
    };
    return Net;
}());
__reflect(Net.prototype, "Net");
