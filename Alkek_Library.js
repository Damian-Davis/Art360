//CORS developer mode
//windows:
//"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp
//OSX
//open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security
function AlkekTeleport(
  whatGroupToTeleport,
  toX,
  toY,
  toZ,
  rotX,
  rotY,
  rotZ,
  timeToTeleport
) {
  scene.executeWhenReady(function () {
    var myMesh = scene.getMeshByName(whatGroupToTeleport);

    var currentRadius = camera.radius;
    var QMoveCamera = true;
    var sum = new BABYLON.Vector3(0, 0, 0);
    for (i = 0; i < scene.meshes.length; i++) {
      if (scene.meshes[i].name.includes(whatGroupToTeleport)) {
        sum = sum.add(scene.meshes[i].position);
      }
    }
    var avg = new BABYLON.Vector3(0, 0, 0);
    avg.x = sum.x / scene.meshes.length;
    avg.y = sum.y / scene.meshes.length;
    avg.z = sum.z / scene.meshes.length;
    console.log(avg);
    var myGroupMesh = [];
    for (i = 0; i < scene.meshes.length; i++) {
      if (scene.meshes[i].name.includes(whatGroupToTeleport)) {
        scene.meshes[i].visibility = 0;
        myGroupMesh.push(i);
        scene.meshes[i].position.x += toX - avg.x;
        scene.meshes[i].position.y += toY - avg.y;
        scene.meshes[i].position.z += toZ - avg.z;
      }
    }
    //console.log(myGroupMesh)
    var cTime = Date.now();
    var elapasedTime = 0;
    scene.registerBeforeRender(function () {
      if (elapasedTime <= timeToTeleport) {
        elapasedTime = (Date.now() - cTime) / 1000;
        for (i = 0; i < myGroupMesh.length; i++) {
          scene.meshes[myGroupMesh[i]].visibility =
            elapasedTime / timeToTeleport;
        }
      }
    });
  });
}

function Alkek_makeSpotLight(x,y,z,dirX,dirY,dirZ,fillAngle,giveUniqueName)
{
  var spotLight = new BABYLON.SpotLight(giveUniqueName,
        new BABYLON.Vector3(x,y,z),
        new BABYLON.Vector3(dirX, dirY, dirZ),fillAngle,1,scene);
}
function Alkek_makePuffer(
  myDiameter,
  x,
  y,
  z,
  rotx,
  roty,
  rotz,
  picFile,
  giveUniqueName
) {
  //Simply just make a sphere

  var mySphere = BABYLON.MeshBuilder.CreateSphere(
    giveUniqueName,
    { diameter: myDiameter },
    scene
  );
  mySphere.position = new BABYLON.Vector3(x, y, z);
  mySphere.rotation = new BABYLON.Vector3(rotx, roty, rotz);
  var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);

  myMaterial.diffuseTexture = new BABYLON.Texture(picFile, scene);

  mySphere.material = myMaterial;
}

