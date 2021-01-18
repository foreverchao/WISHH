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
        the_shot: cc.Prefab,
        player: cc.Node,
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
        if(Math.abs(this.node.x - this.player.x) <= 810 && Math.abs(this.node.y - this.player.y) <= 700)
            this.shootSound = cc.audioEngine.play(this.audio[0], false, 1);
        this.newNode = cc.instantiate(this.the_shot);
        this.node.addChild(this.newNode);
        this.newNode.x += 10;
    },

     update (dt) {
     },
});
