class Net {

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
    public static doPostReq(callback: Function, rtype: string, value: string, type: string = egret.HttpResponseType.TEXT) {
        let req = new egret.HttpRequest(), timerCount = 0;
        req.responseType = type;
        req.open(window["gameUrl"] + "api.php?a=" + rtype, egret.HttpMethod.POST);
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.send(value);
        req.addEventListener(egret.Event.COMPLETE, onPostComplete, this);
        req.addEventListener(egret.IOErrorEvent.IO_ERROR, onPostIOError, this);
        req.addEventListener(egret.ProgressEvent.PROGRESS, onPostProgress, this);

        // 加载完成
        function onPostComplete(e: egret.Event) {
            let data = JSON.parse(e.target.response);
            console.log(rtype, "request complete");

            return callback(data);
        }

        // 加载失败
        function onPostIOError(event: egret.Event) {

            console.log(rtype, "request error:", event);

            // 重新请求
            timerCount++;
            if (timerCount <= 5) {

                req.send(value);
            } else {

                alert("网络错误，请退出重试！");
            }
        }

        // 加载进度
        function onPostProgress(event: egret.ProgressEvent) {
            let pro = Math.floor(100 * event.bytesLoaded / event.bytesTotal);

            // console.log(`post progress : ${pro}%`);
        }
    }

    public static test(callback: Function) {
        let value = "&mark=";
        console.log("user_get_ranklist() post data is", value);

        this.doPostReq(callback, "rankList", value);
    }
}