import {SceneManager} from "../../public";

export class CannonCreateObj {
    public heightBody;
    public chassisShape;

    private _gold;
    private vehicle;
    private world;
    private text={
        forceOn:0,
        brakeOn:0,
    };
    private vehicleBox;
    private ground;
    private camera
    private scene
    private gui;
    private shadowGenerator;
    private vehicleSetup;
    private music1;
    private babylonWheelBodies = [];
    private sphere = [];
    private wheelBodies = [];
    private babylonCarBox;
    private chassisBody;
    private cannonCar;
    private zxState=0;

    private boxBody;
    private babylonBox;

    private camera2Box;

    //制动力
    private  brakeForce = 100;

    //最大转向
    private  maxSteerVal = 0.5;

    //最大动力
    private  maxForce = 1500;

    //重力
    private  gravityY = -19;

    private  carposition;


    constructor(scene,shadowGenerator,carposition){
        this.scene=scene;
        this.shadowGenerator=shadowGenerator;
        this.carposition=carposition;

        console.log(this.carposition)
    }


    private  options = {
        radius: 0.5,
        directionLocal: new CANNON.Vec3(0, 0, -1),
        suspensionStiffness: 30,
        suspensionRestLength: 0.3,
        frictionSlip: 5,
        dampingRelaxation: 2.3,
        dampingCompression: 4.4,
        maxSuspensionForce: 10000000,
        rollInfluence:  0.01,
        axleLocal: new CANNON.Vec3(0, 1, 0),
        chassisConnectionPointLocal: new CANNON.Vec3(1, 1, 0),
        maxSuspensionTravel: 0.3,
        customSlidingRotationalSpeed: -300,
        useCustomSlidingRotationalSpeed: true
    };

    //重力
    private  gravity = new BABYLON.Vector3(0, -16, 0);

    public HeightMap(object, pointDepth?:any){
        var pos = object.getVerticesData(BABYLON.VertexBuffer.PositionKind);
        var matrix = [];
        //For now pointDepth will not be used and will be automatically calculated.
        //Future reference - try and find the best place to add a reference to the pointDepth variable.
        var arraySize = pointDepth || ~~(Math.sqrt(pos.length / 3) - 1);
        var dim = Math.min(object.getBoundingInfo().boundingBox.extendSize.x, object.getBoundingInfo().boundingBox.extendSize.z);
        var elementSize = dim * 2 / arraySize;
        var minY = object.getBoundingInfo().boundingBox.extendSize.y;

        for (var i = 0; i < pos.length; i = i + 3) {
            var x = Math.round((pos[i + 0]) / elementSize + arraySize / 2);
            var z = Math.round(((pos[i + 2]) / elementSize - arraySize / 2) * -1);
            var y = pos[i + 1] + minY;
            if (!matrix[x]) {
                matrix[x] = [];
            }
            if (!matrix[x][z]) {
                matrix[x][z] = y;

            }
            matrix[x][z] = Math.max(y, matrix[x][z]);

        }


        for (var x = 0; x <= arraySize; ++x) {
            if (!matrix[x]) {
                var loc = 1;
                while (!matrix[(x + loc) % arraySize]) {
                    loc++;
                }
                matrix[x] = matrix[(x + loc) % arraySize].slice();

            }
            for (var z = 0; z <= arraySize; ++z) {
                if (!matrix[x][z]) {
                    var loc = 1;
                    var newValue;
                    while (newValue === undefined) {
                        newValue = matrix[x][(z + loc++) % arraySize];
                    }
                    matrix[x][z] = newValue;

                }
            }
        }
        //console.log(elementSize);
        var shape = new CANNON.Heightfield(matrix, {
            elementSize: elementSize
        });


        console.log(object.getBoundingInfo().boundingBox)


        this.heightBody = new CANNON.Body({mass: 0, shape: shape}); // Step 2
        this.heightBody.position.y = -object.getBoundingInfo().boundingBox.extendSize.y;
        this.heightBody.position.x = -object.getBoundingInfo().boundingBox.extendSize.x;
        this.heightBody.position.z = object.getBoundingInfo().boundingBox.extendSize.z;
        this.heightBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);

