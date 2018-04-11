var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var SoundControl = (function (_super) {
    __extends(SoundControl, _super);
    function SoundControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 加载音频
     * {name：音频名称，needLoad：是否需要加载}
     *
     * @static
     * @param {...{ name: string, needLoad?: boolean }[]} arg {name：音频名称，needLoad：是否需要加载}
     * @returns
     * @memberof SoundControl
     */
    SoundControl.load = function () {
        var _this = this;
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (arg.length <= 0)
            return;
        var _loop_1 = function (soundData) {
            var soundName = soundData.name, needLoad = soundData.needLoad, sound;
            if (needLoad) {
                sound = new egret.Sound();
                sound.load("resource/assets/sound/" + soundName + ".mp3");
                sound.addEventListener(egret.Event.COMPLETE, function () {
                    _this.soundList[soundName] = sound;
                    console.log(soundName, "load complete");
                }, this_1);
                sound.addEventListener(egret.IOErrorEvent.IO_ERROR, function () {
                    console.log(soundName, "load error");
                }, this_1);
            }
            else {
                sound = RES.getRes(soundName + "_mp3");
                this_1.soundList[soundName] = sound;
                console.log(soundName, "res load complete");
            }
        };
        var this_1 = this;
        for (var _a = 0, arg_1 = arg; _a < arg_1.length; _a++) {
            var soundData = arg_1[_a];
            _loop_1(soundData);
        }
    };
    /**
     * 播放音乐
     *
     * @static
     * @param {string} soundName
     * @param {number} [loop=1]
     * @param {number} [startTime=0]
     * @memberof SoundControl
     */
    SoundControl.play = function (soundName, loop, startTime) {
        if (loop === void 0) { loop = 1; }
        if (startTime === void 0) { startTime = 0; }
        if (this.soundList[soundName]) {
            this.soundChannelList[soundName] = this.soundList[soundName].play(startTime, loop);
            this.soundChannelList[soundName].volume = this._volume;
        }
        else {
            console.log(soundName, "声音不存在或未加载完成!");
        }
    };
    SoundControl.stop = function (soundName) {
        if (!soundName) {
            for (var soundIndex in this.soundChannelList) {
                this.soundChannelList[soundIndex].stop();
                this.soundChannelList[soundIndex].position = 0;
            }
        }
        else {
            this.soundChannelList[soundName].stop();
            this.soundChannelList[soundName].position = 0;
        }
    };
    Object.defineProperty(SoundControl, "volume", {
        get: function () {
            return this._volume;
        },
        set: function (volume) {
            for (var soundIndex in this.soundChannelList) {
                this.soundChannelList[soundIndex].volume = volume;
            }
            this._volume = volume;
        },
        enumerable: true,
        configurable: true
    });
    SoundControl.soundList = [];
    SoundControl.soundChannelList = [];
    SoundControl._volume = 1;
    return SoundControl;
}(egret.HashObject));
__reflect(SoundControl.prototype, "SoundControl");
