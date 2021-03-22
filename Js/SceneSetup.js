// This file contains miscellaneous variables

let scene = new THREE.Scene();
scene.background = new THREE.Color(0xf8f8f8);
scene.name = "MyFirstProject";

let camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 5;
camera.position.z = 10;
camera.lookAt(0, 0, 0);

let renderer = new THREE.WebGLRenderer(
    {
        alpha: true,
        preserveDrawingBuffer: true,
        antialias: true,
        canvas: document.getElementById("mainCanvas")
    }
);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.gammaFactor = 0.2;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.physicallyCorrectLights;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let controls = new THREE.OrbitControls(camera, renderer.domElement);

let directionalLight = new THREE.DirectionalLight(0xcccccc);
directionalLight.position.set(1.5, 2, 6);
directionalLight.name = "Directional Light";
scene.add(directionalLight);

let directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 2, 0x888888);
directionalLightHelper.name = "Directional Light Helper";
directionalLight.add(directionalLightHelper);

let ambientLight = new THREE.AmbientLight(scene.background, 0.15);
ambientLight.name = "Ambient Light";
scene.add(ambientLight);

let gridFloor = new THREE.GridHelper(12, 12, 0x888888, 0x888888);
gridFloor.name = "Grid Floor";
scene.add(gridFloor);

/*let axesHelper = new THREE.AxesHelper(1);
axesHelper.name = "Axes Helper"
scene.add(axesHelper);*/

let contextEditor = document.getElementById("contextEditor");
let sceneTree = document.getElementById("sceneTree");
let objectCreator = document.getElementById("objectCreator");
let keyboardShortcuts = document.getElementById("keyboardShortcuts");
let transformModeHTML = document.getElementById("transformMode");

let resetProjectPrompt = "Are you sure you want to reset the whole project (it will clear everything you have saved - unless you have downloaded a backup)?";
let backupFileNamePrompt = "Please enter a name for your downloaded backup file:";

let selectedObject = scene;
let selectedObjectBBox = new THREE.BoxHelper(selectedObject, 0xffff00);
scene.add(selectedObjectBBox);
let transformMode = "position";
