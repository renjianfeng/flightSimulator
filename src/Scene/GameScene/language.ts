/**
 * 子弹控制系统   by renjianfeng 
 */


export class Language{

    private static instance: Language;

    public static get ins(): Language {
        if (!this.instance) {
            this.instance = new Language();
        }
        return this.instance;
    }

    public languageList:any={
            //地面撞击警告
            dmzj:{
                chinese:"注意地面撞击，距离${0} 米；",
                english:"Warning, Bottom collision，${0} metres away",
            }, 
            //上方撞击警告
            dbzj:{
                chinese:"注意上方撞击，距离${0} 米；",
                english:"Warning, Top collision，${0} metres away",
            },
            //前方撞击警告
            qfzj:{
                chinese:"注意前方撞击，距离${0} 米；",
                english:"Warning, Front collision，${0} metres away",
            },
            //左方撞击警告
            zfzj:{
                chinese:"注意左方撞击，距离${0} 米；",
                english:"Warning, Left collision，${0} metres away",
            },
             //右方撞击警告
             yfzj:{
                chinese:"注意右方撞击，距离${0} 米；",
                english:"Warning, Right collision，${0} metres away",
            },

             //右方撞击警告
             indexTips:{
                chinese:"你好，欢迎驾驶台风战机。\n您可以通过鼠标左键进行射击，右键切换第一人称和第三人称视角，\n通过长按空格键并拖动鼠标进行自由视角观察,\nQ键为导弹，E键为干扰弹，R为放下起落架。",
                english:"Hello, Welcome to fly the Typhoon fighter. \n You can shoot by the left button of the mouse,\n Change the view by right button, \nand control the flight by dragging the mouse. \n \nYou can press the space bar and drag the mouse to view the free view.\n You can release the jammer by pressing the 'E' key.",
            },

        }
    
}


