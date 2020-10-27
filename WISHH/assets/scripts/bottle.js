// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        color: {
            default: "red",
            //type: cc.String,
            visible : true
        }
    },
    onLoad () 
    {
        this.player = cc.find("Canvas/player").getComponent("player");
        this.bottleAni = this.node.getComponent(cc.Animation);
        this.anima = 'null';
        this.bottleAni.on('finished', this.onAnimaFinished, this);
        this.full = true;
    },
    onDestroy()
    {
       this.bottleAni.off('finished', this.onAnimaFinished, this);
    },
    setAni(anima)
    {
        if(this.anima == anima)
            return;
        this.anima = anima;
        this.bottleAni.play(anima);
    },
    onAnimaFinished(e, data)
    {
        if(data.name == 'recharge')
        {
            this.full = true;
        }
    },
    onCollisionEnter(other, self)
    {
        if(other.node.group == 'Player' && this.full)
        {
            if(this.color == "red")
            {
                this.player.redMagicPoint++;
                this.player.setMP();
            }
            else if(this.color == "blue")
            {
                this.player.blueMagicPoint++;
                this.player.setMP();
            }
            else if(this.color == "yellow")
            {
                this.player.yellowMagicPoint++;
                this.player.setMP();
            }
            this.full = false;
            this.bottleAni.play("recharge");
        }  
    },
    start () {

    },
     update (dt) {
     },
});
