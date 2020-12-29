// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        audio: {
            default: [],
            type: cc.AudioClip
        },
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
        var physicsBox = this.node.getComponent(cc.PhysicsBoxCollider);
        var anim = this.node.getComponent(cc.Animation);
        cc.log("iceControl");
        this.iceSound = cc.audioEngine.play(this.audio[0], false, 1);
        this.scheduleOnce(
            function(){
                physicsBox.enabled = false;
                anim.play("ice_down");
            },3);
        this.scheduleOnce(
            function(){
                this.node.destroy();
            },3.42);
    },

    // update (dt) {},
});
