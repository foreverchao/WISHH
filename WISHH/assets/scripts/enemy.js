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
        bulletPrefab: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
        this.sp = cc.v2(0,0);//current speed
        this._speed = 50;
        this.rb = this.node.getComponent(cc.RigidBody);
        this.lv = this.rb.linearVelocity;
        this.moveLeft = false;//move to left
        this.moveRight = false;// move to right
        this.hp = 5;
        this.isHit = false;
        this.isAttacking = false;
        this.enemyAni = this.node.getComponent(cc.Animation);
        this.setAni("idle");
        this.enemyAni.on('finished', this.onAnimaFinished, this);
    },
    onAnimaFinished(e, data)
    {
        if(data.name == 'hurt')
        {
            this.isHit = false;
            this.setAni("idle");
            if(this.hp == 0)
            {
                this.node.destroy();
            }
        }
        else if(data.name == 'attack2')
        {
            this.isAttacking = false;
            this.setAni("idle");
        }
    },
    onCollisionEnter(other, self)
    {
        if(other.node.group == 'Player')
        {           
            cc.log("123")
            this.isHit = true;
            this.hurt();
        }
    },
    setAni(anima)
    {
        if(this.anima == anima)
            return;
        this.anima = anima;
        this.enemyAni.play(anima);
    },
    detectPlayer()
    {
        if(this.isHit)
            return;
        if(this.player.x > this.rangeL.x && this.player.x < this.rangeR.x)
        {
            let scaleX = Math.abs(this.node.scaleX);
            if((this.player.x - this.node.x) < 150 && (this.player.x - this.node.x) > 0 )
            {
                this.node.scaleX = scaleX;
                this.attack();
                this.isAttacking = true;
            }
            else if((this.node.x - this.player.x) < 150 && (this.node.x - this.player.x) > 0 )
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
    },
    attack()
    {
        if(this.isAttacking)
            return;
        this.setAni("attack2");
    },
    shoot()
    {
        let bullet = cc.instantiate(this.bulletPrefab);
        bullet.x = this.node.x;
        bullet.y = this.node.y;
        cc.find("Canvas").addChild(bullet);
        bulletRb = bullet.getComponent(cc.RigidBody);
        if(this.node.scaleX < 0)
        {
            bulletRb.applyForceToCenter( cc.v2(-25000,15000));
        }
        else if(this.node.scaleX > 0)
        {
            bulletRb.applyForceToCenter( cc.v2(25000,15000));
        }
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
    hurt()
    {
        if(this.anima == 'hurt')
            return;
        this.hp--;
        this.setAni("hurt");
    },

     update (dt) {
        this.detectPlayer();
     },
});
