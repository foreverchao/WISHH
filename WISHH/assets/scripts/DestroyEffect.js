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

    onAnimaFinished(e, data)
    {
        if(data.name == 'effect_1')
        {
            this.node.destroy();
        }
        else if(data.name == 'effect_2')
        {
            this.node.destroy();
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.Ani = this.node.getComponent(cc.Animation);
        this.Ani.on('finished', this.onAnimaFinished, this);
    },

    start () {

    },

    // update (dt) {},
});
