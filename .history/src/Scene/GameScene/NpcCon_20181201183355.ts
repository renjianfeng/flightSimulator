/**
 * 子弹控制系统   by renjianfeng 
 */

import {AssetsManager,particleCon} from "../../public"
import {SceneManager} from "../../public"
import {Func} from "../../public"

export class NpcCon{

    private static instance: NpcCon;

    public static get ins(): NpcCon {
        if (!this.instance) {
            this.instance = new NpcCon();
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
    private fireSpeed=4;

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
      
    }


    private npcList=[]

    //初始化
    public init(display){
        this.scene=SceneManager.ins.scene;
        this.display=display

        //创建准星
        this.creatUI()
        //创建事件
        this.addEvent()
        this.creatMusic()



         

        //创建子弹列表
        for(var i=0;i<=10;i++){
            this.bullets[i]= BABYLON.MeshBuilder.CreateSphere("frees", {diameterX:  0, diameterY: 0, diameterZ: 0}, this.scene);
            this.bullets[i].lifeState=false;
            this.bullets[i].isPickable=false;
            this.bullets[i].isVisible=false;
           // this.bullets[i].material=this.display.freeMateial;
            this.bullets[i].checkCollisions = false;
            this.bullets[i].scaling=new BABYLON.Vector3(100,100,100)
            this.npcList[i]= this.scene.getMeshByName("__root__").clone()
            this.npcList[i].getChildMeshes(false,(mesh)=>{
                if(mesh.name.indexOf("导弹")!=-1||mesh.name.indexOf("前轮")!=-1||mesh.name.indexOf("后轮")!=-1){
                    mesh.isVisible=false;
                }
               mesh.isPickable=false;
            })
            this.npcList[i].rotation.y=-Math.PI*1
            this.npcList[i].parent=this.bullets[i]
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

        cleard=setInterval(()=>{
            this.musics.qiang.play()
            // this.musics.qiang.setVolume(1)
             var ram=Math.random()/100;

            
             if(this.j<=this.bullets.length-1){
               
                 this.bullets[this.j].position=new BABYLON.Vector3(this.display.npcBox.absolutePosition.x+ram,this.display.npcBox.absolutePosition.y+ram-2,this.display.npcBox.absolutePosition.z) ;
                 this.bullets[this.j].rotation=new BABYLON.Vector3(this.display.npcBox.rotation.x+ram,this.display.npcBox.rotation.y+ram,this.display.npcBox.rotation.z);
                 this.bullets[this.j].lifeState=true;
                 this.j++;
               //  this.timerNpc.start();
             }else{
                 this.j=0;
                
                 this.bullets[this.j].position=new BABYLON.Vector3(this.display.npcBox.absolutePosition.x,this.display.npcBox.absolutePosition.y-2,this.display.npcBox.absolutePosition.z) ;
                 this.bullets[this.j].rotation=new BABYLON.Vector3(this.display.npcBox.rotation.x,this.display.npcBox.rotation.y,this.display.npcBox.rotation.z);
                 this.bullets[this.j].lifeState=true;
             }
        },3000)

        document.addEventListener("keydown",(e)=>{
                document.addEventListener("keydown",(e)=>{
                    　if (e.keyCode == 69) {
                        clearInterval(cleard)
                        var i=0
                      
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
                // free.isVisible=true;
 
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
                     this.display.npcBox.position.x, 
                     this.display.npcBox.position.y, 
                     this.display.npcBox.position.z
                     )
 
                if(jl>=30000){
                     free.lifeState=false;
                     free.boomPosition=null;
                   //  this.boom(i,free)
                }
             }else{
                 //free.isVisible=false;
             }
         })
     }
}