function Alkek_showVideoOn(meshName) {
  //Screen Cast the Video onto a Mesh

  scene.getMeshByName(meshName).material.diffuseTexture = myVideoVidTex;
}
function Alkek_makeTV(
  videoFile,
  picFrame,
  tvHeight,
  x,
  y,
  z,
  rotx,
  roty,
  rotz,
  giveUniqueName
) {
  //Makes a Flat Screen TV, playing a "videoFile" on the TV Screen, with a "picFrame" as texture surrounding the TV

  myVideoVidTex = new BABYLON.VideoTexture("vidtex", videoFile, scene);
  myVideoVidTex.video.loop = true;
  var myPicMaterial = new BABYLON.StandardMaterial("myMaterial", scene);

  myPicMaterial.diffuseTexture = myVideoVidTex;
  myPicMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  myPicMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
  var myFrameMaterial = new BABYLON.StandardMaterial("myMaterial", scene);

  myFrameMaterial.diffuseTexture = new BABYLON.Texture(picFrame, scene);
  var frameWidth = (1920 / 1080.0) * tvHeight + 2;

  var box = BABYLON.MeshBuilder.CreateBox(
    giveUniqueName + "frame",
    { height: tvHeight, width: frameWidth, depth: 0.5 },
    scene
  );
  box.position = new BABYLON.Vector3(x, y, z);
  box.rotation = new BABYLON.Vector3(rotx, roty, rotz);
  box.material = myFrameMaterial;
  picHeight = tvHeight - 1;
  picWidth = (picHeight * 1920) / 1080.0;
  var box2 = BABYLON.MeshBuilder.CreateBox(
    giveUniqueName + "picture",
    { height: picHeight, width: picWidth, depth: 0.5 * 1.05 },
    scene
  );
  box2.position = new BABYLON.Vector3(x - 1.0, y, z);

  box2.rotation = new BABYLON.Vector3(rotx, roty, rotz);
  box2.material = myPicMaterial;

  var playbutton = BABYLON.MeshBuilder.CreateBox(
    "playButton",
    { height: 0.75, width: 0.75, depth: 0.5 * 1.15 },
    scene
  );
  playbutton.position = new BABYLON.Vector3(x + frameWidth / 2.0 - 1, y, z);

  playbutton.rotation = new BABYLON.Vector3(rotx, roty, rotz);
  var playMaterial = new BABYLON.StandardMaterial("myMaterial", scene);

  playMaterial.diffuseTexture = new BABYLON.Texture(
    "textures/images/icons/play.png",
    scene
  );
  playbutton.material = playMaterial;
}

function Alkek_framePicture(
  picFile,
  frameHeight,
  frameThickness,
  picFrame,
  x,
  y,
  z,
  rotx,
  roty,
  rotz,
  giveUniqueName
) {
  //shows a "picFile" inside a picture frame with texture "picFrame" with a height of frameHeight (width is computed to mainting ratio)
  //frame thickness
  var myPicMaterial = new BABYLON.StandardMaterial("myMaterial", scene);

  myPicMaterial.diffuseTexture = new BABYLON.Texture(picFile, scene);
  myPicMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  var myFrameMaterial = new BABYLON.StandardMaterial("myMaterial", scene);

  myFrameMaterial.diffuseTexture = new BABYLON.Texture(picFrame, scene);

  scene.executeWhenReady(function () {
    var sizearray = myPicMaterial.diffuseTexture.getSize();
    console.log(sizearray.height);
    var frameWidth = ((sizearray.width * 1.0) / sizearray.height) * frameHeight;
    var box = BABYLON.MeshBuilder.CreateBox(
      giveUniqueName + "frame",
      { height: frameHeight, width: frameWidth, depth: frameThickness },
      scene
    );
    box.position = new BABYLON.Vector3(x, y, z);
    box.rotation = new BABYLON.Vector3(rotx, roty, rotz);
    box.material = myFrameMaterial;

    var picWidth = frameWidth - 2 * frameThickness;
    var picHeight = frameHeight - 2 * frameThickness;
    var box2 = BABYLON.MeshBuilder.CreateBox(
      giveUniqueName + "picture",
      { height: picHeight, width: picWidth, depth: frameThickness * 1.05 },
      scene
    );
    box2.position = new BABYLON.Vector3(x, y, z);
    box2.rotation = new BABYLON.Vector3(rotx, roty, rotz);
    box2.material = myPicMaterial;
  });
}

function Alkek_makeBox(
  myWidth,
  myHeight,
  myDepth,
  x,
  y,
  z,
  rotx,
  roty,
  rotz,
  picFile,
  giveUniqueName
) {
  //Simply makes a box with texture "picFile"
  var box = BABYLON.MeshBuilder.CreateBox(
    giveUniqueName,
    { height: myHeight, width: myWidth, depth: myDepth },
    scene
  );
  box.position = new BABYLON.Vector3(x, y, z);
  box.rotation = new BABYLON.Vector3(rotx, roty, rotz);
  var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);

  myMaterial.diffuseTexture = new BABYLON.Texture(picFile, scene);

  box.material = myMaterial;
}

