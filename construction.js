var wallthickness = 0.25;
var wallheight = 30;

function createMakerSpace(positionMakerSpace)
{
var lengthOfMakerSpace=50;
var widthOfMakerSpace=54;
var frontWallAWidth=27;
var numberOfHorizontalPanes=8;
var numberOfVerticalPanes=9;
var thicknessOfFrame=0.25;
makeWindowPanes(
    frontWallAWidth,
    wallheight,
    wallthickness,
    numberOfHorizontalPanes,
    numberOfVerticalPanes,
    thicknessOfFrame,
    "metal_frame.jpg",
    new BABYLON.Vector3(-widthOfMakerSpace/4.0, wallheight / 2.0, lengthOfMakerSpace/2.0),
    new BABYLON.Vector3(0, 0, 0),
    0.25,positionMakerSpace
  );

  var widthLeftPaneWall=27-4;
  numberOfHorizontalPanes=7;
  makeWindowPanes(
   widthLeftPaneWall,
    wallheight,
    wallthickness,
    numberOfHorizontalPanes,
    numberOfVerticalPanes,
    thicknessOfFrame,
    "metal_frame.jpg",
    new BABYLON.Vector3(-widthOfMakerSpace/2.0, wallheight / 2.0, lengthOfMakerSpace/2.0-widthLeftPaneWall/2.0),
    new BABYLON.Vector3(0, 1.57, 0),
    0.25,positionMakerSpace
  );

  var widthLeftSolidWall=lengthOfMakerSpace/2.0;

 //door and renderwindow
  var doorwidth = 3.25;
  var doorheight = 7;
  

  var holecenters=[];
  var holeDimensions=[];
  holeCenters = [
    [
      3 - backwallwidth / 2.0 + doorwidth / 2.0,
      -wallheight / 2.0 + doorheight / 2.0,
    ]
    
  ];

  holeDimensions = [
    [doorwidth, doorheight],
   
  ];

  makeWall(
   widthLeftSolidWall,
    wallheight,
    wallthickness,
    holeCenters,
    holeDimensions,
    "sidewall.jpg",
    new BABYLON.Vector3(-27, wallheight / 2.0, -lengthOfMakerSpace/4.0+2),
    new BABYLON.Vector3(0,-1.57, 0),
    1.0,positionMakerSpace
  );

  holeCenters=[];
  holeDimensions=[];
  makeWall(
    23,
     wallheight,
     wallthickness,
     holeCenters,
     holeDimensions,
     "sidewall.jpg",
     new BABYLON.Vector3(-27+(23)/2.0, wallheight / 2.0, -lengthOfMakerSpace/2.0+2),
     new BABYLON.Vector3(0,0, 0),
     1.0,positionMakerSpace
   );
   makeWall(
    8,
     wallheight,
     wallthickness,
     holeCenters,
     holeDimensions,
     "sidewall.jpg",
     new BABYLON.Vector3(-4, wallheight / 2.0, -lengthOfMakerSpace/2.0+2+4),
     new BABYLON.Vector3(0,1.57, 0),
     1.0,positionMakerSpace
   );
   holeCenters=[
       [-31/2.0+0.5+doorwidth/2.0, -wallheight / 2.0 + doorheight / 2.0],
       [31/2.0-0.5-doorwidth/2.0,-wallheight/2.0+doorheight/2.0]
   ]
   
  holeDimensions = [
    [doorwidth, doorheight],
    [doorwidth, doorheight],
  ]
   makeWall(
    31,
     wallheight,
     wallthickness,
     holeCenters,
     holeDimensions,
     "sidewall.jpg",
     new BABYLON.Vector3(-4+31/2, wallheight / 2.0, -lengthOfMakerSpace/2.0+2+8),
     new BABYLON.Vector3(0,0, 0),
     1.0,positionMakerSpace
   );




   numberOfHorizontalPanes=12;
   //42'/12=
   makeWindowPanes(
    40,
     wallheight,
     wallthickness,
     numberOfHorizontalPanes,
     numberOfVerticalPanes,
     thicknessOfFrame,
     "metal_frame.jpg",
     new BABYLON.Vector3(0, wallheight / 2.0, lengthOfMakerSpace/2.0+1-42/2.0),
     new BABYLON.Vector3(0, 1.57, 0),
     0.25,positionMakerSpace
   );

    holeCenters=[];
    holeDimensions=[];
   makeWall(
    40,
     wallheight,
     wallthickness,
     holeCenters,
     holeDimensions,
     "sidewall.jpg",
     new BABYLON.Vector3(27, wallheight / 2.0, lengthOfMakerSpace/2.0+1-42/2.0),
     new BABYLON.Vector3(0,1.57, 0),
     1.0,positionMakerSpace
   );

   makeWall(
    27,
     wallheight,
     wallthickness,
     holeCenters,
     holeDimensions,
     "sidewall.jpg",
     new BABYLON.Vector3(27/2.0, wallheight / 2.0, lengthOfMakerSpace/2.0),
     new BABYLON.Vector3(0,0, 0),
     1.0,positionMakerSpace
   );

   makedoors(
    "door.jpg",
    [
      [-27, doorheight/2.0, lengthOfMakerSpace/4.0+doorwidth/2.0-0.6],
      [-27, doorheight/2.0, lengthOfMakerSpace/4.0-doorwidth/2.0-0.6],
      
    ],
    [
      [1.25, 2.5, 0.015],
      [1.25, 2.5, 0.015],
      
    ],
    [
      [0, 1.57, 0],
      [0, 1.57, 3.14],
      
    ],positionMakerSpace
  );

}


