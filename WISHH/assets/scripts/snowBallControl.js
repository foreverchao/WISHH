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
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        
    },

    onBeginContact(contact, selfCollider, otherCollider){
        if(selfCollider.tag === 0)
        {
            cc.log(this.node.y)
            this.ice();
            this.node.destroy();
        }
    },

    ice()
    {
        var canvas = this.node.getParent();
        var ice = cc.instantiate(this.icePrefab);
        ice.x = this.node.x;
        ice.y = this.node.y-30;
        canvas.addChild(ice);
        iceRb = ice.getComponent(cc.RigidBody);
        var anim = ice.getComponent(cc.Animation);
        anim.play("ice_up");
    },

    // update (dt) {},
});
