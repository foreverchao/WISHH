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

    // onLoad () {},

    getRandom(min,max){
        return Math.floor(Math.random()*(max-min+1))+min;
    },

    start () {

    },

    update (dt) {
        this.player = this.node.getParent().getChildByName("player");
        cc.log(this.player);
        //計算精靈與角色距離
        var xDist = this.node.position.sub(this.player.position).x;
        cc.log(xDist);
        if(xDist > 0) this.node.scaleX = -5;
        else this.node.scaleX = 5;
        var dist = this.node.position.sub(this.player.position).mag();

        var movingSpeed = 0.5;
        if(dist > 150) {
            this.node.x = cc.misc.lerp( this.node.x ,this.player.x ,dt * movingSpeed );
            this.node.y = cc.misc.lerp( this.node.y ,this.player.y ,dt * movingSpeed );
        }
        else {
            this.node.y = cc.misc.lerp( this.node.y ,this.player.y + this.getRandom(100,200) ,dt * movingSpeed );
        }
    },
});
