class Tools {
    public static createBitmapByName(textureName: string): egret.Bitmap {
        let bitmap = new egret.Bitmap();
        bitmap.texture = RES.getRes(textureName);

        return bitmap;
    }
}