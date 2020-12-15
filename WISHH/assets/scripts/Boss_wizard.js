// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        map_center: cc.Node,
        effect_1: cc.Prefab,
        effect_2: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.wizardAni = this.node.getComponent(cc.Animation);
        this.setAni("idle");
        this.wizardAni.on('finished', this.onAnimaFinished, this);
        this.playerNode = this.node.getParent().getParent().getChildByName("player");
        this.canvasNode = this.node.getParent().getParent();
    },

    setAni(anima)
    {
        if(this.anima == anima)
            return;
        this.anima = anima;
        this.wizardAni.play(anima);
    },

    getRandom(min,max){
        return Math.floor(Math.random()*max)+min;
    },

    attack_0()
    {
        cc.tween(this.node)
        .call(() => {this.setAni("flash");}) 
        .delay(0.33)
        .call(() => {
            if(this.map_center.x - this.playerNode.x > 0){ // 玩家在地圖左半邊            
                this.node.scaleX = 5;
            }
            else{ // 玩家在地圖右半邊              
                this.node.scaleX = -5;
            }
            this.node.getComponent(cc.Sprite).enabled = false;
            this.setAni("idle");
        })
        .to(0.2,{position: cc.v2(this.playerNode.x-20*this.node.scaleX, this.playerNode.y+100)})
        .call(() => {
            this.node.getComponent(cc.Sprite).enabled  = true;
            this.setAni("flash");
        })
        .delay(0.33)
        .call(() => {
            this.setAni("attack_0");
        })
        .start();
    },

    attack_1()
    {
        cc.tween(this.node)
        .call(() => {this.setAni("flash");}) 
        .delay(0.33)
        .call(() => {
            this.node.getComponent(cc.Sprite).enabled = false;
            this.setAni("idle");
        })
        .to(0.2,{position: cc.v2(-121.5, 74)})
        .call(() => {
            this.node.getComponent(cc.Sprite).enabled  = true;
            this.setAni("flash");
        })
        .delay(0.33)
        .call(() => {
            this.setAni("attack_1");
    
            var effectPosX = [-651,-297,42,387];
            for(var i=0; i<4; i++){
                var effect = cc.instantiate(this.effect_1);
                effect.x = effectPosX[i];
                effect.y = this.getRandom(-200,200);
                this.canvasNode.addChild(effect);
                console.log(effect.x,effect.y);  
            }
        })
        .delay(2.58)
        .call(() => {
            this.setAni("attack_1");
    
            var effectPosX = [-651,-297,42,387];
            for(var i=0; i<4; i++){
                var effect = cc.instantiate(this.effect_1);
                effect.x = effectPosX[i];
                effect.y = this.getRandom(-200,200);
                this.canvasNode.addChild(effect);
                console.log(effect.x,effect.y);  
            }
        })
        .delay(2.58)
        .start();
    },

    attack_2()
    {
        cc.tween(this.node)
        .call(() => {this.setAni("flash");}) 
        .delay(0.33)
        .call(() => {
            if(this.map_center.x - this.playerNode.x > 0) // 玩家在地圖左半邊
            {
                this.targetx = -410;
                this.targety = 91;
                this.node.scaleX = 5;
            }
            else // 玩家在地圖右半邊
            {
                this.targetx = 150;
                this.targety = 91;
                this.node.scaleX = -5;
            }
            this.node.getComponent(cc.Sprite).enabled = false;
            this.setAni("idle");
        })
        .to(0.2,{position: cc.v2(this.targetx, this.targety)})
        .call(() => {
            this.node.getComponent(cc.Sprite).enabled  = true;
            this.setAni("flash");
        })
        .delay(0.33)
        .call(() => {
            this.setAni("attack_2");
            var effect = cc.instantiate(this.effect_2);
            effect.x = this.playerNode.x;
            effect.y = this.playerNode.y;
            this.canvasNode.addChild(effect);
        })
        .start();
    },

    attack_4()
    {
        this.setAni("attack_4");
        this.downLeft = cc.find("Canvas/enemies/Effect4_wizard_左下");
        this.downRight = cc.find("Canvas/enemies/Effect4_wizard_右下");
        this.upLeft = cc.find("Canvas/enemies/Effect4_wizard_左上");
        this.upRight = cc.find("Canvas/enemies/Effect4_wizard_右上");
        this.node.x = 100000;
        if(this.playerNode.x - this.map_center.x > 0 && this.playerNode.y - this.map_center.y > 0) //player在畫面右上角
        {
            this.downLeft.active = true;
            //this.downRight.active = true;
            //this.upLeft.active = true;
        }
        else if(this.playerNode.x - this.map_center.x > 0 && this.playerNode.y - this.map_center.y < 0) //player在畫面右下角
        {
            //this.downLeft.active = true;
            //this.upRight.active = true;
            this.upLeft.active = true;
        }
        else if(this.playerNode.x - this.map_center.x < 0 && this.playerNode.y - this.map_center.y > 0) //player在畫面左上角
        {
            //this.downLeft.active = true;
            this.downRight.active = true;
            //this.upRight.active = true;
        }
        else if(this.playerNode.x - this.map_center.x < 0 && this.playerNode.y - this.map_center.y < 0) //player在畫面左下角
        {
            this.upRight.active = true;
            //this.downRight.active = true;
            //this.upLeft.active = true;
        }

        cc.tween(this.node)
        .call(() => {this.setAni("flash");}) 
        .delay(0.33)
        .call(() => {
            this.downLeft = cc.find("Canvas/enemies/Effect4_wizard_左下");
            this.downRight = cc.find("Canvas/enemies/Effect4_wizard_右下");
            this.upLeft = cc.find("Canvas/enemies/Effect4_wizard_左上");
            this.upRight = cc.find("Canvas/enemies/Effect4_wizard_右上");
            if(this.playerNode.x - this.map_center.x > 0 && this.playerNode.y - this.map_center.y > 0) //player在畫面右上角
            {
                this.downLeft.active = true;
                //this.downRight.active = true;
                //this.upLeft.active = true;
            }
            else if(this.playerNode.x - this.map_center.x > 0 && this.playerNode.y - this.map_center.y < 0) //player在畫面右下角
            {
                //this.downLeft.active = true;
                //this.upRight.active = true;
                this.upLeft.active = true;
            }
            else if(this.playerNode.x - this.map_center.x < 0 && this.playerNode.y - this.map_center.y > 0) //player在畫面左上角
            {
                //this.downLeft.active = true;
                this.downRight.active = true;
                //this.upRight.active = true;
            }
            else if(this.playerNode.x - this.map_center.x < 0 && this.playerNode.y - this.map_center.y < 0) //player在畫面左下角
            {
                this.upRight.active = true;
                //this.downRight.active = true;
                //this.upLeft.active = true;
            }
            this.node.getComponent(cc.Sprite).enabled = false;
            this.setAni("idle");
        })
        .to(0.2,{position: cc.v2(10000, 100000)})
        .start();
    },


    start () {
        //this.scheduleOnce(function(){
        //    this.attack_0();

        //    //cc.tween(this.node)
        //    //.to(3,{position: cc.v2(this.targetX, this.targetY)})
        //    //.call(() => {this.setAni("attack_0");}) 
        //    //.start();
        //    }
        //,2);
        //this.schedule(function(){
        //    this.attack_1();}
        //,2.58 ,2 ,3.37);
        //// 間隔 ,重複次數 ,延遲時間
        //this.scheduleOnce(function(){
        //    this.attack_2();}
        //,11.11);

        //this.scheduleOnce(function(){
        //    this.attack_4();}
        //,12.86);

        cc.tween(this.node)
        .delay(2)
        .call(() => {this.attack_0();}) 
        .delay(2)
        .call(() => {this.attack_1();}) 
        .delay(5)
        .call(() => {this.attack_2();}) 
        .delay(2)
        .call(() => {this.attack_4();}) 
        .delay(2)
        .call(() => {this.attack_0();}) 
        .delay(2)
        .call(() => {this.attack_2();}) 
        .delay(2)
        .call(() => {this.attack_4();}) 
        .delay(2)
        .call(() => {
            var temp = cc.find("Canvas");
            temp.getComponent("bossScene").wizard=3;
        }) 
        .start();

    },

    update (dt) {

    },
});
