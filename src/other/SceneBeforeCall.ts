import {SceneManager} from "../public/index"
import {AssetsManager} from "../public/index"


/**
 * 全局执行函数
 *
 *
* */
export class SceneBeforeCall {
    private static instance: SceneBeforeCall;

    public static get ins(): SceneBeforeCall {
        if (!this.instance) {
            this.instance = new SceneBeforeCall();
        }
        return this.instance;
    }

    public game_bg:any;

    constructor(){}

    public musicLoop(){
      /*  this.game_bg = new BABYLON.Sound("Cello",AssetsManager.ins.resourceObject["binarys"]["gameScene"]["game_bg"]["url"], SceneManager.ins.scene,()=>{
            this.game_bg.play()
            this.game_bg.setVolume(0.5)
        },{loop:true});*/
    }
}