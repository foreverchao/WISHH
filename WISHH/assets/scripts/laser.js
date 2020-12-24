// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        audio: {
            default: [],
            type: cc.AudioClip
        },
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
        this.shootSound = cc.audioEngine.play(this.audio[0], false, 1);
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