function Alkek_handleClick(timeToMoveTo, howCloseToObject, videoToPlay) {
  scene.onPointerObservable.add(function (evt) {
    if (evt.type == BABYLON.PointerEventTypes.POINTERDOWN) {
      if (evt.pickInfo.pickedMesh != null) {
        var myMesh = evt.pickInfo.pickedMesh;

        if (myMesh.name.includes("playButton")) {
          if (!QVideo) {
            myVideoVidTex.video.play();
            scene.getMeshByName(
              "playButton"
            ).material.diffuseTexture = new BABYLON.Texture(
              "textures/images/icons/pause.png",
              scene
            );
          } else {
            myVideoVidTex.video.pause();
            scene.getMeshByName(
              "playButton"
            ).material.diffuseTexture = new BABYLON.Texture(
              "textures/images/icons/play.png",
              scene
            );
          }
          QVideo = !QVideo;
        }
      }
    }
    if (evt.type == BABYLON.PointerEventTypes.POINTERDOUBLETAP || PT == 0) {
      PT = 1;
      if (evt.pickInfo.pickedMesh != null) {
        var myMesh_child = evt.pickInfo.pickedMesh;
        var myMesh = myMesh_child;
        if (myMesh_child.parent != null) {
          myMesh = myMesh_child.parent;
        }
        var meshName = myMesh.name;
        console.log(meshName);
        if (
          myMesh.name.includes("skyBox") == false &&
          myMesh.name.includes("void") === false
        ) {
          Alkek_focusMeshByOpacity(meshName, ghostOpacity);
          Alkek_panCamera(
            myMesh.position.x,
            myMesh.position.y,
            myMesh.position.z,
            1.0
          );
          var cTime = Date.now();
          var elapasedTime = 0;
          var toDistanceAwayFromObject = 0;
          var QMoveCamera = true;
          var fix = myMesh
            .getBoundingInfo()
            .boundingBox.maximum.subtract(
              myMesh.getBoundingInfo().boundingBox.minimum
            );
          var mag = Math.sqrt(fix.x * fix.x + fix.y * fix.y + fix.z * fix.z);
          console.log(myMesh.getBoundingInfo().boundingBox);
          toDistanceAwayFromObject = mag / 2 + howCloseToObject;
          // console.log(((myMesh.getBoundingInfo().boundingBox.maximum).subtract(myMesh.getBoundingInfo().boundingBox.minimum)));
          scene.registerBeforeRender(function () {
            if (QMoveCamera) {
              elapasedTime = (Date.now() - cTime) / 1000.0;

              if (elapasedTime > 1.0) {
                var dt = (elapasedTime - 1.0) / (timeToMoveTo - 1.0);
                camera.radius =
                  currentRadius +
                  (toDistanceAwayFromObject - currentRadius) * dt;
                if (dt >= 1.0) {
                  QMoveCamera = false;
                  Alkek_focusAll();
                  //reached the object at the given distance
                  /*
                  var portablePlayButton= scene.getMeshByName("portablePlayButton");
                  portablePlayButton.setEnabled(true);
                  var pointToCamera=camera.position.subtract(myMesh.position);
                  var magPoint=Math.sqrt(pointToCamera.x*pointToCamera.x+pointToCamera.y*pointToCamera.y+pointToCamera.z*pointToCamera.z);
                  portablePlayButton.position=new BABYLON.Vector3(myMesh.position.x+(mag/2.0+0.5)*pointToCamera.x/magPoint,
                  myMesh.position.y+(mag/2.0+0.5)*pointToCamera.y/magPoint,
                  myMesh.position.z+(mag/2.0+0.5)*pointToCamera.z/magPoint);
                  portablePlayButton.lookAt(camera.position);
                  var cctime=Date.now();
                  
                  scene.registerBeforeRender(function(){
                    var GLOBALTIME=Date.now()-cctime;
                    var cos=(Math.cos(GLOBALTIME/1000)+1.0);

                    portablePlayButton.visibility=Math.min(cos*cos*cos+0.1,1);
                  });
                  */
                }
              }
            }
          });
        }
      }
    }
  });
}
function Alkek_doubleClickFocus(meshName, radiusToMesh, moveDuration) {
  var myMesh = scene.getMeshByName(meshName);
  scene.onPointerObservable.add(function (evt) {
    if (evt.type == BABYLON.PointerEventTypes.POINTERDOWN) {
      if (evt.pickInfo.pickedMesh != null) {
        if (evt.pickInfo.pickedMesh.name.includes(myMesh.name)) {
          Alkek_focusMeshByOpacity(meshName, 0.1);
          Alkek_panCamera(
            myMesh.position.x,
            myMesh.position.y,
            myMesh.position.z,
            1.0
          );
          var cTime = Date.now();
          var elapasedTime = 0;
          var currentRadius = camera.radius;
          var QMoveCamera = true;
          scene.registerBeforeRender(function () {
            if (QMoveCamera) {
              elapasedTime = (Date.now() - cTime) / 1000.0;

              if (elapasedTime > 1.0) {
                var dt = (elapasedTime - 1.0) / (moveDuration - 1.0);
                camera.radius =
                  currentRadius + (radiusToMesh - currentRadius) * dt;
                if (dt >= 1.0) {
                  QMoveCamera = false;
                  Alkek_focusAll();
                }
              }
            }
          });
        }
      }
    }
  });
}

