import {Module} from "../Module";
import {SceneManager} from "../../manager/SceneManager";
import {GlobalManager} from "../../manager/GlobalManager";
import {ModuleName} from "../../enum/ModuleName";

export class GameScenes extends Module{

    //场景名称
    protected sceneName:string;

    protected isInit:boolean;

    /**
     * 是否校验积分
     */
    protected checkScore: boolean;

    /**
     * 开始游戏数据
     */
  //  protected doStartData: DoStartData;

    /**
     * 扩展数据
     * */
    protected other: any;


    protected score;

    // protected display:any;

    constructor(){
        super()
    }

    //销毁
    public dispose(){
        var j;
        for(j in this.display){
            console.log(this.display[j])
            if( this.display[j]){
                this.display[j].dispose()
            }
        }
    }



    public show(data){
        alert()
        this.resetGame()
        SceneManager.ins.change(this.display);
    }

    protected resetGame(){

    }

    protected gameOver(): void {
        this.removeEvent();
        //将最高纪录缓存
    }
}