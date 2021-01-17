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

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.targetLock = false;
        this.attacked = false;
        this.targetX = 0;
        this.targetY = 0;
        this.enemies = cc.find("Canvas/enemies");
    },

    getRandom(min,max){
        return Math.floor(Math.random()*(max-min+1))+min;
    },

    search()
    {
        if(!this.targetLock) {
            let tempLen = 350;
            for(let i = 0 ; i < this.enemies.childrenCount ; i++)//find the nearest enemy
            {
                let tempX = this.node.x - this.enemies.children[i].x;
                let tempY = this.node.y - this.enemies.children[i].y;
                let tmepv = cc.v2(tempX, tempY);
                if(tmepv.mag() < tempLen)
                {
                    tempLen = tmepv.mag();
                    this.targetX = this.enemies.children[i].x;
                    this.targetY = this.enemies.children[i].y;
                    this.targetLock = true;
                }
            }
        }   
    },

    attack()
    {
        this.targetLock = false;
        if(this.node.x > this.targetX && this.node.scaleX > 0) this.node.scaleX *= -1;
        cc.tween(this.node)
        .to(0.4,{position: cc.v2(this.targetX, this.targetY)})
        .call(() => {  this.node.getComponent(cc.Animation).play('purpleEffect_End');}) 
        .delay(0.5)
        .call(() => { 
            Variables.purpleAmount--;
            this.node.destroy();
        })
        .start();
        //this.node.getComponent(cc.Animation).stop('purpleEffect');
        //this.node.getComponent(cc.Animation).playAdditive('purpleEffect_End');
    },

    start () {

    },

    update (dt) {
        this.search();
        if(!this.targetLock && !this.attacked) {
            this.player = cc.find("Canvas/player");
            //cc.log(this.player);
            //計算精靈與角色距離
            var xDist = this.node.position.sub(this.player.position).x;
            //cc.log(xDist);
            if(xDist > 0) this.node.scaleX = -5;
            else this.node.scaleX = 5;
            var dist = this.node.position.sub(this.player.position).mag();

            var movingSpeed = 0.3;
            if(dist > 150) {
                this.node.x = cc.misc.lerp( this.node.x ,this.player.x ,dt * movingSpeed );
                this.node.y = cc.misc.lerp( this.node.y ,this.player.y ,dt * movingSpeed );
            }
            else {
                this.node.y = cc.misc.lerp( this.node.y ,this.player.y + this.getRandom(100,200) ,dt * movingSpeed );
            }
        }
        else if(!this.attacked){
            this.attacked = true;
            this.attack();
        }
    },
});
