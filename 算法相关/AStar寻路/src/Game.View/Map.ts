class Map extends egret.DisplayObjectContainer {
    constructor() {
        super();

        // 给舞台添加舞台事件
        this.addEventListener(egret.Event.ADDED_TO_STAGE, () => {
            this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        }, this);

        this.createChildren();
    }
    private body: egret.Shape;
    private grid: aStar.Grid;
    private nodeSize: number = 50;
    private gridWidth: number = 5;
    private gridHeight: number = 5;
    private roadblockNum = 5;//路障数量

    private createChildren() {
        this.body = new egret.Shape();
        this.body.graphics.beginFill(0xf0f0f0f, 1);
        this.body.graphics.drawCircle(0, 0, this.nodeSize / 2);
        this.body.graphics.endFill();

        // 设置body的位置
        this.body.x = Math.random() * this.nodeSize * this.gridWidth;
        this.body.y = Math.random() * this.nodeSize * this.gridHeight;

        this.drawGrid();
    }

    /** 
     * 绘制地图,设置节点属性
     */
    private drawGrid() {
        this.grid = new aStar.Grid(this.gridWidth, this.gridHeight);

        // 设置随机障碍物
        for (let i = 0; i < this.roadblockNum; i++) {
            let randomX = Math.floor(Math.random() * this.gridWidth);
            let randomY = Math.floor(Math.random() * this.gridHeight);

            this.grid.setWalkable(randomX, randomY, false);
        }

        this.drawMap();
    }

    /** 
     * 根据节点属性绘制网格
     * 给网格上色
     */
    private drawMap() {
        for (let i = 0; i < this.gridWidth; i++) {
            for (let j = 0; j < this.gridHeight; j++) {
                let node = new egret.Shape();
                node.graphics.beginFill(this.grid.getColor(i, j), 1);
                node.graphics.drawRect(0, 0, this.nodeSize, this.nodeSize);
                node.graphics.endFill();
                node.x = this.nodeSize * i;
                node.y = this.nodeSize * j;
                this.addChild(node);
            }
        }

        // 添加可移动对象，防止层级原因被覆盖，如无显示起始点和终点的需求，可将创建body的方法写入到此处
        this.addChild(this.body);
    }

    /** 
     * 点击事件，用于设置起点和终点
     */
    private onTouchTap(event: egret.TouchEvent) {
        let nodeX: number = Math.floor(event.stageX / this.nodeSize),
            nodeY: number = Math.floor(event.stageY / this.nodeSize);
        this.grid.setEndNode(nodeX, nodeY);

        nodeX = Math.floor(this.body.x / this.nodeSize);
        nodeY = Math.floor(this.body.y / this.nodeSize);
        this.grid.setStartNode(nodeX, nodeY);

        this.drawMap();

        this.findPath();
    }

    /** 
     * 寻找路径
     */
    private findPath() {
        let astar = new aStar.AStar();
        astar.findPath(this.grid);

        // if (!astar.findPath(this.grid)) {
        //     console.log("path is notfound");
        // } else {
        //     console.log(astar.path);
        // }
    }
}