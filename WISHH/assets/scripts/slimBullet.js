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

    onLoad () 
     {
        this.slimBulletAni = this.node.getComponent(cc.Animation);
        this.anima = 'NULL';
        this.slimBulletAni.on('finished', this.onAnimaFinished, this);
        this.setAni("bullet");
     },
    /*onDestroy()
    {
        this.slimBulletAni.off('finished', this.onAnimaFinished, this);
    },*/
    onAnimaFinished(e, data)
    {
        if(data.name == 'bulletEnd')
        {
            this.node.destroy();
        }
    },
    
    onBeginContact(contact, selfCollider, otherCollider){
        if(this.anima == "bulletEnd")
            return;
        this.slimBulletAni.stop();
        this.setAni("bulletEnd");
    },
    /*onCollisionEnter(other, self)
    {
        cc.log(other)
        if(this.anima == "bulletEnd")
            return;
        this.slimBulletAni.stop();
        this.setAni("bulletEnd");
    },*/
    setAni(anima)
    {
        if(this.anima == anima)
            return;
        this.anima = anima;
        this.slimBulletAni.play(anima);
    },
    start () {

    },

    // update (dt) {},
});