function Alkek_panCamera(panTargetx, panTargety, panTargetz, panDuration) {
  //Turns camera from current view to view centered at panTargetx,panTargety,panTargetz

  if (panDuration > 0) {
    var cTime = Date.now();
    var elapasedTime = 0;
    var currentTarget = camera.getTarget();

    scene.registerBeforeRender(function () {
      if (elapasedTime <= panDuration) {
        var dt = elapasedTime / panDuration;
        camera.target = new BABYLON.Vector3(
          currentTarget.x + (panTargetx - currentTarget.x) * dt,
          currentTarget.y + (panTargety - currentTarget.y) * dt,
          currentTarget.z + (panTargetz - currentTarget.z) * dt
        );
        currentRadius = camera.radius;
        elapasedTime = (Date.now() - cTime) / 1000.0;
      }
    });
  }
}
function Alkek_focusAll() {
  for (i = 0; i < scene.meshes.length; i++) {
    scene.meshes[i].visibility = 1.0;
  }
}
function Alkek_focusMeshByOpacity(meshName, opacity) {
  //*******************************************************************************************************
  //Forces all other meshes except meshName to be transparent with opacity. Note opacity=0 is completely
  //transparent. Opacity=1 is completely opaque.
  //*******************************************************************************************************

  for (i = 0; i < scene.meshes.length; i++) {
    if (scene.meshes[i].name.includes(meshName) == false) {
      if (scene.meshes[i].name.includes("skyBox") == false)
        scene.meshes[i].visibility = opacity;
    }
  }
}

function Alkek_loadGLTF(
  modelDirectory,
  modelFile,
  meshName,
  scaleFactor,
  x,
  y,
  z,
  rotx,
  roty,
  rotz
) {
  //Loads a GLTF Model or OBJ mesh stored in the modelDirectory with filename modelFile
  //all the meshes in the model with be called meshName+number
  //once the model is loaded QfinishedLoaded will become true and is accessible.

  BABYLON.SceneLoader.ImportMesh(
    "",
    modelDirectory,
    modelFile,
    scene,
    function (meshes) {
      scene.createDefaultEnvironment();
      for (i = 0; i < meshes.length; i++) {
        meshes[i].name = meshName + i;
        meshes[i].scaling = new BABYLON.Vector3(
          scaleFactor,
          scaleFactor,
          scaleFactor
        );

        meshes[i].position = new BABYLON.Vector3(
          meshes[i].position.x + x,
          meshes[i].position.y + y,
          meshes[i].position.z + z
        );
        meshes.rotation = new BABYLON.Vector3(rotx, roty, rotz);
      }
    }
  );
}

