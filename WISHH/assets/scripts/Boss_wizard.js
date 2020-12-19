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
        effect_4: cc.Prefab,
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
        // flash 動畫時間 = 0.33 
        .call(() => {this.setAni("flash");}) // wizard 消失
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
        .to(0.2,{position: cc.v2(this.playerNode.x-20*this.node.scaleX, this.playerNode.y+100)}) // wizard 移動位置
        .call(() => { // wizard 出現
            this.node.getComponent(cc.Sprite).enabled  = true;
            this.setAni("flash");
        })
        .delay(0.33)
        .call(() => { // attack_0 動畫時間 = 1.30
            this.setAni("attack_0");
        })
        .delay(1.3)
        .start();
    },

    attack_1()
    {
        cc.tween(this.node)
        .call(() => {this.setAni("flash");}) // wizard 消失
        .delay(0.33)
        .call(() => {
            this.node.getComponent(cc.Sprite).enabled = false;
            this.setAni("idle");
        })
        .to(0.2,{position: cc.v2(-121.5, 74)}) // wizard 移動位置
        .call(() => { // wizard 出現
            this.node.getComponent(cc.Sprite).enabled  = true;
            this.setAni("flash");
        })
        .delay(0.33)
        // effect_1 圓圈圈 動畫時間 = 2.58
        .call(() => { // 
            this.setAni("attack_1");
    
            var effectPosX = [-651,-297,42,387]; //圓圈圈 x 軸位置
            for(var i=0; i<4; i++){
                var effect = cc.instantiate(this.effect_1);
                effect.x = effectPosX[i];
                effect.y = this.getRandom(-200,200); //圓圈圈 y 軸取亂數
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
            this.node.getComponent(cc.Sprite).enabled = false;
            if(this.map_center.x - this.playerNode.x > 0) // 玩家在地圖左半邊
            {
                cc.log("player at left")
                this.node.x = -410;
                this.node.y = 91;
            }
            else // 玩家在地圖右半邊
            {
                cc.log("player at right")
                this.node.x = 150;
                this.node.y = 91;
            }
            this.setAni("idle");
        })
        .delay(0.5)
        .call(() => {
            this.node.getComponent(cc.Sprite).enabled  = true;
            if(this.node.x == -410) this.node.scaleX = 5;
            else this.node.scaleX = -5;
            this.setAni("flash");
        })
        .delay(0.33)
        .call(() => { // attack_0 動畫時間 = 1.75
            this.setAni("attack_2");
            var effect = cc.instantiate(this.effect_2);
            effect.x = this.playerNode.x;
            effect.y = this.playerNode.y;
            this.canvasNode.addChild(effect);
            this.scheduleOnce(function(){effect.group = "enemy";},1.08);
            this.scheduleOnce(function(){effect.group = "defult";},1.25);

        })
        .delay(1.75)
        .start();
    },

    attack_4()
    {
        cc.tween(this.node)
        .call(() => {this.setAni("flash");}) 
        .delay(0.33)
        .call(() => {
            this.node.getComponent(cc.Sprite).enabled  = false;
            if(this.playerNode.x - this.map_center.x > 0 && this.playerNode.y - this.map_center.y > 0) //player在畫面右上角
            {
                this.node.x = -545;
                this.node.y = -190;
                this.node.scaleX = 5;
            }
            else if(this.playerNode.x - this.map_center.x > 0 && this.playerNode.y - this.map_center.y < 0) //player在畫面右下角
            {
                this.node.x = -778;
                this.node.y = 30;
                this.node.scaleX = 5;
            }
            else if(this.playerNode.x - this.map_center.x < 0 && this.playerNode.y - this.map_center.y > 0) //player在畫面左上角
            {
                this.node.x = 277;
                this.node.y = -192;
                this.node.scaleX = -5;
            }
            else if(this.playerNode.x - this.map_center.x < 0 && this.playerNode.y - this.map_center.y < 0) //player在畫面左下角
            {
                this.node.x = 503;
                this.node.y = 28;
                this.node.scaleX = -5;
            }
            this.setAni("idle");
        })
        .delay(1)
        .call(() => {
            this.node.getComponent(cc.Sprite).enabled  = true;
            this.setAni("flash");
        }) 
        .delay(0.33)
        .call(() => {
            this.setAni("attack_4");
            this.OrangeInteractItem = cc.find("Canvas/OrangeInteractItem");
            var effect = cc.instantiate(this.effect_4);
            if(this.node.x - this.map_center.x > 0 && this.node.y - this.map_center.y > 0) //在畫面右上角
            {
                effect.x = this.node.x - 150;
                effect.y = this.node.y;   
            }
            else if(this.node.x - this.map_center.x > 0 && this.node.y - this.map_center.y < 0) //在畫面右下角
            {
                effect.x = this.node.x - 150;
                effect.y = this.node.y; 
            }
            else if(this.node.x - this.map_center.x < 0 && this.node.y - this.map_center.y > 0) //在畫面左上角
            {
                effect.x = this.node.x + 150;
                effect.y = this.node.y;     
            }
            else if(this.node.x - this.map_center.x < 0 && this.node.y - this.map_center.y < 0) //在畫面左下角
            {
                effect.x = this.node.x + 150;
                effect.y = this.node.y;   
            }
            this.OrangeInteractItem.addChild(effect);   
        }) 
        .delay(1.33)
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
        .delay(3)
        .call(() => {this.attack_1();}) 
        .delay(3)
        .call(() => {this.attack_2();}) 
        .delay(3)
        .call(() => {this.attack_4();}) 
        .delay(3)
        .call(() => {this.attack_0();}) 
        .delay(3)
        .call(() => {this.attack_2();}) 
        .delay(3)
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