function createImmersionStudio(positionImmersion) {
  //LeftWall
  var leftwalllength = 32;
  var holeCenters = [];

  var holeDimensions = [];
  makeWall(
    leftwalllength,
    wallheight,
    wallthickness,
    holeCenters,
    holeDimensions,
    "sidewall.jpg",
    new BABYLON.Vector3(0, wallheight / 2.0, 0),
    new BABYLON.Vector3(0, 1.57, 0),
    1.0,positionImmersion
  );

  //backwall
  backwallwidth = 18.5;

  //door and renderwindow
  var doorwidth = 3.25;
  var doorheight = 7;
  var renderwindowwidth = 12;
  var renderwindowheight = 4;

  holeCenters = [
    [
      0.5 - backwallwidth / 2.0 + doorwidth / 2.0,
      -wallheight / 2.0 + doorheight / 2.0,
    ],
    [
      0.5 - backwallwidth / 2.0 + doorwidth + 2 + renderwindowwidth / 2.0,
      -wallheight / 2.0 + doorheight / 2.0,
    ],
  ];

  holeDimensions = [
    [doorwidth, doorheight],
    [renderwindowwidth, renderwindowheight],
  ];

  makeWall(
    18.5,
    wallheight,
    wallthickness,
    holeCenters,
    holeDimensions,
    "sidewall.jpg",
    new BABYLON.Vector3(9.25, wallheight / 2.0, 16),
    new BABYLON.Vector3(0, 0, 0),
    1.0,positionImmersion
  );

  //front wall
  var numberOfHorizontalPanes = 6;
  var thicknessOfFrame = 0.25;
  var numberOfVerticalPanes = 9;
  var frontwallwidth = backwallwidth;
  makeWindowPanes(
    frontwallwidth,
    wallheight,
    wallthickness,
    numberOfHorizontalPanes,
    numberOfVerticalPanes,
    thicknessOfFrame,
    "metal_frame.jpg",
    new BABYLON.Vector3(9.25, wallheight / 2.0, -16),
    new BABYLON.Vector3(0, 0, 0),
    0.25,positionImmersion
  );

  //rightwall

  var numberOfHorizontalPanes = 6;
  var thicknessOfFrame = 0.25;
  var numberOfVerticalPanes = 9;
  var frontwallwidth = backwallwidth;
  makeWindowPanes(
    leftwalllength + wallthickness,
    wallheight,
    wallthickness,
    numberOfHorizontalPanes,
    numberOfVerticalPanes,
    thicknessOfFrame,
    "metal_frame.jpg",
    new BABYLON.Vector3(backwallwidth + wallthickness / 2, wallheight / 2.0, 0),
    new BABYLON.Vector3(0, 1.57, 0),
    0.25,positionImmersion
  );
  makedoors(
    "door.jpg",
    [
      [0.5+doorwidth/2.0, doorheight/2.0, leftwalllength/2.0],
      [7.65, doorheight/2.0-0.05, -leftwalllength/2.0],
      [10.9, doorheight/2.0-0.05, -leftwalllength/2.0]
    ],
    [
      [1.25, 2.68, 0.02],
      [1.22, 2.62, 0.015],
      [1.22, 2.62, 0.015]
    ],
    [
      [0, 0, 0],
      [0, 0, 0],
      [0,0, 3.14]
    ],positionImmersion
  );

 
}

function makeTiledFloor(width,height,floorPic,floorPosition)
{
    var mat = new BABYLON.StandardMaterial("", scene);
	mat.diffuseTexture = new BABYLON.Texture(floorPic, scene);
	
	var pat = BABYLON.Mesh.FLIP_N_ROTATE_ROW;

    var columns = 10;  // 6 columns
    var rows = 10;  // 4 rows

    var faceUV = new Array(6);

    for (var i = 0; i < 6; i++) {
        faceUV[i] = new BABYLON.Vector4(i / columns, 0, (i + 1) / columns, 1 / rows);
    }
	
	var options = {
		sideOrientation: BABYLON.Mesh.DOUBLESIDE,
		pattern: pat,
        faceUV: faceUV,
		width: width,
		height: 0.2,
		depth: height,
		tileSize: 10,
		tileWidth:10
	}
	
    var mesh = BABYLON.MeshBuilder.CreateTiledBox("", options, scene);
    mat.specularColor = new BABYLON.Color3(0, 0, 0);
    mesh.material = mat;
}