function Alkek_makeSkyBox(sizeSkyBox, fileSkyBox, x, y, z) {
  var skyMaterial = new BABYLON.StandardMaterial("skyboxmaterial", scene);
  skyMaterial.backFaceCulling = false;
  skyMaterial.reflectionTexture = new BABYLON.CubeTexture(fileSkyBox, scene);
  skyMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
  skyMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
  skyMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  skyMaterial.emissiveColor = new BABYLON.Color3(0, 0, 0);
  skybox = BABYLON.MeshBuilder.CreateBox(
    "skyBox",
    {
      size: sizeSkyBox,
    },
    scene
  );
  skybox.material = skyMaterial;
  skybox.position = new BABYLON.Vector3(x, y, z);
}
function Alkek_clickShakeMesh(
  meshToShake, //name of the mesh that will shake once touched
  shakeDuration, //how long to shake for in seconds
  shakeMagnitude //how much movement in meters
) {
  //*******************************************************************************************************
  //**********function shakes a mesh with the name stored in meshToShake
  //**********for shakeDuration seconds by the amount of shakeMagnitude meters.
  //*******************************************************************************************************

  var myMesh = scene.getMeshByName(meshToShake);
  scene.onPointerObservable.add(function (evt) {
    if (evt.type == BABYLON.PointerEventTypes.POINTERDOWN) {
      if (evt.pickInfo.pickedMesh != null) {
        if (evt.pickInfo.pickedMesh.name.includes(myMesh.name)) {
          var cTime = Date.now();
          var elapasedTime = 0;
          var currentMeshPosition = myMesh.position;
          var period = Math.floor(shakeDuration) + 1;
          scene.registerBeforeRender(function () {
            if (elapasedTime <= shakeDuration) {
              var dt = elapasedTime / shakeDuration;
              myMesh.position = new BABYLON.Vector3(
                currentMeshPosition.x +
                  shakeMagnitude * Math.sin(2 * 3.14159 * (dt - 1) * period),
                currentMeshPosition.y +
                  shakeMagnitude * Math.sin(6 * 3.14159 * (dt - 1) * period),
                currentMeshPosition.z +
                  shakeMagnitude * Math.sin(4 * 3.14159 * (dt - 1) * period)
              );
              elapasedTime = (Date.now() - cTime) / 1000.0;
            }
          });
        }
      }
    }
  });
}

function Alkek_moveCamera(
  xEnd, //x-cordinate of where the camera will be
  yEnd, //y-cordinate of where the camera will be
  zEnd, //z-cordinate of where the camera will be
  totalTime //the time in seconds of the camera movement
) {
  //*******************************************************************************************************
  //**********function moves the camera from it's current location to (xEnd,yEnd,zEnd) in a straight line
  //**********for totalTime seconds
  //*******************************************************************************************************

  if (totalTime > 0) {
    var cTime = Date.now();
    var elapasedTime = 0;
    var currentCameraPosition = camera.position;
    scene.registerBeforeRender(function () {
      if (elapasedTime <= totalTime) {
        var dt = elapasedTime / totalTime;
        camera.position = new BABYLON.Vector3(
          currentCameraPosition.x + (xEnd - currentCameraPosition.x) * dt,
          currentCameraPosition.y + (yEnd - currentCameraPosition.y) * dt,
          currentCameraPosition.z + (zEnd - currentCameraPosition.z) * dt
        );
        elapasedTime = (Date.now() - cTime) / 1000.0;
      }
    });
  }
}

