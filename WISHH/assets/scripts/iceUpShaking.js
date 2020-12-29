// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    shakeEffect(duration) {
        this.camera = cc.find("Canvas/Main Camera");
        this.camera.runAction(
            cc.repeatForever(
                cc.sequence(
                    cc.moveBy(0.02, cc.v2(5, 7)),
                    cc.moveBy(0.02, cc.v2(-6, 7)),
                    cc.moveBy(0.02, cc.v2(-13, 3)),
                    cc.moveBy(0.02, cc.v2(3, -6)),
                    cc.moveBy(0.02, cc.v2(-5, 5)),
                    cc.moveBy(0.02, cc.v2(2, -8)),
                    cc.moveBy(0.02, cc.v2(-8, -10)),
                    cc.moveBy(0.02, cc.v2(3, 10)),
                    cc.moveBy(0.02, cc.v2(0, 0))
                )
            )
        );

        setTimeout(() => {
            this.camera.stopAllActions();
            //this.camera.setPosition(0,0);
        }, duration*1000);
    },


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.shakeEffect(0.2);
    },

    start () {

    },

    // update (dt) {},
});
