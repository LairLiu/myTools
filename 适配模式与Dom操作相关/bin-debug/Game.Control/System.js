var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 获取系统信息
 * @author lair
 * @version 0.0.1 20180420
 */
var System = (function () {
    function System() {
    }
    /**系统信息 */
    System.systemData = function () {
        var u = navigator.userAgent;
        return u;
    };
    /**是否andro */
    System.isAndroid = function () {
        return this.systemData().indexOf('Android') > -1 || this.systemData().indexOf('Adr') > -1; //android终端    
    };
    /**是否ios */
    System.isiOS = function () {
        return !!this.systemData().match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端  
    };
    return System;
}());
__reflect(System.prototype, "System");
