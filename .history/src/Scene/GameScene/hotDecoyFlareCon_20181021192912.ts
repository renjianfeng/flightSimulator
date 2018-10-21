/**
 * 子弹控制系统   by renjianfeng 
 */

import {AssetsManager,particleCon} from "../../public"
import {SceneManager} from "../../public"
import {Func} from "../../public"

export class HotDecoyFlareCon{

    private static instance: HotDecoyFlareCon;

    public static get ins(): HotDecoyFlareCon {
        if (!this.instance) {
            this.instance = new HotDecoyFlareCon();
        }
        return this.instance;
    }

  
    private scene


    //帧率时间补偿

    private times;
    private particleeExhaust;
    private musics;
    private display;
    private tailFlower;

    private creatMusic(){
        this.musics={
            dan:new BABYLON.Sound("dan",[AssetsManager.ins.resourceObject["binarys"]["gameScene"]["dan"]["url"]] , this.scene,()=>{
               
            },{loop:false}),
           
        }

      //  this.musics.qiang.layerMask=1;
       // this.musics.qiang.attachToMesh(this.display.cameraBox);
    }

    //创建UI
    private creatUI(){
       
    }

    //初始化
    public init(display){
        this.scene=SceneManager.ins.scene;
        this.display=display

        //创建准星
        this.creatUI()
        //创建事件
        this.addEvent()
        this.creatMusic()


         //尾气粒子
         this.particleeExhaust = new BABYLON.ParticleSystem("particles", 1000, this.scene);
         //粒子的纹理
         this.particleeExhaust.particleTexture = AssetsManager.ins.resourceObject["textures"]["gameScene"]["flare"].clone();
         this.particleeExhaust.minEmitBox = new BABYLON.Vector3(0, 0, 0); // Starting all From
         this.particleeExhaust.maxEmitBox = new BABYLON.Vector3(-0, -0, -0); // Starting all From
         this.particleeExhaust.color1 = new BABYLON.Color4(255/255, 250/255,250/255, 1.0);
         this.particleeExhaust.color2 = new BABYLON.Color4(255/255, 250/255,205/255, 1.0);
         this.particleeExhaust.colorDead = new BABYLON.Color4(0, 0, 0, 0.5);
       //  particleeExhaust["addColorGradient"](0, new BABYLON.Color4(1, 1, 1, 0));
         this.particleeExhaust.minSize = 2;
         this.particleeExhaust.maxSize = 2;
         // console.log(particleSystem)
         this.particleeExhaust.minLifeTime = 20;
         this.particleeExhaust.maxLifeTime = 20;
         this.particleeExhaust.emitRate = 10;
         this.particleeExhaust.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
         this.particleeExhaust.direction1 = new BABYLON.Vector3(-0.6, 0.8, -1.5);
         this.particleeExhaust.direction2 = new BABYLON.Vector3(0.6, 0.8, -1.5);
         // particleSystem2.direction2 = new BABYLON.Vector3(0, 100, 0);
         // Speed
         this.particleeExhaust.minEmitPower = 0.5;
         this.particleeExhaust.maxEmitPower = 0.5;
         this.particleeExhaust.updateSpeed = 0.5;
        // this.particleeExhaust2=this.particleeExhaust["clone"]("s",1)
           
         this.tailFlower=new particleCon(new BABYLON.Vector3(0,0,0),SceneManager.ins.scene, this.particleeExhaust);        
         //粒子尾气的位置
         this.tailFlower.Position(new BABYLON.Vector3(0, 0, -0.6))

         this.tailFlower.Parent(this.display.cameraBox);
        
     
    }

    private freeState;

    //事件
    private addEvent(){

        this.freeState=false;

        var cleard

        document.addEventListener("keydown",(e)=>{
            　if (e.keyCode == 69) {
                clearInterval(cleard)
                var i=0
                cleard=setInterval(()=>{
                    this.tailFlower.start()
                    this.musics.dan.play()
                    i++
                    setTimeout(()=>{
                        this.tailFlower.stop()
                    },50)
                    if(i>=3){
                        clearInterval(cleard)
                    }
                },300)
    　　      }
        })


      

        var k=0

      
    }


    private boom(i,free){
     
    }

    //更新方法
    private k=0;
    public update(times) {
         this.times= times;
     }
}


