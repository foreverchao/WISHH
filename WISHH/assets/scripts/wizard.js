// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        player: cc.Node,
        rangeR: cc.Node,
        rangeL: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
        this.sp = cc.v2(0,0);//current speed
        this._speed = 400;
        this.rb = this.node.getComponent(cc.RigidBody);
        this.lv = this.rb.linearVelocity;
        this.moveLeft = false;//move to left
        this.moveRight = false;// move to right
        this.hp = 2;
        this.isHit = false;
        this.isAttacking = false;
        this.wizardAni = this.node.getComponent(cc.Animation);
        this.setAni("idle");
        this.wizardAni.on('finished', this.onAnimaFinished, this);
    },
    onAnimaFinished(e, data)
    {
        if(data.name == 'attack_0')
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
        this.wizardAni.play(anima);
    },
    onCollisionEnter(other, self)
    {
        if(other.node.group == 'Player' && other.node.name != "player")
        {           
            /*if(other.node.name == "orangeEffect")
                this.scheduleOnce(function(){ this.hurt();;},0.5);
            //this.isHit = true;
            else*/
                this.hurt();
        }
    },
    detectPlayer()
    {
        if(Math.abs(this.player.y - this.node.y) > 100)
            return;
        if(this.isHit)
            return;
        if(this.player.x > this.rangeL.x && this.player.x < this.rangeR.x)
        {
            let scaleX = Math.abs(this.node.scaleX);
            if((this.player.x - this.node.x) < 100 && (this.player.x - this.node.x) > 0 )
            {
                this.node.scaleX = scaleX;
                this.attack_0();
                this.isAttacking = true;
                
            }
            else if((this.node.x - this.player.x) < 100 && (this.node.x - this.player.x) > 0 )
            {
                this.node.scaleX = -scaleX;
                this.attack_0();
                this.isAttacking = true;
                
            }
            else if(this.player.x > this.node.x && !this.isAttacking)
            {
                this.moveRight = true;
                this.moveLeft = false;
                this.move();
            }
            else if(this.player.x > this.node.x && !this.isAttacking)
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
    attack_0()
    {
        
        this.lv.x = 0;
        this.rb.linearVelocity = this.lv;
        if(this.isAttacking)
            return;
        this.setAni("attack_0");
    },
    move()
    {   
        this.node.angle = 0;
        let scaleX = Math.abs(this.node.scaleX);
        if(this.moveLeft)
        {
            this.node.scaleX = -scaleX;
            this.sp.x = 0;
            //this.setAni("move");  
        }
        else if(this.moveRight)
        {
            this.node.scaleX = scaleX;
            this.sp.x = 0;
            //this.setAni("move");        
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
    hurt()
    {
        if(this.anima == 'hurt')
            return;
        this.hp--;
        if(this.hp <=0)
            this.node.destroy();
        //this.setAni("hurt");
    },
    
    start () {

    },

    update (dt) {
        this.detectPlayer();
     },
});
