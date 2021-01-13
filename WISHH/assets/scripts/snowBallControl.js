// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        icePrefab: cc.Prefab,
        audio: {
            default: [],
            type: cc.AudioClip
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.touch = false;
    },

    start () {
        
    },

    onBeginContact(contact, selfCollider, otherCollider){
        if(selfCollider.tag === 0)
        {
            cc.log(this.node.y)
            if(!this.touch) {
                this.ice();
                this.touch = true;
                this.node.getComponent(cc.Sprite).enabled = false;
            }
        }
    },

    ice()
    {
        var canvas = cc.find("Canvas/playerEffect");
        var ice = cc.instantiate(this.icePrefab);
        ice.x = this.node.x;
        ice.y = this.node.y-30;
        canvas.addChild(ice);
        var anim = ice.getComponent(cc.Animation);
        anim.play("ice_up");
        this.iceSound = cc.audioEngine.play(this.audio[0], false, 1);
        this.scheduleOnce(
            function(){
                anim.play("ice_down");
            },3);
        this.scheduleOnce(
            function(){
                this.node.destroy();
                ice.destroy();
            },3.42);
    },

    // update (dt) {},
});
