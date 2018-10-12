import {AssetsManager} from "../../public"
import {SceneManager} from "../../public"
import {Func} from "../../public"

export class FireCon{

    private static instance: FireCon;

    public static get ins(): FireCon {
        if (!this.instance) {
            this.instance = new FireCon();
        }
        return this.instance;
    }

    //子弹
    private bullets=[]

    //击中子弹爆炸
    private booms=[]

    //准星
    private starUi
    //准星图片
    private image2

    private ray
    private hit
    private display
    private scene

    private j;
    private freeState;


    private creatUI(){
        this.starUi = new BABYLON.GUI.Rectangle();
        this.starUi.width = "30px";
        this.starUi.height = "30px";
        this.starUi.alpha=0.8;
        //this.rect1.cornerRadius = 5;
       // this.rect1.color = "#009855";
        this.starUi.thickness = 0;
       // this.rect1.background = new BABYLON.Color4(0,0,0,0);
        this.display.advancedTexture.addControl( this.starUi);
    
        this.image2 = new BABYLON.GUI.Image("but", AssetsManager.ins.resourceObject["images"]["gameScene"]["jiantou3"].src);
        this.starUi.addControl(this.image2)
    }

    public init(display){
        this.scene=SceneManager.ins.scene;
        this.display=display

        this.creatUI()

        //创建子弹列表
        for(var i=0;i<=160;i++){
            this.bullets[i]= BABYLON.MeshBuilder.CreateSphere("frees", {diameterX:  2, diameterY: 2, diameterZ: 14}, this.scene);
            this.bullets[i].lifeState=false;
            this.bullets[i].isPickable=false;
            this.bullets[i].material=this.display.freeMateial;
            this.bullets[i].checkCollisions = false;;
        }

        //创建爆炸列表
        for(var i=0;i<=160;i++){
            this.booms[i]= BABYLON.MeshBuilder.CreateSphere("boom", {diameter: 10}, this.scene);
            this.booms[i].boom=new TWEEN.Tween(this.booms[i].scaling);
            this.booms[i].lifeState=false;
            this.booms[i].isPickable=false;
            this.booms[i].material=this.display.boomMateial;
            this.bullets[i].checkCollisions = false;;
           // this.frees[i].scaling=new BABYLON.Vector3(1,0.001,0.001)
           // this.frees[i].rotation=new BABYLON.Vector3(0,0.3,Math.PI*0.5)
        }


        //获得位置
        var origin = this.display.cameraBox.position;
    
        //创建向前矢量
	    var forward = new BABYLON.Vector3(0,0,1);		
	    forward = this.vecToLocal(forward, this.display.cameraBox);
    
        //创建方向
	    var direction = forward.subtract(origin);
	    direction = BABYLON.Vector3.Normalize(direction);
	
	    //var length = 100;
    
        //创建属性
	    this.ray = new BABYLON.Ray(origin, direction, 3000);
    }


