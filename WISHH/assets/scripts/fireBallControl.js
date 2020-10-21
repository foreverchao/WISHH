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
     },

    start () {
        this.node.parent = cc.find("Canvas");
        this.node.position = cc.find("Canvas/player").position;
        if(cc.find("Canvas/player").scaleX < 0)
            this.speed = -800;
        else
            this.speed = 800;
        this.setAni("fireBallLoop"); 
        /*this.node.runAction(
            //cc.repeat()
              //cc.sequence(//顺序执行括号中的代码
                cc.moveBy(10,600,0))*/
                //cc.removeSelf(true),
     
                //))
    },
    onCollisionEnter(other, self)
    {
        this.node.destroy();
        /*if(other.node.group == 'Player')
        {
            
            this.isHit = true;
            this.enemyAni.play("hurt");
        }*/
    },
    setAni(anima)
    {
        cc.log("test")
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
