/**
 * 子弹控制系统   by renjianfeng 
 */

import {AssetsManager} from "../../public"
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
    private fireSpeed=3.5;

    private j;
    private freeState;

    private musics;

   

    private creatMusic(){
        this.musics={
            qiang:new BABYLON.Sound("qiang",[AssetsManager.ins.resourceObject["binarys"]["gameScene"]["qiang"]["url"]] , this.scene,()=>{
               
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


