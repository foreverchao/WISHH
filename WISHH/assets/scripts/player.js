
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
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () 
    {  
        this.dashForce = 1000000;
        this.jumpForce = 180000;
        this.canDash = true; //判斷是否可以使用衝刺
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
        switch(e.keyCode) {
            case cc.macro.KEY.l:
            this.dash();
            this.canDash = false;
        break;
        }  

    },
    onKeyup(e)
    { 
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
        if(this.canDash){
            console.log(this.node.x,this.node.y);
            if(this.node.scaleX < 0 && this.isOnGround)
            {
                //this.dashForce = -1000000;
                var dashMovement = cc.moveBy(0.2, cc.v2(-100, 0));
            }
            else if(this.node.scaleX > 0 && this.isOnGround)
            {
                //this.dashForce = 1000000;
                var dashMovement = cc.moveBy(0.2, cc.v2(100, 0));

            }
            else if(this.node.scaleX < 0 && !this.isOnGround)
            {
                var dashMovement = cc.jumpBy(0.7, cc.v2(-10, 10), 80, 1);
            }
            else if(this.node.scaleX > 0 && !this.isOnGround)
            {
                var dashMovement = cc.jumpBy(0.7, cc.v2(10, 10), 80, 1);
            }
            this.node.runAction(dashMovement);
            //this.rb.applyForceToCenter( cc.v2(this.dashForce,0) , true );   
            //this.ghost();
        }
 
        //this.rb.applyLinearImpulse(cc.v2(1000000,0),cc.v2(0,0),true)
        this.canDash = false;
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

        if(this.isOnGround) this.canDash = true; //落地後就可以衝刺

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
