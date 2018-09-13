/**
 * Created by renjianfeng
 * 弹框动画UI控制器
 */

export class AnimationGui {
    private static instance: AnimationGui;

    protected scene;
    protected advancedTexture;

    constructor(scene,advancedTexture){
        this.scene=scene;
        this.advancedTexture=advancedTexture
    }

    public show = function (gui,open?,opened?) {
        var keys = [];
        keys.push({
            frame: 0,
            value: 0.1
        });
        keys.push({
            frame: 10,
            value: 1
        });
        var animationX = new BABYLON.Animation("", "scaleX", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        animationX.setKeys(keys);
        var animationY = new BABYLON.Animation("", "scaleY", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        animationY.setKeys(keys);
        gui.animations = [];
        gui.animations.push(animationX,animationY);
        this.advancedTexture.addControl(gui);
        if(open){
            open()
        }
        this.scene.beginAnimation(gui, 0, 10, false,2,()=>{
            if(opened){
                opened()
            }
        });
    };

    public hide = function(gui,close?,closed?){
        var keys = [];
        keys.push({
            frame: 0,
            value: 1
        });
        keys.push({
            frame: 10,
            value: 0.1
        });
        var animationX = new BABYLON.Animation("", "scaleX", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        animationX.setKeys(keys);
        var animationY = new BABYLON.Animation("", "scaleY", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        animationY.setKeys(keys);
        gui.animations = [];
        gui.animations.push(animationX,animationY);
        if(close){
            close()
        }
        this.scene.beginAnimation(gui, 0, 10, false,2,()=>{
            this.advancedTexture.removeControl(gui);
            //this.advancedTexture.dispose();
            if(closed){
                closed()
            }
        });
    };

}

