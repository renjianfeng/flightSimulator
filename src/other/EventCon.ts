
/**
 * 全局事件传递
 * */

export class EventCon {

    private static instance: EventCon;
    public static get ins(): EventCon {
        if (!this.instance) {
            this.instance = new EventCon();
        }
        return this.instance;
    }

    //分数显示  从游戏场景到游戏GUI
    public gold;

    //控制车的方向按键  从游戏GUI到游戏场景
    public key;

    constructor(){
        this.gold = new BABYLON.Observable();
        this.key = new BABYLON.Observable();
    }
}