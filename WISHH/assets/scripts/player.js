
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
        this._speed = 200;
        this.sp = cc.v2(0,0);//current speed

        this.playerState = State.stand;
        this.anima = 'idle';
        this.playerAni = this.node.getComponent(cc.Animation);
        this.playerAni.on('finished', this.onAnimaFinished, this);

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
        Input[e.keyCode] = 0;
    },

    update (dt) 
    {
        this.node.angle = 0;
        let anima = this.anima;
        let scaleX = Math.abs(this.node.scaleX);
        this.lv = this.node.getComponent(cc.RigidBody).linearVelocity;

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
            if(Input[cc.macro.KEY.j])
            {
                anima = 'attack';
            }
        }

        if(this.playerState != State.stand)
        {
            this.sp.x = 0;
        }
        else
        {
            if(Input[cc.macro.KEY.a] || Input[cc.macro.KEY.left])
            {
                this.node.scaleX = -scaleX;
                this.sp.x = -1;
                anima = 'run';
            }
            else if(Input[cc.macro.KEY.d] || Input[cc.macro.KEY.right])
            {
                this.node.scaleX = scaleX;
                this.sp.x = 1;
                anima = 'run';
            }
            else
            {
                this.sp.x = 0;
                anima = 'idle';
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

        this.node.getComponent(cc.RigidBody).linearVelocity = this.lv;
        if(anima)
        {
            this.setAni(anima);
        }
    },
});
