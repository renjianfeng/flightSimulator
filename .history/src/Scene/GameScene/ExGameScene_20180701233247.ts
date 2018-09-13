
import {AssetsManager} from "../../public/index"
import {SceneManager} from "../../public/index"
import {WeatherState} from "../../public/index";
import Texture = BABYLON.Texture;
import Color3 = BABYLON.Color3;

export class ExGameScene{

    private static instance: ExGameScene;

    public static get ins(): ExGameScene {
        if (!this.instance) {
            this.instance = new ExGameScene();
        }
        return this.instance;
    }

    public display;

    protected scene;

    constructor(){
       // super()
    }


    public creatScene(){
        this.scene=SceneManager.ins.scene
        //设置背景色
        this.scene.clearColor=new BABYLON.Color4(52/255,156/255,255/255)

        /**
         * 室外相机
         * */
        var  camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 10, new BABYLON.Vector3(0, 200, 0), this.scene);
        camera.alpha=-Math.PI*1
        camera.beta=1.260483446598473
        camera.attachControl(SceneManager.ins.canvas, false);
        camera.upperRadiusLimit=15
        camera.lowerRadiusLimit=15
        this.scene.activeCamera=camera;


        /**
         * 室内相机校准模型
         * */
        var camera2Box = BABYLON.MeshBuilder.CreateBox("camera2Box", {height:  2, width: 2, depth: 2}, this.scene);
        camera2Box.isVisible=false;
        camera2Box.rotation=new BABYLON.Vector3(Math.PI*0.5,0,0)


        var steering = BABYLON.MeshBuilder.CreateBox("steering", {height:  2000, width: 2000, depth: 2000}, this.scene);
        steering.visibility=0;
        steering.scaling=new BABYLON.Vector3(0.001,0.001,0.001)
        steering.rotation=new BABYLON.Vector3(0,0.3,Math.PI*0.5)

