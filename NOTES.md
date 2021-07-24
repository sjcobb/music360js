# WebXR Depth API NOTES 

- https://www.chromestatus.com/feature/5742647199137792#:~:text=Feature%3A%20WebXR%20Depth%20API,environment%20in%20Augmented%20Reality%20scenarios.
- https://github.com/immersive-web/depth-sensing/blob/main/explainer.md
- https://github.com/w3ctag/design-reviews/issues/550
- https://medium.com/@brijesh.intouch/chess-game-using-webxr-device-api-201f8c06ba2c
- https://woll-an.medium.com/augmented-reality-measure-with-webxr-and-three-js-a0c8355eb91a

## Overview
...

### Lighting
https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API/Lighting

const depthInfo = xrWebGLBinding.getDepthInformation(view);
let depthValueInMeters = depthInfo.getDepthInMeters(x, y);
  // Where x, y - image coordinates of point a.

### Math Links

- https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Matrix_math_for_the_web

## Three.js

- https://threejs.org/docs/#api/en/renderers/webxr/WebXRManager
  - WebXR Device API
  - https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API
- https://threejs.org/docs/#api/en/materials/MeshDepthMaterial
  - Depth is based off of the camera near and far plane. White is nearest, black is farthest.
- https://github.com/Brijesh1005/webxr-chess-game/blob/master/chess/app.js#L747
  - https://medium.com/@brijesh.intouch/chess-game-using-webxr-device-api-201f8c06ba2c
  - board.position.setFromMatrixPosition(hitMatrix);
  - this.scene.add(new THREE.AxesHelper( 10 ));
  - this.raycaster.setFromCamera({ x: 0, y: 0 }, this.camera); // for click event
  - const hits = await this.session.requestHitTest(origin, direction, frameOfRef);
- smooth animations -> see Tween.js


## Play Canvas

https://github.com/playcanvas/engine/pull/2561
CPU Path: https://playcanvas.com/project/732030/overview/ar-depth-sensing
GPU Path: https://playcanvas.com/project/738358/overview/ar-depth-sensing-texture
Depth Occlusion: https://playcanvas.com/project/738703/overview/ar-depth-sensing-occlusion

https://playcanvas.com/editor/code/738703?tabs=38289857

### Example: Add object at camera point location
if (depthSensing.available)
    var depth = depthSensing.getDepth(depthSensing.width / 2, depthSensing.height / 2);
    this.vec3A.add(this.camera.getPosition());
    var ent = this.template.resource.instantiate();
    this.app.root.addChild(ent);     
    ent.setPosition(this.vec3A); // position it to pointer position

### Example: Hand Tracking
https://forum.playcanvas.com/t/webxr-hand-tracking/14131

## ARCore (Android / Java)

- https://developers.google.com/ar/develop/java/depth/overview
- https://developers.google.com/ar/reference/c/group/ar-frame#arframe_acquiredepthimage
- acquireDepthImage()
  - https://developers.google.com/ar/reference/java/com/google/ar/core/Frame#acquireDepthImage()
- public PointCloud acquirePointCloud ()


## Future

- build extensible Lambda functions that will allow for depth detection, object placement, machine learning model interaction in more obscure devices like LED fans, MIDI controllers, RED cameras
- sound generation from visuals--what would x object sound like when dropped in AR environment
  - generate random visuals like roster wearing superhero costume and then generate what it would sound like flying through scene
- https://matterport.com/how-it-works
- "painting with light" 
- ...
- https://github.com/google/model-viewer
  - https://modelviewer.dev/
- https://discourse.threejs.org/t/how-to-add-a-ui-to-immersive-xr-ar-view/16532
  - https://immersive-web.github.io/dom-overlays/
- https://github.com/felixmariotto/three-mesh-ui
- https://klausw.github.io/three.js/examples/webvr_lorenzattractor.html
- https://threejs.org/examples/#webxr_ar_paint
- http://10.0.0.7:8887/hit/
- http://10.0.0.7:8887/paint/
- https://codepen.io/sjcobb/pen/WNovVwy - WebAR Three.js Hit Example

