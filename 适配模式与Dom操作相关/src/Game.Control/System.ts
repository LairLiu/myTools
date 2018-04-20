/** 
 * 获取系统信息
 * 
 * @author lair
 * @version 0.0.1 20180420
 * @class System
 */
class System {

    /**
     * 系统信息
     * 
     * @static
     * @returns 
     * @memberof System
     */
    public static systemData() {
        let u = navigator.userAgent;
        return u;
    }

    /**
     * 是否android
     * 
     * @static
     * @returns 
     * @memberof System
     */
    public static isAndroid() {
        return this.systemData().indexOf('Android') > -1 || this.systemData().indexOf('Adr') > -1; //android终端    
    }

    /**
     * 是否ios
     * 
     * @static
     * @returns 
     * @memberof System
     */
    public static isiOS() {
        return !!this.systemData().match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端  
    }
}