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
        left: {default: 0},
        right:{default: 0},
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

    onLoad () 
    {
        /*this.rangeL = this.node.x - 300;
        this.rangeUp = this.node.y + 100;
        this.ranheDown = this.node.y - 100;
        this.rb = this.node.getComponent(cc.RigidBody);
        this.posiX = this.node.x;
        this.posiY = this.node.y;
        this.move();
*/
        this.node.getComponent(cc.Animation).play("move");
        this.end = true;
        this.isDead = false;
    },
    move()
    {
        /*this.end = false;
        this.node.stopAction();
        let scaleX = Math.abs(this.node.scaleX);
        let randNumX = Math.floor(Math.random()*600);
        let randNumY = Math.floor(Math.random()*100);
        while(Math.abs(this.rangeL + randNumX - this.node.x) < 100)
        {
            randNumX = Math.floor(Math.random()*600);
        }
        if(this.rangeL + randNumX < this.node.x)
        {
            this.node.scaleX = -scaleX;
        }
        else
        {
            this.node.scaleX = scaleX;
        }
        this.posiX = this.rangeL + randNumX;
        this.posiY = this.ranheDown + randNumY;
        let tmepv = cc.v2(this.posiX - this.node.x, randNumY - this.node.y);
        let vel = tmepv.mag() / 600;
        let action = cc.moveTo(vel, this.posiX, this.posiY);
        let callFunc = cc.callFunc(() => {
            this.end = true;
        });
        this.node.runAction(cc.sequence(action, callFunc));*/
        this.end = false
        let scaleX = Math.abs(this.node.scaleX);
        let callFunc1 = cc.callFunc(() => {
            this.node.scaleX = -scaleX;
        });
        let callFunc2 = cc.callFunc(() => {
            this.node.scaleX = scaleX;
        });
        let action1 = cc.moveTo(5, this.left, this.node.y);
        let action2 = cc.moveTo(5, this.right, this.node.y);
        let callFunc = cc.callFunc(() => {
            this.end = true;
        });
        this.node.runAction(cc.sequence(callFunc1, action1,callFunc2,  action2, callFunc));
    },

    onCollisionEnter(other, self)
    {
        if(other.node.group == 'Player' && other.node.name != "player")
        {           
            /*if(other.node.name == "orangeEffect")
                this.scheduleOnce(function(){ this.node.destroy();},0.5);
            //this.isHit = true;
            else*/
            if(!this.isDead)
            {
                this.node.group = "defult"
                this.isDead = true;
                this.shakeEffect(0.3);
                cc.tween(this.node)
                .blink(0.5, 3)
                .call(() => {
                    Variables.score += 200;
                    Variables.scoreChange = true;
                    this.node.destroy();
                }) 
                .start();
            }
        }
    },

    shakeEffect(duration) {
        this.camera = cc.find("Canvas/Main Camera")
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


     update (dt) 
     {
        if(this.end)
            this.move();
     },
});
