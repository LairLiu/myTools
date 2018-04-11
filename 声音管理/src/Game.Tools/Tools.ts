class Tools {
    public static createBitmapByName(textureName: string): egret.Bitmap {
        let bitmap = new egret.Bitmap();
        bitmap.texture = RES.getRes(textureName);

        return bitmap;
    }

    public static sleep(time: number) {
        return new Promise(resolve => {
            egret.setTimeout(() => {
                resolve();
            }, this, time);
        });
    }
}