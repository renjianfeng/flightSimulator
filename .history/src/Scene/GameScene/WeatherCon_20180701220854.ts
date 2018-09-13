import {AssetsManager} from "../../public";

export class UseMaterial {

    private scene
    constructor(scene){
        this.scene=scene;
    }

    public setCarMaterial(){






        var material=new BABYLON.StandardMaterial("ss",this.scene)



        var probe = new BABYLON.ReflectionProbe("main", 64, this.scene);
        probe.renderList.push( this.scene.getMeshByName("default"));
        probe.renderList.push(this.scene.getMeshByName("skyBox"));
        this.scene.getMaterialByName("Material#2")["reflectionTexture"] = probe.cubeTexture;
        this.scene.getMaterialByName("Material#2")["reflectionTexture"].level=0.4
        this.scene.getMeshByName("Jeep GC-P 5").material["reflectionTexture"] = probe.cubeTexture;
        this.scene.getMaterialByName("Материал #2")["reflectionTexture"] = probe.cubeTexture;
        // scene.getMaterialByName("Материал #2").reflectionTexture.level=0.1
        this.scene.getMaterialByName("Material#12")["reflectionTexture"] = probe.cubeTexture;
        // scene.getMaterialByName("Material#12").reflectionTexture.level=0.1
        this.scene.getMaterialByName("Материал #13")["reflectionTexture"] = probe.cubeTexture;
        this.scene.getMaterialByName("Material#3")["reflectionTexture"] = probe.cubeTexture;
        this.scene.getMaterialByName("Material#1")["reflectionTexture"] = probe.cubeTexture;

        this.scene.getMeshByName("w1").material.subMaterials[0]["reflectionTexture"] = probe.cubeTexture;

       /* this.scene.getMaterialByName("Material#9")["reflectionTexture"] = probe.cubeTexture;
        this.scene.getMaterialByName("Material#13")["reflectionTexture"] = probe.cubeTexture;
        this.scene.getMaterialByName("Material#10")["reflectionTexture"] = probe.cubeTexture;
        this.scene.getMaterialByName("Material#20")["reflectionTexture"] = probe.cubeTexture;*/

        // scene.getMaterialByName("Материал #13").reflectionTexture.level=0.1
        probe.attachToMesh(this.scene.getMeshByName("car"));


        var bxg = new BABYLON.PBRMaterial("bxg", this.scene);
        bxg.albedoColor=new BABYLON.Color3(1,1,1)
        bxg.metallic=1;
        bxg.roughness=0;
        bxg.reflectionTexture=probe.cubeTexture;

        this.scene.getMeshByName("Jeep GC-P 11").material=bxg



        console.log("灯")


        this.scene.getMeshByName("Jeep GC-P 25").material.emissiveColor=new BABYLON.Color3(1,1,1)
        this.scene.getMeshByName("Jeep GC-P 25").material.emissiveTexture=this.scene.getMeshByName("Jeep GC-P 25").material.diffuseTexture;
        this.scene.getMeshByName("Jeep GC-P 25").material.disableLighting=true;
        this.scene.getMeshByName("Jeep GC-P 25").material.diffuseColor = new BABYLON.Color3(1, 1, 1);
        this.scene.getMeshByName("Jeep GC-P 25").material.specularColor = new BABYLON.Color3(1, 1, 1);
        this.scene.getMeshByName("Jeep GC-P 25").material.alpha=1;



        this.scene.getMeshByName("Plane001").material.opacityTexture=this.scene.getMaterialByName("carlight").emissiveTexture;
        this.scene.getMeshByName("Plane001").material.alpha=0.2;
        this.scene.getMeshByName("Plane001").material.hasAlpha=false;
        this.scene.getMeshByName("Plane001").material.backFaceCulling=false;


        this.scene.getMeshByName("Jeep GC-P 20").material.emissiveTexture=this.scene.getMeshByName("Jeep GC-P 20").material.diffuseTexture;
        this.scene.getMeshByName("Jeep GC-P 20").material.emissiveTexture.level=0.1;
        this.scene.getMeshByName("Jeep GC-P 20").material.emissiveColor=new BABYLON.Color3(1,0,0);


        this.scene.getMeshByName("lighting").material.emissiveColor=new BABYLON.Color3(1,0,0)
        this.scene.getMeshByName("lighting").material.diffuseColor=new BABYLON.Color3(1,0,0)
        this.scene.getMeshByName("lighting").material.diffuseTexture=new BABYLON.Texture(AssetsManager.ins.resourceObject["textures"]["gameScene"]["lighting"], this.scene)
        this.scene.getMeshByName("lighting").material.opacityTexture=new BABYLON.Texture(AssetsManager.ins.resourceObject["textures"]["gameScene"]["lighting"], this.scene)
        this.scene.getMeshByName("lighting").material.emissiveTexture=new BABYLON.Texture(AssetsManager.ins.resourceObject["textures"]["gameScene"]["lighting"], this.scene)
        this.scene.getMeshByName("lighting").material.emissiveTexture.level=1;
        this.scene.getMeshByName("lighting").material.backFaceCulling=false;
        this.scene.getMeshByName("lighting").material.disableLighting=true;
        this.scene.getMeshByName("lighting").material.fogEnabled=false;
        console.log("灯光")
        console.log(this.scene.getMaterialByName("carlight"))

       // this.scene.getMeshByName("Jeep GC-P 15").material["reflectionTexture"] = probe.cubeTexture;

        console.log(this.scene.getMeshByName("Jeep GC-P 25").material)

    }
}