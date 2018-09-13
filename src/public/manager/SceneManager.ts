
/**
 *Created by renjianfeng
 */
import Scene = BABYLON.Scene;


export class SceneManager{

    public stage;
    private _scene:Scene;
    private _canvas;
    private _engine;

    private static instance: SceneManager;

    public static get ins(): SceneManager {
        if (!this.instance) {
            this.instance = new SceneManager();
        }
        return this.instance;
    }

    constructor(){

    this._canvas = document.querySelector("#renderCanvas");
    this._engine = new BABYLON.Engine(this._canvas, true);
        var createScene=function(){
            {


                var scene = new BABYLON.Scene(this._engine);

                //下面的代码是为了设置微信上面的touch事件兼容

                var n = scene._onPointerUp
                    , o = scene._onPointerDown
                    , r = scene._onPointerMove
                    , a = BABYLON.Tools.GetPointerPrefix();
                    this._canvas.removeEventListener(a + "move", r),
                    this._canvas.removeEventListener(a + "down", o),
                    window.removeEventListener(a + "up", n),
                    scene._onPointerUp = function(e) {
                        void 0 !== e.pointerId && n(e)
                    }
                    ,
                    scene._onPointerDown = function(e) {
                        void 0 !== e.pointerId && o(e)
                    }
                    ,
                    scene._onPointerMove = function(e) {
                        void 0 !== e.pointerId && r(e)
                    }
                    ,
                    this._canvas.addEventListener(a + "move", scene._onPointerMove, !1),
                    this._canvas.addEventListener(a + "down", scene._onPointerDown, !1),
                    window.addEventListener(a + "up", scene._onPointerUp, !1);


                //下面的代码是为了设置微信上面的touch事件兼容
                var camera = new BABYLON.FreeCamera("baseCamera", new BABYLON.Vector3(0, 0, 0), scene);

              //  var sceneCall=new SceneCall(scene)

             /*   this.stage = BABYLON.MeshBuilder.CreateBox("stage", {}, scene);

                this.stage.isVisible = false;*/

                return scene;
            }
        }.bind(this)

        this._scene = createScene();

        this._engine.runRenderLoop(function () {
            this._scene.render();
            TWEEN.update();
        }.bind(this));

        window.addEventListener("resize", function() {
            this._engine.resize();
        }.bind(this));
    }

   /* public get stage(): any {
        return this._stage;
    }*/

    public get scene(): Scene {
        return this._scene;
    }

    public get canvas(): any {
        return this._canvas;
    }

    public get engine(): any {
        return this._engine;
    }

    public change(display){
       /* console.log(display)
        var i;
        for(i in display){
            console.log(display[i])
        }*/
/* 
        for(var l of SceneManager.ins.scene.meshes){
            l.dispose()
        } */

        /*var j;
        for(j in SceneManager.ins.stage){
            console.log(SceneManager.ins.stage[j])
            if( SceneManager.ins.stage[j]){
                if(SceneManager.ins.stage[j].getChildMeshes){
                    SceneManager.ins.stage[j].getChildMeshes(false,(child)=>{
                        child.dispose();
                    });
                }
                if( SceneManager.ins.stage[j].dispose){
                    SceneManager.ins.stage[j].dispose()
                }
            }
        }*/
      //  SceneManager.ins.stage=display;
    }

  /*  public change(module){
      //  console.log(this._stage._children)
        if(this.stage._children){
            this.stage._children.forEach(function (child) {
                this.stage.removeChild(child)
                child.dispose()
            }.bind(this))
        }
        this.stage.addChild(module)
      //  console.log( this._scene)
    }*/
}