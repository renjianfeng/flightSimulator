import {AssetsManager} from "../../public";

export class WeatherCon {

    private scene

    private  particleCon;
    constructor(scene,particleCon){
        this.scene=scene;
        this.particleCon=particleCon;
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