namespace aStar {

    /** 
     * 网格，地图上的各个节点集合。记录各个节点的信息
     */
    export class Grid {

        /**节点数组 */
        public nodeList: Array<Array<Node>>;

        /**起点 */
        public startNode: Node;
        /**终点 */
        public endNode: Node;

        /** 
         * 列数/width
         */
        public colNums: number;
        /** 
         * 行数/height
         */
        public rowNums: number;

        /** 
         * 网格
         * 
         * @param {number} colNums 列数/width
         * @param {number} rowNums 行数/height
         */
        constructor(colNums: number, rowNums: number) {
            this.colNums = colNums;
            this.rowNums = rowNums;
            
            this.nodeList = [];
            for (let i = 0; i < colNums; i++) {
                this.nodeList[i] = [];
                for (let j = 0; j < colNums; j++) {
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
        public setWalkable(x: number, y: number, walkable: boolean) {
            this.nodeList[x][y].walkable = walkable;
        }

        /** 
         * 获取节点
         * 
         * @param {number} x 节点所在网格横坐标
         * @param {number} y 节点所在网格纵坐标
         */
        public getNode(x: number, y: number): Node {
            return this.nodeList[x][y];
        }

        /** 
         * 获取状态代表的颜色
         * 
         * @param {number} x 节点所在网格横坐标
         * @param {number} y 节点所在网格纵坐标
         */
        public getColor(x: number, y: number) {
            let node = this.nodeList[x][y];

            let roadblockColor: number = 0x000000;
            let tipsColor: number = 0xcccccc;
            let walkableColor: number = 0xffffff;

            if (!node.walkable) return roadblockColor;
            if (node == this.startNode) return tipsColor;
            if (node == this.endNode) return tipsColor;
            return walkableColor;
        }

        /**
         * 设置起点
         * 
         */
        public setStartNode(x: number, y: number) {
            this.startNode = this.nodeList[x][y];
        }

        /**
         * 设置终点
         */
        public setEndNode(x: number, y: number) {
            this.endNode = this.nodeList[x][y];
        }
    }
}