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

    onLoad ()
    {
        this.laserAni = this.node.getComponent(cc.Animation);
        this.laserAni.on('finished', this.onAnimaFinished, this);
    },
    onDestroy()
    {
        this.laserAni.off('finished', this.onAnimaFinished, this);
    },
    onAnimaFinished(e, data)
    {
        if(data.name == 'laser')
        {
            //this.laserAni.play("laser");;
        }
    },

    shoot()
    {
        if(this.node.name == 'laserHalf')
        {
            this.laserAni.play("laser2");
        }
        else
        {
            this.laserAni.play("laser");
        }
    },

    start () {

    },

    // update (dt) {},
});
