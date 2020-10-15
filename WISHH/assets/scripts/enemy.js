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

    onLoad () 
    {
        this.hp = 5;
        this.isHit = false;
        this.enemyAni = this.node.getComponent(cc.Animation);
        this.enemyAni.play("idle");
        this.enemyAni.on('finished', (e, data) =>
        {
            this.hp--;
            this.isHit = false;
            this.enemyAni.play("idle");
            if(this.hp == 0)
            {
                this.node.destroy();
            }
        })
    },
    onCollisionEnter(other, self)
    {
        cc.log("123")
        if(other.node.group == 'Player')
        {
            
            this.isHit = true;
            this.enemyAni.play("hurt");
        }
    },

    start () {

    },

    // update (dt) {},
});
