import {AssetsManager, SceneManager} from "../../public/index";
import {DisplayPool} from "../../public/index";
import {ModuleName} from "../../public/index";
import {EventCon} from "../../other/EventCon";
import {ExGameScene} from "./ExGameScene";
import {GameScenes} from "../../public/index";
import {particleCon} from "../../public/index";
import {WeatherState} from "../../public/index";
import {Func} from "../../public/index";

import { FireCon } from './fireCon';
import { FlyCon } from './flyCon';


export class ExGameSceneCon extends GameScenes{
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

    constructor(){
        super()
    }

    protected importMeshes=[]


    public init(){
        DisplayPool.ins.displayPool[ModuleName.GAME_PLAY_SCENE]=this;
    }

 
    private rect2;
    private rect3;
    private image;

    protected resetGame(){
        ExGameScene.ins.creatScene()
        var scene=SceneManager.ins.scene;
        this.scene=SceneManager.ins.scene;
        this.display=ExGameScene.ins.display;

        //隐藏UI
        SceneManager.ins.engine.displayLoadingUI();
        SceneManager.ins.engine.loadingUIText = "Initializing...";
        SceneManager.ins.engine.hideLoadingUI();


        console.log("Pilot Head")
        console.log(this.scene.getMaterialByName("Pilot Head"))


        var l_state=true;
       setInterval(()=>{
          l_state=!l_state
          if(l_state){
            this.scene.getMaterialByName("Pilot Head").emissiveColor=new BABYLON.Color3(0.2,0.2,0.2);
          //  this.image.alpha=0;
          }else{
            this.scene.getMaterialByName("Pilot Head").emissiveColor=new BABYLON.Color3(0.3,0.3,0.3);
         //   this.image.alpha=1;
          }
       },10)

       setInterval(()=>{
           //  this.scene.getMeshByName("灯").isVisible=true;
             this.scene.getMeshByName("灯").getChildMeshes(false,(mesh)=>{
                mesh.isVisible=true;
            })
            setTimeout(()=>{
                this.scene.getMeshByName("灯").getChildMeshes(false,(mesh)=>{
                    mesh.isVisible=false;
                })
            },50)
       },1000)
     
   
        this.scene.getMeshByName("气流1").material.backFaceCulling=false;
        this.scene.getMeshByName("气流2").material.backFaceCulling=false;
        this.scene.collisionsEnabled = false;

        //安装飞行系统
        FlyCon.ins.init(this.display)
        //安装子弹系统
        FireCon.ins.init(this.display)

       // alert

        this.scene.meshes.forEach((mesh)=>{
            mesh.checkCollisions = false;;
        })

        var probe = new BABYLON.ReflectionProbe("main", 64, this.scene);
        probe.renderList.push( this.scene.getMeshByName("default"));
        probe.renderList.push(this.scene.getMeshByName("skySphere"));
        probe.refreshRate = BABYLON.RenderTargetTexture.REFRESHRATE_RENDER_ONCE;   
        probe.attachToMesh(this.display.cameraBox);

        this.scene.environmentTexture=AssetsManager.ins.resourceObject["cubeTextures"]["gameScene"]["skybox"];
        this.scene.workerCollisions=true;
        this.scene.getMeshByName("__root__").getChildMeshes(false,(mesh)=>{
            console.log(mesh)
            console.log(mesh.name)
            mesh.isPickable=false;
            this.display.shadowGenerator.getShadowMap().renderList.push(mesh);
            mesh.receiveShadows = true;
            if(mesh.material){
                mesh.material.backFaceCulling=false;
                console.log("mesh.material")
                console.log(mesh.material)
                mesh.material.usePhysicalLightFalloff = false;
            }
        })

        this.scene.getMeshByName("__root__").parent=this.display.cameraBox
        this.scene.getMeshByName("__root__").rotation.y=-Math.PI*1
      //  this.scene.getMeshByName("__root__").position.x=-0.1;
        this.scene.getMeshByName("__root__").position.y=-0;
        this.display.cameraBox.scaling=new BABYLON.Vector3(10,10,10)
      //  this.scene.getMeshByName("default").material=this.display.terrainMaterial
        this.scene.getMeshByName("default").isPickable=true;
        this.scene.getMeshByName("default").scaling=new BABYLON.Vector3(100,100,100);
        this.scene.getMeshByName("default").material.diffuseTexture.uScale=4;
        this.scene.getMeshByName("default").material.diffuseTexture.vScale=4;
        this.display.cameraBox.position.y=-10;
        this.display.camera.target=this.display.cameraBox.position;
       
    }
    protected addEvent(){
        this.doEvents["BeforeRender"]=SceneManager.ins.scene.onBeforeRenderObservable.add(()=>{
            this.beforeRender()
        })
    }

    private times
    protected beforeRender(){
        this.times= 60/SceneManager.ins.engine.getFps();
        FireCon.ins.update(this.times)
        FlyCon.ins.update(this.times)
    }
}
