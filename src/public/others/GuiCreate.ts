/**
 * GUI控制器
 * */
import {GuiManager} from "../manager/GuiManager";

export class GuiCreate{


    private panelOut=new BABYLON.GUI.StackPanel();

    private static  instance: GuiCreate;

    public static  get  ins():GuiCreate{
        if(!this.instance){
            this.instance=new GuiCreate()
        }
        return this.instance;
    }

    constructor(){}


    public createList(name,options,scaleUi){
        var rectOut=new BABYLON.GUI.Rectangle();
        rectOut.thickness=0;
        rectOut.isPointerBlocker=true;
        rectOut.verticalAlignment=BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        rectOut.horizontalAlignment=BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        for (var key in options) {
            if(rectOut[key]){
                rectOut[key] = options[key];
            }
        }
//            panelOut.height=1;
        if(options&&options.isVertical){
            this.panelOut.horizontalAlignment=2;
            this.panelOut.verticalAlignment=0;
            this.panelOut.isVertical  =true;
            var mouse={
                up:0,
                down:0,
            };
            mouse.up=parseInt(this.panelOut.top.toString());
            rectOut.onPointerDownObservable.add(function(e){
                mouse.down= e.y;
            });
            rectOut.onPointerUpObservable.add((e)=>{
                var topY=parseInt(this.panelOut.top.toString());
                mouse.up=topY;
                if(topY>0){
                    this.panelOut.top="0px";
                    mouse.up= 0;
                }
                else if(parseInt(this.panelOut.top.toString())<parseInt(rectOut.height.toString())-parseInt(this.panelOut.height.toString())){
                    var l=(parseInt(rectOut.height.toString())-parseInt(this.panelOut.height.toString()))*scaleUi;
                    this.panelOut.top=l.toString()+"px";
                    mouse.up= parseInt(this.panelOut.top);
                }
            });
            rectOut.onPointerMoveObservable.add((e)=>{
                var m=e.y-mouse.down;
                var mul=(mouse.up+m)*scaleUi;
                this.panelOut.top= mul.toString()+"px";
            });
        }else {
            this.panelOut.horizontalAlignment=0;
            this.panelOut.verticalAlignment=2;
            this.panelOut.isVertical  =false;
            var mouse={
                up:0,
                down:0
            };
            mouse.up=parseInt(this.panelOut.left.toString());
            rectOut.onPointerDownObservable.add((e)=>{
                mouse.down= e.x;
            });
            rectOut.onPointerUpObservable.add((e)=>{
                var leftY=parseInt(this.panelOut.left.toString());
                mouse.up=leftY;
                if(leftY>0){
                    this.panelOut.left="0px";
                    mouse.up= 0;
                }
                else if(parseInt(this.panelOut.left.toString())<parseInt(rectOut.width.toString())-parseInt(this.panelOut.width.toString())){
                    var l=(parseInt(rectOut.width.toString())-parseInt(this.panelOut.width.toString()))*scaleUi;
                    this.panelOut.left=l.toString()+"px";
                    mouse.up= parseInt(this.panelOut.left);
                }
            });
            rectOut.onPointerMoveObservable.add(function(e){
                var m=e.x-mouse.down;
                var mul=(mouse.up+m)*scaleUi;
                this.panelOut.left= mul.toString()+"px";
            });
        }
        rectOut.addControl(this.panelOut);
        return rectOut
    }


    /**
     * 横向滚动的奖品列表
     * @example
     *  this.optionsList({
                    itemWidth:"130px",
                    itemHeight:"170px",
                    itemPaddingRight:"30px",
                    logoWidth:"100px",
                    logoHeight:"100px",
                    logoTop:"0px",
                    textWidth:"100px",
                    textHeight:"30px",
                    textTop:"140px",
                    isVertical:false,
                },data,this.guiObject)
     *
     * */
    public optionsListCon(config,data,listTemplate){
        var scaleUi=GuiManager.ins.fullscreenUI.idealWidth/document.getElementById("renderCanvas").offsetWidth;
        var prizeDatalist=this.createList("list",{width:config.bodyWidth,height:config.bodyHeight,top:config.bodyTop,left:config.bodyLeft,isVertical:config.isVertical},scaleUi);
        var _length=this.panelOut.children.length
        if(_length>0){
            for(var i=0;i<_length;i++){
                this.panelOut.removeControl(this.panelOut.children[0])
            }
        }
        data.optionList.forEach((_list)=>{
            var list=listTemplate(config,_list)
            this.panelOut.addControl(list)
        })
        return prizeDatalist
    }

}