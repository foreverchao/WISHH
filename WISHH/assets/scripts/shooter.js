// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        the_shot: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        this.hp = 1;
        this.isHit = false;
        this.shooterAni = this.node.getComponent(cc.Animation);
        this.shooterAni.play("shooter");
        
     },

    start () {
        
    },
    shoot(){
        this.newNode = cc.instantiate(this.the_shot);
        this.node.addChild(this.newNode);
        this.newNode.x += 10;
    },

     update (dt) {
     },
});
