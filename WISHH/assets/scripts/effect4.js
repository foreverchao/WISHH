// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        FireBall: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        this.hp = 1;
        this.isHit = false;
        this.effect_4 = this.node.getComponent(cc.Animation);
        this.effect_4.on('finished', this.onAnimaFinished, this);
        this.playerNode = this.node.getParent().getParent().getChildByName("player");
        this.canvasNode = cc.find("Canvas");
        this.bossEffectNode = cc.find("Canvas/bossEffect");
        this.map_center = this.canvasNode.getChildByName("Center"); 

        if(this.node.x - this.map_center.x < 0) //在畫面左
            this.node.scaleX = -5;
        else if(this.node.x - this.map_center.x > 0) //在畫面右
            this.node.scaleX = 5;
        this.schedule(function(){
            this.shoot();}
        ,4 ,100 ,2);
        // 間隔 ,重複次數 ,延遲時間
        
     },

     setAni(anima)
     {
         if(this.anima == anima)
             return;
         this.anima = anima;
         this.effect_4.play(anima);
     },

     onAnimaFinished(e, data)
     {
         if(data.name == 'effect_4')
         {
            this.setAni("effect_4_Loop");
         }
     },

    start () {

    },

    shoot(){
        this.newFireBall = cc.instantiate(this.FireBall);
        this.newFireBall.x = this.node.x;
        this.newFireBall.y = this.node.y;
        this.bossEffectNode.addChild(this.newFireBall);
        cc.log("shoot")
    },

     update (dt) {
     },
});
