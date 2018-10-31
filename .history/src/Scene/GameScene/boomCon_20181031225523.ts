/**
 * 子弹控制系统   by renjianfeng 
 */

import {AssetsManager} from "../../public"
import {SceneManager} from "../../public"
import {Func,particleCon} from "../../public"

export class BoomCon{

    private static instance: BoomCon;

    public static get ins(): BoomCon {
        if (!this.instance) {
            this.instance = new BoomCon();
        }
        return this.instance;
    }

    //子弹
    private bullets=[]

    //击中子弹爆炸
    private booms=[]

    //准星
    private starUi
    //准星图片
    private image2

    private ray
    private hit
    private display
    private scene


    //帧率时间补偿

    private times;
    private fireSpeed=6;

    private j;
    private freeState;

    private musics;

    private particleeExhaust;
    private particleeExhausts=[];
    private tailFlowers=[];

   

    private creatMusic(){
        this.musics={
            qiang:new BABYLON.Sound("daodan",[AssetsManager.ins.resourceObject["binarys"]["gameScene"]["daodan"]["url"]] , this.scene,()=>{
               
            },{loop:false}),
        }
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

        this.creatMusic()

          //尾气粒子
        //  this.particleeExhaust = new BABYLON.ParticleSystem("particles", 2000, this.scene);
           // Create default particle systems
           this.particleeExhaust = BABYLON["ParticleHelper"].CreateDefault(new BABYLON.Vector3(0,0,0), 100);

           // Emitter
         //  var fireBlastHemisphere =  this.particleeExhaust.createHemisphericEmitter(.2, 0);
    
           // Set emission rate
           this.particleeExhaust.emitRate = 5000;
   
           // Start size
           this.particleeExhaust.minSize = 6;
           this.particleeExhaust.maxSize = 12;
   
           // Lifetime
           this.particleeExhaust.minLifeTime = 1;
           this.particleeExhaust.maxLifeTime = 3;
   
           // Emission power
           this.particleeExhaust.minEmitPower = 30;
           this.particleeExhaust.maxEmitPower = 60;
   
           // Limit velocity over time
           this.particleeExhaust.addLimitVelocityGradient(0, 40);
           this.particleeExhaust.addLimitVelocityGradient(0.120, 12.983);
           this.particleeExhaust.addLimitVelocityGradient(0.445, 1.780);
           this.particleeExhaust.addLimitVelocityGradient(0.691, 0.502);
           this.particleeExhaust.addLimitVelocityGradient(0.930, 0.05);
           this.particleeExhaust.addLimitVelocityGradient(1.0, 0);
   
           this.particleeExhaust.limitVelocityDamping = 0.9;
   
           // Start rotation
           this.particleeExhaust.minInitialRotation = -Math.PI / 2;
           this.particleeExhaust.maxInitialRotation = Math.PI / 2;
   
           // Texture
           this.particleeExhaust.particleTexture = new BABYLON.Texture("https://raw.githubusercontent.com/PatrickRyanMS/BabylonJStextures/master/ParticleSystems/Explosion/ExplosionSim_Sample.png", this.scene);
           this.particleeExhaust.blendMode = BABYLON.ParticleSystem["BLENDMODE_MULTIPLYADD"]; 
   
           // Color over life
           this.particleeExhaust.addColorGradient(0.0, new BABYLON.Color4(1, 1, 1, 0));
           this.particleeExhaust.addColorGradient(0.1, new BABYLON.Color4(1, 1, 1, 1));
           this.particleeExhaust.addColorGradient(0.9, new BABYLON.Color4(1, 1, 1, 1));
           this.particleeExhaust.addColorGradient(1.0, new BABYLON.Color4(1, 1, 1, 0));
   
           // // Defines the color ramp to apply
           this.particleeExhaust.addRampGradient(0.0, new BABYLON.Color3(1, 1, 1));
           this.particleeExhaust.addRampGradient(0.09, new BABYLON.Color3(209/255, 204/255, 15/255));
           this.particleeExhaust.addRampGradient(0.18, new BABYLON.Color3(221/255, 120/255, 14/255));
           this.particleeExhaust.addRampGradient(0.28, new BABYLON.Color3(200/255, 43/255, 18/255));
           this.particleeExhaust.addRampGradient(0.47, new BABYLON.Color3(115/255, 22/255, 15/255));
           this.particleeExhaust.addRampGradient(0.88, new BABYLON.Color3(14/255, 14/255, 14/255));
           this.particleeExhaust.addRampGradient(1.0, new BABYLON.Color3(14/255, 14/255, 14/255));
           this.particleeExhaust.useRampGradients = true;
   
           // Defines the color remapper over time
           this.particleeExhaust.addColorRemapGradient(0, 0, 0.1);
           this.particleeExhaust.addColorRemapGradient(0.2, 0.1, 0.8);
           this.particleeExhaust.addColorRemapGradient(0.3, 0.2, 0.85);
           this.particleeExhaust.addColorRemapGradient(0.35, 0.4, 0.85);
           this.particleeExhaust.addColorRemapGradient(0.4, 0.5, 0.9);
           this.particleeExhaust.addColorRemapGradient(0.5, 0.95, 1.0);
           this.particleeExhaust.addColorRemapGradient(1.0, 0.95, 1.0);
   
           // Particle system start
           this.particleeExhaust.start(30);
           this.particleeExhaust.targetStopDuration = .4;
   
           // Animation update speed
           this.particleeExhaust.updateSpeed = 1/60;
   
           // Rendering order
           this.particleeExhaust.renderingGroupId = 1;


         
        //创建爆炸列表
        for(var i=0;i<=10;i++){
            this.booms[i]= BABYLON.MeshBuilder.CreateSphere("boom", {diameter: 10}, this.scene);
            this.booms[i].boom=new TWEEN.Tween(this.booms[i].scaling);
            this.booms[i].lifeState=false;
            this.booms[i].isPickable=false;
            this.booms[i].material=this.display.boomMateial;
            this.booms[i].checkCollisions = false;;

            
            this.particleeExhausts[i]=this.particleeExhaust["clone"]("s",1)

            this.tailFlowers[i]=new particleCon(new BABYLON.Vector3(0,0,0),SceneManager.ins.scene,this.particleeExhausts[i]);        
            //粒子尾气的位置
            this.tailFlowers[i].Position(new BABYLON.Vector3(0, 0, -0.6))
   
            this.tailFlowers[i].Parent(this.booms[i]);
        }

    }

    private ij=0

    public boom(position){
        this.booms[this.ij].position=new BABYLON.Vector3(position.x,position.y,position.z);
            this.booms[this.ij].scaling.x=0.2;
            this.booms[this.ij].scaling.y=0.2;
            this.booms[this.ij].scaling.z=0.2;
            this.booms[this.ij].boom.to({ x:0.2 ,y:0.2,z:0.2}, 20000);
            this.booms[this.ij].boom.start();
            this.tailFlowers[this.ij].start()
            this.musics.qiang.play()
            console.log("爆炸前")
            var ij=this.ij;
            this.booms[this.ij].boom.onComplete(()=>{
              
                this.booms[ij].scaling.x=0;
                this.booms[ij].scaling.y=0;
                this.booms[ij].scaling.z=0;
                this.tailFlowers[ij].stop()
                console.log("爆炸后")
           // this.tailFlowers[i].stop()
            })

            if(this.ij<10){
                this.ij++
            }else{
                this.ij=0
            }
    }

    //更新方法
}


