// ----------
// Initialise all the variables and functions needed in other scripts
// ----------

// scene
let scene = new THREE.Scene();
scene.background = new THREE.Color(0xf8f8f8);
scene.name = "MyFirstProject";

// camera
let camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 5;
camera.position.z = 10;
camera.lookAt(0, 0, 0);

// renderer
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

// controls
let controls = new THREE.OrbitControls(camera, renderer.domElement);

// directional light
let directionalLight = new THREE.DirectionalLight(0xcccccc);
directionalLight.position.set(1.5, 2, 6);
directionalLight.name = "Directional Light";
scene.add(directionalLight);

// directional light helper
let directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 2, 0x888888);
directionalLightHelper.name = "Directional Light Helper";
directionalLight.add(directionalLightHelper);

// ambient light
let ambientLight = new THREE.AmbientLight(scene.background, 0.15);
ambientLight.name = "Ambient Light";
scene.add(ambientLight);

// grid floor
let gridFloor = new THREE.GridHelper(12, 12, 0x888888, 0x888888);
gridFloor.name = "Grid Floor";
scene.add(gridFloor);

// axis helper
/*let axesHelper = new THREE.AxesHelper(1);
axesHelper.name = "Axes Helper"
scene.add(axesHelper);*/

// everything else
//let sceneObjects = []; // Only used to prevent 2 objects in the scene from having the same name
let selectedObject = scene;
let transformMode = "translate";

let sceneTree = document.getElementById("sceneTree");
let propertyEditor = document.getElementById("propertyEditor");
let header = document.getElementById("header");
let objectPanel = document.getElementById("objectPanel");

// functions
// Function to add an element inside another html element in javascript
function add_element(htmlElement, nodeType, idName=null, className=null){
    let node = document.createElement(nodeType);

    if (className != null){
        node.className = className;
    }

    if (idName != null){
        node.id = idName;
    }

    htmlElement.appendChild(node);
    
    return node;
}

// Function to add a label next to an input field (to make the code cleaner)
// In actual fact, the input field is inside the label because I'm not aware of a better way to have them next to each other
function add_input_field(htmlElement, inputType, text, idName, className=null){
    let label = add_element(htmlElement, "label");
    label.innerHTML = text;

    let inputField = add_element(label, "input", idName, className);
    inputField.type = inputType;    
    inputField.step = 0.25;

    return inputField;
}

// Function to display a message in the header
function display_message(errorMessage){
    let errorParagraph = add_element(header, "a");
    errorParagraph.innerHTML = errorMessage;
    errorParagraph.style.fontSize = "16px";

    // Remove the error message after a delay - if it hasn't already been removed
    setInterval(
        function(){
            if (errorParagraph.parentElement != null){
                errorParagraph.parentElement.removeChild(errorParagraph);
            }
        },
        6000
    );
}
