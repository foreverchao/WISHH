// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.player = cc.find("Canvas/player");
        cc.systemEvent.on('keydown', this.onKeydown, this);
        this.enter = false;
    },

    onDestroy()
    {
        cc.systemEvent.off('keydown', this.onKeydown, this);
    },

    onKeydown(e)
    {
        switch(e.keyCode) {
            case cc.macro.KEY.enter:
                this.scheduleOnce(function(){this.enter = true;},3);  
                break;
            }
    },
    

    start () {

    },

    localConvertWorldPoint(node) {
        if (node) {
            return node.convertToWorldSpace(cc.v2(0, 0));
        }
        return null;
    },

    update (dt) {
        //cc.log(Math.abs(this.localConvertWorldPoint(this.player).x - this.localConvertWorldPoint(this.node).x))
        if(this.enter)
        {
            if(Math.abs(this.localConvertWorldPoint(this.player).x - this.localConvertWorldPoint(this.node).x) <= 100) {
                this.node.getChildByName("label").active = true;
            }
            else {
                this.node.getChildByName("label").active = false;
            }
        }
    },
});
