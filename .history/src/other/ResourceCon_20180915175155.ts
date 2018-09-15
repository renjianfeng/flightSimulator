import {ResourceData} from "../public/index"

export class ResourceCon {

    private _resource;

    private static instance: ResourceCon;

    public static get ins(): ResourceCon {
        if (!this.instance) {
            this.instance = new ResourceCon();
        }
        return this.instance;
    }

    private pathFirst=window["resPath"]

    constructor(){
        let gameScene:ResourceData;

        gameScene={
            binarys:[
                {name:"rain", filePath:this.pathFirst+"src/Resource/gameScene/binarys/", fileName:"rain.mp4"},
               // {name:"sm14", filePath:this.pathFirst+"src/Resource/gameScene/binarys/", fileName:"sm14.glb"},
            ],
            images:[
               /*  {name:"test", filePath:this.pathFirst+"src/Resource/gameScene/images/", fileName:"cursor_default.png",},
                {name:"beginBtn", filePath:this.pathFirst+"src/Resource/gameScene/images/", fileName:"beginBtn.png",},
                {name:"bg", filePath:this.pathFirst+"src/Resource/gameScene/images/", fileName:"bg.jpg",},
                {name:"close", filePath:this.pathFirst+"src/Resource/gameScene/images/", fileName:"close.png",},
                {name:"win_m", filePath:this.pathFirst+"src/Resource/gameScene/images/", fileName:"win_m.png",},
                {name:"bg_modle", filePath:this.pathFirst+"src/Resource/gameScene/images/", fileName:"bg_modle.png",},
                {name:"btn_left", filePath:this.pathFirst+"src/Resource/gameScene/images/", fileName:"btn_left.png",},
                {name:"btn_right", filePath:this.pathFirst+"src/Resource/gameScene/images/", fileName:"btn_right.png",},
                {name:"btn_py", filePath:this.pathFirst+"src/Resource/gameScene/images/", fileName:"btn_py.png",},
                {name:"btn_dq", filePath:this.pathFirst+"src/Resource/gameScene/images/", fileName:"btn_dq.png",},
                {name:"prizeBtn", filePath:this.pathFirst+"src/Resource/gameScene/images/", fileName:"prizeBtn.png",},
                {name:"ruleBtn", filePath:this.pathFirst+"src/Resource/gameScene/images/", fileName:"ruleBtn.png",}, */

                //光晕
                {name:"Bphl4qj", filePath:this.pathFirst+"src/Resource/gameScene/textures/light/", fileName:"Bphl4qj.png"},
                {name:"HRsf4I5", filePath:this.pathFirst+"src/Resource/gameScene/textures/light/", fileName:"HRsf4I5.png"},
                {name:"IIyZhcg", filePath:this.pathFirst+"src/Resource/gameScene/textures/light/", fileName:"IIyZhcg.png"},
                {name:"it5c3Vr", filePath:this.pathFirst+"src/Resource/gameScene/textures/light/", fileName:"it5c3Vr.png"},
                {name:"ty", filePath:this.pathFirst+"src/Resource/gameScene/textures/light/", fileName:"ty.png"},
                {name:"XaJRD9j", filePath:this.pathFirst+"src/Resource/gameScene/textures/light/", fileName:"XaJRD9j.png"},

                //ui

                {name:"after", filePath:this.pathFirst+"src/Resource/gameScene/images/ui/", fileName:"after.jpg"},
                {name:"night", filePath:this.pathFirst+"src/Resource/gameScene/images/ui/", fileName:"night.jpg"},
                {name:"rain", filePath:this.pathFirst+"src/Resource/gameScene/images/ui/", fileName:"rain.jpg"},
                {name:"sun", filePath:this.pathFirst+"src/Resource/gameScene/images/ui/", fileName:"sun.jpg"},
                {name:"map1", filePath:this.pathFirst+"src/Resource/gameScene/images/ui/", fileName:"map_1.jpg"},
                {name:"map2", filePath:this.pathFirst+"src/Resource/gameScene/images/ui/", fileName:"map_2.jpg"},
                {name:"map3", filePath:this.pathFirst+"src/Resource/gameScene/images/ui/", fileName:"map_3.jpg"},
                {name:"logo", filePath:this.pathFirst+"src/Resource/gameScene/images/ui/", fileName:"logo.png"},
            ],
            models:[
               
              /*   {name:"wheel", filePath:this.pathFirst+"src/Resource/gameScene/models/car2/", fileName:"wheel.babylon"},
                {name:"map1", filePath:this.pathFirst+"src/Resource/gameScene/models/height_m2/", fileName:"height_m18.babylon"},
                {name:"map2", filePath:this.pathFirst+"src/Resource/gameScene/models/height_m2/", fileName:"height_m15.babylon"},*/
                {name:"map3", filePath:this.pathFirst+"src/Resource/gameScene/models/height_m2/", fileName:"height_m18.babylon"}, 
                {name:"sm14", filePath:this.pathFirst+"src/Resource/gameScene/models/sm14/", fileName:"sm92.glb"},
            ],
            textures:[
                {name:"grass", filePath:this.pathFirst+"src/Resource/gameScene/textures/", fileName:"grass.png"},
                {name:"grass2", filePath:this.pathFirst+"src/Resource/gameScene/textures/", fileName:"grass.jpg"},
                {name:"ground", filePath:this.pathFirst+"src/Resource/gameScene/textures/", fileName:"ground.jpg"},
                {name:"maptr", filePath:this.pathFirst+"src/Resource/gameScene/textures/", fileName:"maptr.jpg"},
                {name:"maptr2", filePath:this.pathFirst+"src/Resource/gameScene/textures/", fileName:"maptr5.jpg"},
                {name:"stainedGlass", filePath:this.pathFirst+"src/Resource/gameScene/textures/", fileName:"stainedGlass.png"},
                {name:"waterbump", filePath:this.pathFirst+"src/Resource/gameScene/textures/", fileName:"waterbump.png"},
                {name:"yu", filePath:this.pathFirst+"src/Resource/gameScene/textures/", fileName:"yu.png"},
                {name:"lighting", filePath:this.pathFirst+"src/Resource/gameScene/textures/", fileName:"lighting4.png"},

            ],
            cubeTextures:[
                {name:"skybox", filePath:this.pathFirst+"src/Resource/gameScene/cubeTextures/skybox/", fileName:"skybox",}
            ]
        };



        this._resource={
            gameScene:gameScene,
        }
    }

    public get resource(): object {
        return this._resource;
    }
}