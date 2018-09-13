/**
 *Created by renjianfeng
 */
export class GuiManager {


    private _fullscreenUI:any;

    private _lastGui:any;

    private guiPoll:any={};

    private static instance: GuiManager;
    public static get ins(): GuiManager {
        if (!this.instance) {
            this.instance = new GuiManager();
        }
        return this.instance;
    }


    constructor(){
        this._lastGui=null;
        this._fullscreenUI=BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("GUI");
      //  this._fullscreenUI.idealWidth=750;
    }

    public changeGui(gui,...args){
        var _length=this._fullscreenUI.rootContainer.children.length
        for(var i=0;i<_length;i++){
            this._fullscreenUI.removeControl(this._fullscreenUI.rootContainer.children[0])
        }
        this._fullscreenUI.addControl(gui)
        this._lastGui=gui
    }


    public appendGui(gui,...args){
        this._fullscreenUI.addControl(gui)
        this._lastGui=gui
    }


    public removeGui(gui,...args){
        this._fullscreenUI.removeControl(this._lastGui)
    }

    public removeAll(gui,...args){
        var _length=this._fullscreenUI.rootContainer.children.length
        for(var i=0;i<_length;i++){
            this._fullscreenUI.removeControl(this._fullscreenUI.rootContainer.children[0])
        }
    }

    public openPanel(gui){

    }
    public closePanel(gui){

    }


    public get fullscreenUI(){
        return this._fullscreenUI;
    }

    public get lastGui(){
        return this._lastGui;
    }
}
