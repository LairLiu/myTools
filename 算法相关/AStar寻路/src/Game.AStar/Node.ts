namespace aStar {
    /** 
     * 表格节点，地图上的小节点。记录当前位置是否为障碍物
     */
    export class Node {
        /**当前节点所在网格横坐标 */
        public x: number;
        /**当前节点所在网格纵坐标 */
        public y: number;

        /**行走的总代价 f=g+h */
        public f: number;
        /**当前点到起点的代价 */
        public g: number;
        /**当前点到终点的代价 */
        public h: number;

        /**当前节点行走成本乘数 */
        public costMultiplier: number = 1.0;

        /**
         * 父节点
         * 可理解为test.parent的上一个节点位置是被检测的原点，一个个节点通过parent相连组成路径
         */
        public parent: Node;

        /**
         * 可行走？/非障碍物？ 默认可行走
         * @default true
         */
        public walkable: boolean = true;

        /** 
         * 节点
         * @param {number} x 节点所在横坐标
         * @param {number} y 节点所在网格纵坐标
         */
        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }
    }
}