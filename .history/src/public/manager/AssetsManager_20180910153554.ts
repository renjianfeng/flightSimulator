/**
 *Created by renjianfeng
 */
export class AssetsManager {
    private _resourceData;
    private _resourceObject:object;


    private static instance: AssetsManager;

    public static get ins(): AssetsManager {
        if (!this.instance) {
            this.instance = new AssetsManager();
        }
        return this.instance;
    }

    constructor(){
        //this._resourceData=ResourceCon.ins.resource;
        this._resourceObject={
            binarys:{},
            images:{},
            models:{},
            textures:{},
            cubeTextures:{}
        }
    }

    public set resourceData(resource){
        this._resourceData=resource;
    }

    public loadFile(sceneNames:Array<string>,scene,callback,progress){

        let assetsManager = new BABYLON.AssetsManager(scene);

        sceneNames.forEach(function(sceneName){
            //加载模型
            var _thisModel={}
            this._resourceData[sceneName].models.forEach(function(model,plugin){
                let meshTask = assetsManager.addMeshTask(
                    "skull task",
                    "",
                    model.filePath,
                    model.fileName
                );


                console.log("model")
                console.log(model)
                console.log(plugin)


                if (model.name === "gltf" && model instanceof BABYLON.GLTFFileLoader) {
                    model.animationStartMode = BABYLON.GLTFLoaderAnimationStartMode.NONE;
                    model.compileMaterials = true;
                }
                meshTask.onSuccess = function (task) {

                    console.log("meshTask")
                    console.log(task)
                  /*  let _thisMesh = BABYLON.MeshBuilder.CreateBox("", {}, scene);
                    _thisMesh.isVisible=false;
                    _thisMesh.position=new BABYLON.Vector3(0,0,0);
                    task.loadedMeshes.forEach(function(mesh){
                        mesh.isVisible=false;
                       // mesh.position=new BABYLON.Vector3(0,0,0);
                        mesh.parent=_thisMesh;
                     /!*   mesh.getChildMeshes(false,function(child){
                            child.parent=_thisMesh;
                        })*!/
                        //_thisMesh.addChild(mesh)
                    }.bind(this))*/

                  /*   task.loadedMeshes.forEach(function(mesh){
                        mesh.isVisible=false;
                        mesh.name="noneisVisible_"+mesh;
                    })
 */
                    let _thisMesh=task;

                   // this._resourceObject.models[model.name]=_thisMesh;
                    _thisModel[model.name]=_thisMesh
                    this._resourceObject.models[sceneName]=_thisModel;

                }.bind(this)
            }.bind(this))


            //加载图片
            var _thisImage={}
            this._resourceData[sceneName].images.forEach(function(image){
                let imageTask = assetsManager.addImageTask(
                    "image task",
                    image.filePath+image.fileName,
                );
                imageTask.onSuccess = function (task) {
                    _thisImage[image.name]=task.image
                    this._resourceObject.images[sceneName]=_thisImage;
                }.bind(this)
            }.bind(this))




            //加载贴图
            var _thisTexture={}
            this._resourceData[sceneName].textures.forEach(function(texture){
                let textureTask = assetsManager.addTextureTask(
                    "texture task",
                    texture.filePath+texture.fileName,
                );
                textureTask.onSuccess = function (task) {
                    _thisTexture[texture.name]=task.texture
                    this._resourceObject.textures[sceneName]=_thisTexture;
                }.bind(this)
            }.bind(this))


            //加载二进制文件
            var _thisBinary={}
            this._resourceData[sceneName].binarys.forEach(function(binary){
                let binaryTask = assetsManager.addBinaryFileTask(
                    "binary task",
                    binary.filePath+binary.fileName,
                );
                binaryTask.onSuccess = function (task) {
                    console.log(6666677)

                    _thisBinary[binary.name]=task.data
                    _thisBinary[binary.name]["url"]=task.url
                    _thisBinary[binary.name]["rootUrl"]=binary.filePath
                    _thisBinary[binary.name]["sceneFilename"]=binary.fileName
                    this._resourceObject.binarys[sceneName]=_thisBinary;

                    console.log(_thisBinary[binary.name])
                }.bind(this)
            }.bind(this))


            //加载天空盒子/环境贴图
            var _thisCubeTexture={}
            this._resourceData[sceneName].cubeTextures.forEach(function(cubeTexture){
                let cubeTextureTask = assetsManager.addCubeTextureTask(
                    "cubeTexture task",
                    cubeTexture.filePath+cubeTexture.fileName,
                );
                cubeTextureTask.onSuccess = function (task) {
                    _thisCubeTexture[cubeTexture.name]=task.texture
                    this._resourceObject.cubeTextures[sceneName]=_thisCubeTexture;
                }.bind(this)
            }.bind(this))

        }.bind(this))

        assetsManager.load();


        //加载成功一个子元素调用
        assetsManager.onProgress=function(task) {
            var _this={
                totalTasksCount:assetsManager._totalTasksCount,
                waitingTasksCount:assetsManager._waitingTasksCount,
                loadCount:(assetsManager._totalTasksCount-assetsManager._waitingTasksCount)/assetsManager._totalTasksCount
            }
            progress(_this)

        }.bind(this);

        //全部加载成功调用
        assetsManager.onFinish=function(task) {
            callback()
        }.bind(this);

    }

    public get resourceObject(){
        return this._resourceObject;
    }

}