class SoundControl extends egret.HashObject {

    private static soundList: egret.Sound[] = [];
    private static soundChannelList: egret.SoundChannel[] = [];
    private static _volume: number = 1;

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

    public static playSound(soundName: string, loop: number = 1, startTime: number = 0) {

        if (this.soundList[soundName]) {

            this.soundChannelList[soundName] = this.soundList[soundName].play(startTime, loop);
            this.soundChannelList[soundName].volume = this._volume;

            console.log("value", this.soundChannelList[soundName].volume);

        }
    }

    public static stopSound(soundName?: string) {
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