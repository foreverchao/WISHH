// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        effect_4: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onEnable () {
        this.wizardAni = this.node.getComponent(cc.Animation);
        this.wizardAni.on('finished', this.onAnimaFinished, this);
        this.setAni("attack_4");
        this.OrangeInteractItem = cc.find("Canvas/OrangeInteractItem");
        this.map_center = cc.find("Canvas/Center");
        var effect = cc.instantiate(this.effect_4);
        if(this.node.x - this.map_center.x > 0 && this.node.y - this.map_center.y > 0) //在畫面右上角
        {
            effect.x = this.node.x - 150;
            effect.y = this.node.y;   
        }
        else if(this.node.x - this.map_center.x > 0 && this.node.y - this.map_center.y < 0) //在畫面右下角
        {
            effect.x = this.node.x - 150;
            effect.y = this.node.y; 
        }
        else if(this.node.x - this.map_center.x < 0 && this.node.y - this.map_center.y > 0) //在畫面左上角
        {
            effect.x = this.node.x + 150;
            effect.y = this.node.y;     
        }
        else if(this.node.x - this.map_center.x < 0 && this.node.y - this.map_center.y < 0) //在畫面左下角
        {
            effect.x = this.node.x + 150;
            effect.y = this.node.y;   
        }
        this.OrangeInteractItem.addChild(effect);   
    },

    setAni(anima)
    {
        if(this.anima == anima)
            return;
        this.anima = anima;
        this.wizardAni.play(anima);
    },

    onAnimaFinished(e, data)
    {
        if(data.name == 'attack_4')
        {
            this.setAni("idle");
            this.node.active = false;
        }
    },

    start () {

    },

    // update (dt) {},
});