        this.world = this.createPhysics(this.heightBody);

    }


    //创建物理世界
    public createPhysics(hBody){
        this.world = new CANNON.World();
        this.world.gravity.set(this.gravity.x, this.gravity.y, this.gravity.z);
        this.world.broadphase = new CANNON.NaiveBroadphase();
        this.world.defaultContactMaterial.friction = 0.001;

        var groundMaterial = new CANNON.Material("groundMaterial");
        var wheelMaterial = new CANNON.Material("wheelMaterial");
        var wheelGroundContactMaterial = window["wheelGroundContactMaterial"] = new CANNON.ContactMaterial(wheelMaterial, groundMaterial, {
            friction: 0,
            restitution: 0,
            contactEquationStiffness: 1000
        });

        // We must add the contact materials to the world
        this.world.addContactMaterial(wheelGroundContactMaterial);

        //console.log("tets");
        this.world.add(hBody);
        this.cannonCar = this.createCannonVehicle();
       // alert()
        return this.world;
    }

    //创建车辆
    public createCannonVehicle(){
        var sizeXYZ = new CANNON.Vec3(4, 1, 0.5);
        this.chassisShape = new CANNON.Box(sizeXYZ);
        this.chassisBody = new CANNON.Body({ mass: 500 });
        this.chassisBody.addShape(this.chassisShape);
        if(!this.carposition){
            alert()
            this.chassisBody.position.set(0, 151, 226);
        }else{
            alert(this.carposition)
            this.chassisBody.position.set(this.carposition.x, this.carposition.y, this.carposition.z);
        }
        this.chassisBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
        this.chassisBody.angularVelocity.set(0, 0, 0.2);
        this.babylonCarBox = this.createBabylonChassisBody(this.chassisBody);
        this.vehicle = new CANNON.RaycastVehicle({
            chassisBody: this.chassisBody,
        });
        this.options.chassisConnectionPointLocal.set(2.5, 1.2, -0.3);
        this.vehicle.addWheel(this.options);
        this.options.chassisConnectionPointLocal.set(2.5, -1.2, -0.3);
        this.vehicle.addWheel(this.options);
        this.options.chassisConnectionPointLocal.set(-2.5, 1.2, -0.3);
        this.vehicle.addWheel(this.options);
        this.options.chassisConnectionPointLocal.set(-2.5, -1.2, -0.3);
        this.vehicle.addWheel(this.options);
        this.vehicle.addToWorld(this.world);
        var wheelBodies = [];
        for(var i=0; i<this.vehicle.wheelInfos.length; i++){
            var wheel = this.vehicle.wheelInfos[i];
            //console.log(wheel);
            var cylinderShape = new CANNON.Cylinder(wheel.radius, wheel.radius, wheel.radius / 2, 20);
            var wheelBody = new CANNON.Body({
                mass: 800
            });
            wheelBody.type = CANNON.Body.KINEMATIC;

            wheelBody.collisionFilterGroup = 0; // turn off collisions
            var q = new CANNON.Quaternion();
            q.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2);
            wheelBody.addShape(cylinderShape, new CANNON.Vec3(), q);
            wheelBodies.push(wheelBody);
            this.createBabylonWheelBodies(wheelBody);
            //  demo.addVisual(wheelBody);
            this.world.add(wheelBody);

        }




        var w1=this.scene.getMeshByName("w1").clone();w1.isVisible=true;
        w1.name="w1_1";
        w1.rotation.z=-Math.PI*0.5
        this.shadowGenerator.getShadowMap().renderList.push(w1);

        w1.material.subMaterials.forEach((material)=>{
            material.backFaceCulling=false;
        })
        // w1.flipFaces()
        var w2=this.scene.getMeshByName("w1").clone();w2.isVisible=true;
        w2.rotation.z=-Math.PI*0.5
        w2.name="w2_1";

        this.shadowGenerator.getShadowMap().renderList.push(w2);
        var w3=this.scene.getMeshByName("w1").clone();w3.isVisible=true;
        w3.rotation.z=-Math.PI*0.5
        w3.name="w3_1";
        this.shadowGenerator.getShadowMap().renderList.push(w3);

        var w4=this.scene.getMeshByName("w1").clone();w4.isVisible=true;
        w4.rotation.z=-Math.PI*0.5
        w4.name="w4_1";

        w2.scaling.x=-this.scene.getMeshByName("w1").scaling.x;
        w2.position.y=-this.scene.getMeshByName("w1").position.y;
        w4.scaling.x=-this.scene.getMeshByName("w1").scaling.x;
        w4.position.y=-this.scene.getMeshByName("w1").position.y;
        this.shadowGenerator.getShadowMap().renderList.push(w4);

        this.world.addEventListener('postStep',()=>{
            this.scene.getMeshByName("w1").rotation.y=3
            for (var i = 0; i < this.vehicle.wheelInfos.length; i++) {
                this.vehicle.updateWheelTransform(i);
                var t = this.vehicle.wheelInfos[i].worldTransform;
                //console.log(t);
                var wheelBody = wheelBodies[i];
                wheelBody.position.copy(t.position);
                wheelBody.quaternion.copy(t.quaternion);
                if(this.babylonWheelBodies[i]){
                  //  console.log(wheelBody.position)
                    this.babylonWheelBodies[i].position = wheelBody.position;
                    this.babylonWheelBodies[i].rotationQuaternion = new BABYLON.Quaternion(t.quaternion.x,t.quaternion.y,t.quaternion.z,t.quaternion.w);
                }

                w1.parent=this.babylonWheelBodies[0];
                w2.parent=this.babylonWheelBodies[1];
                w3.parent=this.babylonWheelBodies[2];
                w4.parent=this.babylonWheelBodies[3];
            }
        });
        SceneManager.ins.engine.runRenderLoop(()=>{
            if(this.world){
                this.world.step(1.0 / 60.0);
            }
            if(this.babylonCarBox){
                this.babylonCarBox.position = this.chassisBody.position;
                this.babylonCarBox.rotationQuaternion = new BABYLON.Quaternion(this.chassisBody.quaternion.x, this.chassisBody.quaternion.y, this.chassisBody.quaternion.z, this.chassisBody.quaternion.w);
            }
        });
        return this.vehicle;
    }

    //创建车体
    public createBabylonChassisBody(body){
        var shape = body.shapes[0];
        var size = shape.halfExtents;
        var meshFromShape = BABYLON.MeshBuilder.CreateBox("carBox", {height: size.y * 2, width:size.x * 2, depth:size.z * 2}, this.scene);
        meshFromShape.rotationQuaternion = new BABYLON.Quaternion();
        meshFromShape.isVisible=false;
        //meshFromShape.receiveShadows = true;
       // shadowGenerator.getShadowMap().renderList.push(meshFromShape);
        this.scene.getMeshByName("car").parent= meshFromShape
        //console.log(shadowGenerator.getShadowMap().renderList);
        return meshFromShape;
    };

    //创建车轮
    public createBabylonWheelBodies(body){
        var shape = body.shapes[0];
        var size = shape.boundingSphereRadius;
        //console.log(shape);
        var wheel = BABYLON.MeshBuilder.CreateCylinder("wheel", {height:size}, this.scene);
        wheel.scaling.z = size * 2;
        wheel.scaling.x = size * 2;
        wheel.rotationQuaternion = new BABYLON.Quaternion();
        wheel.receiveShadows = true;
        wheel.isVisible=false;
        //shadowGenerator.getShadowMap().renderList.push(wheel);
        this.babylonWheelBodies.push(wheel);
    };

    //创建box
    public createBabylonBody(body){
        var shape = body.shapes[0];
        var size = shape.halfExtents;
        var meshBox = BABYLON.MeshBuilder.CreateBox("boxdh", {height: size.y * 2, width:size.x * 2, depth:size.z * 2}, this.scene);
        meshBox.rotationQuaternion = new BABYLON.Quaternion();
        //meshFromShape.receiveShadows = true;
        //shadowGenerator.getShadowMap().renderList.push(meshBox);
        //console.log(shadowGenerator.getShadowMap().renderList);
        return meshBox;
    };


    //创建盒子
    public createCannonBox(){
        var sizeXYZ = new CANNON.Vec3(2, 1, 0.5);
        this.chassisShape = new CANNON.Box(sizeXYZ);
        this.boxBody = new CANNON.Body({ mass: 10 });
        this.boxBody.addShape(this.chassisShape);
        this.boxBody.position.set(0, 100, 140);
        this.boxBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
        this.boxBody.angularVelocity.set(0, 0, 0.2);
        this.babylonBox = this.createBabylonBody(this.boxBody);
        this.world.add(this.boxBody)
        // babylonBox
    }


    /**
     * 汽车控制
     * */

    public carCtrl(){

        document.addEventListener("keydown",(e)=>{
            console.log(5555666)
            this.handlerDown(e)
        })

        document.addEventListener("keyup",(e)=>{
            this.handlerUp(e)
        })

        var SteerVal=0
        this.scene.onAfterRenderObservable.add(()=>{
            if(this.zxState==0){
                //SteerVal=0
                if(SteerVal>0){
                    SteerVal-=0.03
                    if(SteerVal<=0.03){
                        SteerVal=0
                    }

                }else if(SteerVal<0){
                    SteerVal+=0.03

                    if(SteerVal>=-0.03){
                        SteerVal=0
                    }
                }


            }else if(this.zxState==1){
                if(SteerVal>this.maxSteerVal){
                    SteerVal=SteerVal
                }else{
                    SteerVal+=0.03
                }
            }else if(this.zxState==2){
                if(SteerVal<-this.maxSteerVal){
                    SteerVal=SteerVal
                }else{
                    SteerVal-=0.03
                }
            }
            if(this.cannonCar){
               /* console.log("转向")
                console.log(SteerVal)*/

               this.scene.getMeshByName("steering").rotation.x=-SteerVal*4
                this.cannonCar.setSteeringValue(SteerVal, 1);
                this.cannonCar.setSteeringValue(SteerVal, 0);
            }
        })


    }


    /**
    * 键盘松开
    * */
    public handlerUp(event){

        this.cannonCar.setBrake(0, 0);
        this.cannonCar.setBrake(0, 1);
        this.cannonCar.setBrake(0, 2);
        this.cannonCar.setBrake(0, 3);
        if(event.keyCode === 87){
            this.cannonCar.applyEngineForce(0, 0);
            this.cannonCar.applyEngineForce(0, 1);
            this.cannonCar.applyEngineForce(0, 2);
            this.cannonCar.applyEngineForce(0, 3);
        }

        if(event.keyCode === 83){
            this.cannonCar.applyEngineForce(0, 0);
            this.cannonCar.applyEngineForce(0, 1);
            this.cannonCar.applyEngineForce(0, 2);
            this.cannonCar.applyEngineForce(0, 3);
        }

        if(event.keyCode === 32){
            this.cannonCar.setBrake(0, 0);
            this.cannonCar.setBrake(0, 1);
            this.cannonCar.setBrake(0, 2);
            this.cannonCar.setBrake(0, 3);
            this.scene.getMeshByName("Jeep GC-P 20").material.emissiveTexture.level=0.1;
        }
        if(event.keyCode === 65){
            this.zxState=0
        }

        if(event.keyCode === 68){
            this.zxState=0
        }

    }


    /**
     * 键盘按下
     * */
    public handlerDown(event){

        this.cannonCar.setBrake(0, 0);
        this.cannonCar.setBrake(0, 1);
        this.cannonCar.setBrake(0, 2);
        this.cannonCar.setBrake(0, 3);

        if(event.keyCode === 87){
            if(this.text.forceOn === 1){
                this.cannonCar.applyEngineForce(-this.maxForce, 2);
                this.cannonCar.applyEngineForce(-this.maxForce, 3);
            } else if(this.text.forceOn === 2){
                this.cannonCar.applyEngineForce(-this.maxForce, 0);
                this.cannonCar.applyEngineForce(-this.maxForce, 1);
            } else {
                this.cannonCar.applyEngineForce(-this.maxForce, 0);
                this.cannonCar.applyEngineForce(-this.maxForce, 1);
                this.cannonCar.applyEngineForce(-this.maxForce, 2);
                this.cannonCar.applyEngineForce(-this.maxForce, 3);
            }
        }

        if(event.keyCode === 83){
            if(this.text.forceOn === 1){
                this.cannonCar.applyEngineForce(this.maxForce, 2);
                this.cannonCar.applyEngineForce(this.maxForce, 3);
            } else if(this.text.forceOn === 2){
                this.cannonCar.applyEngineForce(this.maxForce, 0);
                this.cannonCar.applyEngineForce(this.maxForce, 1);
            } else {
                this.cannonCar.applyEngineForce(this.maxForce, 0);
                this.cannonCar.applyEngineForce(this.maxForce, 1);
                this.cannonCar.applyEngineForce(this.maxForce, 2);
                this.cannonCar.applyEngineForce(this.maxForce, 3);
            }
        }

        if(event.keyCode === 32){
            //console.log(text.brakeOn);
            if(this.text.brakeOn === 1){
                this.cannonCar.setBrake(this.brakeForce, 2);
                this.cannonCar.setBrake(this.brakeForce, 3);
            } else if(this.text.brakeOn === 2){
                this.cannonCar.setBrake(this.brakeForce, 0);
                this.cannonCar.setBrake(this.brakeForce, 1);
            }else{
                this.cannonCar.setBrake(this.brakeForce, 0);
                this.cannonCar.setBrake(this.brakeForce, 1);
                this.cannonCar.setBrake(this.brakeForce, 2);
                this.cannonCar.setBrake(this.brakeForce, 3);
            }

            this.scene.getMeshByName("Jeep GC-P 20").material.emissiveTexture.level=1;
        }


        if(event.keyCode === 65){
            this.zxState=2
        }

        if(event.keyCode === 68){
            this.zxState=1
        }
    }
}