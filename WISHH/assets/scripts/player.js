
const Input = {};
const State = 
{
    stand: 1,
    attack: 2,
};
cc.Class({
    extends: cc.Component,

    properties: {
        ghostPrefab: cc.Prefab,
        playerShadow: cc.Node,
        colorShow: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () 
    {  
        this.dashForce = 1000000;
        this.jumpForce = 180000;
        this.slideSpeed = 300;
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
                this.attack();
                this.switchState();
                this.yellow = true;
                break;
            case cc.macro.KEY.j:
                this.attack();
                this.switchState();
                this.red = true;
                break;
            case cc.macro.KEY.k:
                this.blue = true;
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

    onBeginContact(contact, selfCollider, otherCollider){
        cc.log(selfCollider.tag);
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
    },

    wallSlide()
    {
        this.lv = this.rb.linearVelocity;
        var pushingWall = false;
        if((this.rb.linearVelocity.x>0 && this.wallSide==-1) || (this.rb.linearVelocity.x<0 && this.wallSide==1))
            pushingWall = true;
        var push = this.pushingWall ? 0: this.rb.linearVelocity.x;
        if(pushingWall){
        this.lv.x = push;
        this.lv.y = -this.slideSpeed;
        this.rb.linearVelocity = this.lv;
        }
        else this.onWall = false;
    },

    dash()
    {
        if(!this.yellow){
            //console.log(this.node.x,this.node.y);
            if(this.node.scaleX < 0)
            {
                //this.dashForce = -1000000;
                var dashMovement = cc.moveBy(0.2, cc.v2(-200, 0));
            }
            else if(this.node.scaleX > 0)
            {
                //this.dashForce = 1000000;
                var dashMovement = cc.moveBy(0.2, cc.v2(200, 0));
            }
            this.node.runAction(dashMovement);
            //this.rb.applyForceToCenter( cc.v2(this.dashForce,0) , true );   
            //this.ghost();
        }
 
        //this.rb.applyLinearImpulse(cc.v2(1000000,0),cc.v2(0,0),true)
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
            this.setAni('light');
        }
        else if(Input[cc.macro.KEY.k] && !this.blue)
        {

        }
    },
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
                this.jumpForce2 = 120000;
                if(this.jumpCount==2) this.rb.applyForceToCenter( cc.v2(0,this.jumpForce) , true );
                else if(this.jumpCount==1) 
                {
                    this.jumpForce2 = (152000000-200000*this.rb.linearVelocity.y)/(830);
                    this.rb.applyForceToCenter( cc.v2(0,this.jumpForce2) , true );

                    //cc.log((this.rb.linearVelocity.y),this.jumpForce2);
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
                    break;
                }
        }
    },

    update (dt) 
    {        
        this.color_detect();
        if(this.playerState == State.stand)
        {
            this.move();
        }
        var fallMultiplier = 2.5;    //控制下墜時的重力
        var lowJumpMultiplier = 3; //控制輕跳時的重力
        var limitMultiplier = 1.5; //增加重力避免漂浮感
        this.lv = this.rb.linearVelocity;
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

        //cc.log(this.onWall);

    },
});
