var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var aStar;
(function (aStar) {
    /**
     * 表格节点，地图上的小节点。记录当前位置是否为障碍物
     */
    var Node = (function () {
        /**
         * 节点
         * @param {number} x 节点所在横坐标
         * @param {number} y 节点所在网格纵坐标
         */
        function Node(x, y) {
            /**当前节点行走成本乘数 */
            this.costMultiplier = 1.0;
            /**
             * 可行走？/非障碍物？ 默认可行走
             * @default true
             */
            this.walkable = true;
            this.x = x;
            this.y = y;
        }
        return Node;
    }());
    aStar.Node = Node;
    __reflect(Node.prototype, "aStar.Node");
})(aStar || (aStar = {}));
