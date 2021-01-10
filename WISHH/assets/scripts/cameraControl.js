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
        bar_UI: cc.Node,
        icon_UI: cc.Node,
        score_UI: cc.Node,
        BG_Layer_back: cc.Node,
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

    // onLoad () {},

    start () {

    },

    update (dt) 
    {
        let targerPosition = this.player.getPosition();
        let currentPosition = this.node.getPosition();
        if(cc.director.getScene().name == "bossScence") {
            targerPosition.x = cc.misc.clampf(targerPosition.x, -300, 0);
            targerPosition.y = cc.misc.clampf(targerPosition.y, 0, 0);
            this.node.getComponent(cc.Camera).zoomRatio = 0.8;
            this.bar_UI.setPosition(currentPosition.x,currentPosition.y);
            this.icon_UI.setPosition(currentPosition.x,currentPosition.y);
            //this.score_UI.setPosition(currentPosition.x,currentPosition.y);
            currentPosition.lerp(targerPosition, 0.1, currentPosition);
            this.node.setPosition(currentPosition);
            this.BG_Layer_back.setPosition(currentPosition.x/2,currentPosition.y/2)
        }
        else if(cc.director.getScene().name == "mainScence")
        {
            currentPosition.lerp(targerPosition, 0.1, currentPosition);
            this.node.setPosition(currentPosition);
            this.BG_Layer_back.setPosition(currentPosition.x/2,currentPosition.y/2)
            targerPosition.y = cc.misc.clampf(targerPosition.y, -4000, 650);
            this.node.getComponent(cc.Camera).zoomRatio = 1;
            this.bar_UI.setPosition(currentPosition.x,currentPosition.y);
            this.score_UI.setPosition(currentPosition.x,currentPosition.y);
            this.icon_UI.setPosition(currentPosition.x,currentPosition.y);
        }

    },
});
