/**
 * 飞行控制系统   by renjianfeng 
 */

import {AssetsManager} from "../../public"
import {SceneManager} from "../../public"
import {Func} from "../../public"

export class FlyCon{

    private static instance: FlyCon;

    public static get ins(): FlyCon {
        if (!this.instance) {
            this.instance = new FlyCon();
        }
        return this.instance;
    }

   
    private display
    private scene


    //帧率时间补偿

    private times;
  

    //UI系列
    private rect2;
    private rect3;
    private image;

    //创建UI
    private creatUI(){
        this.rect2 = new BABYLON.GUI.Rectangle();
    this.rect2.scaleX=0.7;
    this.rect2.scaleY=0.7;
    this.rect2.alpha=0.8;
    this.rect2.width = "700px";
    this.rect2.height = "400px";
   // this.rect1.cornerRadius = 5;
    this.rect2.color = "#009855";
    this.rect2.thickness = 0;

    console.log(this.rect2)
    console.log("this.rect2")



    this.rect3 = new BABYLON.GUI.Rectangle();

    this.rect3.width = "300px";
    this.rect3.verticalAlignment=BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    this.rect3.height = "10800px";
    this.rect3.top="0";
    this.rect3.left="10px";
    this.rect3.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    //this.rect1.cornerRadius = 5;
    //this.rect3.background = "#009855";
    this.rect3.thickness = 0;
    this.rect2.addControl(this.rect3);


   // AssetsManager.ins.resourceObject["images"]["gameScene"]["jiantou"].clone()

    this.image = new BABYLON.GUI.Image("but", AssetsManager.ins.resourceObject["images"]["gameScene"]["jiantou"].src);
    this.image.width = "30px";
    console.log( "this.image")
    console.log( this.image)
    this.image.height = "15px";
    this.image.scaleX = -1;
    this.image.top="192px";
    this.image.left="110px";
    this.image.verticalAlignment=BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    this.image.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    this.rect2.addControl(this.image);  

    


    var b5=[]
    var b6=[]
    var label=[]
    var countB=0;
    var chizi= new BABYLON.GUI.Image("but", AssetsManager.ins.resourceObject["images"]["gameScene"]["jiantou2"].src);
    for(var i=0;i<=36;i++){
        console.log(i)
        countB+=30
        if(countB>=360){
            countB=0;
        }
        b5[i]= new BABYLON.GUI.Rectangle();
        b5[i].verticalAlignment=BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        b5[i].horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        b5[i].top=50*i*3;
        b5[i].left="-5px"
        b5[i].width = "300px";
        b5[i].height = "20px";
        //this.rect1.cornerRadius = 5;
       // b5[i].background = "#009855";
        b5[i].thickness = 0;
        this.rect3.addControl( b5[i]);
        label[i] = new BABYLON.GUI.TextBlock();
        if(countB==0){
            label[i].text = ""+countB+"°";
            label[i].color="#ffffff"
        }else{
            label[i].text = ""+countB+"°";
            label[i].color="#129604"
        }
        
        
        label[i].textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        label[i].fontSize="18px"


       

        b5[i].addControl(label[i]);
        b5[i].addControl(chizi);

    }


  
    this.display.advancedTexture.addControl( this.rect2);

    }

    //初始化
    public init(display){
        this.scene=SceneManager.ins.scene;
        this.display=display

        //创建准星
        this.creatUI()
        //创建事件
        this.addEvent()

       
    }


    //事件
    private addEvent(){
      
    }

    //更新方法
    public update(times) {
         this.times= times;
    }
}


