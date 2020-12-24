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
        arrowPrefab: cc.Prefab,
        audio: {
            default: [],
            type: cc.AudioClip
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
        this.hp = 5;
        this.archerAni = this.node.getComponent(cc.Animation);
        this.setAni("idle");
        this.archerAni.on('finished', this.onAnimaFinished, this);
        this.isAttacking = false;
        this.isDying = false;
    },
    setAni(anima)
    {
        if(this.anima == anima)
            return;
        this.anima = anima;
        this.archerAni.play(anima);
    },
    onAnimaFinished(e, data)
    {
        if(data.name == 'attack')
        {
            this.isAttacking = false;
            this.setAni("idle");
        }
        else if(data.name == 'die')
        {
            this.node.destroy();
        }
    },
    onCollisionEnter(other, self)
    {
        if(other.node.group == 'Player')
        {           
            this.hp--;
            if(this.hp <= 0)
            {
                this.setAni("die");
                this.isDying = true;
            }

        }
    },
    detectPlayer()
    {
        if(this.isDying)
            return;
        let scaleX = Math.abs(this.node.scaleX);
        if((this.player.x - this.node.x) < 150 && (this.player.x - this.node.x) > 0 )
        {
            this.node.scaleX = scaleX;
            this.attack();
            this.isAttacking = true;
        }
        else if((this.node.x - this.player.x) < 150 && (this.node.x - this.player.x) > 0 )
        {
            this.node.scaleX = -scaleX;
            this.attack();
            this.isAttacking = true;
        }
    },
    attack()
    {
        if(this.isAttacking)
            return;
        this.scheduleOnce(
            function(){
                this.arrowSound = cc.audioEngine.play(this.audio[0], false, 1);
            },0.5);
        this.setAni("attack");
    },
    shoot()
    {
        let arrow = cc.instantiate(this.arrowPrefab);
        arrow.x = this.node.x;
        arrow.y = this.node.y;
        cc.find("Canvas").addChild(arrow);
        arrowRb = arrow.getComponent(cc.RigidBody);
        if(this.node.scaleX < 0)
        {
            arrowRb.applyForceToCenter( cc.v2(-10000,1500));
        }
        else if(this.node.scaleX > 0)
        {
            arrowRb.applyForceToCenter( cc.v2(10000,1500));
        }
    },

    start () {

    },

    update (dt) 
    {
        this.detectPlayer();
    },
});
