/**
 * 子弹控制系统   by renjianfeng 
 */

import {AssetsManager} from "../../public"
import {SceneManager} from "../../public"
import {Func,particleCon} from "../../public"

export class MissileCon{

    private static instance: MissileCon;

    public static get ins(): MissileCon {
        if (!this.instance) {
            this.instance = new MissileCon();
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

        this.scene.getMeshByName("导弹").isVisible=false;


          //尾气粒子
          this.particleeExhaust = new BABYLON.ParticleSystem("particles", 100, this.scene);
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
          this.particleeExhaust.minLifeTime = 10;
          this.particleeExhaust.maxLifeTime = 10;
          this.particleeExhaust.emitRate = 10;
          this.particleeExhaust.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
          this.particleeExhaust.direction1 = new BABYLON.Vector3(-0.4, 0.3, -1.5);
          this.particleeExhaust.direction2 = new BABYLON.Vector3(0.4, 0.3, -1.5);
          // particleSystem2.direction2 = new BABYLON.Vector3(0, 100, 0);
          // Speed
          this.particleeExhaust.minEmitPower = 0.5;
          this.particleeExhaust.maxEmitPower = 0.5;
          this.particleeExhaust.updateSpeed = 0.5;


         

        //创建子弹列表
        for(var i=0;i<=160;i++){
            this.bullets[i]= BABYLON.MeshBuilder.CreateSphere("frees", {diameterX:  1, diameterY: 1, diameterZ: 30}, this.scene);
            this.bullets[i].lifeState=false;
            this.bullets[i].isPickable=false;
            this.bullets[i].material=this.display.freeMateial;
            this.bullets[i].checkCollisions = false;
            var missile=this.scene.getMeshByName("导弹").clone();
            missile.parent=this.bullets[i];
            missile.position=new BABYLON.Vector3(0,0,10)
          //  missile.scaling=new BABYLON.Vector3(10,10,10)
            missile.rotation=new BABYLON.Vector3(0,-Math.PI*1,0);
            missile.isPickable=false;
            missile.isVisible=true;
            missile.checkCollisions=false;
           
            missile.scaling=new BABYLON.Vector3(5,5,5)

            this.particleeExhausts[i]=this.particleeExhaust["clone"]("s",1)

            this.bullets[i].tailFlower=new particleCon(new BABYLON.Vector3(0,0,0),SceneManager.ins.scene,this.particleeExhausts[i]);        
            //粒子尾气的位置
            this.bullets[i].tailFlower.Position(new BABYLON.Vector3(0, 0, -0.6))
   
            this.bullets[i].tailFlower.Parent(this.bullets[i]);
        }

        //创建爆炸列表
        for(var i=0;i<=160;i++){
            this.booms[i]= BABYLON.MeshBuilder.CreateSphere("boom", {diameter: 10}, this.scene);
            this.booms[i].boom=new TWEEN.Tween(this.booms[i].scaling);
            this.booms[i].lifeState=false;
            this.booms[i].isPickable=false;
            this.booms[i].material=this.display.boomMateial;
            this.bullets[i].checkCollisions = false;;
        }

        //获得位置
        var origin = this.display.cameraBox.position;
    
        //创建向前矢量
	    var forward = new BABYLON.Vector3(0,0,1);		
	    forward = Func.ins.vecToLocal(forward, this.display.cameraBox);
    
        //创建方向
	    var direction = forward.subtract(origin);
	    direction = BABYLON.Vector3.Normalize(direction);
    
        //创建属性
	    this.ray = new BABYLON.Ray(origin, direction, 3000);
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

        document.addEventListener("keydown",(e)=>{
            　if (e.keyCode == 81) {
               // if(this.freeState){
                    this.musics.qiang.play()
                   // this.musics.qiang.setVolume(1)
                    var ram=Math.random()/100;

                    this.tailFlowers[this.j].start()
                    if(this.j<=this.bullets.length-1){
                        this.bullets[this.j].position=new BABYLON.Vector3(this.display.cameraBox.absolutePosition.x+ram,this.display.cameraBox.absolutePosition.y+ram,this.display.cameraBox.absolutePosition.z) ;
                        this.bullets[this.j].rotation=new BABYLON.Vector3(this.display.cameraBox.rotation.x+ram,this.display.cameraBox.rotation.y+ram,this.display.cameraBox.rotation.z);
                        this.bullets[this.j].lifeState=true;
                        this.j++;
                      //  this.timerNpc.start();
                    }else{
                        this.j=0;
                        this.bullets[this.j].position=new BABYLON.Vector3(this.display.cameraBox.absolutePosition.x,this.display.cameraBox.absolutePosition.y,this.display.cameraBox.absolutePosition.z) ;
                        this.bullets[this.j].rotation=new BABYLON.Vector3(this.display.cameraBox.rotation.x,this.display.cameraBox.rotation.y,this.display.cameraBox.rotation.z);
                        this.bullets[this.j].lifeState=true;
                    }
                }else{
                   // this.musics.qiang.setVolume(0)
                }
    　　     // }
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
            this.tailFlowers[i].stop()
        })
    }

    //更新方法
    public update(times) {
         this.times= times;
         var origin = this.display.cameraBox.position;
           var forward = new BABYLON.Vector3(0,0,1000);		
           forward = Func.ins.vecToLocal(forward, this.display.cameraBox);
       
           var direction = forward.subtract(origin);
           direction = BABYLON.Vector3.Normalize(direction);
 
           this.ray.origin = origin;
           this.ray.direction =direction;
 
           this.hit = this.scene.pickWithRay(this.ray);
 
         var ram=Math.random;
 
 
         if (this.hit.pickedMesh){
            this.starUi.moveToVector3(this.hit.pickedPoint,this.scene)
         }else{
            this.starUi.linkWithMesh(this.display.pickMesh)
         }
 
         this.bullets.forEach((free,i)=>{
             if(free.lifeState==true){
                 var forword=new BABYLON.Vector3(free.forward.x*this.times*this.fireSpeed,free.forward.y*this.times*this.fireSpeed,free.forward.z*this.times*this.fireSpeed)
                 free.moveWithCollisions(forword);
                 free.isVisible=true;
 
                 if (this.hit.pickedMesh){
                     if(!free.boomPosition){
                         free.boomPosition=new BABYLON.Vector3(this.hit.pickedPoint.x,this.hit.pickedPoint.y,this.hit.pickedPoint.z)
                     }
                }
 
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
                         this.boom(i,free)
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
                     this.boom(i,free)
                }
             }else{
                 free.isVisible=false;
             }
         })
     }
}


