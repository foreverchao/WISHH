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
        deadChangeScene: cc.Prefab,
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
        this.camera = cc.find("Canvas/Main Camera");
        this.canvas = cc.find("Canvas");
    },

    onDestroy() {
        this.node.getParent().destroy();
    },

    onEditDidBegan: function(editbox, customEventData) {

    },

    onEditDidEnded: function(editbox, customEventData) {

    },

    onTextChanged: function(text, editbox, customEventData) {

    },

    deadScene() {
        var black = cc.instantiate(this.deadChangeScene);
        black.x = this.camera.x - 1587;
        black.y = this.camera.y;
        this.canvas.addChild(black);
        cc.tween(black)
        .to(1, {position: cc.v2(this.camera.x, this.camera.y)})
        .start();
    },

    onEditingReturn: function(editbox,  customEventData) {
        var name = this.node.getChildByName("label").getComponent(cc.Label).string;
        var point = this.node.getParent().getChildByName("point").getComponent(cc.Label).string;
        for(var i=0; i<Variables.leaderboardData.length; i++) {
            if(Variables.leaderboardData[i][0] == "empty") {
                Variables.leaderboardData[i][0] = name;
                Variables.leaderboardData[i][1] = point;
                break;
            }
        }
        this.deadScene();
        //cc.director.loadScene("menuScence");
        cc.tween(this.node)
        .delay(2)
        .call(() => {
            cc.director.loadScene("menuScence");
        })
        .delay(2)
        .call(() => {
            this.node.getParent().destroy();
        })
        .start();
    },

    start () {

    },

    update (dt) {
        this.node.getParent().setPosition(this.camera.x,this.camera.y);
    },
});