    public update() {

        /*  if(!this.freeState){
             return;
         } */
         var origin = this.display.cameraBox.position;
     
     
 
           var forward = new BABYLON.Vector3(0,0,1000);		
           forward = this.vecToLocal(forward, this.display.cameraBox);
       
           var direction = forward.subtract(origin);
           direction = BABYLON.Vector3.Normalize(direction);
 
       
           this.ray.origin = origin;
           this.ray.direction =direction;
 
        /*    let rayHelper = new BABYLON.RayHelper(this.ray);		
           rayHelper.show(this.scene,new BABYLON.Color3(1,1,1));	 */
           this.hit = this.scene.pickWithRay(this.ray);
 
         var ram=Math.random;
 
         
 
 
        // this.rect2.linkWithMesh(this.display.cameraBox)
 
         if (this.hit.pickedMesh){
            this.starUi.moveToVector3(this.hit.pickedPoint,this.scene)
           // this.rect1.isVisible = true;
           // this.rect2.color = "#ffc107";
 
         }else{
           //  this.rect1.isVisible = true;
             this.starUi.moveToVector3(this.display.pickMesh.absolutePosition,this.scene)
            // this.rect2.color = "#009855";
         }
 
         this.bullets.forEach((free,i)=>{
             if(free.lifeState==true){
                 var forword=new BABYLON.Vector3(free.forward.x*10*this.times*this.fireSpeed,free.forward.y*10*this.times*this.fireSpeed,free.forward.z*10*this.times*this.fireSpeed)
                 free.moveWithCollisions(forword);
                 free.isVisible=true;
 
                 if (this.hit.pickedMesh){
                     /* console.log("hit.pickedMesh.name")
                     console.log(hit.pickedMesh.name)
                     console.log(hit.pickedPoint) */
                     if(!free.boomPosition){
                         free.boomPosition=new BABYLON.Vector3(this.hit.pickedPoint.x,this.hit.pickedPoint.y,this.hit.pickedPoint.z)
                     }
                    
                     //this.booms[i].position=hit.pickedPoint;
                  }
 
                  if(free.boomPosition){
                     var jl2=Func.ins.getDistance(
                         free.position.x,
                         free.position.y, 
                         free.position.z, 
                         free.boomPosition.x,
                         free.boomPosition.y, 
                         free.boomPosition.z, 
                         )
     
                      if(jl2<=50){
                          console.log(44444)
                         free.lifeState=false;
                         this.booms[i].position=new BABYLON.Vector3(free.position.x,free.position.y,free.position.z);
                       //  this.booms[i].scaling=new BABYLON.Vector3(1,1,1);
                       this.booms[i].scaling.x=4;
                       this.booms[i].scaling.y=4;
                       this.booms[i].scaling.z=4;
                       this.booms[i].boom.to({ x:1 ,y:1,z:1}, 1000);
                       this.booms[i].boom.start();
                       this.booms[i].boom.onComplete(()=>{
                           this.booms[i].scaling.x=0;
                           this.booms[i].scaling.y=0;
                           this.booms[i].scaling.z=0;
                        })
                         free.boomPosition=null;
                      }
                  }
                  
                
 
  /*                var pointToIntersect = new BABYLON.Vector3(10, -5, 0);
 if (balloon3.intersectsPoint(pointToIntersect)){
   balloon3.material.emissiveColor = new BABYLON.Color4(1, 0, 0, 1);
 } */
               /*   if (this.scene.getMeshByName("default").intersectsPoint(free.position)) {
                     //free.material.emissiveColor = new BABYLON.Color4(1, 0, 0, 1);
                     this.booms[i].position=new BABYLON.Vector3(free.position.x,free.position.y,free.position.z);
                     free.lifeState=false
                   } else {
                     //free.material.emissiveColor = new BABYLON.Color4(1, 1, 1, 1);
                 } */
 
                /*  this.rayEventCon(
                     "frontPick",
                     new BABYLON.Vector3(0, 0, -1),
                     new BABYLON.Vector3(0, 0, 0),
                     this.scene.getMeshByName("default"),
                     free,
                     5,
                     (e)=>{
                         //console.log(e)
                         if(e){
                             //console.log("撞到前面")
                             this.booms[i].position=new BABYLON.Vector3(free.position.x,free.position.y,free.position.z);
                             free.lifeState=false
                         }
                     }
                 )
  */
                 var jl=Func.ins.getDistance(
                     free.position.x,
                     free.position.y, 
                     free.position.z, 
                     this.display.cameraBox.position.x, 
                     this.display.cameraBox.position.y, 
                     this.display.cameraBox.position.z
                     )
 
                 if(jl>=3000){
                     free.lifeState=false;
                     free.boomPosition=null;
                 /*     free.position=new BABYLON.Vector3(this.display.cameraBox.absolutePosition.x,this.display.cameraBox.absolutePosition.y,this.display.cameraBox.absolutePosition.z) ;
                     free.rotation=new BABYLON.Vector3(this.display.cameraBox.rotation.x,this.display.cameraBox.rotation.y,this.display.cameraBox.rotation.z);    
           */       }
             }else{
                /*  free.position=new BABYLON.Vector3(this.display.cameraBox.absolutePosition.x,this.display.cameraBox.absolutePosition.y,this.display.cameraBox.absolutePosition.z) ;
                 free.rotation=new BABYLON.Vector3(this.display.cameraBox.rotation.x,this.display.cameraBox.rotation.y,this.display.cameraBox.rotation.z);    
               */   free.isVisible=false;
             }
         })
 
         
     }
}