function showWorldAxis(size, atx, aty, atz) {
  var makeTextPlane = function (text, color, size) {
    var dynamicTexture = new BABYLON.DynamicTexture(
      "DynamicTexture",
      50,
      scene,
      true
    );
    dynamicTexture.hasAlpha = true;
    dynamicTexture.drawText(
      text,
      5,
      40,
      "bold 36px Arial",
      color,
      "transparent",
      true
    );
    var plane = BABYLON.Mesh.CreatePlane("TextPlane", size, scene, true);
    plane.material = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
    plane.material.backFaceCulling = false;
    plane.material.specularColor = new BABYLON.Color3(0, 0, 0);
    plane.material.diffuseTexture = dynamicTexture;
    return plane;
  };
  var axisX = BABYLON.Mesh.CreateLines(
    "axisX",
    [
      new BABYLON.Vector3(atx, aty, atz),
      new BABYLON.Vector3(size + atx, aty, atz),
      new BABYLON.Vector3(size * 0.95 + atx, 0.05 * size + aty, 0 + atz),
      new BABYLON.Vector3(size + atx, aty, atz),
      new BABYLON.Vector3(size * 0.95 + atx, -0.05 * size + aty, atz),
    ],
    scene
  );
  axisX.color = new BABYLON.Color3(1, 0, 0);
  var xChar = makeTextPlane("X", "red", size / 10);
  xChar.position = new BABYLON.Vector3(
    0.9 * size + atx,
    -0.05 * size + aty,
    0 + atz
  );
  var axisY = BABYLON.Mesh.CreateLines(
    "axisY",
    [
      new BABYLON.Vector3(atx, aty, atz),
      new BABYLON.Vector3(atx, size + aty, atz),
      new BABYLON.Vector3(-0.05 * size + atx, size * 0.95 + aty, 0 + atz),
      new BABYLON.Vector3(atx, size + aty, atz),
      new BABYLON.Vector3(0.05 * size + atx, size * 0.95 + aty, atz),
    ],
    scene
  );
  axisY.color = new BABYLON.Color3(0, 1, 0);
  var yChar = makeTextPlane("Y", "green", size / 10);
  yChar.position = new BABYLON.Vector3(
    atx,
    0.9 * size + aty,
    -0.05 * size + atz
  );
  var axisZ = BABYLON.Mesh.CreateLines(
    "axisZ",
    [
      new BABYLON.Vector3(atx, aty, atz),
      new BABYLON.Vector3(atx, aty, size + atz),
      new BABYLON.Vector3(atx, -0.05 * size + aty, size * 0.95 + atz),
      new BABYLON.Vector3(atx, aty, size + atz),
      new BABYLON.Vector3(atx, 0.05 * size + aty, size * 0.95 + atz),
    ],
    scene
  );
  axisZ.color = new BABYLON.Color3(0, 0, 1);
  var zChar = makeTextPlane("Z", "blue", size / 10);
  zChar.position = new BABYLON.Vector3(
    atx,
    0.05 * size + aty,
    0.9 * size + atz
  );
}

function Alkek_loadARSculpture(
  sculptureDirectory,
  sculptureFile,
  scale,
  x,
  y,
  z,
  rotx,
  roty,
  rotz,
  givenName
) {
  BABYLON.SceneLoader.ImportMesh(
    "",
    sculptureDirectory,
    sculptureFile,
    scene,
    function (newMeshes, particleSystems, skeletons) {
      for (i = 0; i < newMeshes.length; i++) {
        newMeshes[i].name = givenName + "_" + i;

        newMeshes[i].material = shaderMaterial2;
        /*
      newMeshes[i].position=new BABYLON.Vector3(x,y,z);
          j=1;
      newMeshes[i].rotation=new BABYLON.Vector3(rotx+1*(j-1),roty+1.4*(j-1),rotz+(1.14)*(j-1));
      newMeshes[i].scaling = new BABYLON.Vector3(scale, scale, scale);
      let sphereMin = newMeshes[i].getBoundingInfo().boundingBox.minimum;
      let sphereMax = newMeshes[i].getBoundingInfo().boundingBox.maximum;
      console.log(sphereMax);
      */
        if (i != 0) newMeshes[i].parent = newMeshes[0];
      }
      newMeshes[0].rotation = new BABYLON.Vector3(rotx, roty, rotz);

      newMeshes[0].scaling = new BABYLON.Vector3(scale, scale, scale);
      newMeshes[0].position = new BABYLON.Vector3(x, y, z);

      console.log(newMeshes[1].position);
    }
  );
}

