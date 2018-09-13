import {GuiCreate} from "./GuiCreate";

/**
 * Created by renjianfeng
 *动画控制器
 */
export class AnimationCon {
    private static instance: AnimationCon;
    private setbeginAnimation;

    public static  get  ins():AnimationCon{
        if(!this.instance){
            this.instance=new AnimationCon()
        }
        return this.instance;
    }

    constructor(){}

    public animationBody(object,scene){
        //动画模式
        var _endattr;

        //动画对象
        var _mesh;

        //动画属性
        var _attr;

        //动画速度
        var _speed;

        //动画帧
        var _keys;

        //动画结束回调函数
        var _endCall;

        //动画数据类型
        var _typeData

        //动画数据类型
        var _loop;

        if(object.endattr!=null){
            _endattr=object.endattr;
        }else{
            _endattr=BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE;
        }

        if(object.mesh!=null){
            _mesh=object.mesh;
        }else {
            _mesh=null;
            console.error("动画对象不能为空！")
        }

        if(object.attr!=null){
            _attr=object.attr;
        }else {
            _attr=null;
            console.error("动画对象属性不能为空！")
        }

        if(object.speed!=null){
            _speed=object.speed;
        }else {
            _speed=10;
        }

        if(object.keys!=null){
            _keys=object.keys;
        }else {
            _keys=[];
        }

        if(object.endCall!=null){
            _endCall=object.endCall
        }else{
            _endCall=function(){}
        }


        if(object.typeData!=null){
            _typeData=object.typedata
        }else{
            _typeData=BABYLON.Animation.ANIMATIONTYPE_FLOAT
        }


        if(object.loop!=null){
            _loop=object.loop
        }else{
            _loop=false;
        }

        var animationBox = new BABYLON.Animation("myAnimation", _attr, _speed, _typeData, _endattr);
        var keys = [];
        keys=_keys
        animationBox.setKeys(keys);
        _mesh.animations.push(animationBox);
        this.setbeginAnimation=scene.beginAnimation(_mesh, 0, _keys[_keys.length-1].frame, _loop);
        this.setbeginAnimation.onAnimationEnd=function(){
            _endCall()
        }
    }

    public Pause(){
        this.setbeginAnimation.pause()
    }
    public Reset(){
        this.setbeginAnimation.reset()
    }
    public Speed(i){
        this.setbeginAnimation.speedRatio=i
    }

}

