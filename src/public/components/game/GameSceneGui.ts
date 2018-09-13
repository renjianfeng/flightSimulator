import {Module} from "../Module";
import {AnimationGui} from "../../others/AnimationGui";
import {SceneManager} from "../../manager/SceneManager";
import {GuiManager} from "../../manager/GuiManager";
import {ModuleName} from "../../enum/ModuleName";
import {DisplayPool} from "../../others/DisplayPool";


export class GameSceneGui extends Module{

    //规则元素
    protected section: any;

    //元素对象集合
    protected scene;

    //舞台容器
    protected parent;

    //页面容器
    protected view;

    //事件
    protected doEvents=[];


    //面板隐藏显示实例
    protected panelsAn=new AnimationGui(SceneManager.ins.scene,GuiManager.ins.fullscreenUI)

    constructor(){
        super()
        this.initUI();
    }

    /**
     * 显示
     */
    public show(data): void {
        this.updateData()
        this.addEvent();
        GuiManager.ins.changeGui(this.parent);
    }



    /**
     * 隐藏
     */
    protected hide(): void {

    }


    /**
     * 打开前
     * */
    protected onOpen(...args){

    }


    /**
     * 打开后
     * */
    protected onOpened(...args){

    }


    public init(){
        DisplayPool.ins.displayPool[ModuleName.GAME_PLAY_GUI]=this;
    }


    /**
     * 添加事件
     * */
    protected addEvent(){

    }


    protected removeEvent(){

    }



    /**
     * 更新页面
     * @param args
     */
    public updateData(...args): void {
        this.removeEvent()
        if (!this.isInit) {
            this.initUI();
            this.isInit = true;
        }
    }

    /**
     * 关闭前
     * */
    protected onClose(){
    }

    /**
     * 关闭后
     * */
    protected onClosed(){
        this.removeEvent()
       // NetManager.ins.getInfo(this, DataManager.ins.gameCfgData.game.gameId);
    }
}