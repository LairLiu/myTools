var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var aStar;
(function (aStar) {
    /**
     * 网格，地图上的各个节点集合。记录各个节点的信息
     */
    var Grid = (function () {
        /**
         * 网格
         *
         * @param {number} colNums 列数/width
         * @param {number} rowNums 行数/height
         */
        function Grid(colNums, rowNums) {
            this.colNums = colNums;
            this.rowNums = rowNums;
            this.nodeList = [];
            for (var i = 0; i < colNums; i++) {
                this.nodeList[i] = [];
                for (var j = 0; j < colNums; j++) {
                    this.nodeList[i][j] = new aStar.Node(i, j);
                }
            }
        }
        /**
         * 设置节点行走属性
         *
         * @param {number} x 节点所在网格横坐标
         * @param {number} y 节点所在网格纵坐标
         * @param {boolean} walkable 是否可行走
         */
        Grid.prototype.setWalkable = function (x, y, walkable) {
            this.nodeList[x][y].walkable = walkable;
        };
        /**
         * 获取节点
         *
         * @param {number} x 节点所在网格横坐标
         * @param {number} y 节点所在网格纵坐标
         */
        Grid.prototype.getNode = function (x, y) {
            return this.nodeList[x][y];
        };
        /**
         * 获取状态代表的颜色
         *
         * @param {number} x 节点所在网格横坐标
         * @param {number} y 节点所在网格纵坐标
         */
        Grid.prototype.getColor = function (x, y) {
            var node = this.nodeList[x][y];
            var roadblockColor = 0x000000;
            var tipsColor = 0xcccccc;
            var walkableColor = 0xffffff;
            if (!node.walkable)
                return roadblockColor;
            if (node == this.startNode)
                return tipsColor;
            if (node == this.endNode)
                return tipsColor;
            return walkableColor;
        };
        /**
         * 设置起点
         *
         */
        Grid.prototype.setStartNode = function (x, y) {
            this.startNode = this.nodeList[x][y];
        };
        /**
         * 设置终点
         */
        Grid.prototype.setEndNode = function (x, y) {
            this.endNode = this.nodeList[x][y];
        };
        return Grid;
    }());
    aStar.Grid = Grid;
    __reflect(Grid.prototype, "aStar.Grid");
})(aStar || (aStar = {}));
