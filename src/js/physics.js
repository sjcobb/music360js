/*
 *** PHYSICS ***
 */
/*jshint esversion: 6 */

//-----CANNON INIT------//
let world = new CANNON.World();

function updatePhysics() {
    if (this.physics.debugRenderer !== undefined) this.physics.debugRenderer.scene.visible = true;
}

function addBody(sphere = true, xPosition = 5.5, options = 'Z', timeout = 0) {
    // console.log('addBody -> options: ', options);
    // console.log('addBody -> timeout: ', timeout);

    const material = new CANNON.Material();
    const body = new CANNON.Body({ mass: 5, material: material });
    // const body = new CANNON.Body({ mass: 1, material: material }); //no effect
    if (sphere) {
        body.addShape(this.shapes.sphere);
    } else {
        body.addShape(this.shapes.box);
    }

    let xRand = Math.random() * (15 - 1) + 1; //rdm b/w 1 and 15
    xPos = xPosition; //TODO: remove xPosition param if not used

    if (globalAutoScroll === true) {
        if (options.type === 'drum') {
            xPos = -(globalTicks);
        } else {
            xPos = -(globalTicks);
            globalInstrumentCounter++;
        }
    }

    const yPos = 20; //PREV, just right
    // const yPos = 26;

    /*** Randomized Y drop point ***/
    // const y = Math.random() * (10 - 5) + 5; //rdm b/w 5 and 10

    let zPos;
    zPos = options.originalPosition !== undefined ? options.originalPosition.z : Math.random() * (15 - 5) - 2;

    if (options.type === 'drum') {
        zPos += 10; //TODO: make global var for staffLineOffset
    } else {
        zPos -= 10; //TODO: make global var for neg staffLineOffset
    }
    // zPos = options.originalPosition.z;

    body.position.set((sphere) ? -xPos : xPos, yPos, zPos);
    // body.position.set((sphere) ? -x : x, y, 0);
    body.linearDamping = globalDamping;

    // body.initVelocity.x = 5; // TODO: cause balls to spin and roll off
    // body.angularVelocity.y = 9.5; //crazy spin
    // body.angularVelocity.y = 1.5; //slow spin

    // body.angularVelocity.z = 15.5; //GREAT
    // body.angularVelocity.z = 12; 
    // body.angularVelocity.z = 8; //PREV
    body.angularVelocity.z = 12;
    // body.angularVelocity.z = 35.5; //too fast

    // body.angularVelocity.x = 0.9; //flips ball
    // body.angularVelocity.x = 9.9; //WORKS - off to right
    // body.angularVelocity.z = 0.9; //spins ball
    // console.log({ body });

    setTimeout(function() { //TODO: remove setTimeout param if not needed anymore
        world.add(body);
    }, timeout);
    // world.add(body);

    // if (this.useVisuals) this.helper.addVisual(body, (sphere) ? 'sphere' : 'box', true, false);

    body.userData = {
        opts: options
    };
    addVisual(body, (sphere) ? 'sphere' : 'box', true, false, options);

    let bodyCollideCount = 0;
    body.addEventListener('collide', function(ev) {
        // console.log('body collide event: ', ev.body);
        // console.log('body collide INERTIA: ', ev.body.inertia); //right is NaN, wrong is 0.8333333333333333
        // console.log('contact between two bodies: ', ev.contact);
        // console.log(bodyCollideCount);
        if (options.type === 'drum') {
            // if (bodyCollideCount <= 1) { //play note two times on collide
            if (bodyCollideCount <= 0) {
                // console.log('DRUM ev: ', ev);
                // if (isNaN(ev.body.inertia.x)) { //hack works

                // if (ev.body.initPosition.x === 0) { 
                // since ground is stationary at 0, must be hidden contact body above origin drop point
                triggerNote(body);
                // }
            }
        } else { //regular spheres
            if (bodyCollideCount <= 0) { //play note one time on collide
                // console.log('REGULAR ev: ', ev);
                triggerNote(body);
            }
        }

        // console.log(bodyCollideCount);
        // setTimeout(() => {
        //     if (bodyCollideCount >= 3) { //play note one time on collide
        //         console.log({ body });
        //         world.remove(body);
        //         // http://www.html5gamedevs.com/topic/28819-solved-how-dispose-mesh-in-oncollideevent/
        //     }
        // }, 2000); //does not work

        bodyCollideCount++;
    });

    const defaultRestitution = 0.3; //bounciness 

    let sphereRestitution;
    if (options.type === 'drum') {
        sphereRestitution = 0.5; //prev: 0.9, 0.1 = one bounce
    } else {
        sphereRestitution = 0.1;
    }

    if (globalCameraPositionBehind === true) {
        // body.quaternion.x = 11; //sideways spin
        // body.quaternion.y = 11;
        // body.quaternion.z = 0.5;
        // console.log(body); //TODO: rotate adjust HERE!!!
    }

    // //TODO: can this be removed and moved to initPhysics()???
    // //http://schteppe.github.io/cannon.js/docs/classes/ContactMaterial.html
    // const materialGround = new CANNON.ContactMaterial(this.groundMaterial, material, { friction: 0.0, restitution: (sphere) ? sphereRestitution : defaultRestitution });
    // // console.log({materialGround});

    // world.addContactMaterial(materialGround);
    // console.log('addBody() -> world.contactmaterials: ', world.contactmaterials);
    // initContactMaterial((sphere) ? sphereRestitution : defaultRestitution); //changes ground color but breaks performance
}

