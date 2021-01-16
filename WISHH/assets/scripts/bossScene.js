// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        lasers:{
            default: [],
            type: cc.Node,  
        },
        player: cc.Node,
        wizard: cc.number,
        flag: cc.Boolean,
        stop: cc.Boolean,
    },
   
    onLoad () {
        this.flag = false;
        this.stop = false;
    },

    start () {
        
    },
    laserOpen(){
        this.flag = true,
        cc.tween(this.node)
        .call(() => { this.randomLaser(); })
        .delay(5)
        .call(() => { this.randomLaser(); })
        .delay(5)
        .call(() => { this.randomLaser(); })
        .delay(5)
        .call(() => { this.randomLaser(); })
        .delay(5)
        .call(() => { this.randomLaser(); })
        .delay(5)
        .call(() => { this.randomLaser(); })
        .delay(5)
        .call(() => { this.randomLaser(); })
        .delay(5)
        .call(() => { this.randomLaser(); })
        .delay(5)
        .call(() => { this.randomTwoEmptyLaser(); })
        .delay(5)
        .call(() => { this.randomLaser(); })
        .delay(5)
        .call(() => { this.randomLaser(); })
        .delay(5)
        .call(() => { this.randomLaser(); })
        .delay(5)
        .call(() => { this.randomLaser(); })
        .delay(5)
        .call(() => { this.randomTwoEmptyLaser(); })
        .delay(5)
        .call(() => { this.threeLaser(); })
        .delay(5)
        .call(() => { this.randomLaser(); })
        .delay(5)
        .call(() => { this.randomLaser(); })
        .delay(5)
        .call(() => { this.randomLaser(); })
        .delay(5)
        .call(() => { this.randomTwoEmptyLaser(); })
        .delay(5)
        .call(() => { this.randomLaser(); })
        .delay(5)
        .call(() => { this.randomTwoEmptyLaser(); })
        .delay(5)
        .call(() => { this.threeLaser(); })
        .delay(5)
        .call(() => { this.randomLaser(); })
        .delay(5)
        .call(() => { this.randomTwoEmptyLaser(); })
        .delay(5)
        .call(() => { this.threeLaser(); })
        .delay(5)
        .call(() => { this.randomLaser(); })
        .delay(5)
        .call(() => { this.randomTwoEmptyLaser(); })
        .delay(1)
        .call(() => { this.threeLaser(); })
        .delay(2)
        .call(() => { this.randomLaser(); })
        .delay(3)
        .call(() => { this.randomTwoEmptyLaser(); })
        .delay(1)
        .call(() => { this.threeLaser(); })
        .delay(2)
        .call(() => { this.randomLaser(); })
        .delay(3)
        .call(() => { this.randomTwoEmptyLaser(); })
        .delay(1)
        .call(() => { this.threeLaser(); })
        .delay(2)
        .call(() => { this.randomLaser(); })
        .delay(3)
        .call(() => { this.randomTwoEmptyLaser(); })
        .delay(1)
        .call(() => { this.threeLaser(); })
        .delay(2)
        .call(() => { this.randomLaser(); })
        .delay(3)
        .call(() => { this.randomTwoEmptyLaser(); })
        .delay(1)
        .call(() => { this.threeLaser(); })
        .delay(2)
        .call(() => { this.randomLaser(); })
        .delay(3)
        .call(() => { this.randomTwoEmptyLaser(); })
        .delay(1)
        .call(() => { this.threeLaser(); })
        .delay(2)
        .call(() => { this.randomLaser(); })
        .delay(3)
        .call(() => { this.randomTwoEmptyLaser(); })
        .delay(1)
        .call(() => { this.threeLaser(); })
        .delay(2)
        .call(() => { this.randomLaser(); })
        .delay(3)
        .call(() => { this.randomTwoEmptyLaser(); })
        .delay(1)
        .call(() => { this.threeLaser(); })
        .delay(2)
        .call(() => { this.randomLaser(); })
        .delay(3)
        .start()
    },
    threeLaser()
    {
        let tempLen = 9999999999;
        let shootLaser = new Array;
        for(let i = 1; i < 10; i++)
        {
            let tempX = Math.abs(this.player.x - this.lasers[i].x + 600);
            if(tempX < tempLen)
            {
                tempLen = tempX;
                shootLaser[0] = this.lasers[i];
                shootLaser[1] =  this.lasers[i - 1];
                shootLaser[2] =  this.lasers[i + 1]; 
            }
        }
        for(let i = 0 ; i < 3  ;i++)
        {
            shootLaser[i].getComponent("laser").shoot();
        }
    },
    randomLaser()
    {
        let num1 = Math.floor(Math.random()*11);
        let num2 = Math.floor(Math.random()*11);
        while(num1 == num2)
            num2 = Math.floor(Math.random()*11);
        this.lasers[num1].getComponent("laser").shoot();
        this.lasers[num2].getComponent("laser").shoot();
    },
    allLaser()
    {

        let i = 0;
        let time = cc.delayTime(0.3);
        let fun = cc.callFunc(function(){
            this.lasers[i].getComponent("laser").shoot();
            i++;
        }.bind(this));
        let seq1 = cc.sequence([time, fun, time, fun, time, fun, time, fun, time, fun, time, fun, time, fun, time, fun, time, fun, time, fun, time, fun]);
        this.node.runAction(seq1);
    },
    randomTwoEmptyLaser()
    {
        let num1 = Math.floor(Math.random()*11);
        let num2 = Math.floor(Math.random()*11);
        while(num1 == num2)
            num2 = Math.floor(Math.random()*11);
        for(let i = 0 ; i < 11; i++)
        {
            if(i == num1 || i == num2)
                continue;
            this.lasers[i].getComponent("laser").shoot();
        }
    },


    update (dt) {
       if(this.wizard <=5 && this.flag == false){
           this.laserOpen();
       }
       if(this.stop == true)
       {
           this.node.stopAllActions();
       }
    },
});
