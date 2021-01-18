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
        audio: {
            default: [],
            type: cc.AudioClip
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.player = cc.find("Canvas/player");
        this.changeScene = cc.find("Canvas/changeScene2");
        if(this.node.name == "portal_out_boss") this.changeScene = cc.find("Canvas/initial");
        this.changeScene.getComponent(cc.Animation).play();
        cc.tween(this.node)
        .delay(1.5)
        .call(() => {
            this.node.getComponent(cc.Animation).play('portal_open');
            this.portalSound = cc.audioEngine.play(this.audio[0], false, 1);
        }) 
        .delay(1)
        .call(() => {
            this.node.getComponent(cc.Animation).play('portal_loop');
            this.player.active = true;
        }) 
        .delay(2)
        .call(() => {
            this.node.getComponent(cc.Animation).play('portal_close');
        }) 
        .delay(1)
        .call(() => {
            this.node.destroy();
        })
        .start();

    },
    
    onCollisionEnter(other, self) {
        this.node.getChildByName("label").active = true;
        this.nearPortal = true;
    },

    onCollisionExit(other, self) {
        this.node.getChildByName("label").active = false;
        this.nearPortal = false;
    },


    start () {

    },

    update (dt) {

    },
});
