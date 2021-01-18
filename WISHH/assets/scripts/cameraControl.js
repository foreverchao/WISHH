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
        player: cc.Node,
        bar_UI: cc.Node,
        icon_UI: cc.Node,
        score_UI: cc.Node,
        BG_Layer_back: cc.Node,
        BG_Layer_back1: cc.Node,

        door_1: cc.Node,
        door_2: cc.Node,
        door_3: cc.Node,
        door_4: cc.Node,
        door_5: cc.Node,
        door_6: cc.Node,

        audio: {
            default: [],
            type: cc.AudioClip
        },

        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if(cc.director.getScene().name == "menuScence") {
            Variables.atMenu = true;
            Variables.playerHP = 3;
            this.enterPressed = false;
            this.changeCamera = false;
            this.player = cc.find("Canvas/player");
            this.player.getComponent(cc.Animation).play('idle');
            this.pressEnterToStart = cc.find("Canvas/pressEnterToStart");
            Variables.playerCanMove = false;
            this.leaderBoardShow = false;
            cc.tween(this.pressEnterToStart)
            .blink(3, 3)
            .repeatForever()
            .start();
        }

        cc.systemEvent.on('keydown', this.onKeydown, this);
    },

    onDestroy()
    {
        cc.systemEvent.off('keydown', this.onKeydown, this);
    },

    onKeydown(e)
    {
        switch(e.keyCode) {
            case cc.macro.KEY.enter:
                this.beginAnimation();
                break;
            case cc.macro.KEY.tab:
                this.leaderBoardShow = !this.leaderBoardShow;
                break;
            }
    },
    
    beginAnimation() {
        if(!this.enterPressed && cc.director.getScene().name == "menuScence" && !this.leaderBoardShow) {
            Variables.atMenu = false;
            this.enterPressed = true;
            cc.tween(this.node)
            .call(() => {
                this.shakeEffect(0.2);
                this.door_1.getComponent(cc.Animation).play();
                this.doorSound = cc.audioEngine.play(this.audio[0], false, 1);
                this.door_1.getComponent(cc.PhysicsBoxCollider).enabled = false;
            }) 
            .delay(0.44)
            .call(() => {
                this.shakeEffect(0.2);
                this.door_2.getComponent(cc.Animation).play();
                this.doorSound = cc.audioEngine.play(this.audio[0], false, 1);
                this.door_2.getComponent(cc.PhysicsBoxCollider).enabled = false;
            }) 
            .delay(0.44)
            .call(() => {
                this.shakeEffect(0.2);
                this.door_3.getComponent(cc.Animation).play();
                this.doorSound = cc.audioEngine.play(this.audio[0], false, 1);
                this.door_3.getComponent(cc.PhysicsBoxCollider).enabled = false;
            }) 
            .delay(0.44)
            .call(() => {
                this.shakeEffect(0.2);
                this.door_4.getComponent(cc.Animation).play();
                this.doorSound = cc.audioEngine.play(this.audio[0], false, 1);
                this.door_4.getComponent(cc.PhysicsBoxCollider).enabled = false;
            }) 
            .delay(0.44)
            .call(() => {
                this.shakeEffect(0.2);
                this.door_5.getComponent(cc.Animation).play();
                this.doorSound = cc.audioEngine.play(this.audio[0], false, 1);
                this.door_5.getComponent(cc.PhysicsBoxCollider).enabled = false;
            }) 
            .delay(0.44)
            .call(() => {
                this.shakeEffect(0.2);
                this.door_6.getComponent(cc.Animation).play();
                this.doorSound = cc.audioEngine.play(this.audio[0], false, 1);
                this.door_6.getComponent(cc.PhysicsBoxCollider).enabled = false;
            }) 
            .delay(0.7)
            .call(() => {
                this.pressEnterToStart.active = false;
                this.changeCamera = true;
                this.bar_UI.active = true;
                this.icon_UI.active = true;
                Variables.playerCanMove = true;
            }) 
            .start();
        }
    },

    shakeEffect(duration) {
        var seq = cc.repeatForever(
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
        this.camera = this.node;
        this.camera.runAction(seq);

        setTimeout(() => {
            //this.camera.stopAllActions();
            this.camera.stopAction(seq);
            this.camera.setPosition(0,0);
        }, duration*1000);
    },

    start () {

    },

    update (dt) 
    {
        let targerPosition = this.player.getPosition();
        let currentPosition = this.node.getPosition();
        if(cc.director.getScene().name == "bossScence") {
            targerPosition.x = cc.misc.clampf(targerPosition.x, -300, 0);
            targerPosition.y = cc.misc.clampf(targerPosition.y, 0, 0);
            currentPosition.lerp(targerPosition, 0.1, currentPosition);
            this.node.setPosition(currentPosition);
            this.BG_Layer_back1.setPosition(currentPosition.x/2,currentPosition.y/2);
            this.BG_Layer_back.setPosition(currentPosition.x/4,currentPosition.y/4);
            this.node.getComponent(cc.Camera).zoomRatio = 0.8;
            this.bar_UI.setPosition(currentPosition.x,currentPosition.y);
            this.icon_UI.setPosition(currentPosition.x,currentPosition.y);
            this.score_UI.setPosition(currentPosition.x,currentPosition.y);
        }
        else if(cc.director.getScene().name == "mainScence")
        {
            currentPosition.lerp(targerPosition, 0.1, currentPosition);
            this.node.setPosition(currentPosition);
            this.BG_Layer_back1.setPosition(currentPosition.x/2,currentPosition.y/2);
            this.BG_Layer_back.setPosition(currentPosition.x/4,currentPosition.y/4);
            targerPosition.y = cc.misc.clampf(targerPosition.y, -4000, 650);
            this.node.getComponent(cc.Camera).zoomRatio = 1;
            this.bar_UI.setPosition(currentPosition.x,currentPosition.y);
            this.score_UI.setPosition(currentPosition.x,currentPosition.y);
            this.icon_UI.setPosition(currentPosition.x,currentPosition.y);
        }
        else if(cc.director.getScene().name == "menuScence")
        {
            if(!this.changeCamera) Variables.playerCanMove = false;

            if(this.changeCamera) {
                currentPosition.lerp(targerPosition, 0.1, currentPosition);
                this.node.setPosition(currentPosition);
                this.BG_Layer_back1.setPosition(currentPosition.x/2,currentPosition.y/2);
                this.BG_Layer_back.setPosition(currentPosition.x/4,currentPosition.y/4);
                targerPosition.y = cc.misc.clampf(targerPosition.y, -4000, 650);
                this.node.getComponent(cc.Camera).zoomRatio = 1;
                this.bar_UI.setPosition(currentPosition.x,currentPosition.y);
                this.score_UI.setPosition(currentPosition.x,currentPosition.y);
                this.icon_UI.setPosition(currentPosition.x,currentPosition.y);
            }
            else {
                currentPosition = cc.v2(0,0);
            }
        }

    },
});
