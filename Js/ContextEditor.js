let mousePos = [0, 0];

// These function(s) allows you to select an object,
// before updating the scene tree to highlight the object,
// and updating the properties viewer to display the properties of the object that's just been selected.
sceneTree.addEventListener("click", function(e){
    let sceneObject = scene.getObjectByName(e.target.innerHTML);
    select_object(sceneObject);
});

// This allows you to search through available objects to add a new instance of it into the scene.
for (let key in availableObjects){
    // Avoid looping through everything twice (because of __proto__ objects)
    if (availableObjects.hasOwnProperty(key)){
        let element = add_element(objectCreatorResults, "p");
        element.innerHTML = key;
        element.addEventListener("click", function(){ availableObjects[key].add() });
    }
}

objectSearchBar.addEventListener("change", function(){
    let searchTerm = objectSearchBar.value;

    // Clear all the search terms:
    objectCreatorResults.replaceChildren();
    
    for (let key in availableObjects){
        // Avoid looping through everything twice (because of __proto__ objects)
        if (availableObjects.hasOwnProperty(key)){
            if (availableObjects[key].metadata.some(item => searchTerm.split(" ").includes(item))){
                let element = add_element(objectCreatorResults, "p");
                element.innerHTML = key;
                element.addEventListener("click", function(){ availableObjects[key].add() });
            }
        }
    }
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
    contextEditor.style.display = "grid";
    
    // Positioning
    contextEditor.style.marginLeft = mousePos[0] - (contextEditor.offsetWidth / 2) + "px";
    contextEditor.style.marginTop = mousePos[1] - (contextEditor.offsetHeight / 2) + "px";

    // Make sure the element doesn't go off the screen
    if (contextEditor.offsetLeft + contextEditor.offsetWidth > window.innerWidth){
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
    }

    update_scene_tree();
    update_properties_editor();
}

// This procedure hides the context editor.
function hide_context_editor(){
    contextEditor.style.display = "none";
}

// This procedure returns false if the context editor is hidden (style.display = "none"),
// or true if the context editor is shown (style.display = grid).
function context_editor_is_shown(){
    if (contextEditor.style.display == "none"){
        return false;
    } else {
        return true;
    }
}

function toggle_context_editor(){
    if (context_editor_is_shown() == true){
        hide_context_editor();
    } else {
        show_context_editor();
    }
}

let dragged = false;
document.body.addEventListener("mousedown", function () { dragged = false });
document.body.addEventListener("mousemove", function (e) { dragged = true; mousePos = [e.pageX, e.pageY] });