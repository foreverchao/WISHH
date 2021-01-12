// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        platform:{
            default: [],
            type: cc.Node,  
        },
        position1: [cc.Vec2],
        position2: [cc.Vec2],
        distance: [cc.Integer],
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.trigger = false;
        this.swithON = false;
        this.speed = 10;
    },

    onCollisionEnter(other, self)
    {
       cc.log(other.node.name)
       this.node.getComponent(cc.Animation).play();
       this.swithON = true;
    },

    platformMove()
    {
        if(!this.trigger)
        for(var i=0; i<this.platform.length; i++)
        {
            cc.tween(this.platform[i])
              .to(5,{position: cc.v2(this.position1[i].x,this.position1[i].y)})
              .to(5,{position: cc.v2(this.position2[i].x,this.position2[i].y)})
              .call(() => { this.trigger = false; })
              .start();
        }
        this.trigger = true;
    },

    newPlatformMove()
    {
        for(var i=0; i<this.platform.length; i++) {
            if(this.position1[i].x == this.position2[i].x) {
                
            }
        }
    },

    start () {

    },

    update (dt) {
        if(this.swithON)
        {
            this.platformMove();
            var d = this.speed * this._direction * dt;
        }
    },
});
