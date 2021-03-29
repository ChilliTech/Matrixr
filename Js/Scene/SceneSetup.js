// ***************
// This file sets up the THREE.js scene
// ***************

// Keep track of whether an element with the id of "input" is being focused on
let focusing = false;

function is_focused(){
    for (let i = 0; i < document.getElementsByTagName("input").length; i++){
        let inputField = document.getElementsByTagName("input")[i];
        
        inputField.addEventListener("focus", function(){ focusing = true });
        inputField.addEventListener("focusout", function(){ focusing = false });
    }
}

is_focused();

// Setup the html elements & stuff
let canvas = document.getElementById("mainCanvas");
let header = document.getElementById("mainHeader");
let sceneTree = document.getElementById("sceneTree");
let objectSearchBar = document.getElementById("objectSearchBar");
let helpWindow = document.getElementById("helpWindow");
helpWindow.style.display = "block";
let isLightMode = true;

let resetProjectPrompt = "Are you sure you want to reset the whole project (it will clear everything you have saved - unless you have downloaded a backup)?";
let backupFileNamePrompt = "Please enter a name for your downloaded backup file:";

let dragged = false;
let mousePos = {
    "x": 0,
    "y": 0
};
document.body.addEventListener("mousedown", function () { dragged = false });
document.body.addEventListener("mousemove", function (e) { 
    dragged = true; 
    mousePos.x = e.pageX; 
    mousePos.y = e.pageY;
});

// ONLY FOR DEBBUGGING!
//(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='https://mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})();

// Setup the three.js scene
let scene = new THREE.Scene();
scene.background = new THREE.Color(0xf8f8f8);
scene.name = "MyFirstProject";

// The user's view camera
let camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 5;
camera.position.z = 10;
camera.lookAt(0, 0, 0);

// The renderer
let renderer = new THREE.WebGLRenderer(
    {
        alpha: true,
        preserveDrawingBuffer: true,
        antialias: true,
        canvas: canvas
    }
);

renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.gammaFactor = 0.2;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.physicallyCorrectLights;
camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
camera.updateProjectionMatrix();
renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
document.body.appendChild(renderer.domElement);

// The orbit controls
let controls = new THREE.OrbitControls(camera, renderer.domElement);

// The orientation gizmo
var orientationGizmo = new OrientationGizmo(camera, { size: 100, padding: 8 });
document.body.appendChild(orientationGizmo);
orientationGizmo.onAxisSelected = function(axis) {
    let distance = camera.position.distanceTo(controls.target);
    camera.position.copy(axis.direction.multiplyScalar(distance).add(controls.target));
    camera.lookAt(controls.target);
}

// The directional light & helper
let directionalLight = new THREE.DirectionalLight(0xcccccc);
directionalLight.position.set(1.5, 2, 6);
directionalLight.name = "Directional Light";
scene.add(directionalLight);

let directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 2, 0x888888);
directionalLightHelper.name = "Directional Light Helper";
directionalLight.add(directionalLightHelper);

// The ambient light
let ambientLight = new THREE.AmbientLight(scene.background, 0.15);
ambientLight.name = "Ambient Light";
scene.add(ambientLight);

// The grid floor
let gridFloor = new THREE.GridHelper(2000, 2000, 0xcccccc, 0xcccccc);
gridFloor.name = "Grid Floor";
scene.add(gridFloor);

// Miscellaneous
let selectedObject = scene;
let selectedObjectBBox = new THREE.BoxHelper(selectedObject, 0xffff00);
selectedObjectBBox.name = "Selected Object Bounding Box";
scene.add(selectedObjectBBox);
