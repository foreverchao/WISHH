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
        this.no1 = cc.find("Canvas/leaderBoard/1");
        this.no2 = cc.find("Canvas/leaderBoard/2");
        this.no3 = cc.find("Canvas/leaderBoard/3");
        this.no4 = cc.find("Canvas/leaderBoard/4");
        this.no5 = cc.find("Canvas/leaderBoard/5");
        cc.systemEvent.on('keydown', this.onKeydown, this);
        this.show = false;
        this.pressTab = cc.find("Canvas/leaderBoard/tab");
        cc.tween(this.pressTab)
        .blink(3, 3)
        .repeatForever()
        .start();
    },

    onDestroy()
    {
        cc.systemEvent.off('keydown', this.onKeydown, this);
    },

    onKeydown(e)
    {
        switch(e.keyCode) {
            case cc.macro.KEY.tab:
                if(Variables.atMenu) {
                    this.leaderBoardUpdate();
                    this.show = !this.show;
                    if(this.show) this.node.getComponent(cc.Animation).play('leaderboard_in');
                    else this.node.getComponent(cc.Animation).play('leaderboard_out');
                }
                break;
            }
    },

    leaderBoardUpdate() {
        for(var i=0; i<Variables.leaderboardData.length-1; i++) {
            for(var j=0; j<Variables.leaderboardData.length-1-i; j++) {
                if(Variables.leaderboardData[j][1]<Variables.leaderboardData[j+1][1]) {
                    var temp = Variables.leaderboardData[j];
                    Variables.leaderboardData[j] = Variables.leaderboardData[j+1];
                    Variables.leaderboardData[j+1] = temp;
                }
            }
        }

        

        if(Variables.leaderboardData.length >= 5) {
            this.no1.getChildByName("name").getComponent(cc.Label).string =  Variables.leaderboardData[0][0];
            this.no1.getChildByName("point").getComponent(cc.Label).string =  Variables.leaderboardData[0][1];
            this.no2.getChildByName("name").getComponent(cc.Label).string =  Variables.leaderboardData[1][0];
            this.no2.getChildByName("point").getComponent(cc.Label).string =  Variables.leaderboardData[1][1];
            this.no3.getChildByName("name").getComponent(cc.Label).string =  Variables.leaderboardData[2][0];
            this.no3.getChildByName("point").getComponent(cc.Label).string =  Variables.leaderboardData[2][1];
            this.no4.getChildByName("name").getComponent(cc.Label).string =  Variables.leaderboardData[3][0];
            this.no4.getChildByName("point").getComponent(cc.Label).string =  Variables.leaderboardData[3][1];
            this.no5.getChildByName("name").getComponent(cc.Label).string =  Variables.leaderboardData[4][0];
            this.no5.getChildByName("point").getComponent(cc.Label).string =  Variables.leaderboardData[4][1];
        }
        else if(Variables.leaderboardData.length == 4) {
            this.no1.getChildByName("name").getComponent(cc.Label).string =  Variables.leaderboardData[0][0];
            this.no1.getChildByName("point").getComponent(cc.Label).string =  Variables.leaderboardData[0][1];
            this.no2.getChildByName("name").getComponent(cc.Label).string =  Variables.leaderboardData[1][0];
            this.no2.getChildByName("point").getComponent(cc.Label).string =  Variables.leaderboardData[1][1];
            this.no3.getChildByName("name").getComponent(cc.Label).string =  Variables.leaderboardData[2][0];
            this.no3.getChildByName("point").getComponent(cc.Label).string =  Variables.leaderboardData[2][1];
            this.no4.getChildByName("name").getComponent(cc.Label).string =  Variables.leaderboardData[3][0];
            this.no4.getChildByName("point").getComponent(cc.Label).string =  Variables.leaderboardData[3][1];
            this.no5.getChildByName("name").getComponent(cc.Label).string =  "";
            this.no5.getChildByName("point").getComponent(cc.Label).string =  "";
        }
        else if(Variables.leaderboardData.length == 3) {
            this.no1.getChildByName("name").getComponent(cc.Label).string =  Variables.leaderboardData[0][0];
            this.no1.getChildByName("point").getComponent(cc.Label).string =  Variables.leaderboardData[0][1];
            this.no2.getChildByName("name").getComponent(cc.Label).string =  Variables.leaderboardData[1][0];
            this.no2.getChildByName("point").getComponent(cc.Label).string =  Variables.leaderboardData[1][1];
            this.no3.getChildByName("name").getComponent(cc.Label).string =  Variables.leaderboardData[2][0];
            this.no3.getChildByName("point").getComponent(cc.Label).string =  Variables.leaderboardData[2][1];
            this.no4.getChildByName("name").getComponent(cc.Label).string = "";
            this.no4.getChildByName("point").getComponent(cc.Label).string = "";
            this.no5.getChildByName("name").getComponent(cc.Label).string =  "";
            this.no5.getChildByName("point").getComponent(cc.Label).string =  "";
        }
        else if(Variables.leaderboardData.length == 2) {
            this.no1.getChildByName("name").getComponent(cc.Label).string =  Variables.leaderboardData[0][0];
            this.no1.getChildByName("point").getComponent(cc.Label).string =  Variables.leaderboardData[0][1];
            this.no2.getChildByName("name").getComponent(cc.Label).string =  Variables.leaderboardData[1][0];
            this.no2.getChildByName("point").getComponent(cc.Label).string =  Variables.leaderboardData[1][1];
            this.no3.getChildByName("name").getComponent(cc.Label).string =  "";
            this.no3.getChildByName("point").getComponent(cc.Label).string = "";
            this.no4.getChildByName("name").getComponent(cc.Label).string =  "";
            this.no4.getChildByName("point").getComponent(cc.Label).string = "";
            this.no5.getChildByName("name").getComponent(cc.Label).string =  "";
            this.no5.getChildByName("point").getComponent(cc.Label).string =  "";
        }
        else if(Variables.leaderboardData.length == 1) {
            this.no1.getChildByName("name").getComponent(cc.Label).string =  Variables.leaderboardData[0][0];
            this.no1.getChildByName("point").getComponent(cc.Label).string =  Variables.leaderboardData[0][1];
            this.no2.getChildByName("name").getComponent(cc.Label).string =  "";
            this.no2.getChildByName("point").getComponent(cc.Label).string = "";
            this.no3.getChildByName("name").getComponent(cc.Label).string =  "";
            this.no3.getChildByName("point").getComponent(cc.Label).string = "";
            this.no4.getChildByName("name").getComponent(cc.Label).string =  "";
            this.no4.getChildByName("point").getComponent(cc.Label).string = "";
            this.no5.getChildByName("name").getComponent(cc.Label).string =  "";
            this.no5.getChildByName("point").getComponent(cc.Label).string =  "";
        }
        else if(Variables.leaderboardData.length == 0) {
            this.no1.getChildByName("name").getComponent(cc.Label).string =  "";
            this.no1.getChildByName("point").getComponent(cc.Label).string = "";
            this.no2.getChildByName("name").getComponent(cc.Label).string =  "";
            this.no2.getChildByName("point").getComponent(cc.Label).string = "";
            this.no3.getChildByName("name").getComponent(cc.Label).string =  "";
            this.no3.getChildByName("point").getComponent(cc.Label).string = "";
            this.no4.getChildByName("name").getComponent(cc.Label).string =  "";
            this.no4.getChildByName("point").getComponent(cc.Label).string = "";
            this.no5.getChildByName("name").getComponent(cc.Label).string =  "";
            this.no5.getChildByName("point").getComponent(cc.Label).string =  "";
        }
    },

    start () {

    },

    update (dt) {},
});
