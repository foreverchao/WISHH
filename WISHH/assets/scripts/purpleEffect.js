// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        player: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (dt) {
        this.node.x = cc.misc.lerp( this.node.x ,this.player.x ,dt*0.5 );
        this.node.y = cc.misc.lerp( this.node.y ,this.player.y ,dt*0.5 )
        cc.log(this.node.x ,this.node.y);
    },
});
