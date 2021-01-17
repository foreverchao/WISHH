// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
let Variables = require("./gameGlobalVariable");

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
        if(!this.flagUsed &&  other.node.group == 'Player') this.reach();
    },

    reach() {
        this.flagUsed = true;
        this.node.getComponent(cc.Animation).play("final");
        var playerNode = cc.find('Canvas/player');
        var lifeCount = 0;
        this.HP1 = cc.find("Canvas/bar_UI/UI_hp_bar/UI_hp1");
        this.HP2 = cc.find("Canvas/bar_UI/UI_hp_bar/UI_hp2");
        this.HP3 = cc.find("Canvas/bar_UI/UI_hp_bar/UI_hp3");
        if(Variables.playerHP == 1) {
            lifeCount = 1;
            cc.tween(this.HP2)
            .call(() => {
                this.HP2.active = true;
                Variables.playerHP++;
            }) 
            .delay(0.5)
            .call(() => {
                this.HP3.active = true;
                Variables.playerHP++;
            }) 
            .start();
        }
        else if(Variables.playerHP == 2) {
            lifeCount = 2;
            this.HP3.active = true;
            Variables.playerHP++;
        }
        else if(Variables.playerHP == 3) {
            lifeCount = 3;
        }
        Variables.score += 1000*lifeCount;
        Variables.scoreChange = true;
    },

    onLoad () {
        this.flagUsed = false;
    },

    start () {

    },

    // update (dt) {},
});