function initPhysics() {
    this.fixedTimeStep = 1.0 / 60.0;
    this.damping = 0.01;

    world.broadphase = new CANNON.NaiveBroadphase();
    world.gravity.set(0, -10, 0);
    this.debugRenderer = new THREE.CannonDebugRenderer(scene, world);

    const groundShape = new CANNON.Plane();
    const groundMaterial = new CANNON.Material(); //http://schteppe.github.io/cannon.js/docs/classes/Material.html
    const groundBody = new CANNON.Body({ mass: 0, material: groundMaterial });
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    groundBody.addShape(groundShape);
    world.add(groundBody);

    // if (this.useVisuals) this.helper.addVisual(groundBody, 'ground', false, true);
    addVisual(groundBody, 'ground', false, true);

    this.shapes = {};
    this.shapes.sphere = new CANNON.Sphere(0.5);
    this.shapes.box = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));

    this.groundMaterial = groundMaterial;

    // this.animate();

    //TODO: use initContactMaterial here and remove from addBody()
    // initContactMaterial(0.8); //no effect
    // initContactMaterial(0.1); //no effect

    initContactMaterial(0.3); //PREV

}

function initContactMaterial(restitutionValue = 0.3) {
    //TODO: add colored ground on contact here
    //http://schteppe.github.io/cannon.js/docs/classes/ContactMaterial.html
    const groundShape = new CANNON.Plane();
    const tempMaterial = new CANNON.Material(); //http://schteppe.github.io/cannon.js/docs/classes/Material.html
    const groundBody = new CANNON.Body({ mass: 0, material: tempMaterial });
    // console.log({groundBody});
    // groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);

    //TODO: rotate ground so balls roll and fall off behind, global var for y rotation so lines also rotate up
    // groundBody.quaternion.y -= 0.015;
    // groundBody.quaternion.y = -0.1;

    // var rot = new CANNON.Vec3(1, 0, 0);
    // var rot = new CANNON.Vec3(0, 0, 1); //sideways
    // groundBody.quaternion.setFromAxisAngle(rot, Math.PI / 2);

    // groundBody.quaternion.z = -0.5; //weird
    // groundBody.rotation.z = -0.1; //err
    // groundBody.initPosition.y = -10000; //no effect

    // groundBody.position.y = -10; //no effect

    // groundBody.position.y = -9000000000000000000; //no effect
    // groundBody.position.x = -9000000000000000000; //no effect

    // groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0.1), -Math.PI / 2); //0.1 z - moves start to later
    // groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2 + 0.5); //woah
    // console.log({ groundBody });

    groundBody.addShape(groundShape);
    world.add(groundBody);

    // if (this.useVisuals) this.helper.addVisual(groundBody, 'ground', false, true);
    addVisual(groundBody, 'ground', false, true);

    this.shapes = {};
    this.shapes.sphere = new CANNON.Sphere(0.5);
    this.shapes.box = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));


    const material = new CANNON.Material();
    // console.log({material});

    // material.color.r = 0;
    // material.color.g = 0;
    // material.color.b = 0.3;

    const body = new CANNON.Body({ mass: 5, material: material });

    // console.log(this.groundMaterial);

    // const materialGround = new CANNON.ContactMaterial(this.groundMaterial, material, { friction: 0.0, restitution: restitutionValue}); //*** UNCOMMENT TO FIX PERFORMANCE ISSUES WITH TOO MANY groundBody's
    const materialGround = new CANNON.ContactMaterial(tempMaterial, material, { friction: 0.0, restitution: restitutionValue });
    // console.log({ materialGround });
    world.addContactMaterial(materialGround);
    // console.log('addBody() -> world.contactmaterials: ', world.contactmaterials);
}

