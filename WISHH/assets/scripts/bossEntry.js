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

    
    onCollisionEnter(other, self)
    {
        if(!this.flagUsed) this.reach();
    },

    reach() {
        this.flagUsed = true;
        this.node.getComponent(cc.Animation).play("final");

    },

    onLoad () {
        this.flagUsed = false;
        this.flag = this.node.getComponent(cc.Animation);
        this.flag.on('finished', this.onAnimaFinished, this);
    },
    onAnimaFinished(e, data)
    {
        if(data.name == 'final')
        {
            this.node.getComponent(cc.Animation).play("changeScene");
        }
        else if(data.name == 'changeScene')
        {
            cc.director.loadScene("bossScence");
        }
    },

    start () {
    },

    // update (dt) {},
});
