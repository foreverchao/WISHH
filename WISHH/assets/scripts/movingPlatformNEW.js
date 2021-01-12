// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        Position1: cc.Vec2,
        Position2: cc.Vec2,
        switch: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if(this.Position1.x == this.Position2.x) this.leftRight = false;
        else this.leftRight = true;
        this.direction = 1;
        this.body = this.getComponent(cc.RigidBody);
        this.speed = 100;
        this.started = false;
    },

    updateVelocity(){
        cc.log("start!!!!")
        this.started = true;
        var vspeed = this.direction * this.speed;

        let v = cc.v2(0, vspeed)
        if (this.leftRight){
            v = cc.v2(vspeed, 0)
        }
        this.body.linearVelocity = v;
    },

    start () {

    },

    update (dt) {
        this.switchON = this.switch.getComponent("switchForPlatform").switchON;
        if(this.switchON) {
            if(!this.started) this.updateVelocity();

            if(this.leftRight && (this.node.x >= this.Position1.x || this.node.x <= this.Position2.x)) {
                this.direction *= -1;
                this.updateVelocity();
            }
            else if(!this.leftRight && (this.node.y >= this.Position1.y || this.node.y <= this.Position2.y)) {
                this.direction *= -1;
                this.updateVelocity();
            }
        }
    },
});
