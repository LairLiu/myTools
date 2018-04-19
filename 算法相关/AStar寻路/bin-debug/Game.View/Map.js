var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Map = (function (_super) {
    __extends(Map, _super);
    function Map() {
        var _this = _super.call(this) || this;
        _this.nodeSize = 50;
        _this.gridWidth = 5;
        _this.gridHeight = 5;
        _this.roadblockNum = 5; //路障数量
        // 给舞台添加舞台事件
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, function () {
            _this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouchTap, _this);
        }, _this);
        _this.createChildren();
        return _this;
    }
    Map.prototype.createChildren = function () {
        this.body = new egret.Shape();
        this.body.graphics.beginFill(0xf0f0f0f, 1);
        this.body.graphics.drawCircle(0, 0, this.nodeSize / 2);
        this.body.graphics.endFill();
        // 设置body的位置
        this.body.x = Math.random() * this.nodeSize * this.gridWidth;
        this.body.y = Math.random() * this.nodeSize * this.gridHeight;
        this.drawGrid();
    };
    /**
     * 绘制地图,设置节点属性
     */
    Map.prototype.drawGrid = function () {
        this.grid = new aStar.Grid(this.gridWidth, this.gridHeight);
        // 设置随机障碍物
        for (var i = 0; i < this.roadblockNum; i++) {
            var randomX = Math.floor(Math.random() * this.gridWidth);
            var randomY = Math.floor(Math.random() * this.gridHeight);
            this.grid.setWalkable(randomX, randomY, false);
        }
        this.drawMap();
    };
    /**
     * 根据节点属性绘制网格
     * 给网格上色
     */
    Map.prototype.drawMap = function () {
        for (var i = 0; i < this.gridWidth; i++) {
            for (var j = 0; j < this.gridHeight; j++) {
                var node = new egret.Shape();
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
    };
    /**
     * 点击事件，用于设置起点和终点
     */
    Map.prototype.onTouchTap = function (event) {
        console.log("clisk");
        var nodeX = Math.floor(event.stageX / this.nodeSize), nodeY = Math.floor(event.stageY / this.nodeSize);
        this.grid.setEndNode(nodeX, nodeY);
        nodeX = Math.floor(this.body.x / this.nodeSize);
        nodeY = Math.floor(this.body.y / this.nodeSize);
        this.grid.setStartNode(nodeX, nodeY);
        console.log("click2");
        // this.drawMap();
        this.findPath();
    };
    /**
     * 寻找路径
     */
    Map.prototype.findPath = function () {
        var startTime = egret.getTimer();
        var astar = new aStar.AStar();
        console.log(1111);
        astar.findPath(this.grid);
        console.log(2222);
        console.log(egret.getTimer() - startTime);
        // let path = astar.path;
        // console.table(path);
        // if (!astar.findPath(this.grid)) {
        //     console.log("path is notfound");
        // } else {
        //     console.log(astar.path);
        // }
    };
    return Map;
}(egret.DisplayObjectContainer));
__reflect(Map.prototype, "Map");