        /**
         * 室内相机
         * */
        var camera2 = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0.2, 1.1, 0.6), this.scene);
        camera2.rotation.y=Math.PI*0.5
        camera2.attachControl(SceneManager.ins.canvas);
        camera2.detachControl(SceneManager.ins.canvas);
        camera2.minZ=0;
        camera2.parent=camera2Box;



      /*  this.scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
        this.scene.fogDensity = 0.001;
        this.scene.fogColor = new BABYLON.Color3(1,1,1);*/


        /**
         * 环境光
         * */
        var light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 10, 0), this.scene);
        light.intensity=0.1
        var light2 = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, -10, 0), this.scene);
        light2.intensity=0.1

        /**
         * 平行光
         * */
        var light3 = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0.2, -0.3, 0.2), this.scene);
        light3.intensity=0.2
        //  light3.autoUpdateExtends=false;
        light3.shadowFrustumSize=600
        light3.shadowMinZ=-300
        light3.shadowMaxZ=300



        /**
         * 天空盒子
         * */
        var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, this.scene);
        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", this.scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture =  AssetsManager.ins.resourceObject["cubeTextures"]["gameScene"]["skybox"].clone()
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        //   skyboxMaterial.emissiveColor  = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.disableLighting = false;
        skybox.material = skyboxMaterial;



        var terrainMaterial = new BABYLON["TerrainMaterial"]("terrainMaterial", this.scene);

        if(localStorage.map=="1"){
            terrainMaterial.mixTexture = AssetsManager.ins.resourceObject["textures"]["gameScene"]["maptr2"].clone()
        }else{
            terrainMaterial.mixTexture = AssetsManager.ins.resourceObject["textures"]["gameScene"]["maptr"].clone()
        }

        terrainMaterial.diffuseTexture1 = AssetsManager.ins.resourceObject["textures"]["gameScene"]["grass"].clone()
        terrainMaterial.diffuseTexture1.uScale=20
        terrainMaterial.diffuseTexture1.vScale=20
        terrainMaterial.diffuseTexture2 = AssetsManager.ins.resourceObject["textures"]["gameScene"]["grass"].clone()
        terrainMaterial.diffuseTexture2.uScale=20
        terrainMaterial.diffuseTexture2.vScale=20
        terrainMaterial.diffuseTexture3 = AssetsManager.ins.resourceObject["textures"]["gameScene"]["ground"].clone()
        terrainMaterial.diffuseTexture3.uScale=20
        terrainMaterial.diffuseTexture3.vScale=20


    /*    var terrainMaterial = new BABYLON.StandardMaterial("texture1", this.scene);
        terrainMaterial.diffuseTexture = AssetsManager.ins.resourceObject["textures"]["gameScene"]["ground"].clone()
        terrainMaterial.specularColor=new BABYLON.Color3(0,0,0)
        terrainMaterial.diffuseTexture["uScale"]=20
        terrainMaterial.diffuseTexture["vScale"]=20*/


        //雨粒子
        var particleRain = new BABYLON.ParticleSystem("particles", 2000, this.scene);

        //粒子的纹理
        particleRain.particleTexture = AssetsManager.ins.resourceObject["textures"]["gameScene"]["yu"].clone()
        particleRain.minEmitBox = new BABYLON.Vector3(-100, -100, 0); // Starting all From
        particleRain.maxEmitBox = new BABYLON.Vector3(100, 100, 0); // Starting all From
        particleRain.color1 = new BABYLON.Color4(255/255, 255/255, 255/255 ,1);
        particleRain.color2 = new BABYLON.Color4(255/255, 255/255, 255/255,1);
        particleRain.colorDead = new BABYLON.Color4(255/255, 255/255, 255/255,1);
        particleRain.gravity = new BABYLON.Vector3(0, -9.81, -2);
        particleRain.minSize = 5;
        particleRain.maxSize = 5;
        particleRain.minLifeTime = 5;
        particleRain.maxLifeTime = 5;

        particleRain.emitRate = 600;

        // particleSystem.manualEmitCount = 300;
        particleRain.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;
        particleRain.direction1 = new BABYLON.Vector3(1, 1, 1);
        particleRain.direction2 = new BABYLON.Vector3(-1, -1, -1);
        // Speed
        particleRain.minEmitPower = 1;
        particleRain.maxEmitPower = 1;
        particleRain.updateSpeed = 0.3;

        var shadowGenerator = new BABYLON.ShadowGenerator(12288, light3);
        shadowGenerator.bias = 0.0004;
        shadowGenerator.usePercentageCloserFiltering = true;
        shadowGenerator.filteringQuality=0.1;
        shadowGenerator.forceBackFacesOnly=true;





        var postProcess = new BABYLON.RefractionPostProcess("Refraction", "", new BABYLON.Color3(1.0, 1.0, 1.0), 0.05, 0.01, 1.0, camera);
        var postProcess1 = new BABYLON.RefractionPostProcess("Refraction", "", new BABYLON.Color3(1.0, 1.0, 1.0), 0.05, 0.01, 1.0, camera2);


        var videoTexture =new BABYLON.VideoTexture("video", [AssetsManager.ins.resourceObject["binarys"]["gameScene"]["rain"].url], this.scene, true);
        this.scene.registerBeforeRender(function(){
            if(videoTexture.isReady()==true){
                videoTexture.video.loop=true   //有效
                videoTexture.video.play()   //有效
            }
        })

        postProcess.refractionTexture=videoTexture
        postProcess1.refractionTexture=videoTexture

       // var pipeline = new BABYLON.StandardRenderingPipeline("standard", this.scene, 0.5 / devicePixelRatio, null, [camera]);
        //pipeline.lensTexture = new BABYLON.Texture("textures/lensdirt.jpg", this.scene);



     /*   var pipeline = new BABYLON.DefaultRenderingPipeline(
            "default", // The name of the pipeline
            true, // Do you want HDR textures ?
            this.scene, // The scene instance
            [camera] // The list of cameras to be attached to
        );*/




        var light4 = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(1, 0, 0), 1.2, 1.3, this.scene);
        light4.range=60;
        light4.intensity = 0;
        light4.projectionTexture = new BABYLON.Texture(AssetsManager.ins.resourceObject["textures"]["gameScene"]["stainedGlass"], this.scene);



        var lighting = BABYLON.Mesh.CreateGround("lighting", 200, 200, 0, this.scene);
        lighting.rotation.z=-Math.PI*0.5;
        lighting.billboardMode=2
       // lighting.isVisible=false;

        var lightingMaterial=new BABYLON.StandardMaterial("lightingMaterial",this.scene)
      //  lightingMaterial.emissiveTexture=new Texture(AssetsManager.ins.resourceObject["textures"]["gameScene"]["lighting"], this.scene)

      //  lightingMaterial.alphaMode=2;

        lighting.material=lightingMaterial;
        lighting.visibility=0;

        lighting.rotation.y=-Math.PI*0.5

        var lightLook = BABYLON.Mesh.CreateGround("ground1", 3, 3, 0, this.scene);
        lightLook.isVisible=false;

        // 水材质
        var waterMesh = BABYLON.Mesh.CreateGround("waterMesh", 512, 512, 32, this.scene, false);
        waterMesh.position.y=123;
        var water = new BABYLON["WaterMaterial"]("water", this.scene, new BABYLON.Vector2(512, 512));
        water.backFaceCulling = true;
        water.bumpTexture = new BABYLON.Texture(AssetsManager.ins.resourceObject["textures"]["gameScene"]["waterbump"], this.scene);
        water.windForce = -10;
        water.waveHeight = 0;
        water.bumpHeight = 0.5;
        water.waterColor = new BABYLON.Color3(158/255, 133/255, 93/255);
        water.colorBlendFactor = 0.4;
        waterMesh.material = water;

        var lens3 = BABYLON.Mesh.CreateSphere("centerHidenPick", 16, 0.1, this.scene);
        lens3.visibility=0
        lens3.position=new BABYLON.Vector3(1350.799, 1000.817, -3000)
        //添加光晕
         var lensFlareSystem3 = new BABYLON.LensFlareSystem("lensFlareSystem", lens3, this.scene);
         var flare00 = new BABYLON.LensFlare(1.5, 1, new BABYLON.Color3(1,1,1), AssetsManager.ins.resourceObject["images"]["gameScene"]["ty"].src, lensFlareSystem3);
         var flare01 = new BABYLON.LensFlare(0.24, 1, new BABYLON.Color3(0,1,0), AssetsManager.ins.resourceObject["images"]["gameScene"]["Bphl4qj"].src, lensFlareSystem3);
         var flare02 = new BABYLON.LensFlare(0.28, 1, new BABYLON.Color3(0,0,1), AssetsManager.ins.resourceObject["images"]["gameScene"]["Bphl4qj"].src, lensFlareSystem3);
         var flare03 = new BABYLON.LensFlare(0.2, 0.8, new BABYLON.Color3(.5,.7,1), AssetsManager.ins.resourceObject["images"]["gameScene"]["IIyZhcg"].src, lensFlareSystem3);
         var flare04 = new BABYLON.LensFlare(0.2, 0.6, new BABYLON.Color3(.5,.5,1), AssetsManager.ins.resourceObject["images"]["gameScene"]["HRsf4I5"].src, lensFlareSystem3);
         var flare05 = new BABYLON.LensFlare(0.4, 0.5, new BABYLON.Color3(.4,.6,.9),  AssetsManager.ins.resourceObject["images"]["gameScene"]["XaJRD9j"].src, lensFlareSystem3);
         var flare06 = new BABYLON.LensFlare(0.1, 0.35, new BABYLON.Color3(.5,.5,.9), AssetsManager.ins.resourceObject["images"]["gameScene"]["it5c3Vr"].src, lensFlareSystem3);
         var flare07 = new BABYLON.LensFlare(0.12, -0.5, new BABYLON.Color3(.9,.75,.5), AssetsManager.ins.resourceObject["images"]["gameScene"]["XaJRD9j"].src, lensFlareSystem3);
         var flare08 = new BABYLON.LensFlare(0.25, -0.25, new BABYLON.Color3(1,.85,.5), AssetsManager.ins.resourceObject["images"]["gameScene"]["IIyZhcg"].src, lensFlareSystem3);

        this.display={
            camera:camera,
            camera2:camera2,
            light:light,
            light2:light2,
            light3:light3,
            light4:light4,
            lightLook:lightLook,
            camera2Box:camera2Box,
            skybox:skybox,
            particleRain:particleRain,
            terrainMaterial:terrainMaterial,
            shadowGenerator:shadowGenerator,
            waterMesh:waterMesh,
            water:water,
            steering:steering,
            postProcess:postProcess,
            postProcess1:postProcess1,
            lensFlareSystem3:lensFlareSystem3,
            lighting:lighting,
        }

        console.log(this.display)

      //  GameSceneCon.ins.resetGame(this.display);
    }

}


