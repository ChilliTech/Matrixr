let mousePos = [0, 0];

// This procedure removes everything in scene tree,
// Then goes through all the objects in the THREE.js scene,
// And adds a paragraph with the name of the object (making sure to highlight it if it's selected).
function update_scene_tree(){
    // Remove everything in the scene tree before adding stuff back in again.
    sceneTree.replaceChildren();

    // Add everything back in again.
    function loop_through_scene(dictionary, indentLevel){
        for (let key in dictionary){
            if ((key == "children") || (!isNaN(key) == true)){
                loop_through_scene(dictionary[key], indentLevel + 1);
            } else if (key == "name"){
                let htmlElement = add_element(sceneTree, "p");
                htmlElement.innerHTML = dictionary[key];
                htmlElement.style.marginLeft = indentLevel * 16 + "px";

                if (dictionary[key] == selectedObject.name){
                    htmlElement.style.color = "#00a1ff";
                    htmlElement.style.fontWeight = "bold";
                }
            }
        }
    }

    loop_through_scene(scene, 0);
}

// This function allows you to select an object,
// before updating the scene tree to highlight the object,
// and updating the properties viewer to display the properties of the object that's just been selected.
sceneTree.addEventListener("click", function(e){
    let sceneObject = scene.getObjectByName(e.target.innerHTML);

    if (sceneObject != undefined){
        selectedObject = sceneObject;
    }

    update_scene_tree();
    update_properties_editor();
});

