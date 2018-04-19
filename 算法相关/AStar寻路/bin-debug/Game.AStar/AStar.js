var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var aStar;
(function (aStar) {
    var AStar = (function () {
        function AStar() {
            /**直走的成本系数 */
            this.straightCost = 1.0;
            /**斜着走的成本乘数, 2 开平方 */
            this.diagCost = Math.SQRT2;
            this.heuristic = this.diagonal;
        }
        AStar.prototype.findPath = function (grid) {
            this.grid = grid;
            this.openList = [];
            this.closeList = [];
            this.startNode = this.grid.startNode;
            this.endNode = this.grid.endNode;
            this.startNode.g = 0;
            this.startNode.h = this.heuristic(this.startNode);
            this.startNode.f = this.startNode.g + this.startNode.h;
            return this.search();
        };
        /**
         * 搜寻路径
         * @return {boolean} result 是否存在路径
         */
        AStar.prototype.search = function () {
            var node = this.startNode;
            while (node != this.endNode) {
                // 防止超出边界
                var startX = Math.max(0, node.x - 1), endX = Math.min(this.grid.colNums - 1, node.x + 1), startY = Math.max(0, node.y - 1), endY = Math.min(this.grid.rowNums - 1, node.y + 1);
                console.log(startX, endX, startY, endY);
                for (var i = startX; i <= endX; i++) {
                    for (var j = startY; j <= endY; j++) {
                        console.log("0计算", i, j);
                        // 不让斜着走
                        if (i != node.x && j != node.y) {
                            console.log("斜着走", i, j, "\r\n\r\n");
                            continue;
                        }
                        console.warn("1计算", i, j);
                        var test = this.grid.getNode(i, j);
                        // 跳过本身；检测点是障碍物；监测点X，当前原点Y为障碍物；当前原点X，监测点Y
                        if (test == node ||
                            !test.walkable ||
                            !this.grid.getNode(test.x, node.y).walkable ||
                            !this.grid.getNode(node.x, test.y).walkable) {
                            console.log("第二轮筛选", i, j, "\r\n\r\n");
                            continue;
                        }
                        console.error("2计算", i, j);
                        // 判断要使用的成本乘数 直走/斜走
                        var cost = this.straightCost;
                        // 如果路径不是上下左右，而是斜着，成本则为斜线成本
                        if (!((node.x == test.x) || (node.y == test.y))) {
                            cost = this.diagCost;
                        }
                        console.warn("3计算", i, j);
                        // 计算被检测点成本
                        var g = node.g + cost * test.costMultiplier;
                        var h = this.heuristic(test);
                        var f = g + h;
                        console.log(g, h, f);
                        // 检测两个表中是否存在该点，如果没有则将其添加到待检查表中
                        if (this.isOpen(test) || this.isClose(test)) {
                            // 当该点的之前计算的成本大于现有成本时，重新赋值，并重新制定父节点
                            if (test.f > f) {
                                test.f = f;
                                test.g = g;
                                test.h = h;
                                test.parent = node;
                            }
                        }
                        else {
                            test.f = f;
                            test.g = g;
                            test.h = h;
                            test.parent = node;
                            this.openList.push(test);
                        }
                        console.error(i, j, test.f);
                    }
                }
                this.closeList.push(node);
                console.log(this.openList);
                console.log(this.closeList);
                var openLen = this.openList.length;
                // 判断当前原点是否存在路径
                if (openLen == 0) {
                    console.log("path is notfound");
                    return false;
                }
                ;
                // 将路径重新排序，成本越大的越前
                for (var i = 0; i < openLen; i++) {
                    for (var j = i + 1; j < openLen; j++) {
                        if (this.openList[i].f > this.openList[j].f) {
                            var temp = this.openList[i];
                            this.openList[i] = this.openList[j];
                            this.openList[j] = temp;
                        }
                    }
                }
                // 将原点的最优的检测点（路径）设置为下一次检测的原点
                node = this.openList.shift();
            }
            return true;
        };
        /**
         * 获取路径
         * 将路径中的每个父节点添加到path数组中。从终点的父节点往前推导一直到起点，形成一条路径
         */
        AStar.prototype.buildPath = function () {
            this.path = [];
            var node = this.endNode;
            while (node != this.startNode) {
                node = node.parent;
                this.path.unshift(node);
            }
        };
        /**是否待检查 */
        AStar.prototype.isOpen = function (testNode) {
            var result = this.openList.indexOf(testNode) >= 0 ? true : false;
            return result;
        };
        /**是否已检查 */
        AStar.prototype.isClose = function (testNode) {
            var result = this.openList.indexOf(testNode) >= 0 ? true : false;
            return result;
        };
        /**
         * 计算方式1
         */
        /**
         * 计算方式3
         * 当前点到终点,斜着走加上直着走的距离
         */
        AStar.prototype.diagonal = function (node) {
            var dx = Math.floor(node.x - this.endNode.x);
            var dy = Math.floor(node.y - this.endNode.y);
            // 横纵两个距离中的最短距离
            var diag = Math.min(dx, dy);
            // 两点间按坐标系走的总距离(y不动走到终点x坐标；x不动，转直角走到y坐标)
            var straight = dx + dy;
            // 两点间的距离，以短边的值向终点斜着走+剩余的直线距离
            var distance = this.diagCost * diag + this.straightCost * (straight - 2 * diag);
            return distance;
        };
        return AStar;
    }());
    aStar.AStar = AStar;
    __reflect(AStar.prototype, "aStar.AStar");
})(aStar || (aStar = {}));
