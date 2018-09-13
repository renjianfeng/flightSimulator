import {SceneManager} from "../../manager/SceneManager";
import {GuiManager} from "../../manager/GuiManager";
import {Module} from "../Module";

import {AnimationGui} from "../../others/AnimationGui";

export class Panels extends Module{
    //元素对象集合
    protected scene;

    //舞台容器
    protected parent;

    //页面容器
    protected view;

    //面板隐藏显示实例
    protected panelsAn=new AnimationGui(SceneManager.ins.scene,GuiManager.ins.fullscreenUI)

    constructor(){
        super()
    }

    /**
     * 显示
     */
    protected show(open?,opened?): void {
        this.addEvent();
        this.panelsAn.show(this.view,open,opened)
    }

    /**
     * 隐藏
     */
    protected hide(close?,closed?): void {
        this.removeEvent();
        this.panelsAn.hide(this.view,close,closed)
    }

    //销毁
}