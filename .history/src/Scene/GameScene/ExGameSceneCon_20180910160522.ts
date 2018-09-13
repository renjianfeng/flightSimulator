import {AssetsManager, SceneManager} from "../../public/index";
import {DisplayPool} from "../../public/index";
import {ModuleName} from "../../public/index";
import {EventCon} from "../../other/EventCon";
import {ExGameScene} from "./ExGameScene";
import {GameScenes} from "../../public/index";
import {particleCon} from "../../public/index";
import {WeatherState} from "../../public/index";


export class ExGameSceneCon extends GameScenes{
    private _gold;
    private static instance: ExGameSceneCon;

    public static get ins(): ExGameSceneCon {
        if (!this.instance) {
            this.instance = new ExGameSceneCon();
        }
        return this.instance;
    }


    protected display;

    protected scene;

    protected doEvents=[];

    private gameDeState;

    constructor(){
        super()
    }

    protected importMeshes=[]


    public init(){
        DisplayPool.ins.displayPool[ModuleName.GAME_PLAY_SCENE]=this;
    }

    protected resetGame(){
        ExGameScene.ins.creatScene()
        var scene=SceneManager.ins.scene;
        this.scene=SceneManager.ins.scene;
        this.display=ExGameScene.ins.display;
        SceneManager.ins.engine.displayLoadingUI();
        SceneManager.ins.engine.loadingUIText = "Initializing...";
        SceneManager.ins.engine.hideLoadingUI();

       // alert()

        console.log("this.scene")
        console.log(this.scene)
        this.scene.createDefaultSkybox(AssetsManager.ins.resourceObject["cubeTextures"]["gameScene"]["skybox"], true, 10000);
        this.scene.getMeshByName("__root__").parent=this.display.cameraBox
        this.display.cameraBox.scaling=new BABYLON.Vector3(100,100,100)
        this.display.camera.target=this.display.cameraBox.position;
        this.scene.beginAnimation(this.scene.skeletons[0], 0, 0.001, false);
        setTimeout(()=>{
            this.scene.beginAnimation(this.scene.skeletons[0], 30, 32.0001, false);
        },2000)
       
        console.log( "this.scene")
        console.log( this.scene)
    }



    protected addEvent(){
        this.doEvents["BeforeRender"]=SceneManager.ins.scene.onBeforeRenderObservable.add(()=>{
            this.beforeRender()
        })
    }

    protected beforeRender(){
       // console.log(1144)
        this.display.cameraBox.rotation.y=-this.display.camera.alpha-Math.PI*0.5;
        console.log(this.display.camera.beta/Math.PI)

        console.log(this.display.camera.beta/Math.PI*100+50)


     /*    this.scene.beginAnimation(this.scene.skeletons[0], this.display.camera.beta/Math.PI*100+50, this.display.camera.beta/Math.PI*100+50+0.001, false);
        this.scene.beginAnimation(this.scene.skeletons[0], this.display.camera.beta/Math.PI*100+50, this.display.camera.beta/Math.PI*100+50+0.001, false);
        this.scene.beginAnimation(this.scene.skeletons[0], this.display.camera.beta/Math.PI*100+50, this.display.camera.beta/Math.PI*100+50+0.001, false);
        this.scene.beginAnimation(this.scene.skeletons[0], this.display.camera.beta/Math.PI*100+50, this.display.camera.beta/Math.PI*100+50+0.001, false);
 */
      /*   this.scene.beginAnimation(this.scene.getBoneByName("Kości medyk_Head"), this.display.camera.beta/Math.PI*100+50, this.display.camera.beta/Math.PI*100+50+0.001, false);
        this.scene.beginAnimation(this.scene.getBoneByName("Kości medyk_L Arm"), this.display.camera.beta/Math.PI*100+50, this.display.camera.beta/Math.PI*100+50+0.001, false);
        this.scene.beginAnimation(this.scene.getBoneByName("Kości medyk_R Arm"), this.display.camera.beta/Math.PI*100+50, this.display.camera.beta/Math.PI*100+50+0.001, false);
        this.scene.beginAnimation(this.scene.getBoneByName("Kości medyk_Bone"), this.display.camera.beta/Math.PI*100+50, this.display.camera.beta/Math.PI*100+50+0.001, false); */
       /*  console.log(this.display.camera.alpha)
        console.log(this.display.cameraBox.rotation.y) */
    }
}
