
const Input = {};
const State = 
{
    stand: 1,
    attack: 2,
};
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () 
    {  
        this.dashForce = 1000000;
        this.jumpForce = 180000;
        this._speed = 380;
        this.sp = cc.v2(0,0);//current speed
        this.rb = this.node.getComponent(cc.RigidBody);
        this.playerState = State.stand;
        this.anima = 'idle';
        this.playerAni = this.node.getComponent(cc.Animation);
        this.playerAni.on('finished', this.onAnimaFinished, this);
        this.isOnGround = false;
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
        if(data.name == 'attack')
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
    },
    onKeyup(e)
    {
        switch(e.keyCode) {
            case cc.macro.KEY.l:
            this.dash();
        break;
        }  
        Input[e.keyCode] = 0;
    },
    onBeginContact(contact, selfCollider, otherCollider){
        cc.log(selfCollider.tag)
        if(selfCollider.tag === 1){
            this.isOnGround = true;
        }
    },
    dash()
    {
        if(this.node.scaleX < 0)
        {
            this.dashForce = -1000000;
        }
        else
        {
            this.dashForce = 1000000;
        }
        this.rb.applyForceToCenter( cc.v2(this.dashForce,0) , true );
        //this.rb.applyLinearImpulse(cc.v2(1000000,0),cc.v2(0,0),true)
    },
   /* Dash(x, y)
    {
        let damping = this.rb.linearDamping;
        damping = 5;
        this.lv = this.rb.linearVelocity;
        this.lv.x += cc.v2(x,y).x;
        this.lv.y += cc.v2(x,y).y;
        this.rb.linearVelocity = this.lv; 
    },*/
    //attack
    attack()
    {
        if(Input[cc.macro.KEY.j])
        {
            this.setAni('attack');
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
        /*else if(Input[cc.macro.KEY.w] || Input[cc.macro.KEY.up])
        {
            if(this.isOnGround)
            {
                this.rb.applyForceToCenter( cc.v2(0,this.jumpForce) , true );
                this.setAni("jump");
                this.isOnGround = false;
            }     
        }*/
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
    update (dt) 
    {
        //隨時監聽跳躍鍵
        if(Input[cc.macro.KEY.w] || Input[cc.macro.KEY.up])
        {
            if(this.isOnGround)
            {
                this.rb.applyForceToCenter( cc.v2(0,this.jumpForce) , true );
                this.setAni("jump");
                this.isOnGround = false;
            }     
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
        this.rb.linearVelocity = this.lv; 

        //cc.log(this.isOnGround);
        //cc.log(this.lv.y)
        switch(this.playerState)
        {
            case State.stand:
                {
                    if(Input[cc.macro.KEY.j])
                    {
                        this.playerState = State.attack;
                    }
                    break;
                }
        }

        if(this.playerState == State.attack)
        {
            this.attack();
        }
        else if(this.playerState == State.stand)
        {
            this.move();
        }

    },
});
