// This file contains miscellaneous functions

// This function converts a given hex code into an rgb value.
// it outputs a dictionary with an r, g & b value.
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// This function turns an r, g & b value into a hex code.
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

// This function adds an element inside another html element in javascript
function add_element(htmlElement, nodeType){
    let node = document.createElement(nodeType);
    htmlElement.appendChild(node);

    return node;
}

// This function displays a message in the header
function display_message(message){
    // Remove the current message from the header (if there is one)
    let headerMessage = document.getElementById("headerMessage");
    if (headerMessage != null){
        headerMessage.parentElement.removeChild("headerMessage");
    }

    let messageParagraph = add_element(header, "a");
    messageParagraph.innerHTML = message;
    messageParagraph.style.fontSize = "16px";
    messageParagraph.setAttribute("id", "headerMessage")

    // Remove the error message after a delay - if it hasn't already been removed
    setInterval(
        function(){
            if (messageParagraph.parentElement != null){
                messageParagraph.parentElement.removeChild(messageParagraph);
            }
        },
        6000
    );
}

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

function draw_bbox(object){
    scene.remove(selectedObjectBBox);
    selectedObjectBBox = new THREE.BoxHelper(object, 0xffff00);
    scene.add(selectedObjectBBox);
}

function select_object(object){
    if (object == undefined) return; 
    
    selectedObject = object;
    draw_bbox(object);

    update_scene_tree();
    update_properties_editor();
}

// Function(s) to add input fields to update attributes of the selected object.
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
                let materialFlatShading = selectedObject.material.flatShading;

                let materialColorInput = add_input_field(propertyEditor, "Material Color: ", "color", rgbToHex(colorR, colorG, colorB));
                materialColorInput.addEventListener("change", function(){
                    selectedObject.material.color.r = hexToRgb(materialColorInput.value).r / 255;
                    selectedObject.material.color.g = hexToRgb(materialColorInput.value).g / 255;
                    selectedObject.material.color.b = hexToRgb(materialColorInput.value).b / 255;
                });

                let materialFlatShadingInput = add_input_field(propertyEditor, "Material Flat Shading:", "checkbox", false);
                materialFlatShadingInput.checked = selectedObject.material.flatShading == true;
                materialFlatShadingInput.addEventListener("change", function(){
                    selectedObject.material.flatShading = materialFlatShadingInput.checked == true;
                    selectedObject.material.needsUpdate = true;

                    //selectedObject.material.flatShading = materialFlatShadingInput.value == "on";
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
                    draw_bbox(selectedObject);
                });
                positionInputY.addEventListener("change", function(){
                    selectedObject.position.y = positionInputY.value;
                    draw_bbox(selectedObject);
                });
                positionInputZ.addEventListener("change", function(){
                    selectedObject.position.z = positionInputZ.value;
                    draw_bbox(selectedObject);
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
                    draw_bbox(selectedObject);
                });
                rotationInputY.addEventListener("change", function(){
                    selectedObject.rotation.y = THREE.Math.degToRad(rotationInputY.value);
                    draw_bbox(selectedObject);
                });
                rotationInputZ.addEventListener("change", function(){
                    selectedObject.rotation.z = THREE.Math.degToRad(rotationInputZ.value);
                    draw_bbox(selectedObject);
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
                    draw_bbox(selectedObject);
                });
                scaleInputY.addEventListener("change", function(){
                    selectedObject.scale.y = scaleInputY.value;
                    draw_bbox(selectedObject);
                });
                scaleInputZ.addEventListener("change", function(){
                    selectedObject.scale.z = scaleInputZ.value;
                    draw_bbox(selectedObject);
                });

                add_element(propertyEditor, "hr");
            }
        }
    }
}
