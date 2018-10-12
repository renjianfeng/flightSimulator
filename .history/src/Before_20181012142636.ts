
import {ResourceCon} from "./other/ResourceCon";
import {SceneBeforeCall} from "./other/SceneBeforeCall";
import {AssetsManager} from "./public/index"
import {SceneManager} from "./public/index";
import {GlobalManager} from "./public/index";
import {DisplayPool} from "./public/index";
import {ModuleName} from "./public/index"
import {ExGameSceneCon} from "./Scene/GameScene/ExGameSceneCon";
import {ExGameSceneGuiCon} from "./Gui/GameSceneGui/ExGameSceneGuiCon";
import {ExStartGuiCon} from "./Gui/StartGui/ExStartGuiCon";



export class Before{


    private static instance: Before;

    public static get ins(): Before {
        if (!this.instance) {
            this.instance = new Before();
        }
        return this.instance;
    }


    public update(){
        AssetsManager.ins.resourceData=ResourceCon.ins.resource;
        AssetsManager.ins.loadFile(["gameScene"],SceneManager.ins.scene,function(){
            this.initModule()
            console.log(DisplayPool.ins.displayPool)
            GlobalManager.ins.openModule(ModuleName.GAME_START_GUI);
            SceneBeforeCall.ins.musicLoop();
        }.bind(this),function(e){
            console.log(e.loadCount)
            console.log(e)
            SceneManager.ins.engine.loadingUIText = "loading:"+e.loadCount*100+"%<br><br>一共需要载入"+e.totalTasksCount+"个资源<br>剩余载入资源数："+e.waitingTasksCount;
        }.bind(this))
    }

    protected addEvent(): void {

    }


    /**
     * 安装GUI/3D场景模块
     * */

    public initModule(){
        //游戏3D场景
        ExGameSceneCon.ins.init();
        ExStartGuiCon.ins.init();
        ExGameSceneGuiCon.ins.init();
    }

}