// This function allows you to click on a button to add a new instance of it into the scene.
objectCreator.addEventListener("click", function(e){
    let object = e.target.innerHTML;
    object = object.split(" ")[1];

    let geometry = new THREE[object + "Geometry"];
    let material = new THREE.MeshPhysicalMaterial({color: 0xffffff, vertexColors: THREE.FaceColors});
    material.color.convertSRGBToLinear();
    material.flatShading = true;

    var mesh = new THREE.Mesh(geometry, material);
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

    document.getElementById(transformModeCapital + "Icon").src = "./images/" + transformModeCapital + "Icon.svg";
    document.getElementById(modeCapital + "Icon").src = "./images/" + modeCapital + "IconSelected.svg";

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
};
keyboardShortcuts.addEventListener("click", function(e){ update_transforms(e.target.innerHTML) });

// Function(s) to add input fields to update attributes of the selected object.
let focusing = false; // Keep track of whether the user is clicking on an input field

// This function automates some stuff to do with the properties editor.
// It adds a label & input field, handles some stuff to do with focusing, etc.
function add_input_field(htmlElement, title, inputType, value){
    add_element(htmlElement, "p").innerHTML = title;

    var inputField = add_element(htmlElement, "input");
    inputField.type = inputType;
    inputField.value = value;
    inputField.addEventListener("focus", function(){ focusing = true });
    inputField.addEventListener("focusout", function(){ focusing = false });

    return inputField;
}

function update_properties_editor(){
    // First, remove everything in "propertyEditor" (before adding an updated version of it back again)
    propertyEditor.replaceChildren();

    // Next, add a button to delete the selected object
    let deleteObjectBtn = add_element(propertyEditor, "button");
    deleteObjectBtn.innerHTML = "Delete This Object";
    deleteObjectBtn.addEventListener("click", function(){
        if (confirm("Are you sure you want to delete '" + selectedObject.name + "'?")){
            scene.remove(selectedObject);
            selectedObject = scene;
            update_scene_tree();
        }
    });

    add_element(propertyEditor, "hr");

    // Then, add input fields for the object if they exist (colour, position, etc)
    for (let key in selectedObject){
        // Avoid looping through everything twice (because of __proto__ objects)
        if (selectedObject.hasOwnProperty(key)){
            if (key == "name"){
                let nameInput = add_input_field(propertyEditor, "Name: ", "text", selectedObject.name);
                nameInput.addEventListener("change", function(){
                    selectedObject.name = nameInput.value;
                    update_scene_tree();
                });

                add_element(propertyEditor, "hr");
            } else if (key == "color"){
                let colorR = selectedObject.color.r * 255;
                let colorG = selectedObject.color.g * 255;
                let colorB = selectedObject.color.b * 255;

                let colorInput = add_input_field(propertyEditor, "Color: ", "color", rgbToHex(colorR, colorG, colorB));
                colorInput.addEventListener("change", function(){
                    selectedObject.color.r = hexToRgb(colorInput.value).r / 255;
                    selectedObject.color.g = hexToRgb(colorInput.value).g / 255;
                    selectedObject.color.b = hexToRgb(colorInput.value).b / 255;
                });

                add_element(propertyEditor, "hr");
            } else if (key == "material"){
                let colorR = selectedObject.material.color.r * 255;
                let colorG = selectedObject.material.color.g * 255;
                let colorB = selectedObject.material.color.b * 255;

                let materialColorInput = add_input_field(propertyEditor, "Material Color: ", "color", rgbToHex(colorR, colorG, colorB));
                materialColorInput.addEventListener("change", function(){
                    selectedObject.material.color.r = hexToRgb(materialColorInput.value).r / 255;
                    selectedObject.material.color.g = hexToRgb(materialColorInput.value).g / 255;
                    selectedObject.material.color.b = hexToRgb(materialColorInput.value).b / 255;
                });

                add_element(propertyEditor, "hr");
            } else if (key == "position"){
                let positionInputX = add_input_field(propertyEditor, "Position X: ", "number", selectedObject.position.x);
                let positionInputY = add_input_field(propertyEditor, "Position Y: ", "number", selectedObject.position.y);
                let positionInputZ = add_input_field(propertyEditor, "Position Z: ", "number", selectedObject.position.z);
                positionInputX.step = 0.25;
                positionInputY.step = 0.25;
                positionInputZ.step = 0.25;
                positionInputX.addEventListener("change", function(){
                    selectedObject.position.x = positionInputX.value;
                });
                positionInputY.addEventListener("change", function(){
                    selectedObject.position.y = positionInputY.value;
                });
                positionInputZ.addEventListener("change", function(){
                    selectedObject.position.z = positionInputZ.value;
                });

                add_element(propertyEditor, "hr");
            } else if (key == "rotation"){
                let rotationInputX = add_input_field(propertyEditor, "Rotation X: ", "number", THREE.Math.radToDeg(selectedObject.rotation.x));
                let rotationInputY = add_input_field(propertyEditor, "Rotation Y: ", "number", THREE.Math.radToDeg(selectedObject.rotation.y));
                let rotationInputZ = add_input_field(propertyEditor, "Rotation Z: ", "number", THREE.Math.radToDeg(selectedObject.rotation.z));
                rotationInputX.step = 0.25;
                rotationInputY.step = 0.25;
                rotationInputZ.step = 0.25;
                rotationInputX.addEventListener("change", function(){
                    selectedObject.rotation.x = THREE.Math.degToRad(rotationInputX.value);
                });
                rotationInputY.addEventListener("change", function(){
                    selectedObject.rotation.y = THREE.Math.degToRad(rotationInputY.value);
                });
                rotationInputZ.addEventListener("change", function(){
                    selectedObject.rotation.z = THREE.Math.degToRad(rotationInputZ.value);
                });

                add_element(propertyEditor, "hr");
            } else if (key == "scale"){
                let scaleInputX = add_input_field(propertyEditor, "Scale X: ", "number", selectedObject.scale.x)
                let scaleInputY = add_input_field(propertyEditor, "Scale Y: ", "number", selectedObject.scale.y)
                let scaleInputZ = add_input_field(propertyEditor, "Scale Z: ", "number", selectedObject.scale.z)
                scaleInputX.step = 0.25;
                scaleInputY.step = 0.25;
                scaleInputZ.step = 0.25;
                scaleInputX.addEventListener("change", function(){
                    selectedObject.scale.x = scaleInputX.value;
                });
                scaleInputY.addEventListener("change", function(){
                    selectedObject.scale.y = scaleInputY.value;
                });
                scaleInputZ.addEventListener("change", function(){
                    selectedObject.scale.z = scaleInputZ.value;
                });
;            }
        }
    }
}

// This procedure opens the context editor, and places it in the middle of the mouse.
function show_context_editor(){
    contextEditor.style.display = "grid";
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

let dragged = false;
document.getElementById("mainCanvas").addEventListener("mousedown", function () { dragged = false });
document.getElementById("mainCanvas").addEventListener("mousemove", function (e) { dragged = true; mousePos = [e.pageX, e.pageY] });
document.getElementById("mainCanvas").addEventListener("mouseup", function () {
    if (dragged == false){
        hide_context_editor();
    }
});
