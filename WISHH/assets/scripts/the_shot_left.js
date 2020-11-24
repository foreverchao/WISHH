// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        if(this.node.parent.scaleX < 0)
            this.speed = 50;
        else
            this.speed = -50;
    },
    
    onCollisionEnter(other, self)
    {
        this.node.destroy();
    },
    update (dt) {
        if(this.speed)
            this.node.x += (dt * this.speed);
    },
});
