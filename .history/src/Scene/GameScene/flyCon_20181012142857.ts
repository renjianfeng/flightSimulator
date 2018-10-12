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

       
    }


    //事件
    private addEvent(){
      
    }

    //更新方法
    public update(times) {
         this.times= times;
    }
}


