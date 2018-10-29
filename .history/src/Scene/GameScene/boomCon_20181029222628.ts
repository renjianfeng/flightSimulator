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
          this.particleeExhaust.maxSize = 4;
          // console.log(particleSystem)
          this.particleeExhaust.minLifeTime = 100;
          this.particleeExhaust.maxLifeTime = 100;
          this.particleeExhaust.emitRate = 10;
          this.particleeExhaust.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
          this.particleeExhaust.direction1 = new BABYLON.Vector3(-2, 2, -2);
          this.particleeExhaust.direction2 = new BABYLON.Vector3(2, -2, 2);
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

    private boom(position){


        this.booms[this.ij].position=new BABYLON.Vector3(position.x,position.y,position.z);
            this.booms[this.ij].scaling.x=10;
            this.booms[this.ij].scaling.y=10;
            this.booms[this.ij].scaling.z=10;
            this.booms[this.ij].boom.to({ x:1 ,y:1,z:1}, 1000);
            this.booms[this.ij].boom.start();
            this.tailFlowers[this.ij].start()
            this.musics.qiang.play()
            this.booms[this.ij].boom.onComplete(()=>{
            this.booms[this.ij].scaling.x=0;
            this.booms[this.ij].scaling.y=0;
            this.booms[this.ij].scaling.z=0;
            this.tailFlowers[this.ij].stop()
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


