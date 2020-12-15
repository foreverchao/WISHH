// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () 
     {
        this.canvasNode = cc.find("Canvas");
        this.map_center = this.canvasNode.getChildByName("Center"); 

        var flySpeed = 200;

        if(this.node.x - this.map_center.x > 0 && this.node.y - this.map_center.y > 0) //在畫面右上角
        {
            this.speed = -flySpeed;
        }
        else if(this.node.x - this.map_center.x > 0 && this.node.y - this.map_center.y < 0) //在畫面右下角
        {
            this.speed = -flySpeed;
        }
        else if(this.node.x - this.map_center.x < 0 && this.node.y - this.map_center.y > 0) //在畫面左上角
        {
            this.node.scaleX = -5;
            this.speed = flySpeed;
        }
        else if(this.node.x - this.map_center.x < 0 && this.node.y - this.map_center.y < 0) //在畫面左下角
        {
            this.node.scaleX = -5;
            this.speed = flySpeed;
        }
     },

    

    start () {

    },
    onAnimaFinished(e, data)
    {

    },
    onCollisionEnter(other, self)
    {
        if(other.node.group == 'ground'||other.node.group == 'Walls' )
        {
            this.node.destroy();
        }
    },

     update (dt) 
     {
         if(this.speed)
            this.node.x += (dt * this.speed);
     },
});
