
const Input = {};
const State = 
{
    stand: 1,
    attack: 2,
};
cc.Class({
    extends: cc.Component,

    properties: {
        lightPrefab: cc.Prefab,
        ghostPrefab: cc.Prefab,
        snowBallPerfab: cc.Prefab,
        playerShadow: cc.Node,
        colorShow: cc.Node,
        colorBar: cc.Node,
        redBar: cc.Prefab,
        blueBar: cc.Prefab,
        yellowBar: cc.Prefab,
        fireBall: cc.Prefab,
        redMP:cc.Node,
        blueMP:cc.Node,
        yellowMP:cc.Node,
        final: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () 
    {  
        this.redMagicPoint = 6;//red mp
        this.blueMagicPoint = 6;//blue mp
        this.yellowMagicPoint = 6;//yellow mp
        this.setMP();
        this.canMove = true;
        this.dashForce = 1000000;
        this.jumpForce = 180000;
        this.slideSpeed = 250;
        this.canJump = true;
        this.jumpCount = 2; //Counting jump
        this.red = false;
        this.blue = false;
        this.yellow = false;
        this._speed = 450;
        this.sp = cc.v2(0,0);//current speed
        this.rb = this.node.getComponent(cc.RigidBody);
        this.playerState = State.stand;
        this.anima = 'idle';
        this.playerAni = this.node.getComponent(cc.Animation);
        this.playerAni.on('finished', this.onAnimaFinished, this);
        this.isOnGround = false;
        this.onWall = false;
        this.pushingWall = false;
        this.isDashing = false;
        this.wallSide = -1; //判斷目前貼的是左邊還是右邊 右邊:-1 左邊: 1
        cc.systemEvent.on('keydown', this.onKeydown, this);
        cc.systemEvent.on('keyup', this.onKeyup, this);
    },
    onDestroy()
    {
        this.playerAni.off('finished', this.onAnimaFinished, this);
        cc.systemEvent.off('keydown', this.onKeydown, this);
        cc.systemEvent.off('keyup', this.onKeyup, this);
    },
    //start () {},

    onAnimaFinished(e, data)
    {
        if(data.name == 'fire')
        {
            this.playerState = State.stand;
            this.setAni('idle');
        }else if(data.name == 'light')
        {
            this.playerState = State.stand;
            this.setAni('idle');
        }else if(data.name == 'ice')
        {
            this.playerState = State.stand;
            this.setAni('idle');
        }
        else if(data.name == 'player_die')
        {
            this.playerState = State.stand;
            //this.setAni('idle');
        }
        else
        {
            this.playerState = State.stand;
            this.setAni('idle');
        }
    },
    setAni(anima)
    {
        if(this.anima == anima)
            return;
        
        this.anima = anima;
        this.playerAni.play(anima);
    },
    onKeydown(e)
    {
        Input[e.keyCode] = 1;
        switch(e.keyCode) {
            case cc.macro.KEY.l:
                if(this.yellowMagicPoint > 0)
                {
                    //cc.director.getCollisionManger().enabled = false;
                    this.node.group = "Invincible";
                    //this.playerState_Invincible();
                    this.attack();
                    this.switchState();
                    this.playerState = State.stand;
                    this.yellow = true;
                }
                break;
            case cc.macro.KEY.j:
                if(this.redMagicPoint > 0)
                {
                    this.attack();
                    this.switchState();
                    this.red = true;
                }
                break;
            case cc.macro.KEY.k:
                if(this.blueMagicPoint > 0)
                {
                    this.attack();
                    this.switchState();
                    this.blue = true;
                }
                break;
        }  

    },

    onKeyup(e)
    { 
        Input[e.keyCode] = 0;
        switch(e.keyCode) {
            case cc.macro.KEY.w:
                this.canJump = true;
                break;
            case cc.macro.KEY.j:
                this.red = false;
                break;
            case cc.macro.KEY.k:
                this.blue = false;
                break;
            case cc.macro.KEY.l:
                this.yellow = false;
                break;
        }
    },

    onCollisionEnter(other, self)
    {
        if(other.node.name == "the_shot") {
            this.dead();
            this.canMove = false;
        }
    },

    onBeginContact(contact, selfCollider, otherCollider){
        //cc.log(selfCollider.tag);
        if(selfCollider.tag === 1){
            this.isOnGround = true;
            this.jumpCount = 2;
            this.onWall = false;
        }
        else if(selfCollider.tag === 2){ //left
            this.onWall = true;
            this.jumpCount = 2;
            this.wallSide = 1;
        }
        else if(selfCollider.tag === 3){ //right
            this.onWall = true;
            this.jumpCount = 2;
            this.wallSide = -1;
        }
        else if((otherCollider.node.name == "spike" || otherCollider.node.name == "slime" || otherCollider.node.name == "shooter" ||
        otherCollider.node.name == "the_shot") && this.node.group != "Invincible")
        {
            //if(!this.isDashing) cc.log('deadStatus'); else cc.log('undeadStatus');
            this.dead();
            this.canMove = false;
            cc.log("dead");
        }
        else if(otherCollider.node.name == "final")
        {
            cc.log("flag");
            var anim =this.final.getComponent(cc.Animation);
            anim.play("final");
        }
    },

    wallSlide()
    {
        this.lv = this.rb.linearVelocity;
        this.pushingWall = false;
        if((this.rb.linearVelocity.x>0 && this.wallSide==-1) || (this.rb.linearVelocity.x<0 && this.wallSide==1))
            this.pushingWall = true;
        var push = this.pushingWall ? 0: this.rb.linearVelocity.x;
        if(this.pushingWall){
        this.lv.x = push;
        this.lv.y = -this.slideSpeed;
        this.rb.linearVelocity = this.lv;
        }
        else this.onWall = false;
    },

    dash()
    {
        if(!this.yellow){
            //this.node.group = "Invincible";
            //this.node.color.fromHEX('#C3EA13');
            this.yellowMagicPoint--;
            this.setMP();
            this.isDashing = true;
            //console.log(this.node.x,this.node.y);
            var light = cc.instantiate(this.lightPrefab);
            var dashDistance;
            light.x = this.node.x;
            light.y = this.node.y;
            this.lv = this.rb.linearVelocity;
            if(this.node.scaleX < 0)
            { 
                this.lv.x = -100000;
                light.scaleX *= -1; 
                //dashDistance = -300;
            }
            else if(this.node.scaleX > 0)
            {
                this.lv.x = 100000;
                //dashDistance = 300;
            }
            this.playerShadow.addChild(light);
            this.lv.y = 0;
            this.rb.linearVelocity = this.lv;
            this.rb.gravityScale = 0;
            this.scheduleOnce(function(){ light.destroy();this.isDashing = false;cc.log("destroy");},0.83);
            this.scheduleOnce(function(){this.node.group = "Player";},0.83);//this.node.color.fromHEX('#FFFFFF');
            this.scheduleOnce(function(){ this.isDashing = false;cc.log("stop");this.rb.gravityScale = 1;},0.1);
            cc.log(this.lv.x)
            //this.rb.applyForceToCenter( cc.v2(this.dashForce,0) , true );
            //this.node.x += dashDistance;
            //cc.director.getPhysicsManager().gravity = cc.v2(0, -1000);   
            //this.ghost();
        }
 
        //this.rb.applyLinearImpulse(cc.v2(1000000,0),cc.v2(0,0),true)
    },

    dead()
    {
        this.setAni('player_die');
        /*cc.director.preloadScene("menu", function() {
            cc.loader.onProgress = null;
            cc.director.loadScene("menu");
        });*/
    },

    ghost() 
    {
        cc.tween(this.node)
            .call(() => {
                var ghostChild = cc.instantiate(this.ghostPrefab);
                var ghostSprite = this.node.getComponent(cc.Sprite).spriteFrame;
                ghostChild.getComponent(cc.Sprite).spriteFrame = ghostSprite;
                ghostChild.x = this.node.x;
                ghostChild.y = this.node.y;
                this.playerShadow.addChild(ghostChild);
                console.log(ghostChild.x,ghostChild.y);
            })
            .delay(0.3)
            .call(() => {
                var ghostChild = cc.instantiate(this.ghostPrefab);
                var ghostSprite = this.node.getComponent(cc.Sprite).spriteFrame;
                ghostChild.getComponent(cc.Sprite).spriteFrame = ghostSprite;
                ghostChild.x = this.node.x;
                ghostChild.y = this.node.y;
                this.playerShadow.addChild(ghostChild);
                console.log(ghostChild.x,ghostChild.y);
            })
            .start();
    },

    color_detect()
    {
        //cc.log(this.red,this.blue,this.yellow);
        if(this.red && this.blue && this.yellow)  this.colorShow.color = cc.Color.WHITE;
        else if(this.red && !this.blue && !this.yellow) this.colorShow.color = cc.Color.RED;
        else if(!this.red && this.blue && !this.yellow) this.colorShow.color = cc.Color.BLUE;
        else if(!this.red && !this.blue && this.yellow) this.colorShow.color = cc.Color.YELLOW;
        else if(this.red && this.blue && !this.yellow) this.colorShow.color = new cc.Color(130,0,255);
        else if(this.red && !this.blue && this.yellow) this.colorShow.color = cc.Color.ORANGE;
        else if(!this.red && this.blue && this.yellow) this.colorShow.color = cc.Color.GREEN;
        else this.colorShow.color = cc.Color.BLACK;
    },

    //attack
    attack()
    {
        if(Input[cc.macro.KEY.j] && !this.red)
        {
            this.setAni('fire');
        }
        else if(Input[cc.macro.KEY.l] && !this.yellow)
        {
            
            this.dash();
            this.setAni('idle');
            
        }
        else if(Input[cc.macro.KEY.k] && !this.blue)
        {
            this.setAni('ice');
        }
    },
    //into "Invincible";
    /*playerState_Invincible(){
        this.node.group = "Invincible";
    },
    */
    //move
    move()
    {   
        this.node.angle = 0;
        let scaleX = Math.abs(this.node.scaleX);
        this.lv = this.rb.linearVelocity;

        if(Input[cc.macro.KEY.a] || Input[cc.macro.KEY.left])
        {
            this.node.scaleX = -scaleX;
            this.sp.x = -1;
            if(this.isOnGround)
            {
                this.setAni("move");
            }
                
        }
        else if(Input[cc.macro.KEY.d] || Input[cc.macro.KEY.right])
        {
            this.node.scaleX = scaleX;
            this.sp.x = 1;
            if(this.isOnGround)
            {
                this.setAni("move");
            }
                
        }
        else
        {
            this.sp.x = 0;
            this.setAni("idle");
        }

        if(Input[cc.macro.KEY.w] || Input[cc.macro.KEY.up])
        {
            if(this.canJump && this.jumpCount!=0)
            {
                this.jumpForce = (152000000-200000*this.rb.linearVelocity.y)/(830);
                if(this.jumpCount==2) this.rb.applyForceToCenter( cc.v2(0,this.jumpForce) , true );
                else if(this.jumpCount==1) 
                {
                    this.rb.applyForceToCenter( cc.v2(0,this.jumpForce) , true );
                    //this.ghost();
                }
                this.setAni("jump");
                this.isOnGround = false;
                this.canJump = false;
                this.jumpCount --;
            }     
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

    switchState()
    {
        switch(this.playerState)
        {
            case State.stand:
                {
                    if(Input[cc.macro.KEY.j] && !this.red)
                    {
                        this.playerState = State.attack;                        
                    }
                    else if(Input[cc.macro.KEY.l] && !this.yellow)
                    {  
                        this.playerState = State.attack;  
                    }
                    else if(Input[cc.macro.KEY.k] && !this.blue)
                    {  
                        this.playerState = State.attack;  
                    }
                    break;
                }
        }
    },

    fire()
    {
        this.redMagicPoint--;
        this.setMP();
        this.newNode = cc.instantiate(this.fireBall);
        /*if(this.node.scaleX < 0)
        {
            this.newNode.getComponent("fireBallControl").speed = -800;
            cc.log(this.newNode.getComponent("fireBallControl").speed)
        }*/
            
        this.node.addChild(this.newNode);
    },

    snow()
    {
        this.blueMagicPoint--;
        this.setMP();
        var snowBall = cc.instantiate(this.snowBallPerfab);
        snowBall.x = this.node.x;
        snowBall.y = this.node.y;
        this.playerShadow.addChild(snowBall);
        snowRb = snowBall.getComponent(cc.RigidBody);
        if(this.node.scaleX < 0)
        {
            snowRb.applyForceToCenter( cc.v2(-50000,15000));
        }
        else if(this.node.scaleX > 0)
        {
            snowRb.applyForceToCenter( cc.v2(50000,15000));
        }

    },

    setMP(){
        this.colorBar.removeAllChildren();
        for(var i=0; i<this.redMagicPoint; i++)
        {
            var red = cc.instantiate(this.redBar);
            red.x = -22 + i*5;
            red.y = 7;
            this.colorBar.addChild(red);
        }
        for(var i=0; i<this.blueMagicPoint; i++)
        {
            var blue = cc.instantiate(this.blueBar);
            blue.x = -22 + i*5;
            blue.y = 0;
            this.colorBar.addChild(blue);
        }
        for(var i=0; i<this.yellowMagicPoint; i++)
        {
            var yellow = cc.instantiate(this.yellowBar);
            yellow.x = -22 + i*5;
            yellow.y = -7;
            this.colorBar.addChild(yellow);
        }
    },

    update (dt) 
    {    
        //cc.log("isDashing " + this.isDashing);
        //cc.log(this.node.group)
        if(this.canMove){
            this.color_detect();
            if(this.playerState == State.stand && !this.isDashing)
            {
                this.move();
            }
        }
        var fallMultiplier = 2.5;    //控制下墜時的重力
        var lowJumpMultiplier = 3; //控制輕跳時的重力
        var limitMultiplier = 1.5; //增加重力避免漂浮感
        this.lv = this.rb.linearVelocity;
        if(!this.isDashing) {
            if(this.lv.y < 0) { //當角色下降時
                this.lv.y += cc.Vec2.UP.y * cc.director.getPhysicsManager().gravity.y * (fallMultiplier - 1) * dt;
            } else if(this.lv.y > 0 && !Input[cc.macro.KEY.w]) { //當角色輕跳時
                this.lv.y += cc.Vec2.UP.y * cc.director.getPhysicsManager().gravity.y * (lowJumpMultiplier - 1) * dt;
            }
            else if(this.lv.y > 0) { //當角色上升時
                this.lv.y += cc.Vec2.UP.y * cc.director.getPhysicsManager().gravity.y * (limitMultiplier - 1) * dt;
            }
            if(this.onWall) this.wallSlide();
            this.rb.linearVelocity = this.lv; 
        }
    },
});
