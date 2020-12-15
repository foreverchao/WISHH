// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () 
     {
        this.fireBallAni = this.node.getComponent(cc.Animation);
        this.anima = 'NULL';
        this.fireBallAni.on('finished', this.onAnimaFinished, this);
     },
     onDestroy()
    {
        this.fireBallAni.off('finished', this.onAnimaFinished, this);
    },

    start () {
        this.node.parent = cc.find("Canvas");
        this.node.position = cc.find("Canvas/player").position;
        //check the direction
        if(cc.find("Canvas/player").scaleX < 0)
        {
            this.speed = -800;
            this.node.scaleX *= -1;
        }
        else
        {
            this.speed = 800;
        }
        this.setAni("fireBallStart"); 
        /*this.node.runAction(
            //cc.repeat()
              //cc.sequence(//顺序执行括号中的代码
                cc.moveBy(10,600,0))*/
                //cc.removeSelf(true),
    
                //))
    },
    onAnimaFinished(e, data)
    {
        if(data.name == 'fireBallStart')
        {
            this.setAni('fireBallLoop');
        }
        else if(data.name == 'fireBallEnd')
        {
            this.node.destroy();
        }
    },
    onCollisionEnter(other, self)
    {
        if(this.anima == "fireBallEnd")
            return;
        this.fireBallAni.stop();
        this.speed = 0;
        this.setAni("fireBallEnd");
        /*if(other.node.group == 'Player')
        {
            
            this.isHit = true;
            this.enemyAni.play("hurt");
        }*/
    },
    setAni(anima)
    {
        if(this.anima == anima)
            return;
        this.anima = anima;
        this.fireBallAni.play(anima);
    },
     update (dt) 
     {
         if(this.speed)
            this.node.x += (dt * this.speed);
     },
});
