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
        this.portalActivate = false;
        cc.systemEvent.on('keydown', this.onKeydown, this);
        this.nearPortal = false;
    },

    onDestroy()
    {
        cc.systemEvent.off('keydown', this.onKeydown, this);
    },

    onKeydown(e)
    {
        switch(e.keyCode) {
            case cc.macro.KEY.enter:
                if(this.nearPortal) this.beginAnimation();
                break;
            }
    },

    beginAnimation() {
        cc.tween(this.node)
        .call(() => {
            this.player.active = false;
            this.node.getComponent(cc.Animation).play('portal_close');
            this.portalSound = cc.audioEngine.play(this.audio[0], false, 1);
        })
        .delay(1.14)
        .call(() => {
            if(this.node.name == "portal_in_back") this.changeScene1 = cc.find("Canvas/changeScene4");
            else this.changeScene1 = cc.find("Canvas/changeScene1");
            this.changeScene1.getComponent(cc.Animation).play();
        })
        .delay(2)
        .call(() => {
            if(cc.director.getScene().name == "menuScence") {
                Variables.score = 0;
                cc.director.loadScene("mainScence");
                Variables.playerHP = 3;
            }
            else if(cc.director.getScene().name == "mainScence") cc.director.loadScene("bossScence");
        })
        .start();
    },

    localConvertWorldPoint(node) {
        if (node) {
            return node.convertToWorldSpace(cc.v2(0, 0));
        }
        return null;
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
