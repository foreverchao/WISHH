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
        map_center: cc.Node,
        effect_1: cc.Prefab,
        effect_2: cc.Prefab,
        effect_3_Loop: cc.Prefab,
        effect_3_Laser: cc.Prefab,
        effect_4: cc.Prefab,
        audio: {
            default: [],
            type: cc.AudioClip
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Variables.scoreChange = true;
        this.wizardAni = this.node.getComponent(cc.Animation);
        this.setAni("idle");
        this.wizardAni.on('finished', this.onAnimaFinished, this);
        this.playerNode = this.node.getParent().getParent().getChildByName("player");
        this.canvasNode = this.node.getParent().getParent();
        this.bossEffectNode = cc.find("Canvas/bossEffect");
        this.hurtMeNow = false; // true 時可以被攻擊
        this.hp = 10;
        this.bossCollider = this.node.getComponent(cc.PolygonCollider);
        this.circleCollider = this.node.getComponent(cc.CircleCollider);
        this.bossCollider.enabled = false;
        this.circleCollider.enabled = false;
        this.alive = true;
        this.bossBgm = cc.audioEngine.play(this.audio[0], true, 1);
    },

    setAni(anima)
    {
        if(this.anima == anima)
            return;
        this.anima = anima;
        this.wizardAni.play(anima);
    },

    setHP()
    {
        this.wizardHP_UI = cc.find("Canvas/bar_UI/UI_wizard_hp_bar")
        this.HP1 = cc.find("Canvas/bar_UI/UI_wizard_hp_bar/UI_hp1");
        this.HP2 = cc.find("Canvas/bar_UI/UI_wizard_hp_bar/UI_hp2");
        this.HP3 = cc.find("Canvas/bar_UI/UI_wizard_hp_bar/UI_hp3");
        this.HP4 = cc.find("Canvas/bar_UI/UI_wizard_hp_bar/UI_hp4");
        this.HP5 = cc.find("Canvas/bar_UI/UI_wizard_hp_bar/UI_hp5");
        this.HP6 = cc.find("Canvas/bar_UI/UI_wizard_hp_bar/UI_hp6");
        this.HP7 = cc.find("Canvas/bar_UI/UI_wizard_hp_bar/UI_hp7");
        this.HP8 = cc.find("Canvas/bar_UI/UI_wizard_hp_bar/UI_hp8");
        this.HP9 = cc.find("Canvas/bar_UI/UI_wizard_hp_bar/UI_hp9");
        this.HP10 = cc.find("Canvas/bar_UI/UI_wizard_hp_bar/UI_hp10");
        if(this.hp == 10) {
            this.HP1.active = true;
            this.HP2.active = true;
            this.HP3.active = true;
            this.HP4.active = true;
            this.HP5.active = true;
            this.HP6.active = true;
            this.HP7.active = true;
            this.HP8.active = true;
            this.HP9.active = true;
            this.HP10.active = true;
        }
        else if(this.hp == 9)
        {
            cc.tween(this.HP10)
            .blink(0.5, 3)
            .call(() => {
                this.HP10.active = false;
            }) 
            .start();
        }
        else if(this.hp == 8)
        {
            cc.tween(this.HP9)
            .blink(0.5, 3)
            .call(() => {
                this.HP9.active = false;
            }) 
            .start();
        }
        else if(this.hp == 7)
        {
            cc.tween(this.HP8)
            .blink(0.5, 3)
            .call(() => {
                this.HP8.active = false;
            }) 
            .start();
        }
        else if(this.hp == 6)
        {
            cc.tween(this.HP7)
            .blink(0.5, 3)
            .call(() => {
                this.HP7.active = false;
            }) 
            .start();
        }
        else if(this.hp == 5)
        {
            cc.tween(this.HP6)
            .blink(0.5, 3)
            .call(() => {
                this.HP6.active = false;
            }) 
            .start();
        }
        else if(this.hp == 4)
        {
            cc.tween(this.HP5)
            .blink(0.5, 3)
            .call(() => {
                this.HP5.active = false;
            }) 
            .start();
        }
        else if(this.hp == 3)
        {
            cc.tween(this.HP4)
            .blink(0.5, 3)
            .call(() => {
                this.HP4.active = false;
            }) 
            .start();
        }
        else if(this.hp == 2)
        {
            cc.tween(this.HP3)
            .blink(0.5, 3)
            .call(() => {
                this.HP3.active = false;
            }) 
            .start();
        }
        else if(this.hp == 1)
        {
            cc.tween(this.HP2)
            .blink(0.5, 3)
            .call(() => {
                this.HP2.active = false;
            }) 
            .start();
        }
        else if(this.hp == 0)
        {
            cc.tween(this.HP1)
            .blink(0.5, 3)
            .call(() => {
                this.HP1.active = false;
            }) 
            .start();
        }

    },

    getRandom(min,max){
        return Math.floor(Math.random()*max)+min;
    },

    attack_0()
    {
        this.circleCollider.enabled = true;
        this.bossCollider.enabled = false;
        this.hurtMeNow = false;
        cc.tween(this.node)
        // flash 動畫時間 = 0.33 
        .call(() => {
            this.setAni("flash");
            this.flashSound = cc.audioEngine.play(this.audio[5], false, 1);
        }) // wizard 消失
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
            this.flashSound = cc.audioEngine.play(this.audio[5], false, 1);
        })
        .delay(0.33)
        .call(() => { // attack_0 動畫時間 = 1.30
            this.bossCollider.enabled = true;
            this.hurtMeNow = true;
            this.setAni("attack_0");
        })
        .delay(0.85)
        .call(() => {
            this.attack_0Sound = cc.audioEngine.play(this.audio[4], false, 1);
        })
        .delay(0.45)
        .call(() => {
            this.circleCollider.radius = 0;
            this.circleCollider.enabled = false;
            this.hurtMeNow = true;
        })
        .start();
    },

    attack_1()
    {
        this.bossCollider.enabled = false;
        this.hurtMeNow = false;
        cc.tween(this.node)
        .call(() => {
            this.setAni("flash");
            this.flashSound = cc.audioEngine.play(this.audio[5], false, 1);
        }) // wizard 消失
        .delay(0.33)
        .call(() => {
            this.node.getComponent(cc.Sprite).enabled = false;
            this.setAni("idle");
        })
        .to(0.2,{position: cc.v2(-121.5, 74)}) // wizard 移動位置
        .call(() => { // wizard 出現
            this.node.getComponent(cc.Sprite).enabled  = true;
            this.setAni("flash");
            this.flashSound = cc.audioEngine.play(this.audio[5], false, 1);
        })
        .delay(0.33)
        // effect_1 圓圈圈 動畫時間 = 2.58
        .call(() => { // 
            this.attack_1Sound = cc.audioEngine.play(this.audio[1], false, 1);
            this.setAni("attack_1");
            this.bossCollider.enabled = true;
            this.hurtMeNow = true;
            var effectPosX = [-651,-297,42,387]; //圓圈圈 x 軸位置
            for(var i=0; i<4; i++){
                var effect = cc.instantiate(this.effect_1);
                effect.x = effectPosX[i];
                effect.y = this.getRandom(-200,200); //圓圈圈 y 軸取亂數
                this.bossEffectNode.addChild(effect);
                //console.log(effect.x,effect.y);  
            }
        })
        .start();
    },

    attack_2()
    {
        this.bossCollider.enabled = false;
        this.hurtMeNow = false;
        cc.tween(this.node)
        .call(() => {
            this.setAni("flash");
            this.flashSound = cc.audioEngine.play(this.audio[5], false, 1);
        }) 
        .delay(0.33)
        .call(() => {
            this.node.getComponent(cc.Sprite).enabled = false;
            if(this.map_center.x - this.playerNode.x > 0) // 玩家在地圖左半邊
            {
                this.node.x = -410;
                this.node.y = 91;
            }
            else // 玩家在地圖右半邊
            {
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
            this.flashSound = cc.audioEngine.play(this.audio[5], false, 1);
        })
        .delay(0.33)
        .call(() => { // attack_0 動畫時間 = 1.75
            this.setAni("attack_2");
            this.scheduleOnce(function(){
                this.attack_2Sound = cc.audioEngine.play(this.audio[6], false, 1);
            },0.5);
            this.bossCollider.enabled = true;
            this.hurtMeNow = true;
            var effect = cc.instantiate(this.effect_2);
            effect.x = this.playerNode.x;
            effect.y = this.playerNode.y;
            this.bossEffectNode.addChild(effect);
            this.scheduleOnce(function(){effect.group = "enemy";},1.08);
            this.scheduleOnce(function(){effect.group = "defult";},1.25);

        })
        .delay(1.75)
        .start();
    },

    attack_3()
    {
        this.bossCollider.enabled = false;
        this.hurtMeNow = false;
        var where = 0;
        cc.tween(this.node)
        .call(() => {
            this.setAni("flash");
            this.flashSound = cc.audioEngine.play(this.audio[5], false, 1);
        }) 
        .delay(0.33)
        .call(() => {
            this.node.getComponent(cc.Sprite).enabled  = false;
            where = this.getRandom(0,3);
            if(where == 0) //出現在畫面左下角
            {
                this.node.x = -545;
                this.node.y = -174;
                this.node.scaleX = 5;
            }
            else if(where == 1) //出現在畫面左上角
            {
                this.node.x = -759;
                this.node.y = 46;
                this.node.scaleX = 5;
            }
            else if(where == 2) //出現在畫面右下角
            {
                this.node.x = 217;
                this.node.y = -174;
                this.node.scaleX = -5;
            }
            else if(where == 3) //出現在畫面右上角
            {
                this.node.x = 476;
                this.node.y = 46;
                this.node.scaleX = -5;
            }
            this.setAni("idle");
        })
        .delay(1)
        .call(() => {
            this.node.getComponent(cc.Sprite).enabled  = true;
            this.setAni("flash");
            this.flashSound = cc.audioEngine.play(this.audio[5], false, 1);
        }) 
        .delay(0.33)
        .call(() => { // attack_3 動畫時間 = 1.00
            this.setAni("attack_3");
            this.bossCollider.enabled = true;
            this.hurtMeNow = true;
        }) 
        .delay(1.00)
        .call(() => { // Perfab 球球
            var effect = cc.instantiate(this.effect_3_Loop);
            if(this.node.x - this.map_center.x < 0) //在畫面左
            {
                effect.scaleX = -5;
                effect.x = this.node.x + 150;
                effect.y = this.node.y;
            } 
            else if(this.node.x - this.map_center.x > 0) //在畫面右
            {               
                effect.scaleX = 5;
                effect.x = this.node.x - 150;
                effect.y = this.node.y;
            }
            this.bossEffectNode.addChild(effect,20);
            this.attack_3_1Sound = cc.audioEngine.play(this.audio[2], false, 1);
        })
        .delay(3.00) // 集氣時間
        .call(() => { // Prefab 雷射光
            var effect = cc.instantiate(this.effect_3_Laser);
            this.effectLoopBall = cc.find("Canvas/bossEffect/wizard_effect_3_Loop");
            effect.x = this.effectLoopBall.x;
            effect.y = this.effectLoopBall.y;
            //cc.log(effect.x,effect.y);
            this.bossEffectNode.addChild(effect,10);   
        })
        .delay(2.00) // 雷射時間
        .call(() => { // 雷射結束
            this.effectLoopBall = cc.find("Canvas/bossEffect/wizard_effect_3_Loop");
            this.effectLaser = cc.find("Canvas/bossEffect/wizard_effect_3_2");
            this.effectLoopBall.destroy();
            this.effectLaser.destroy();
            this.setAni("flash");
            this.flashSound = cc.audioEngine.play(this.audio[5], false, 1);
            this.bossCollider.enabled = false;
            this.hurtMeNow = false;
        })
        .delay(0.33)
        .call(() => {
            this.node.getComponent(cc.Sprite).enabled  = false;
            var temp;
            do{ // 避免出現在同一個地方
                temp = this.getRandom(0,3);
            }while(temp == where)
            where = temp;

            if(where == 0) //出現在畫面左下角
            {
                this.node.x = -545;
                this.node.y = -174;
                this.node.scaleX = 5;
            }
            else if(where == 1) //出現在畫面左上角
            {
                this.node.x = -759;
                this.node.y = 46;
                this.node.scaleX = 5;
            }
            else if(where == 2) //出現在畫面右下角
            {
                this.node.x = 217;
                this.node.y = -174;
                this.node.scaleX = -5;
            }
            else if(where == 3) //出現在畫面右上角
            {
                this.node.x = 476;
                this.node.y = 46;
                this.node.scaleX = -5;
            }
            this.setAni("idle");
        })
        .delay(1)
        .call(() => {
            this.node.getComponent(cc.Sprite).enabled  = true;
            this.setAni("flash");
            this.flashSound = cc.audioEngine.play(this.audio[5], false, 1);
        }) 
        .delay(0.33)
        .call(() => { // attack_3 動畫時間 = 1.00
            this.setAni("attack_3");
            this.bossCollider.enabled = true;
            this.hurtMeNow = true;
        }) 
        .delay(1.00)
        .call(() => { // Perfab 球球
            var effect = cc.instantiate(this.effect_3_Loop);
            if(this.node.x - this.map_center.x < 0) //在畫面左
            {
                effect.scaleX = -5;
                effect.x = this.node.x + 150;
                effect.y = this.node.y;
            } 
            else if(this.node.x - this.map_center.x > 0) //在畫面右
            {               
                effect.scaleX = 5;
                effect.x = this.node.x - 150;
                effect.y = this.node.y;
            }
            this.bossEffectNode.addChild(effect,20);  
            this.attack_3_2Sound = cc.audioEngine.play(this.audio[3], false, 1);
        })
        .delay(0) // 第二次不用集氣
        .call(() => { // Prefab 雷射光
            var effect = cc.instantiate(this.effect_3_Laser);
            this.effectLoopBall = cc.find("Canvas/bossEffect/wizard_effect_3_Loop");
            effect.x = this.effectLoopBall.x;
            effect.y = this.effectLoopBall.y;
            //cc.log(effect.x,effect.y);
            this.bossEffectNode.addChild(effect,10);     
        })
        .delay(2.00) // 雷射時間
        .call(() => { // 雷射結束
            this.effectLoopBall = cc.find("Canvas/bossEffect/wizard_effect_3_Loop");
            this.effectLaser = cc.find("Canvas/bossEffect/wizard_effect_3_2");
            this.effectLoopBall.destroy();
            this.effectLaser.destroy();
            this.setAni("flash");
            this.flashSound = cc.audioEngine.play(this.audio[5], false, 1);
            this.bossCollider.enabled = false;
            this.hurtMeNow = false;
        })
        .delay(0.33)
        .call(() => {
            this.node.getComponent(cc.Sprite).enabled  = false;

            var temp;
            do{ // 避免出現在同一個地方
                temp = this.getRandom(0,3);
            }while(temp == where)
            where = temp;

            if(where == 0) //出現在畫面左下角
            {
                this.node.x = -545;
                this.node.y = -174;
                this.node.scaleX = 5;
            }
            else if(where == 1) //出現在畫面左上角
            {
                this.node.x = -759;
                this.node.y = 46;
                this.node.scaleX = 5;
            }
            else if(where == 2) //出現在畫面右下角
            {
                this.node.x = 217;
                this.node.y = -174;
                this.node.scaleX = -5;
            }
            else if(where == 3) //出現在畫面右上角
            {
                this.node.x = 476;
                this.node.y = 46;
                this.node.scaleX = -5;
            }
            this.setAni("idle");
        })
        .delay(1)
        .call(() => {
            this.node.getComponent(cc.Sprite).enabled  = true;
            this.setAni("flash");
            this.flashSound = cc.audioEngine.play(this.audio[5], false, 1);
        }) 
        .delay(0.33)
        .call(() => { // attack_3 動畫時間 = 1.00
            this.setAni("attack_3");
            this.bossCollider.enabled = true;
            this.hurtMeNow = true;
        }) 
        .delay(1.00)
        .call(() => { // Perfab 球球
            var effect = cc.instantiate(this.effect_3_Loop);
            if(this.node.x - this.map_center.x < 0) //在畫面左
            {
                effect.scaleX = -5;
                effect.x = this.node.x + 150;
                effect.y = this.node.y;
            } 
            else if(this.node.x - this.map_center.x > 0) //在畫面右
            {               
                effect.scaleX = 5;
                effect.x = this.node.x - 150;
                effect.y = this.node.y;
            }
            this.bossEffectNode.addChild(effect,20);  
            this.attack_3_2Sound = cc.audioEngine.play(this.audio[3], false, 1);
        })
        .delay(0) // 第三次也不用集氣
        .call(() => { // Prefab 雷射光
            var effect = cc.instantiate(this.effect_3_Laser);
            this.effectLoopBall = cc.find("Canvas/bossEffect/wizard_effect_3_Loop");
            effect.x = this.effectLoopBall.x;
            effect.y = this.effectLoopBall.y;
            //cc.log(effect.x,effect.y);
            this.bossEffectNode.addChild(effect,10);   
        })
        .delay(2.00) // 雷射時間
        .call(() => { // 雷射結束
            this.effectLoopBall = cc.find("Canvas/bossEffect/wizard_effect_3_Loop");
            this.effectLaser = cc.find("Canvas/bossEffect/wizard_effect_3_2");
            this.effectLoopBall.destroy();
            this.effectLaser.destroy();
        })
        .start();
    },

    attack_4()
    {
        this.bossCollider.enabled = false;
        this.hurtMeNow = false;
        cc.tween(this.node)
        .call(() => {
            this.setAni("flash");
            this.flashSound = cc.audioEngine.play(this.audio[5], false, 1);
        }) 
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
            this.flashSound = cc.audioEngine.play(this.audio[5], false, 1);
        }) 
        .delay(0.33)
        .call(() => {
            this.setAni("attack_4");
            this.attack_4Sound = cc.audioEngine.play(this.audio[7], false, 1);
            this.bossCollider.enabled = true;
            this.hurtMeNow = true;
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

    air_idle()
    {
        this.hurtMeNow = true;
        this.setAni("idle2");
        this.bossCollider.enabled = true;
    },

    die()
    {
        var temp = cc.find("Canvas");
        temp.getComponent("bossScene").stop = true;
        this.effectLoopBall = cc.find("Canvas/bossEffect/wizard_effect_3_Loop");
        this.effectLaser = cc.find("Canvas/bossEffect/wizard_effect_3_2");
        if(this.effectLoopBall != null) this.effectLoopBall.destroy();
        if(this.effectLaser != null) this.effectLaser.destroy();
        this.OrangeInteractItem = cc.find("Canvas/OrangeInteractItem");
        this.OrangeInteractItem.removeAllChildren();

        let blinking = cc.tween().blink(5,18);
        let moveToGround = cc.tween().to(5,{position: cc.v2(-121.5, -191)});
        let shaking = cc.tween().call(() => {this.shakeEffect(5)});

        this.node.getComponent(cc.Sprite).enabled = true;
        cc.tween(this.node)
        // flash 動畫時間 = 0.33 
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
        .call(() => {
            this.setAni("idle2");
        })
        .parallel(blinking, moveToGround, shaking)
        .call(() => {
            this.node.y = -91;
            this.setAni("die");
        })
        .start();
    },

    hurt()
    {
        this.hurtMeNow = false;
        this.shakeEffect(0.5);
        cc.tween(this.node)
        .blink(0.5, 3)
        .call(() => {
            this.hp--;
            this.setHP();
            var temp = cc.find("Canvas");
            temp.getComponent("bossScene").wizard=this.hp;
        }) 
        .start();
        this.scheduleOnce(function(){this.hurtMeNow = true;},1.00);
    },

    onCollisionEnter(other, self)
    {
        if(other.node.group == 'Player' && other.node.name != "player" && this.hurtMeNow == true)
        {           
            this.hurt();
        }
    },

    shakeEffect(duration) {
        this.camera = cc.find("Canvas/Main Camera")
        this.camera.runAction(
            cc.repeatForever(
                cc.sequence(
                    cc.moveBy(0.02, cc.v2(5, 7)),
                    cc.moveBy(0.02, cc.v2(-6, 7)),
                    cc.moveBy(0.02, cc.v2(-13, 3)),
                    cc.moveBy(0.02, cc.v2(3, -6)),
                    cc.moveBy(0.02, cc.v2(-5, 5)),
                    cc.moveBy(0.02, cc.v2(2, -8)),
                    cc.moveBy(0.02, cc.v2(-8, -10)),
                    cc.moveBy(0.02, cc.v2(3, 10)),
                    cc.moveBy(0.02, cc.v2(0, 0))
                )
            )
        );

        setTimeout(() => {
            this.camera.stopAllActions();
            //this.camera.setPosition(0,0);
        }, duration*1000);
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

        let attack_0_anima = cc.tween().call(() => {this.attack_0();}).delay(1.96);
        let attack_1_anima = cc.tween().call(() => {this.attack_1();}).delay(3.24);
        let attack_2_anima = cc.tween().call(() => {this.attack_2();}).delay(1.16);
        let attack_3_anima = cc.tween().call(() => {this.attack_3();}).delay(16.89);
        let attack_4_anima = cc.tween().call(() => {this.attack_4();}).delay(2.99);
        let idle_anima = cc.tween().call(() => {this.air_idle();}).delay(2);
        
        cc.tween(this.node)
        .delay(4)
        .then(attack_0_anima)
        .then(idle_anima)
        .then(attack_1_anima)
        .then(idle_anima)
        .then(attack_2_anima)
        .then(idle_anima)
        .then(attack_3_anima)
        .then(idle_anima)
        .then(attack_4_anima)
        .then(idle_anima)
        .then(attack_3_anima)
        .then(idle_anima)
        .then(attack_2_anima)
        .then(idle_anima)
        .then(attack_1_anima)
        .then(idle_anima)
        .then(attack_0_anima)
        .then(idle_anima)
        .then(attack_2_anima)
        .then(idle_anima)
        .then(attack_1_anima)
        .then(idle_anima)
        .then(attack_4_anima)
        .then(idle_anima)
        .then(attack_3_anima)
        .then(idle_anima)
        .then(attack_0_anima)
        .then(idle_anima)
        .then(attack_2_anima)
        .then(idle_anima)
        .then(attack_4_anima)
        .then(idle_anima)
        .then(attack_1_anima)
        .then(idle_anima)
        .then(attack_3_anima)
        .then(idle_anima)
        .then(attack_0_anima)
        .then(idle_anima)
        .then(attack_1_anima)
        .then(idle_anima)
        .then(attack_2_anima)
        .then(idle_anima)
        .then(attack_4_anima)
        .then(idle_anima)
        .then(attack_3_anima)
        .then(idle_anima)
        .then(attack_4_anima)
        .then(idle_anima)
        .then(attack_3_anima)
        .then(idle_anima)
        .then(attack_2_anima)
        .then(idle_anima)
        .then(attack_1_anima)
        .then(idle_anima)
        .then(attack_0_anima)
        .then(idle_anima)
        .then(attack_2_anima)
        .then(idle_anima)
        .start();

        //attack_0 = 1.96
        //attack_1 = 3.24
        //attack_2 = 1.16
        //attack_3 = 16.89
        //attack_4 = 2.99
     
        /*cc.tween(this.node)
        .delay(2)
        .call(() => {this.attack_0();}) 
        .delay(1.96)
        .call(() => {this.air_idle();}) 
        .delay(2)
        .call(() => {this.attack_1();}) 
        .delay(3.24)
        .call(() => {this.air_idle();}) 
        .delay(2)
        .call(() => {this.attack_2();}) 
        .delay(1.16)
        .call(() => {this.air_idle();}) 
        .delay(2)
        .call(() => {this.attack_3();}) 
        .delay(16.89)
        .call(() => {this.air_idle();}) 
        .delay(2)
        .call(() => {this.attack_4();}) 
        .delay(2.99)
        .call(() => {this.air_idle();}) 
        .delay(2)
        .call(() => {this.attack_4();}) 
        .delay(2.99)
        .call(() => {this.air_idle();}) 
        .delay(2)
        .call(() => {this.attack_3();}) 
        .delay(16.89)
        .call(() => {this.air_idle();}) 
        .delay(2)
        .call(() => {this.attack_2();}) 
        .delay(1.16)
        .call(() => {this.air_idle();}) 
        .delay(2)
        .call(() => {this.attack_4();}) 
        .delay(2.99)
        .call(() => {this.air_idle();}) 
        .delay(2)
        .call(() => {this.attack_3();}) 
        .delay(16.89)
        .call(() => {this.air_idle();}) 
        .delay(2)
        .start();*/

    },

    update (dt) {
        //cc.log(this.hp);
        if(this.hp <= 0 && this.alive == true)
        {
            this.alive = false;
            this.node.stopAllActions();
            this.bossCollider.enabled = false;
            this.die();
        }

    },
});
