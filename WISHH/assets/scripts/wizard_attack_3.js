// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.playerNode = cc.find("Canvas/player");
        this.map_center = cc.find("Canvas/Center");
        this.parentBall = this.node.getParent();
        if(this.node.x - this.map_center.x > 0) // node 在畫面右邊
        {      
            //this.node.anchorX = 1; 
            this.node.getComponent(cc.BoxCollider).offset.x = -this.node.width/2

        }
        else if(this.node.x - this.map_center.x < 0) // node 在畫面左邊
        {
            //this.node.anchorX = 0; 
            this.node.getComponent(cc.BoxCollider).offset.x = this.node.width/2;
        }
    },

    localConvertWorldPoint(node) {
        if (node) {
            return node.convertToWorldSpace(cc.v2(0, 0));
        }
        return null;
    },

    rayTest (p1, p2) {
        var results = cc.director.getPhysicsManager().rayCast(p1, p2, cc.RayCastType.Closest);

        for (var i = 0; i < results.length; i++) {
            //两点之间检测出来的点的数组
            var result = results[i];
            //射线穿过的是哪一个碰撞体。
            var collider = result.collider;
            //射线穿过的碰撞体的世界坐标
            var point = result.point;
            //碰撞体在相交点的表面的法线向量。
            var normal = result.normal;
            //相交点在射线上的分数。
            var fraction = result.fraction;

            //cc.log(p2.x,p2.y);
            var worldNode = this.localConvertWorldPoint(this.node);
            this.node.width = Math.abs(point.x - worldNode.x)/5;
            //cc.log(this.node.width);
            this.node.getComponent(cc.BoxCollider).size.width = this.node.width;
            if(this.node.x - this.map_center.x > 0) // node 在畫面右邊
                this.node.getComponent(cc.BoxCollider).offset.x = this.node.width/2
            else if(this.node.x - this.map_center.x < 0) // node 在畫面左邊
                this.node.getComponent(cc.BoxCollider).offset.x = this.node.width/2;
        }
    },

    start () {

    },

    update (dt) {
        
        var length = 0;
        this.boxCollider = this.node.getComponent(cc.BoxCollider);

        if(this.node.x - this.map_center.x > 0) // node 在畫面右邊
        {      
            this.node.scaleX = -5; 
            length = -1500;
        }
        else if(this.node.x - this.map_center.x < 0) // node 在畫面左邊
        {
            this.node.scaleX = 5; 
            length = 1500;
        }
        var p1 = this.localConvertWorldPoint(this.node);
        var p2 = cc.v2(p1.x + length ,p1.y);
        this.rayTest(p1 ,p2);
    },
});
