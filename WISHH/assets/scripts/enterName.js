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

    // onLoad () {},

    onDestroy() {
        this.node.getParent().destroy();
    },

    onEditDidBegan: function(editbox, customEventData) {

    },

    onEditDidEnded: function(editbox, customEventData) {

    },

    onTextChanged: function(text, editbox, customEventData) {

    },

    onEditingReturn: function(editbox,  customEventData) {
        var name = this.node.getChildByName("label").getComponent(cc.Label).string;
        cc.log(name);
        var point = this.node.getParent().getChildByName("point").getComponent(cc.Label).string;
        cc.log(point);
        cc.director.loadScene("menuScence");
        this.node.getParent().destroy();
    },

    start () {

    },

    // update (dt) {},
});
