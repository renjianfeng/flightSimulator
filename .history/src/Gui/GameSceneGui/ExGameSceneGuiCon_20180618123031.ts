import {EventCon} from "../../other/EventCon";
import {ExGameSceneGui} from "./ExGameSceneGui";
import {GameSceneGui} from "../../public/index";

export class ExGameSceneGuiCon extends GameSceneGui{


    private static instance: ExGameSceneGuiCon;

    public static get ins(): ExGameSceneGuiCon {
        if (!this.instance) {
            this.instance = new ExGameSceneGuiCon();
        }
        return this.instance;
    }

    constructor(){
        super()
        this.scene=ExGameSceneGui.ins.guiObject.sceneChild
        this.parent=ExGameSceneGui.ins.guiObject;
    }


    public addEvent(){
        var _btnState=[]
        _btnState["view"]=true;
        console.log("按键事件")
        console.log(this.scene.btnLeft)

       // var viewNode=
        document.body.appendChild(this.scene.viewNode)

        this.doEvents["viewButton"]=document.getElementById("button_view").addEventListener("click",()=>{
            _btnState["view"]=!_btnState["view"];
            EventCon.ins.key.notifyObservers(_btnState);
        })


        this.doEvents["viewReset"]=document.getElementById("button_reset").addEventListener("click",()=>{
            location.reload();
        })
       // document.getElementById("viewNode").innerHTML=this.scene.viewHtml
    }



    public removeEvent(){
        if(document.getElementById("viewNode")){
            try {
                document.body.removeChild(this.scene.viewNode)
            }catch (e) {
                console.log(e)
            }
        }
        //EventCon.ins.gold.remove( this.doEvents["gold"]);
    }
}