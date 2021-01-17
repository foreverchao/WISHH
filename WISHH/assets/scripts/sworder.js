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
        audio: {
            default: [],
            type: cc.AudioClip
        },
        player: cc.Node,
        rangeR: cc.Node,
        rangeL: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
        this.sp = cc.v2(0,0);//current speed
        this._speed = 350;
        this.rb = this.node.getComponent(cc.RigidBody);
        this.lv = this.rb.linearVelocity;
        this.moveLeft = false;//move to left
        this.moveRight = false;// move to right
        this.hp = 2;
        this.isHit = false;
        this.isAttacking = false;
        this.sworderAni = this.node.getComponent(cc.Animation);
        this.setAni("idle");
        this.sworderAni.on('finished', this.onAnimaFinished, this);
        this.rest = 0;
        this.hurtRest = 0;
    },
    onAnimaFinished(e, data)
    {
        if(data.name == 'attack')
        {
            this.isAttacking = false;
            this.setAni("idle");
        }
    },
    setAni(anima)
    {
        if(this.anima == anima)
            return;
        this.anima = anima;
        this.sworderAni.play(anima);
    },
    onCollisionEnter(other, self)
    {
        if(other.node.group == 'Player' && other.node.name != "player")
        {           
            /*if(other.node.name == "orangeEffect")
                this.scheduleOnce(function(){ this.hurt();;},0.5);
            this.isHit = true;
            else*/
            if(this.hp > 0 && this.hurtRest == 0) this.hurt();
        }
    },
    detectPlayer()
    {
        if(Math.abs(this.player.y - this.node.y) > 100)
            return;
        if(this.rest > 0)
            return;
        if(this.player.x > this.rangeL.x && this.player.x < this.rangeR.x && this.rest == 0)
        {
            let scaleX = Math.abs(this.node.scaleX);
            if((this.player.x - this.node.x) < 100 && (this.player.x - this.node.x) > 0 )
            {
                this.node.scaleX = scaleX;
                this.attack();
                this.isAttacking = true;
            }
            else if((this.node.x - this.player.x) < 100 && (this.node.x - this.player.x) > 0 )
            {
                this.node.scaleX = -scaleX;
                this.attack();
                this.isAttacking = true;
            }
            else if(this.player.x > this.node.x && !this.isAttacking)
            {
                this.moveRight = true;
                this.moveLeft = false;
                this.move();
            }
            else if(!this.isAttacking)
            {
                this.moveRight = false;
                this.moveLeft = true;
                this.move();
            }
        }
        else
        {
            this.setAni("idle");
        }
    },
    attack()
    {
        this.lv.x = 0;
        this.rb.linearVelocity = this.lv;
        if(this.isAttacking)
            return;
        this.sworderSound = cc.audioEngine.play(this.audio[0], false, 1);
        this.setAni("attack");
        this.scheduleOnce(function(){ this.isAttacking = false;},1);
    },
    move()
    {   
        this.node.angle = 0;
        let scaleX = Math.abs(this.node.scaleX);
        if(this.moveLeft)
        {
            this.node.scaleX = -scaleX;
            this.sp.x = -1;
            this.setAni("move");  
        }
        else if(this.moveRight)
        {
            this.node.scaleX = scaleX;
            this.sp.x = 1;
            this.setAni("move");        
        }
        else
        {
            this.sp.x = 0;
            this.setAni("idle");
        }
        if(this.sp.x)
        {
            this.lv.x = this.sp.x * this._speed;
        }
        else
        {
            this.lv.x = 0;
        }
        this.rb.linearVelocity = this.lv;
    },

    localConvertWorldPoint(node) {
        if (node) {
            return node.convertToWorldSpace(cc.v2(0, 0));
        }
        return null;
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

    hurt()
    {
        this.lv.x = 0;
        this.hurtRest = 30;
        this.rb.linearVelocity = this.lv;
        this.rest = 50;
        if(this.hp > 0) this.shakeEffect(0.3);
        this.playerNode = cc.find("Canvas/player");
        this.nodeWorld = this.localConvertWorldPoint(this.node);
        this.playerWorld = this.localConvertWorldPoint(this.playerNode);

        var back = 0;
        if(this.playerWorld.x - this.nodeWorld.x > 0) // 往左邊退
            back = -120;
        else if(this.playerWorld.x - this.nodeWorld.x < 0) // 往右邊退
            back = 120;

        //this.node.runAction(cc.moveBy(0.2, cc.v2(back, 0)),)
        this.lv.x = back;
        this.rb.linearVelocity = this.lv;


        cc.tween(this.node)
        .blink(0.5, 3)
        .call(() => {
            if(this.hurtRest == 0) 
            {   
                this.hp--;
            }
            if(this.hp <=0) {
                this.node.group = "defult"
                Variables.score += 350;
                Variables.scoreChange = true;
                this.camera = cc.find("Canvas/Main Camera")
                this.camera.stopAllActions();
                this.node.destroy();
            }
        }) 
        .start();

        //if(this.anima == 'hurt')
        //    return;
        //this.setAni("hurt");
    },
    
    start () {

    },

    update (dt) {
        if(this.rest > 0) this.rest--;
        if(this.hurtRest > 0) this.hurtRest--;
        this.detectPlayer();
     },
});
