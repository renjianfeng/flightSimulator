import {Module} from "../Module";
import {AnimationGui} from "../../others/AnimationGui";
import {SceneManager} from "../../manager/SceneManager";
import {GuiManager} from "../../manager/GuiManager";
import {DisplayPool} from "../../others/DisplayPool";
import {ModuleName} from "../../enum/ModuleName";
import {GlobalManager} from "../../manager/GlobalManager";


export class StartGui extends Module {

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

    //游戏场景对象

    protected gameSceneObject:any;


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
        this.removeEvent();
        this.updateData()
        this.addEvent();
        GuiManager.ins.changeGui(this.parent);
    }


    /**
     * 隐藏
     */
    protected hide(): void {
        this.removeEvent();
        this.panelsAn.hide(this.view,()=>{
            this.onClose()
        },()=>{
            this.onClosed()
        })
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
        DisplayPool.ins.displayPool[ModuleName.GAME_START_GUI]=this;
    }


    /**
     * 添加事件
     * */
    protected addEvent(){

    }


    protected removeEvent(){
    }


    protected onClick_ruleBtn(): void {


    }

    protected onClick_optionBtn(): void {



    }

    protected onClick_startBtn(): void {
        GlobalManager.ins.openModule(ModuleName.GAME_PLAY_GUI);
        GlobalManager.ins.openModule(ModuleName.GAME_PLAY_SCENE);
    }

    /**
     * 更新页面
     * @param args
     */
    public updateData(...args): void {
        if (!this.isInit) {
            this.initUI();
            this.isInit = true;
        }
    }

    /**
     * 关闭前
     * */
    protected onClose(){
        this.removeHtml()
        //NetManager.ins.getInfo(this, DataManager.ins.gameCfgData.game.gameId);
       // this.view.removeControl(this.optionsList)
    }

    protected removeHtml(){
     //   console.log(this.section)
        if(this.section){
            // alert()
            document.body.removeChild(this.section);
        }
    }

    /**
     * 关闭后
     * */
    protected onClosed(){
        this.removeEvent()
      //  GlobalManager.ins.openModule("StartGuiCon");
      //  GuiManager.ins.removeGui(this.parent);
    }
}