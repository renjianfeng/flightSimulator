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
    private fireSpeed=3;

    private j;
    private freeState;

    private musics;

    private particleeExhaust;
    private particleeExhausts=[];
    private tailFlowers=[];

   

    private creatMusic(){
        this.musics={
            qiang:new BABYLON.Sound("daodan",[AssetsManager.ins.resourceObject["binarys"]["gameScene"]["dan"]["url"]] , this.scene,()=>{
               
            },{loop:false}),
        }
    }

    //创建UI
    private creatUI(){
        this.starUi = new BABYLON.GUI.Rectangle();
        this.starUi.width = "30px";
        this.starUi.height = "30px";
        this.starUi.alpha=0.8;
        this.starUi.thickness = 0;
        this.display.advancedTexture.addControl( this.starUi);
        this.image2 = new BABYLON.GUI.Image("but", AssetsManager.ins.resourceObject["images"]["gameScene"]["jiantou3"].src);
        this.starUi.addControl(this.image2)
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

     //   this.scene.getMeshByName("导弹").isVisible=false;


          //尾气粒子
          this.particleeExhaust = new BABYLON.ParticleSystem("particles", 100, this.scene);
          //粒子的纹理
          this.particleeExhaust.particleTexture =  AssetsManager.ins.resourceObject["textures"]["gameScene"]["yun"];
          this.particleeExhaust.minEmitBox = new BABYLON.Vector3(0, 0, 0); // Starting all From
          this.particleeExhaust.maxEmitBox = new BABYLON.Vector3(-0, -0, -0); // Starting all From
          this.particleeExhaust.color1 = new BABYLON.Color4(100/255, 100/255,100/255, 0.5);
          this.particleeExhaust.color2 = new BABYLON.Color4(100/255, 100/255,100/255,0.5);
          this.particleeExhaust.colorDead = new BABYLON.Color4(0, 0, 0, 0);
        //  particleeExhaust["addColorGradient"](0, new BABYLON.Color4(1, 1, 1, 0));
          this.particleeExhaust.minSize = 1;
          this.particleeExhaust.maxSize = 3;
          // console.log(particleSystem)
          this.particleeExhaust.minLifeTime = 10;
          this.particleeExhaust.maxLifeTime = 10;
          this.particleeExhaust.emitRate = 10;
          this.particleeExhaust.blendMode = BABYLON.ParticleSystem["BLENDMODE_MULTIPLYADD"];
          this.particleeExhaust.direction1 = new BABYLON.Vector3(-0.4, 0.3, -1);
          this.particleeExhaust.direction2 = new BABYLON.Vector3(0.4, 0.3, -1);
          // particleSystem2.direction2 = new BABYLON.Vector3(0, 100, 0);
          // Speed
          this.particleeExhaust.minEmitPower = 0.5;
          this.particleeExhaust.maxEmitPower = 0.5;
          this.particleeExhaust.updateSpeed = 0.5;


         

        //创建子弹列表
        for(var i=0;i<=10;i++){
            this.bullets[i]= BABYLON.MeshBuilder.CreateSphere("frees", {diameterX:  2, diameterY: 2, diameterZ: 2}, this.scene);
            this.bullets[i].lifeState=false;
            this.bullets[i].isPickable=false;
            this.bullets[i].material=this.display.freeMateial;
            this.bullets[i].checkCollisions = false;

            this.particleeExhausts[i]=this.particleeExhaust["clone"]("s",1)

            this.tailFlowers[i]=new particleCon(new BABYLON.Vector3(0,0,0),SceneManager.ins.scene,this.particleeExhausts[i]);        
            //粒子尾气的位置
            this.tailFlowers[i].Position(new BABYLON.Vector3(0, 0, -0.6))
   
            this.tailFlowers[i].Parent(this.bullets[i]);
        }

        //创建爆炸列表
     
    }


    //事件
    private addEvent(){

        this.freeState=false;

        document.addEventListener("mousedown",(e)=>{
            if(e.button==0){
                this.freeState=true;
            }
        })
        document.addEventListener("mouseup",(e)=>{
            if(e.button==0){
              this.freeState=false;
            }
        })

        var cleard;

        document.addEventListener("keydown",(e)=>{
                document.addEventListener("keydown",(e)=>{
                    　if (e.keyCode == 69) {
                        clearInterval(cleard)
                        var i=0
                        cleard=setInterval(()=>{
                            this.musics.qiang.play()
                            // this.musics.qiang.setVolume(1)
                             var ram=Math.random()/100;
         
                            
                             if(this.j<=this.bullets.length-1){
                                 this.tailFlowers[this.j].start()
                                 this.bullets[this.j].position=new BABYLON.Vector3(this.display.cameraBox.absolutePosition.x+ram,this.display.cameraBox.absolutePosition.y+ram-2,this.display.cameraBox.absolutePosition.z) ;
                                 this.bullets[this.j].rotation=new BABYLON.Vector3(this.display.cameraBox.rotation.x+ram,this.display.cameraBox.rotation.y+ram,this.display.cameraBox.rotation.z);
                                 this.bullets[this.j].lifeState=true;
                                 this.j++;
                               //  this.timerNpc.start();
                             }else{
                                 this.j=0;
                                 this.tailFlowers[this.j].start()
                                 this.bullets[this.j].position=new BABYLON.Vector3(this.display.cameraBox.absolutePosition.x,this.display.cameraBox.absolutePosition.y-2,this.display.cameraBox.absolutePosition.z) ;
                                 this.bullets[this.j].rotation=new BABYLON.Vector3(this.display.cameraBox.rotation.x,this.display.cameraBox.rotation.y,this.display.cameraBox.rotation.z);
                                 this.bullets[this.j].lifeState=true;
                             }

                             i++
                             if(i>=5){
                                clearInterval(cleard)
                             }
                        },300)
            　　      }
                })
            
             
        })
    }


    private boom(i,free){
        this.booms[i].position=new BABYLON.Vector3(free.position.x,free.position.y,free.position.z);
            this.booms[i].scaling.x=10;
            this.booms[i].scaling.y=10;
            this.booms[i].scaling.z=10;
            this.booms[i].boom.to({ x:1 ,y:1,z:1}, 1000);
            this.booms[i].boom.start();
            this.booms[i].boom.onComplete(()=>{
            this.booms[i].scaling.x=0;
            this.booms[i].scaling.y=0;
            this.booms[i].scaling.z=0;
           // this.tailFlowers[i].stop()
        })
    }

    //更新方法
    public update(times) {
         this.times= times;
      
         var ram=Math.random;
 
 
        
 
         this.bullets.forEach((free,i)=>{
             if(free.lifeState==true){
                 var forword=new BABYLON.Vector3(free.forward.x*this.times*this.fireSpeed,free.forward.y*this.times*this.fireSpeed,free.forward.z*this.times*this.fireSpeed)
                 free.moveWithCollisions(forword);
                 free.isVisible=true;
 
                  if(free.boomPosition){
                     var jl2=Func.ins.getDistance(
                         free.position.x,
                         free.position.y, 
                         free.position.z, 
                         free.boomPosition.x,
                         free.boomPosition.y, 
                         free.boomPosition.z, 
                         )
     
                      if(jl2<=50){
                         free.lifeState=false;
                       //  this.boom(i,free)
                         this.tailFlowers[i].stop()
                         free.boomPosition=null;
                      }
                  }
                  
                 var jl=Func.ins.getDistance(
                     free.position.x,
                     free.position.y, 
                     free.position.z, 
                     this.display.cameraBox.position.x, 
                     this.display.cameraBox.position.y, 
                     this.display.cameraBox.position.z
                     )
 
                if(jl>=3000){
                     free.lifeState=false;
                     free.boomPosition=null;
                   //  this.boom(i,free)
                     this.tailFlowers[i].stop()
                }
             }else{
                 free.isVisible=false;
             }
         })
     }
}