function makedoors(doorPic, doorPositions, doorSizes, doorRotations,roomPosition) {
  BABYLON.SceneLoader.ImportMesh(
    "",
    "./",
    "participant.babylon",
    scene,
    function (newMeshes, particleSystems, skeletons) {
      door = newMeshes[0];

      var partmat2 = new BABYLON.StandardMaterial("partmat", scene);
      partmat2.diffuseTexture = new BABYLON.Texture(doorPic, scene);
      partmat2.emissiveColor = new BABYLON.Color3.White();
      door.material = partmat2;
      door.position = new BABYLON.Vector3(
        doorPositions[0][0]+roomPosition.x,
        doorPositions[0][1]+roomPosition.y,
        doorPositions[0][2]+roomPosition.z);
        door.scaling = new BABYLON.Vector3(
            doorSizes[0][0],
            doorSizes[0][1],
            doorSizes[0][2]);
            door.rotation = new BABYLON.Vector3(
                doorRotations[0][0],
                doorRotations[0][1],
                doorRotations[0][2]);
      if(doorPositions.length>0)
      {
      for (i = 1; i < doorPositions.length; i++) {
        var door2 = door.clone("s" + i);
        door2.position=new BABYLON.Vector3(doorPositions[i][0]+roomPosition.x,
        doorPositions[i][1]+roomPosition.y,
        doorPositions[i][2]+roomPosition.z);
        door2.scaling = new BABYLON.Vector3(
            doorSizes[i][0],
            doorSizes[i][1],
            doorSizes[i][2]);
            door2.rotation = new BABYLON.Vector3(
                doorRotations[i][0],
                doorRotations[i][1],
                doorRotations[i][2]);
        door2.material = partmat2;
      }
    }
    }
  );
}
function makeWindowPanes(
  wallwidth,
  wallheight,
  wallthickness,
  numberOfHorizontalPanes,
  numberOfVerticalPanes,
  thicknessOfFrame,
  framePicture,
  wallPosition,
  wallRotation,
  opacity,
  roomPosition
) {
  var holeCenters = [];
  var holeDimensions = [];
  var atx = -wallwidth / 2.0 + thicknessOfFrame;

  //  |--|--|--|
  var widthOfPane =
    (wallwidth - (numberOfHorizontalPanes + 1) * thicknessOfFrame) /
    numberOfHorizontalPanes;
  var heightOfPanes =
    (wallheight - (numberOfVerticalPanes + 1) * thicknessOfFrame) /
    numberOfVerticalPanes;
  for (i = 1; i <= numberOfHorizontalPanes; i++) {
    var aty = -wallheight / 2.0 + thicknessOfFrame;
    for (j = 1; j <= numberOfVerticalPanes; j++) {
      holeCenters.push([atx + widthOfPane / 2.0, aty + heightOfPanes / 2.0]);
      holeDimensions.push([widthOfPane, heightOfPanes]);
      aty += heightOfPanes + thicknessOfFrame;
    }
    atx += widthOfPane + thicknessOfFrame;
  }

  makeWall(
    wallwidth,
    wallheight,
    wallthickness,
    holeCenters,
    holeDimensions,
    framePicture,
    wallPosition,
    wallRotation,
    opacity,roomPosition
  );
}
function makeWall(
  width,
  height,
  thickness,
  holeCenters,
  holeDimensions,
  picFile,
  wallPosition,
  wallRotation,
  opacity,
  roomLocation
) {
  //make wall centered at origin with holes

  var mywall = BABYLON.MeshBuilder.CreateBox(
    "mywall",
    { height: height, width: width, depth: thickness },
    scene
  );
  var mywallCSG = BABYLON.CSG.FromMesh(mywall);

  for (i = 0; i < holeCenters.length; i++) {
    var myholes;
    myholes = BABYLON.MeshBuilder.CreateBox(
      "myholes" + i,
      {
        height: holeDimensions[i][1],
        width: holeDimensions[i][0],
        depth: thickness * 2,
      },
      scene
    );
    myholes.position = new BABYLON.Vector3(
      holeCenters[i][0],
      holeCenters[i][1],
      0
    );
    var myholesCSG = BABYLON.CSG.FromMesh(myholes);
    mywallCSG = mywallCSG.subtract(myholesCSG);
    myholes.dispose();
  }

  mywall.dispose();

  var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);

  myMaterial.diffuseTexture = new BABYLON.Texture(picFile, scene);
  myMaterial.backFaceCulling = false;
  var newWall = mywallCSG.toMesh("WallDiscard", myMaterial, scene);
  newWall.position=new BABYLON.Vector3(wallPosition.x+roomLocation.x,wallPosition.y+roomLocation.y,wallPosition.z+roomLocation.z);

  newWall.rotation = wallRotation;
  newWall.visibility = opacity;
}

