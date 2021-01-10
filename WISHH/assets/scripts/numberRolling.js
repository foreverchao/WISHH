// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

let Variables = require("./gameGlobalVariable");

cc.Class({
    extends: cc.Component,

    properties: {
        numLayoutPrefab: cc.Prefab,
        allLayoutNode: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    setPoint() {
        var val = "0";
        val = Variables.score.toString();
        cc.log(val)
        //获取金币节点下子节点
        let arr_node_layout = this.allLayoutNode.children;
        //计算金币的位数是不是等于显示的节点个数
        let sub_node_layout_num = val.length - arr_node_layout.length;
        //如果金币位数增大了
        if (sub_node_layout_num > 0) {
            for (let i = 0; i < sub_node_layout_num; ++i) {
                let node = cc.instantiate(this.numLayoutPrefab);
                this.allLayoutNode.addChild(node);
            }
        } else if (sub_node_layout_num < 0) { //如果金币位数减少
            for (let i = sub_node_layout_num - 1; i > 0; --i) {
                this.allLayoutNode.child[i].destroy();
            }
        }

        //获取每个layout的子节点的个数（一般是10）
        let childCount = 10;
        //计算layout的单位高度
        let unit_y = 450 / childCount;
        //添加动画
        var positionY = [-193.5,-150.5,-107.5,-64.5,-21.5,21.5,64.5,107.5,150.5,193.5];
        for (let i = 0; i < arr_node_layout.length; ++i) {
            let num = parseInt(val[i]);
            cc.log(num);
            cc.tween(arr_node_layout[i])
                .to(0.5, { position: cc.v2(arr_node_layout[i].x, positionY[num]) }, { easing: "quadInOut" })
                .start();
        }
    },


    start () {

    },

    update (dt) {
        if(Variables.scoreChange == true)
        {
            Variables.scoreChange = false;
            this.setPoint();
        }
    },
});
