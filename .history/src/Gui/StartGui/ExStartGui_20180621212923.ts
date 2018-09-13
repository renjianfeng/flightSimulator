
import {AssetsManager} from "../../public/index";
import {WeatherState} from "../../public/index";



export class ExStartGui{

    private sceneCon:any;
    private parent:any;

    private static instance: ExStartGui;

    public static get ins(): ExStartGui {
        if (!this.instance) {
            this.instance = new ExStartGui();
        }
        return this.instance;
    }

    constructor(){
        this.creatUI()
    }

    public creatUI(){
        this.parent=new BABYLON.GUI.Rectangle()



      /*  var tween = new TWEEN.Tween(startBtn);
        tween.to({ scaleX: 0.8 ,scaleY: 0.8}, 500);
        tween.start();
        tween.repeat(Infinity)
        tween.yoyo(true)*/

        var viewHtml=`
            <style>
            .button-play{
                position: fixed;
                top: 50%;
                left:50%;
                background: #349ccd;
                color: #ffffff;
                border: 0px solid ;
                font-size: 42px;
                border-radius: 5px;
                cursor: pointer;
                transform: scale(1);
                width: 200px;
                height: 80px;
                margin-left: -100px;
                margin-top: 200px;
            }
            .button-play:active{
              transform: scale(0.8);
            }
            .weather-config{
                position: fixed;
                top: 50%;
                left:50%;
                display: block;
                background: #ffffff;
                color: #82bab3;
                border: 0px solid ;
                font-size: 24px;
                border-radius: 5px;
                transform: scale(1);
                width: 1000px;
                height: 260px;
                margin-left: -500px;
                margin-top: -200px;
                text-align: center;
               
            }
            .weather-config ul li{
                display: inline-block;
                height: 200px;
                width: 200px;
                margin: 0px 5px;
                border: 1px solid #cccccc;
                cursor: pointer;
                background-size: 100% 100%;
                text-shadow: 0px 0px 5px #444;
            }
            
            .weather-config ul li:hover{
                border: 1px solid royalblue;
            }
            .we-active{
                border: 3px solid #000 !important;
                opacity: 0.8;
            }
            .yw-text{
              font-size: 14px;
            }
            .box-tip{
            margin-top: 60px;
            }
            
            .map-list{
                margin-top:-30px
            }

            </style>
            
            <div class="weather-config">
                <div class="map-list">
                    <lable>
                    Map: <select name="mapList">
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                            <option value="fiat" selected>Fiat</option>
                            <option value="audi">Audi</option>
                        </select>
                    </lable>
               
                </div>
                <ul>
                  <li id="RAIN_DAY" class="we-active">大雨磅礴<br><span class="yw-text">The heavy rain made</span></li>
                  <li id="SUNNY_DAY">晴空万里<br><span class="yw-text">a bright sky</span></li>
                  <li id="AFTERNOON_DAY">晚霞时分<br><span class="yw-text">An evening at the</span></li>
                  <li id="NIGHT_DAY">漫漫长夜<br><span class="yw-text">All night long</span></li>
                </ul>
                <div class="box-tip">
                 Direction(方向):【W,S,A,D】<br>
                Brake(刹车):【Space】<br>
              
                </div>
            </div>
            
            <button class="button-play" id="button_play">Play</button>
        `;

        var viewNode = document.createElement("div");
        viewNode.id = "startNode";
        viewNode.innerHTML = viewHtml;

        //this.chassisBody.position.set(0, 151, 226);

        localStorage.map="1"

        localStorage.carposition={
            x:0,
            y:151,
            z:226
        }

        //交給控制器做交互
        this.parent.sceneChild={
            viewHtml:viewHtml,
            viewNode:viewNode,
        }

       // this.sceneCon=new StartGuiCon(this.parent);
    }

    public get guiObject(){
        return this.parent;
    }
}