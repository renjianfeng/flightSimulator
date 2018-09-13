import {AssetsManager} from "../../public";
import {particleCon} from "../../public/index";

export class WeatherCon {

    private scene
    constructor(scene){
        this.scene=scene;
    }

   /**
     * 下雨
     * */

    private setRain():void{
        //下雨
        var tailFlower=newparticleCon(new BABYLON.Vector3(0,50,0),this.scene, this.display.particleRain);
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