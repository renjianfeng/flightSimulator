

import {AssetsManager} from "../../public/index";

export class ExGameSceneGui{

    private sceneCon:any;
    private parent:any;

    private static instance: ExGameSceneGui;

    public static get ins(): ExGameSceneGui {
        if (!this.instance) {
            this.instance = new ExGameSceneGui();
        }
        return this.instance;
    }

    constructor(){
            this.creatUI()
    }

    public creatUI(){

        this.parent=new BABYLON.GUI.Rectangle()

        var viewHtml=`
            <style>
            .button-view{
                position: fixed;
                top: 20px;
                left:20px;
                background: #349ccd;
                color: #ffffff;
                border: 0px solid ;
                font-size: 18px;
                padding: 8px 20px;
                border-radius: 5px;
                cursor: pointer;
                transform: scale(1);
            }
            .button-view:active{
              transform: scale(0.8);
            }
            .button-reset{
                position: fixed;
                top: 20px;
                right:20px;
                background: #349ccd;
                color: #ffffff;
                border: 0px solid ;
                font-size: 18px;
                padding: 8px 20px;
                border-radius: 5px;
                cursor: pointer;
                transform: scale(1);
            }
            .about-btn{
                position: fixed;
                bottom: 20px;
                right:20px;
                background: #349ccd;
                color: #ffffff;
                border: 0px solid ;
                font-size: 18px;
                padding: 8px 20px;
                border-radius: 5px;
                cursor: pointer;
                transform: scale(1);
            }
            button:active{
              transform: scale(0.8);
            }
            </style>
            <button class="button-reset" id="button_reset">Back</button>
            <div>
            <button class="about-btn" onclick="window.location.href='https://github.com/renjianfeng/flightSimulator'">About The Author And Github</button>
            </div>
        `;

        var viewNode = document.createElement("div");
        viewNode.id = "viewNode";
        viewNode.innerHTML = viewHtml;

        //交給控制器做交互
        this.parent.sceneChild={
            viewHtml:viewHtml,
            viewNode:viewNode,
        }

       // this.sceneCon=new GameSceneGuiCon(this.parent);
    }

    public get guiObject(){
        return this.parent;
    }

  /*  public set guiObjectDo(obj){
        this.parent=obj;
    }*/
}