//-----CANNON HELPERS------//
// function addLights(renderer) {
//     renderer.shadowMap.enabled = true;
//     renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

//     // LIGHTS
//     const ambient = new THREE.AmbientLight(0x888888);
//     scene.add(ambient);

//     const light = new THREE.DirectionalLight(0xdddddd);
//     light.position.set(3, 10, 4);
//     light.target.position.set(0, 0, 0);
//     light.castShadow = true;

//     const lightSize = 10;
//     light.shadow.camera.near = 1;
//     light.shadow.camera.far = 50;
//     light.shadow.camera.left = light.shadow.camera.bottom = -lightSize;
//     light.shadow.camera.right = light.shadow.camera.top = lightSize;

//     light.shadow.mapSize.width = 1024;
//     light.shadow.mapSize.height = 1024;

//     this.sun = light;
//     scene.add(light);

//     // const fogColor = new THREE.Color(0xffffff);
//     const fogColor = new THREE.Color(0xE5E5E5); 
//     // const fogColor  = new THREE.Color("rgb(255, 0, 0)");
//     scene.background = fogColor;

//     // scene.fog = new THREE.Fog(fogColor, 0.0025, 20);
//     // scene.fog = new THREE.Fog(fogColor, 0.0025, 200);

//     // scene.fog = new THREE.FogExp2( 0xefd1b5, 0.0025 );
//     // scene.fog = new THREE.FogExp2( 0xE5E5E5, 0.0025 );
//     // scene.fog = new THREE.FogExp2( 0xFFFFFF, 0.002 ); // decimal = densitry

//     // scene.fog = new THREE.FogExp2( 0xFFFFFF, 0.002 ); // FINAL
// }

function createCannonTrimesh(geometry) {
    if (!geometry.isBufferGeometry) return null;

    const posAttr = geometry.attributes.position;
    const vertices = geometry.attributes.position.array;
    let indices = [];
    for (let i = 0; i < posAttr.count; i++) {
        indices.push(i);
    }

    return new CANNON.Trimesh(vertices, indices);
}

function createCannonConvex(geometry) {
    if (!geometry.isBufferGeometry) return null;

    const posAttr = geometry.attributes.position;
    const floats = geometry.attributes.position.array;
    const vertices = [];
    const faces = [];
    let face = [];
    let index = 0;
    for (let i = 0; i < posAttr.count; i += 3) {
        vertices.push(new CANNON.Vec3(floats[i], floats[i + 1], floats[i + 2]));
        face.push(index++);
        if (face.length == 3) {
            faces.push(face);
            face = [];
        }
    }

    return new CANNON.ConvexPolyhedron(vertices, faces);
}

function addVisual(body, name, castShadow = true, receiveShadow = true, options = 'Z') {
    body.name = name;
    if (this.currentMaterial === undefined) this.currentMaterial = new THREE.MeshLambertMaterial({ color: 0x888888 });
    if (this.settings === undefined) {
        this.settings = {
            stepFrequency: 60,
            quatNormalizeSkip: 2,
            quatNormalizeFast: true,
            gx: 0,
            gy: 0,
            gz: 0,
            iterations: 3,
            tolerance: 0.0001,
            k: 1e6,
            d: 3,
            scene: 0,
            paused: false,
            rendermode: "solid",
            constraints: false,
            contacts: false, // Contact points
            cm2contact: false, // center of mass to contact points
            normals: false, // contact normals
            axes: false, // "local" frame axes
            particleSize: 0.1,
            shadows: false,
            aabbs: false,
            profiling: false,
            maxSubSteps: 3
        };

        this.particleGeo = new THREE.SphereGeometry(1, 16, 8);
        this.particleMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
    }
    // What geometry should be used?
    let mesh;
    if (body instanceof CANNON.Body) {
        mesh = this.shape2Mesh(body, castShadow, receiveShadow, options);
        // console.log(mesh);
        mesh.userData.type = 'physics';
    }

    if (mesh) {
        // Add body
        body.threemesh = mesh;
        mesh.castShadow = castShadow;
        mesh.receiveShadow = receiveShadow;

        // console.log({mesh});
        // mesh.rotation.x = 4.0; //no effect
        // mesh.rotation.y = -2.0; //no effect
        // mesh.rotation.z = 2.0; //no effect
        scene.add(mesh);
    }
}

