
import {particleCon} from "../../public/index";
import {AssetsManager, SceneManager} from "../../public/index";
export class CarSkinBind {

    private scene
    private display

    constructor(scene,display){
        this.scene=scene;
        this.display=display;
    }

    /**
     * 皮卡车皮肤
     */

    public pickupTruckInit(){
        this.scene.getMeshByName("car").scaling=new BABYLON.Vector3(0.001,0.001,0.001);
        this.scene.getMeshByName("car").rotation=new BABYLON.Vector3(-Math.PI*1,Math.PI*0.5,Math.PI*0.5)
        this.scene.getMeshByName("car").position=new BABYLON.Vector3(1.7,0,0.6)

        this.scene.getMeshByName("car")._children.forEach((mesh)=>{
            if(mesh.material){
                if(mesh.material.subMaterials){
                    mesh.material.subMaterials.forEach((material)=>{
                        material.backFaceCulling=false;
                    })
                }else{
                   // mesh.material.backFaceCulling=false;
                }
            }
        })

        this.scene.getMeshByName("w1").rotation=new BABYLON.Vector3(0,0,-Math.PI*0.5)
        this.scene.getMeshByName("w1").scaling=new BABYLON.Vector3(0.001,0.001,0.001);
        this.scene.getMeshByName("w1").position=new BABYLON.Vector3(1.02,-1.2,2.38)
        this.scene.getMeshByName("w1").isVisible=false;

    }
}