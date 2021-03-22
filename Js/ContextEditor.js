let mousePos = [0, 0];

// These function(s) allows you to select an object,
// before updating the scene tree to highlight the object,
// and updating the properties viewer to display the properties of the object that's just been selected.
sceneTree.addEventListener("click", function(e){
    let sceneObject = scene.getObjectByName(e.target.innerHTML);
    select_object(sceneObject);
});

// This function allows you to click on a button to add a new instance of it into the scene.
objectCreator.addEventListener("click", function(e){
    let object = e.target.innerHTML;
    object = object.split(" ")[1];

    let geometry = new THREE[object + "Geometry"];
    let material = new THREE.MeshPhysicalMaterial({color: 0xffffff, vertexColors: THREE.FaceColors});
    material.color.convertSRGBToLinear();
    material.flatShading = true;

    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.y += 0.5;
    mesh.name = "Object (" + sceneTree.children.length + ")";
    scene.add(mesh);

    selectedObject = mesh;
    update_scene_tree();
    update_properties_editor();
});

// This function allows you to click on the transform mode section to change the transform mode.
// It is activated when the right button is pressed in the HTML file.
function set_transform_mode(mode){
    // Capitalisations
    let transformModeCapital = transformMode.charAt(0).toUpperCase() + transformMode.slice(1);
    let modeCapital = mode.charAt(0).toUpperCase() + mode.slice(1);

    document.getElementById(transformModeCapital + "Icon").src = "./Images/" + transformModeCapital + "Icon.svg";
    document.getElementById(modeCapital + "Icon").src = "./Images/" + modeCapital + "IconSelected.svg";

    transformMode = mode;
}

// These functions allows you to click on the movement buttons to move the selected object
// "e" should be "Z" or "Shift + Z", and the same for the other axis.
function update_transforms(axis){
    axis = axis.toLowerCase();
    axis = axis.split(" ");

    // The length of axis.split(" ") determines whether it will be "Z" or "Shift + Z",
    // z += 1 or z -= 1, and the same for the rest of the axis
    if (axis.length == 1){
        if (transformMode == "rotation") selectedObject[transformMode][axis[0]] += THREE.Math.degToRad(0.25);
        if (transformMode != "rotation") selectedObject[transformMode][axis[0]] += 0.25;
    } else {
        if (transformMode == "rotation") selectedObject[transformMode][axis[2]] -= THREE.Math.degToRad(0.25);
        if (transformMode != "rotation") selectedObject[transformMode][axis[2]] -= 0.25;
    }

    update_properties_editor();
    draw_bbox(selectedObject);
};
keyboardShortcuts.addEventListener("click", function(e){ update_transforms(e.target.innerHTML) });

// This procedure opens the context editor, and places it in the middle of the mouse.
function show_context_editor(){
    sceneTree.style.display = "block";
    objectCreator.style.display = "grid";
    propertyEditor.style.display = "block";
    keyboardShortcuts.style.display = "grid";
    
    // Position all the elements
    sceneTree.style.marginLeft = mousePos[0] - (sceneTree.offsetWidth / 2) + "px";
    sceneTree.style.marginTop = mousePos[1] - (sceneTree.offsetHeight / 2) - 240 + "px";

    objectCreator.style.marginLeft = mousePos[0] - (objectCreator.offsetWidth / 2) - 280 + "px";
    objectCreator.style.marginTop = mousePos[1] - (objectCreator.offsetHeight / 2) + "px";

    propertyEditor.style.marginLeft = mousePos[0] - (propertyEditor.offsetWidth / 2) + 280 + "px";
    propertyEditor.style.marginTop = mousePos[1] - (propertyEditor.offsetHeight / 2) + "px";

    keyboardShortcuts.style.marginLeft = mousePos[0] - (keyboardShortcuts.offsetWidth / 2) + "px";
    keyboardShortcuts.style.marginTop = mousePos[1] - (keyboardShortcuts.offsetHeight / 2) + 200 + "px";

    // Make sure the element doesn't go off the screen
    /*if (contextEditor.offsetLeft + contextEditor.offsetWidth > window.innerWidth){
        contextEditor.style.marginLeft = window.innerWidth - contextEditor.offsetWidth + "px";
    }

    if (contextEditor.offsetTop + contextEditor.offsetHeight > window.innerHeight){
        contextEditor.style.marginTop = window.innerHeight - contextEditor.offsetHeight + "px";
    }

    if (contextEditor.offsetLeft < 0){
        contextEditor.style.marginLeft = 0;
    }

    if (contextEditor.offsetTop < 0){
        contextEditor.style.marginTop = 0;
    }*/

    update_scene_tree();
    update_properties_editor();
}

// This procedure hides the context editor.
function hide_context_editor(){
    sceneTree.style.display = "none";
    objectCreator.style.display = "none";
    propertyEditor.style.display = "none";
    keyboardShortcuts.style.display = "none";
}

// This procedure returns false if the context editor is hidden (style.display = "none"),
// or true if the context editor is shown (style.display = grid).
function context_editor_is_shown(){
    // It only checks if the sceneTree is visible - all the other context editor panels will be visible or hidden at the same time though
    if (sceneTree.style.display == "none"){
        return false;
    } else {
        return true;
    }
}

let dragged = false;
document.getElementById("mainCanvas").addEventListener("mousedown", function () { dragged = false });
document.getElementById("mainCanvas").addEventListener("mousemove", function (e) { dragged = true; mousePos = [e.pageX, e.pageY] });