function shape2Mesh(body, castShadow, receiveShadow, options) {
    const obj = new THREE.Object3D();
    const material = this.currentMaterial;
    const game = this;
    let index = 0;

    body.shapes.forEach(function(shape) {
        let mesh;
        let geometry;
        let v0, v1, v2;

        switch (shape.type) {

            case CANNON.Shape.types.SPHERE:
                const fillStyleMapping = options.color;

                // console.log('shape2Mesh -> options: ', options);

                let stripedVariation = false; //TODO: cleanup, use ternary operator 
                if (options.variation === 'striped') {
                    stripedVariation = true;
                }
                const poolTexture = THREEx.createPoolBall.ballTexture(options.ballDesc, stripedVariation, fillStyleMapping, 512);

                const poolBallMaterial = new THREE.MeshLambertMaterial({ color: 0x888888 });
                poolBallMaterial.map = poolTexture;
                const sphereGeo = new THREE.SphereGeometry(shape.radius, 8, 8);
                sphereGeo.name = 'sphereGeo'; //*** important for rotation when globalCameraPositionBehind true

                mesh = new THREE.Mesh(sphereGeo, poolBallMaterial); //prev: material
                break;

            case CANNON.Shape.types.PARTICLE:
                mesh = new THREE.Mesh(game.particleGeo, game.particleMaterial);
                const s = this.settings;
                mesh.scale.set(s.particleSize, s.particleSize, s.particleSize);
                break;

            case CANNON.Shape.types.PLANE:
                // geometry = new THREE.PlaneGeometry(10, 10, 4, 4); // too short
                geometry = new THREE.PlaneGeometry(20, 10, 4, 4);
                mesh = new THREE.Object3D();

                mesh.name = 'groundPlane';
                // geometry.colorsNeedUpdate = true; //no effect
                // console.log({mesh});

                const submesh = new THREE.Object3D();

                // console.log({material});
                // material.color = '0xffff00'; //err

                //TODO: set color here or in initContactMaterial?
                // material.color.r = 0;
                // material.color.g = 0;
                // material.color.b = 0.3;

                // const randColor = (Math.random()*0xFFFFFF<<0).toString(16);
                // const tempColor = parseInt('0x' + randColor); //or options.color
                const tempColor = globalActiveInstrColor;

                const defaultColor = new THREE.Color(tempColor);
                material.color = defaultColor;

                const ground = new THREE.Mesh(geometry, material);
                ground.scale.set(100, 100, 100);
                ground.name = 'groundMesh';

                //TODO: use correctly - https://threejs.org/docs/#manual/en/introduction/How-to-update-things
                // ground.colorsNeedUpdate = true;

                submesh.add(ground);
                // console.log({ground});

                // console.log({ground});
                // console.log({submesh});
                mesh.add(submesh);
                break;

            case CANNON.Shape.types.BOX:
                const box_geometry = new THREE.BoxGeometry(shape.halfExtents.x * 2,
                    shape.halfExtents.y * 2,
                    shape.halfExtents.z * 2);
                mesh = new THREE.Mesh(box_geometry, material);
                break;

            case CANNON.Shape.types.CONVEXPOLYHEDRON:
                const geo = new THREE.Geometry();

                // Add vertices
                shape.vertices.forEach(function(v) {
                    geo.vertices.push(new THREE.Vector3(v.x, v.y, v.z));
                });

                shape.faces.forEach(function(face) {
                    // add triangles
                    const a = face[0];
                    for (let j = 1; j < face.length - 1; j++) {
                        const b = face[j];
                        const c = face[j + 1];
                        geo.faces.push(new THREE.Face3(a, b, c));
                    }
                });
                geo.computeBoundingSphere();
                geo.computeFaceNormals();
                mesh = new THREE.Mesh(geo, material);
                break;

            case CANNON.Shape.types.HEIGHTFIELD:
                geometry = new THREE.Geometry();

                v0 = new CANNON.Vec3();
                v1 = new CANNON.Vec3();
                v2 = new CANNON.Vec3();
                for (let xi = 0; xi < shape.data.length - 1; xi++) {
                    for (let yi = 0; yi < shape.data[xi].length - 1; yi++) {
                        for (let k = 0; k < 2; k++) {
                            shape.getConvexTrianglePillar(xi, yi, k === 0);
                            v0.copy(shape.pillarConvex.vertices[0]);
                            v1.copy(shape.pillarConvex.vertices[1]);
                            v2.copy(shape.pillarConvex.vertices[2]);
                            v0.vadd(shape.pillarOffset, v0);
                            v1.vadd(shape.pillarOffset, v1);
                            v2.vadd(shape.pillarOffset, v2);
                            geometry.vertices.push(
                                new THREE.Vector3(v0.x, v0.y, v0.z),
                                new THREE.Vector3(v1.x, v1.y, v1.z),
                                new THREE.Vector3(v2.x, v2.y, v2.z)
                            );
                            var i = geometry.vertices.length - 3;
                            geometry.faces.push(new THREE.Face3(i, i + 1, i + 2));
                        }
                    }
                }
                geometry.computeBoundingSphere();
                geometry.computeFaceNormals();
                mesh = new THREE.Mesh(geometry, material);
                break;

            case CANNON.Shape.types.TRIMESH:
                geometry = new THREE.Geometry();

                v0 = new CANNON.Vec3();
                v1 = new CANNON.Vec3();
                v2 = new CANNON.Vec3();
                for (let i = 0; i < shape.indices.length / 3; i++) {
                    shape.getTriangleVertices(i, v0, v1, v2);
                    geometry.vertices.push(
                        new THREE.Vector3(v0.x, v0.y, v0.z),
                        new THREE.Vector3(v1.x, v1.y, v1.z),
                        new THREE.Vector3(v2.x, v2.y, v2.z)
                    );
                    var j = geometry.vertices.length - 3;
                    geometry.faces.push(new THREE.Face3(j, j + 1, j + 2));
                }
                geometry.computeBoundingSphere();
                geometry.computeFaceNormals();
                mesh = new THREE.Mesh(geometry, MutationRecordaterial);
                break;

            default:
                throw "Visual type not recognized: " + shape.type;
        }

        mesh.receiveShadow = receiveShadow;
        mesh.castShadow = castShadow;

        mesh.traverse(function(child) {
            if (child.isMesh) {
                child.castShadow = castShadow;
                child.receiveShadow = receiveShadow;
            }
        });

        var o = body.shapeOffsets[index];
        var q = body.shapeOrientations[index++];
        mesh.position.set(o.x, o.y, o.z);

        mesh.quaternion.set(q.x, q.y, q.z, q.w);

        if (mesh.geometry) {
            if (mesh.geometry.name === 'sphereGeo' && globalCameraPositionBehind) {
                // console.log('sphereGeo debug rotation: ', mesh.rotation);
                mesh.rotation.set(0, -1.5, 0); //x: more faces downwards, y: correct - around center, z
            }
        }

        obj.add(mesh);
        obj.name = 'physicsParent';
        // console.log({obj}); //name = groundPlane is child of Object3D type
    });

    return obj;
}

function updateBodies(world) {

    if (globalConfigColorAnimate === true) {
        //TODO: cleanup nested forEach's
        scene.children.forEach((child) => {
            if (child.name && child.name === 'physicsParent') {
                child.children.forEach((child) => {
                    if (child.name && child.name === 'groundPlane') {
                        child.children.forEach((child) => {
                            child.children.forEach((child) => {
                                if (child.name && child.name === 'groundMesh') {
                                    if (globalGroundMeshIncrementer % 10 === 0) {
                                        const tempColor = globalActiveInstrColor.substr(0, 1) === '#' ? globalActiveInstrColor.slice(1, globalActiveInstrColor.length) : 0x191CAC;
                                        const intColor = parseInt('0x' + tempColor, 16);
                                        if (lastColor !== globalActiveInstrColor) {
                                            child.material.color = new THREE.Color(intColor);
                                        }
                                        lastColor = globalActiveInstrColor;
                                    }
                                    globalGroundMeshIncrementer++;
                                }
                            });
                        });
                    }
                });
            }
        });
    }

    world.bodies.forEach(function(body) {
        if (body.threemesh != undefined) {
            body.threemesh.position.copy(body.position);
            body.threemesh.quaternion.copy(body.quaternion);
        }
    });
}