
import {particleCon} from "../../public/index";
import {AssetsManager, SceneManager} from "../../public/index";
export class CarCon {

    private scene
    private display
    constructor(scene,display){
        this.scene=scene;
        this.display=display;
        var gl = new BABYLON.GlowLayer("glow", scene);
        gl.addIncludedOnlyMesh(this.scene.getMeshByName("Jeep GC-P 25"))
        gl.addIncludedOnlyMesh(this.scene.getMeshByName("Jeep GC-P 20"))
        gl.addIncludedOnlyMesh(this.scene.getMeshByName("lighting"))
    }

    /**
     * 设置车灯
     * @state 车灯状态
     * */
    private setCarLight(state):void{
        if(state){
            this.display.light4.intensity=10;
            this.scene.getMeshByName("Jeep GC-P 25").material.emissiveTexture.level=1;
            this.scene.getMeshByName("Jeep GC-P 25").material.alpha=1;
            this.scene.getMeshByName("Plane001").material.alpha=0.3;
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
        }else{
            this.display.light4.intensity=0;
            this.scene.getMeshByName("Jeep GC-P 25").material.emissiveTexture.level=0.1;
            this.scene.getMeshByName("Jeep GC-P 25").material.alpha=0.3;
            this.scene.getMeshByName("Plane001").material.alpha=0;
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
}