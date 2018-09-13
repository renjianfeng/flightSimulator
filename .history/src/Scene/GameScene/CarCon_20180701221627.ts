
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
     * 下雨
     * */

    private setRain():void{
        //下雨
        var tailFlower=new particleCon(new BABYLON.Vector3(0,50,0),this.scene, this.display.particleRain);
        // tailFlower.Parent(scene.getMeshByName("car"))
        tailFlower.start()
        SceneManager.ins.engine.runRenderLoop(()=>{
            tailFlower.Position(new BABYLON.Vector3(
                this.scene.getMeshByName("car").absolutePosition.x+50,
                this.scene.getMeshByName("car").absolutePosition.y+50,
                this.scene.getMeshByName("car").absolutePosition.z) )
        })
    }
}