- https://www.producthunt.com/posts/removal-ai-1 
- https://runwayml.com/green-screen/

- https://www.aircards.co/
- https://www.rochester.edu/newscenter/researchers-use-lasers-display-true-3-d-objects/
  - Cesium vapor laser projection
    - similar to: cathode-ray tube television
  - true hologram would be lightning aka plasma field by ionizing the air locally
  - 
- Ray Modeler 360-degree colour display: https://www.youtube.com/watch?v=yWigiSv16BA
- volumetric image
- https://www.nature.com/articles/ncomms15354
- https://www.theguardian.com/technology/2018/may/22/star-wars-holograms-3d-images-future-holochess-princess-leia
- https://wp.optics.arizona.edu/pablanche/research-interest/3d-display/
- http://www.lightking-led.com/
- https://xrapp.store/category/music-rhythm

### Holograms

#### LED Fan

- https://hypervsn.com/
- https://github.com/jnweiger/led-hologram-propeller
- https://www.amazon.com/GIWOX-Hologram-Projector-Hi-Resolution-Holographic/dp/B07FSJWVGT
- https://www.youtube.com/watch?v=VVt-eN90mx4
- instructables.com/Programmable-LED-Fan-A-Light-Breeze/

- https://learn.adafruit.com/adafruit-dotstar-leds/overview
- https://www.adafruit.com/category/168 
- 

- light field display: https://www.youtube.com/watch?v=pI__qNx8Gdk
  - https://en.wikipedia.org/wiki/Light_field#Light_field_displays

- https://www.xrdinosaurs.com/
- capture images / camera recording while in immersive mode
    - https://github.com/immersive-web/webxr/issues/694
    - https://github.com/immersive-web/proposals/issues/36
    - USE: https://github.com/immersive-web/webxr/issues/1106#issuecomment-665803767
        adb shell screenrecord /sdcard/screenrecord.mp4
        adb pull /sdcard/screenrecord.mp4
    
    - https://immersive-web.github.io/webxr-samples/spectator-mode.html
    - https://github.com/immersive-web/webxr/issues/1106#issue-667861398
    
- https://www.reddit.com/r/threejs/comments/lmmb49/webar_any_advantage_on_using_8th_wall_instead_of/gnwau65/
    - 8th wall vs ar.js vs Zappar vs <model-viewer> by Google

## TODO

- TODO: need https for local development
    - https://stackoverflow.com/questions/4779963/how-can-i-access-my-localhost-from-my-android-device
    - https://developers.google.com/web/tools/chrome-devtools/remote-debugging/local-server
    - https://github.com/immersive-web/webxr/issues/60#issuecomment-570271488
    - https://stackoverflow.com/a/46554860/7639084

    - USED: https://matthewhoelter.com/2019/10/21/how-to-setup-https-on-your-local-development-environment-localhost-in-minutes.html

USMORSCOBB2MB:webxr-depth-detector scobb$ http-server -S -C localhost+3.pem -K localhost+3-key.pem
Starting up http-server, serving ./ through https


https://10.0.0.7:8080/hit/

https://10.0.0.7:8080/music/

https://10.0.0.7:8080/


[~/Documents/Data/webxr-depth-detector]$ http-server -S -C localhost+3.pem -K localhost+3-key.pem
Starting up http-server, serving ./ through https
Available on:
  https://127.0.0.1:8080
  https://10.0.0.7:8080

[~/Documents/Data/music360js]$ http-server -S -C localhost+3.pem -K localhost+3-key.pem
Starting up http-server, serving ./ through https
Available on:
  https://127.0.0.1:8080
  https://10.0.0.7:8080

https://github.com/boehm-e/webxr_threejs_AR.git
webxr-threejs-midi-visualizer
Augmented reality (AR) MIDI data visualization using Three.js
