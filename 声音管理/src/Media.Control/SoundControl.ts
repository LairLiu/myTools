class SoundControl extends egret.HashObject {

    private static soundList: egret.Sound[] = [];
    private static soundChannelList: egret.SoundChannel[] = [];
    private static _volume: number = 1;

    /**
     * 加载音频
     * {name：音频名称，needLoad：是否需要加载}
     * 
     * @static
     * @param {...{ name: string, needLoad?: boolean }[]} arg {name：音频名称，needLoad：是否需要加载}
     * @returns 
     * @memberof SoundControl
     */
    public static load(...arg: { name: string, needLoad?: boolean }[]) {
        if (arg.length <= 0) return;

        for (let soundData of arg) {

            let soundName = soundData.name,
                needLoad = soundData.needLoad,
                sound: egret.Sound;

            if (needLoad) {
                sound = new egret.Sound();
                sound.load(`resource/assets/sound/${soundName}.mp3`);
                sound.addEventListener(egret.Event.COMPLETE, () => {

                    this.soundList[soundName] = sound;

                    console.log(soundName, "load complete");
                }, this);
                sound.addEventListener(egret.IOErrorEvent.IO_ERROR, () => {

                    console.log(soundName, "load error");
                }, this);
            } else {
                sound = RES.getRes(soundName + "_mp3");
                this.soundList[soundName] = sound;

                console.log(soundName, "res load complete");
            }
        }
    }

    /**
     * 播放音乐
     * 
     * @static
     * @param {string} soundName 
     * @param {number} [loop=1] 
     * @param {number} [startTime=0] 
     * @memberof SoundControl
     */
    public static play(soundName: string, loop: number = 1, startTime: number = 0) {

        if (this.soundList[soundName]) {

            this.soundChannelList[soundName] = this.soundList[soundName].play(startTime, loop);
            this.soundChannelList[soundName].volume = this._volume;
        } else {

            console.log(soundName, "声音不存在或未加载完成!");
        }
    }

    public static stop(soundName?: string) {
        if (!soundName) {
            for (let soundIndex in this.soundChannelList) {

                this.soundChannelList[soundIndex].stop();
                this.soundChannelList[soundIndex].position = 0;
            }
        } else {
            this.soundChannelList[soundName].stop();
            this.soundChannelList[soundName].position = 0;
        }
    }

    public static set volume(volume: number) {

        for (let soundIndex in this.soundChannelList) {

            this.soundChannelList[soundIndex].volume = volume;
        }
        this._volume = volume;
    }
    public static get volume(): number {
        return this._volume;
    }
}