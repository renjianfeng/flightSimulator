
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
import { NpcCon } from './NpcCon';
import { HotDecoyFlareCon } from './hotDecoyFlareCon';
import { MissileCon } from './MissileCon';


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

        //window.speechSynthesis.stop();
       // msg.volume=4;
       // console.log(msg);

       setTimeout(()=>{
        localStorage.msg="Hello, Welcome to fly the Typhoon fighter. \n You can shoot by the left button of the mouse,\n Change the view by right button, \nand control the flight by dragging the mouse. \n \nYou can press the space bar and drag the mouse to view the free view.\n You can release the jammer by pressing the 'E' key."

        var msg = new SpeechSynthesisUtterance(localStorage.msg);
        msg.lang="en";
       
           window.speechSynthesis.speak(msg);
       },1000)

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
        NpcCon.ins.init(this.display)
        HotDecoyFlareCon.ins.init(this.display)
        MissileCon.ins.init(this.display)

       // alert

        this.scene.meshes.forEach((mesh)=>{
            mesh.checkCollisions = false;;
        })

        var probe = new BABYLON.ReflectionProbe("main", 64, this.scene);
        probe.renderList.push( this.scene.getMeshByName("default"));
        probe.renderList.push(this.scene.getMeshByName("skySphere"));
        probe.refreshRate = BABYLON.RenderTargetTexture.REFRESHRATE_RENDER_ONCE;   
        probe.attachToMesh(this.display.cameraBox);

        var renderTargetTexture = new BABYLON.RenderTargetTexture('tex', 512, scene);
        renderTargetTexture.activeCamera = this.display.camera4;
        renderTargetTexture.vScale=18;
        renderTargetTexture.uScale=8;
        renderTargetTexture.uOffset=1
        renderTargetTexture.vOffset=-0.85
        
        this.scene.meshes.forEach((mesh)=>{
            renderTargetTexture.renderList.push(mesh);
        })
        scene.registerBeforeRender( ()=> {
            renderTargetTexture.render();
        })

     //   this.scene.environmentTexture=AssetsManager.ins.resourceObject["cubeTextures"]["gameScene"]["skybox"];
     var cubeTextures =AssetsManager.ins.resourceObject["cubeTextures"]["gameScene"]["skybox"];
     //   this.scene.workerCollisions=true;
        this.scene.getMeshByName("__root__").getChildMeshes(false,(mesh)=>{
            console.log(mesh)
            console.log(mesh.name)
            mesh.isPickable=false;
            this.display.shadowGenerator.getShadowMap().renderList.push(mesh);
            mesh.receiveShadows = true;
            if(mesh.name=="Glass"){
                mesh.isBlocker=false;
            }else{
                mesh.isBlocker=true;
            }
            if(mesh.material){
                mesh.material.backFaceCulling=false;
                console.log("mesh.material")
                console.log(mesh.material)
               // mesh.material.baseTexture=this.scene.environmentTexture;
                mesh.material.environmentTexture= cubeTextures;
           //     mesh.material.reflectionTexture= renderTargetTexture;
              //  mesh.material.environmentTexture= this.scene.environmentTexture;
               // mesh.material.usePhysicalLightFalloff = false;
               // mesh.material._usePhysicalLightFalloff = false;
              //  mesh.material._environmentIntensity = 0.8;
            }
        })

        this.scene.getMeshByName("__root__").parent=this.display.cameraBox
        this.scene.getMeshByName("__root__").rotation.y=-Math.PI*1
      //  this.scene.getMeshByName("__root__").position.x=-0.1;
        this.scene.getMeshByName("__root__").position.y=-0;
        this.display.cameraBox.scaling=new BABYLON.Vector3(10,10,10)
      //  this.scene.getMeshByName("default").material=this.display.terrainMaterial
        this.scene.getMeshByName("default").isPickable=true;
        this.scene.getMeshByName("default").isBlocker=true;
        this.scene.getMeshByName("default").scaling=new BABYLON.Vector3(40,40,40);
        this.scene.getMeshByName("default").material.diffuseTexture.uScale=4;
        this.scene.getMeshByName("default").material.diffuseTexture.vScale=4;
        this.display.cameraBox.position.y=-10;

      
       
        

        var sm= new BABYLON.StandardMaterial("jingzi", scene);
        sm.emissiveTexture = renderTargetTexture;
        sm.disableLighting=true;
        sm.backFaceCulling=false;
       // sm.reflectionTexture = renderTargetTexture;
       // this.display.jingzi.material =sm

        

        this.scene.getMeshByName("jinzi").material=sm
        this.display.jingzi.material=sm
        //this.scene.getMeshByName("jinzi").scaling.x=-0.1

     
        console.log("this.display.jingzi.material")
      //  console.log(this.display.jingzi.material)
       // this.display.camera.target=this.display.cameraBox.position;


// Mirror
/* var mirror = BABYLON.Mesh.CreateBox("Mirror", 1.0, scene);
mirror.scaling = new BABYLON.Vector3(10000.0, 0.01, 10000.0);
mirror.material = new BABYLON.StandardMaterial("mirror", scene);
mirror.material["reflectionTexture"] = new BABYLON.MirrorTexture("mirror", {ratio: 0.5}, scene, true);
mirror.material["reflectionTexture"].mirrorPlane = new BABYLON.Plane(0, -1.0, 0, -200.0);
mirror.material["reflectionTexture"].renderList = [this.scene.getMeshByName("default"),this.display.skySphere];
mirror.material["reflectionTexture"].level = 1.0;
mirror.material["reflectionTexture"].adaptiveBlurKernel = 32;
mirror.position = new BABYLON.Vector3(0, -800, 0); */
    }
    protected addEvent(){
        this.doEvents["BeforeRender"]=SceneManager.ins.scene.onBeforeRenderObservable.add(()=>{
            this.beforeRender()
        })
    }

    private times
    protected beforeRender(){

        if(!FlyCon.ins.flyLife){
            return false;
        }

        this.times= 60/SceneManager.ins.engine.getFps();
        FireCon.ins.update(this.times)
        FlyCon.ins.update(this.times)
        NpcCon.ins.update(this.times)
        HotDecoyFlareCon.ins.update(this.times)
        MissileCon.ins.update(this.times)
        if(this.display.lens3.isOccluded){
           // console.log("被遮挡")
          //  this.display.lensFlareSystem3.isEnabled=false;
            
        }else{
         //   this.display.lensFlareSystem3.isEnabled=true;
        }
    }
}
