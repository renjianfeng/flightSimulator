
import {particleCon} from "../../public/index";
import {AssetsManager, SceneManager} from "../../public/index";
export class CarCon {

    private scene
    private display
    constructor(scene,display){
        this.scene=scene;
        this.display=display;
    }

    /**
     * 设置车灯
     * @state 车灯状态
     * */
    private setCarLight(state):void{
        this.display.light4.intensity=10;
        SceneManager.ins.engine.runRenderLoop(()=>{
            this.display.lightLook.parent=this.scene.getMeshByName("carBox")
            this.display.lightLook.position.x=12
            this.display.light4.position=new BABYLON.Vector3(
                this.scene.getMeshByName("carBox").position.x,
                this.scene.getMeshByName("carBox").position.y+0.3,
                this.scene.getMeshByName("carBox").position.z);
            this.display.light4.setDirectionToTarget(
                new BABYLON.Vector3(
                    this.display.lightLook.absolutePosition.x,
                    this.display.lightLook.absolutePosition.y,
                    this.display.lightLook.absolutePosition.z)
            );
        })
    }
}