
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
                margin-top:-30px;
                position: relative;
                top: -30px;
            }
            .map-list select{
                background: transparent;
                padding: 7px;
                color: #82bab3;
                position: relative;
                top: -2px;
                font-size: 18px;
                border-radius: 5px;
                border: 1px solid #82bab3;
            }
            .box-tip{
                background: rgba(0,0,0,0.2);
                color: #ffffff;
                padding: 10px;
                font-size: 16px;
                letter-spacing: 3px;
                position: fixed;
                bottom: 30px;
                width:100%;
                padding-left:20px;
                text-align: center;
            }

            .about-btn{
                position: fixed;
                top: 20px;
                left:20px;
                background: #349ccd;
                color: #ffffff;
                border: 0px solid ;
                font-size: 18px;
                padding: 8px 20px;
                border-radius: 5px;
                cursor: pointer;
                transform: scale(1);
            }
            .game-bg{
                position: fixed;
                top: 0;
                left:0;
                width:100%;
                height:100%;
               // background-color: #349ccd;
                background-size:100% 100%;
            }
            .logo{
                position: fixed;
                top: 40%;
                left: 50%;
                width: 441px;
                height: 117px;
                margin-left: -220.5px;
                background-size: 100% 100%;
                z-index: 9;
            }

            </style>

            <div class="logo" id="LOGO"></div>
        
            <div class="game-bg" id="GAME_BG">
                <div class="weather-config">
                    <div class="map-list">
                        <lable>
                        Language : <select id="Language_List" name="mapList">
                                <option value="chinese">中文简体</option>
                                <option value="english">English</option>
                            </select>
                        </lable>
                    </div>
                </div>
            <div>
            <button class="about-btn" onclick="window.location.href='https://github.com/renjianfeng/flightSimulator'">About The Author And Github</button>
            </div>
            
            <button class="button-play" id="button_play">Play</button>
           
            </div>
        `;

        var viewNode = document.createElement("div");
        viewNode.id = "startNode";
        viewNode.innerHTML = viewHtml;

        document.title="FlightSimulator(台风战机模拟驾驶)"

        //this.chassisBody.position.set(0, 151, 226);


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