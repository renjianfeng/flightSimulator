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
          this.particleeExhaust = new BABYLON.ParticleSystem("particles", 2000, this.scene);
          //粒子的纹理
          this.particleeExhaust.particleTexture = AssetsManager.ins.resourceObject["textures"]["gameScene"]["flare"].clone();
          this.particleeExhaust.minEmitBox = new BABYLON.Vector3(0, 0, 0); // Starting all From
          this.particleeExhaust.maxEmitBox = new BABYLON.Vector3(-0, -0, -0); // Starting all From
          this.particleeExhaust.color1 = new BABYLON.Color4(255/255, 250/255,250/255, 1.0);
          this.particleeExhaust.color2 = new BABYLON.Color4(255/255, 250/255,205/255, 1.0);
          this.particleeExhaust.colorDead = new BABYLON.Color4(0, 0, 0, 0.5);
        //  particleeExhaust["addColorGradient"](0, new BABYLON.Color4(1, 1, 1, 0));
          this.particleeExhaust.minSize = 1;
          this.particleeExhaust.maxSize = 10;
          // console.log(particleSystem)
          this.particleeExhaust.minLifeTime = 100;
          this.particleeExhaust.maxLifeTime = 100;
          this.particleeExhaust.emitRate = 10;
          this.particleeExhaust.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
          this.particleeExhaust.direction1 = new BABYLON.Vector3(-1, 1, -1);
          this.particleeExhaust.direction2 = new BABYLON.Vector3(1, -1, 1);
          // particleSystem2.direction2 = new BABYLON.Vector3(0, 100, 0);
          // Speed
          this.particleeExhaust.minEmitPower = 0.5;
          this.particleeExhaust.maxEmitPower = 0.5;
          this.particleeExhaust.updateSpeed = 0.5;


         
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
         // Create default particle systems
         var fireBlast = BABYLON["ParticleHelper"].CreateDefault(position, 100);

         // Emitter
         var fireBlastHemisphere = fireBlast.createHemisphericEmitter(.2, 0);
  
         // Set emission rate
         fireBlast.emitRate = 5000;
 
         // Start size
         fireBlast.minSize = 6;
         fireBlast.maxSize = 12;
 
         // Lifetime
         fireBlast.minLifeTime = 1;
         fireBlast.maxLifeTime = 3;
 
         // Emission power
         fireBlast.minEmitPower = 30;
         fireBlast.maxEmitPower = 60;
 
         // Limit velocity over time
         fireBlast.addLimitVelocityGradient(0, 40);
         fireBlast.addLimitVelocityGradient(0.120, 12.983);
         fireBlast.addLimitVelocityGradient(0.445, 1.780);
         fireBlast.addLimitVelocityGradient(0.691, 0.502);
         fireBlast.addLimitVelocityGradient(0.930, 0.05);
         fireBlast.addLimitVelocityGradient(1.0, 0);
 
         fireBlast.limitVelocityDamping = 0.9;
 
         // Start rotation
         fireBlast.minInitialRotation = -Math.PI / 2;
         fireBlast.maxInitialRotation = Math.PI / 2;
 
         // Texture
         fireBlast.particleTexture = new BABYLON.Texture("https://raw.githubusercontent.com/PatrickRyanMS/BabylonJStextures/master/ParticleSystems/Explosion/ExplosionSim_Sample.png", scene);
         fireBlast.blendMode = BABYLON.ParticleSystem["BLENDMODE_MULTIPLYADD"]; 
 
         // Color over life
         fireBlast.addColorGradient(0.0, new BABYLON.Color4(1, 1, 1, 0));
         fireBlast.addColorGradient(0.1, new BABYLON.Color4(1, 1, 1, 1));
         fireBlast.addColorGradient(0.9, new BABYLON.Color4(1, 1, 1, 1));
         fireBlast.addColorGradient(1.0, new BABYLON.Color4(1, 1, 1, 0));
 
         // // Defines the color ramp to apply
         fireBlast.addRampGradient(0.0, new BABYLON.Color3(1, 1, 1));
         fireBlast.addRampGradient(0.09, new BABYLON.Color3(209/255, 204/255, 15/255));
         fireBlast.addRampGradient(0.18, new BABYLON.Color3(221/255, 120/255, 14/255));
         fireBlast.addRampGradient(0.28, new BABYLON.Color3(200/255, 43/255, 18/255));
         fireBlast.addRampGradient(0.47, new BABYLON.Color3(115/255, 22/255, 15/255));
         fireBlast.addRampGradient(0.88, new BABYLON.Color3(14/255, 14/255, 14/255));
         fireBlast.addRampGradient(1.0, new BABYLON.Color3(14/255, 14/255, 14/255));
         fireBlast.useRampGradients = true;
 
         // Defines the color remapper over time
         fireBlast.addColorRemapGradient(0, 0, 0.1);
         fireBlast.addColorRemapGradient(0.2, 0.1, 0.8);
         fireBlast.addColorRemapGradient(0.3, 0.2, 0.85);
         fireBlast.addColorRemapGradient(0.35, 0.4, 0.85);
         fireBlast.addColorRemapGradient(0.4, 0.5, 0.9);
         fireBlast.addColorRemapGradient(0.5, 0.95, 1.0);
         fireBlast.addColorRemapGradient(1.0, 0.95, 1.0);
 
         // Particle system start
         fireBlast.start(30);
         fireBlast.targetStopDuration = .4;
 
         // Animation update speed
         fireBlast.updateSpeed = 1/60;
 
         // Rendering order
         fireBlast.renderingGroupId = 1;
    }

    //更新方法
}


