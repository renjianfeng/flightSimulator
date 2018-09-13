/**
 * Created by rjf on 2017/10/10.
 * 粒子控制器
 */

export class particleCon {
    private static instance: particleCon;
    constructor(position,scene,particle){
        this.fountain = BABYLON.Mesh.CreateBox("fountain", 1.0, scene);
        this.fountain.isPickable=false
        this.fountain.visibility=0;
        this.fountain.rotation.x=Math.PI*0.9;
        this.particleSystem=particle;
        //定义发射器
        this.particleSystem.emitter = this.fountain; // the starting object, the emitter, a box in this case.
        this.particleSystem.stop();
        this.fountain.position=position;
    }

    private particleSystem;

    private fountain;

    public start(){
        this.particleSystem.start();
    }

    public stop(){
        this.particleSystem.stop();
    }
    public Position(position){
        this.fountain.position=position;
    }

    public Parent(parent){
        this.fountain.parent=parent;
    }
}

