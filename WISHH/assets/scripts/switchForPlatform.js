// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        switchON: cc.Boolean,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.switchON = false;
    },

    onCollisionEnter(other, self)
    {
        if(this.switchON == false) {
            this.node.getComponent(cc.Animation).play();
            this.switchON = true;
        }
    },

    start () {

    },

    update (dt) {

    },
});