function Alkek_makeFunkyShaders(amigafile, myreflectedimage) {
  var cubistfactor = "0.1";
  var cubistscale = "80.";
  BABYLON.Effect.ShadersStore["customVertexShader"] =
    "precision highp float;\r\n" +
    "// Attributes\r\n" +
    "attribute vec3 position;\r\n" +
    "attribute vec3 normal;\r\n" +
    "attribute vec2 uv;\r\n" +
    "// Uniforms\r\n" +
    "uniform mat4 worldViewProjection;\r\n" +
    "// Varying\r\n" +
    "varying vec4 vPosition;\r\n" +
    "varying vec3 vNormal;\r\n" +
    "void main() {\r\n" +
    "    vec4 p = vec4( position, 1. );\r\n" +
    "    vPosition = p;\r\n" +
    "    vNormal = normal;\r\n" +
    "    gl_Position = worldViewProjection * p;\r\n" +
    "}\r\n";

  BABYLON.Effect.ShadersStore["customFragmentShader"] =
    "precision highp float;\r\n" +
    "uniform mat4 worldView;\r\n" +
    "varying vec4 vPosition;\r\n" +
    "varying vec3 vNormal;\r\n" +
    "uniform sampler2D textureSampler;\r\n" +
    "uniform sampler2D refSampler;\r\n" +
    "void main(void) {\r\n" +
    "    vec3 e = normalize( vec3( worldView * vPosition ) );\r\n" +
    "    vec3 n = normalize( worldView * vec4(vNormal, 0.0) ).xyz;\r\n" +
    "    vec3 r = reflect( e, n );\r\n" +
    "    float m = 2. * sqrt(\r\n" +
    "        pow( r.x, 2. ) +\r\n" +
    "        pow( r.y, 2. ) +\r\n" +
    "        pow( r.z + 1., 2. )\r\n" +
    "    );\r\n" +
    "    vec2 vN = r.xy / m + .5;\r\n" +
    "    vec3 base = texture2D( refSampler,\r\n" +
    "    vec2((sin(gl_FragCoord.y*" +
    cubistfactor / 10.0 +
    ")+sin(gl_FragCoord.x*" +
    cubistfactor / 10.0 +
    "))/" +
    cubistscale +
    "+(cos(gl_FragCoord.x*" +
    cubistfactor / 10.0 +
    ")+cos(gl_FragCoord.y*" +
    cubistfactor / 10.0 +
    "))/" +
    cubistscale +
    "+vN.x \r\n" +
    "    ,sin(gl_FragCoord.y*" +
    cubistfactor / 10.0 +
    "+gl_FragCoord.x*" +
    cubistfactor / 10.0 +
    ")/" +
    cubistscale +
    "+cos(gl_FragCoord.x*" +
    cubistfactor / 10.0 +
    "+gl_FragCoord.y*" +
    cubistfactor / 10.0 +
    ")/" +
    cubistscale +
    "+vN.y)).rgb;\r\n" +
    "    gl_FragColor = vec4( base, 1. );\r\n" +
    "}\r\n";
  shaderMaterial = new BABYLON.ShaderMaterial(
    "shader",
    scene,
    {
      vertex: "custom",
      fragment: "custom",
    },
    {
      attributes: ["position", "normal", "uv"],
      uniforms: [
        "world",
        "worldView",
        "worldViewProjection",
        "view",
        "projection",
      ],
    }
  );

  var refTexture = new BABYLON.Texture(myreflectedimage, scene);

  // refTexture = new BABYLON.Texture(skyboxfile + "_nx.jpg", scene);
  refTexture.wrapU = BABYLON.Texture.CLAMP_ADDRESSMODE;
  refTexture.wrapV = BABYLON.Texture.CLAMP_ADDRESSMODE;

  var mainTexture = new BABYLON.Texture(amigafile, scene);

  shaderMaterial.setTexture("textureSampler", mainTexture);
  shaderMaterial.setTexture("refSampler", refTexture);
  shaderMaterial.setFloat("time", 0);
  shaderMaterial.setVector3("cameraPosition", BABYLON.Vector3.Zero());
  shaderMaterial.backFaceCulling = false;

  BABYLON.Effect.ShadersStore["custom2VertexShader"] =
    "precision highp float;\r\n" +
    "// Attributes\r\n" +
    "attribute vec3 position;\r\n" +
    "attribute vec3 normal;\r\n" +
    "attribute vec2 uv;\r\n" +
    "// Uniforms\r\n" +
    "uniform mat4 worldViewProjection;\r\n" +
    "// Varying\r\n" +
    "varying vec4 vPosition;\r\n" +
    "varying vec3 vNormal;\r\n" +
    "void main() {\r\n" +
    "    vec4 p = vec4( position, 1. );\r\n" +
    "    vPosition = p;\r\n" +
    "    vNormal = normal;\r\n" +
    "    gl_Position = worldViewProjection * p;\r\n" +
    "}\r\n";

  BABYLON.Effect.ShadersStore["custom2FragmentShader"] =
    "precision highp float;\r\n" +
    "uniform mat4 worldView;\r\n" +
    "varying vec4 vPosition;\r\n" +
    "varying vec3 vNormal;\r\n" +
    "uniform sampler2D textureSampler;\r\n" +
    "uniform sampler2D refSampler;\r\n" +
    "void main(void) {\r\n" +
    "    vec3 e = normalize( vec3( worldView * vPosition ) );\r\n" +
    "    vec3 n = normalize( worldView * vec4(vNormal, 0.0) ).xyz;\r\n" +
    "    vec3 r = reflect( e, n );\r\n" +
    "    float m = 2. * sqrt(\r\n" +
    "        pow( r.x, 2. ) +\r\n" +
    "        pow( r.y, 2. ) +\r\n" +
    "        pow( r.z + 1., 2. )\r\n" +
    "    );\r\n" +
    "    vec2 vN = r.xy / m + .5;\r\n" +
    "    vec3 base = texture2D( refSampler,\r\n" +
    "    vec2((sin(gl_FragCoord.y*" +
    cubistfactor +
    ")+sin(gl_FragCoord.x*" +
    cubistfactor +
    "))/" +
    cubistscale +
    "+(cos(gl_FragCoord.x*" +
    cubistfactor +
    ")+cos(gl_FragCoord.y*" +
    cubistfactor +
    "))/" +
    cubistscale +
    "+vN.x \r\n" +
    "    ,sin(gl_FragCoord.y*" +
    cubistfactor +
    "+gl_FragCoord.x*" +
    cubistfactor +
    ")/" +
    cubistscale +
    "+cos(gl_FragCoord.x*" +
    cubistfactor +
    "+gl_FragCoord.y*" +
    cubistfactor +
    ")/" +
    cubistscale +
    "+vN.y)).rgb;\r\n" +
    "    gl_FragColor = vec4( base, 1. );\r\n" +
    "}\r\n";
  shaderMaterial2 = new BABYLON.ShaderMaterial(
    "shader",
    scene,
    {
      vertex: "custom2",
      fragment: "custom2",
    },
    {
      attributes: ["position", "normal", "uv"],
      uniforms: [
        "world",
        "worldView",
        "worldViewProjection",
        "view",
        "projection",
      ],
    }
  );

  var refTexture = new BABYLON.Texture(myreflectedimage, scene);

  // refTexture = new BABYLON.Texture(skyboxfile + "_nx.jpg", scene);
  refTexture.wrapU = BABYLON.Texture.CLAMP_ADDRESSMODE;
  refTexture.wrapV = BABYLON.Texture.CLAMP_ADDRESSMODE;

  var mainTexture = new BABYLON.Texture(amigafile, scene);

  shaderMaterial2.setTexture("textureSampler", mainTexture);
  shaderMaterial2.setTexture("refSampler", refTexture);
  shaderMaterial2.setFloat("time", 0);
  shaderMaterial2.setVector3("cameraPosition", BABYLON.Vector3.Zero());
  shaderMaterial2.backFaceCulling = false;
}
