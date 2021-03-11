// ----------
// Handle what's inside the "propertyEditor" tab
// ----------

// Function to easily turn a hex color value into rgb values:
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// Function to easily turn a rgb values value into a hex color:
function rgbToHex(r, g, b) { 
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

function update_from_inputs(){
    // The children of propertyEditor are labels which contain the inputFields
    // Starts at 1 because the update button is at position 0
    for (let i = 1; i < propertyEditor.children.length; i++){
        let inputField = propertyEditor.children[i];

        if (inputField.tagName != "HR"){
            inputField = propertyEditor.children[i].children[0];
            let inputFieldID = inputField.getAttribute("id");

            // Do some special things for a few types of input fields
            if (inputFieldID == "color"){
                selectedObject.color.r = hexToRgb(inputField.value).r / 255;
                selectedObject.color.g = hexToRgb(inputField.value).g / 255;
                selectedObject.color.b = hexToRgb(inputField.value).b / 255;
            } else if (inputFieldID == "materialColor"){
                selectedObject.material.color.r = hexToRgb(inputField.value).r / 255;
                selectedObject.material.color.g = hexToRgb(inputField.value).g / 255;
                selectedObject.material.color.b = hexToRgb(inputField.value).b / 255;
            }

            // Update positions based on what's inside the relevant input field
            else if (inputFieldID == "positionX"){
                selectedObject.position.x = parseInt(inputField.value);
            } else if (inputFieldID == "positionY"){
                selectedObject.position.y = parseInt(inputField.value);
            } else if (inputFieldID == "positionZ"){
                selectedObject.position.z = parseInt(inputField.value);
            }

            // Update rotations based on what's inside the relevant input field
            else if (inputFieldID == "rotationX"){
                selectedObject.rotation.x = THREE.Math.degToRad(inputField.value);
            } else if (inputFieldID == "rotationY"){
                selectedObject.rotation.y = THREE.Math.degToRad(inputField.value);
            } else if (inputFieldID == "rotationZ"){
                selectedObject.rotation.z = THREE.Math.degToRad(inputField.value);
            }

            // Update the scale based on what's inside the relevant input field
            else if (inputFieldID == "scaleX"){
                selectedObject.scale.x = parseInt(inputField.value);
            } else if (inputFieldID == "scaleY"){
                selectedObject.scale.y = parseInt(inputField.value);
            } else if (inputFieldID == "scaleZ"){
                selectedObject.scale.z = parseInt(inputField.value);
            }

            // But for everything else, just do this
            else {
                selectedObject[inputFieldID] = inputField.value;
            }
        }
    }

    // This is in the sceneTree script - which will have loaded by the time this runs
    update_sceneTree();
}

// Function to update "propertyEditor" to include all the values of the selected object
function update_properties(){
    // First, remove everything in "propertyEditor" (before adding an updated version of it back again)
    propertyEditor.replaceChildren();

    // Next add input fields for the object if they exist (colour, position, etc)
    for (let key in selectedObject){
        // Avoid looping through everything twice (because of __proto__ objects)
        if (selectedObject.hasOwnProperty(key)){
            if (key == "name"){
                let nameInput = add_input_field(propertyEditor, "text", "Text:", "name");
                nameInput.value = selectedObject.name;
                nameInput.addEventListener("change", update_from_inputs)
                add_element(propertyEditor, "hr");
            } else if (key == "color"){
                var colorInput = add_input_field(propertyEditor, "color", "Color:", "color", "colorInputs");
                colorInput.value = rgbToHex(selectedObject.color.r * 255, selectedObject.color.g * 255, selectedObject.color.b * 255);
                colorInput.addEventListener("change", update_from_inputs);
                add_element(propertyEditor, "hr");
            } else if (key == "material"){
                var materialColorInput = add_input_field(propertyEditor, "color", "Material Color:", key+"Color", "colorInputs");
                materialColorInput.value = rgbToHex(selectedObject.material.color.r * 255, selectedObject.material.color.g * 255, selectedObject.material.color.b * 255);
                materialColorInput.addEventListener("change", update_from_inputs);
                add_element(propertyEditor, "hr");
            } else if (key == "position"){
                let positionX = add_input_field(propertyEditor, "number", "Position X:", key+"X");
                let positionY = add_input_field(propertyEditor, "number", "Position Y:", key+"Y");
                let positionZ = add_input_field(propertyEditor, "number", "Position Z:", key+"Z");
                positionX.value = selectedObject.position.x;
                positionY.value = selectedObject.position.y;
                positionZ.value = selectedObject.position.z;
                positionX.addEventListener("change", update_from_inputs);
                positionY.addEventListener("change", update_from_inputs);
                positionZ.addEventListener("change", update_from_inputs);
                add_element(propertyEditor, "hr");
            } else if (key == "rotation"){
                let rotationX = add_input_field(propertyEditor, "number", "Rotation X:", key+"X");
                let rotationY = add_input_field(propertyEditor, "number", "Rotation Y:", key+"Y");
                let rotationZ = add_input_field(propertyEditor, "number", "Rotation Z:", key+"Z");
                rotationX.value = THREE.Math.radToDeg(selectedObject.rotation.x);
                rotationY.value = THREE.Math.radToDeg(selectedObject.rotation.y);
                rotationZ.value = THREE.Math.radToDeg(selectedObject.rotation.z);
                rotationX.addEventListener("change", update_from_inputs);
                rotationY.addEventListener("change", update_from_inputs);
                rotationZ.addEventListener("change", update_from_inputs);
                add_element(propertyEditor, "hr");
            } else if (key == "scale"){
                let scaleX = add_input_field(propertyEditor, "number", "Scale X:", key+"X");
                let scaleY = add_input_field(propertyEditor, "number", "Scale Y:", key+"Y");
                let scaleZ = add_input_field(propertyEditor, "number", "Scale Z:", key+"Z");
                scaleX.value = selectedObject.scale.x;
                scaleY.value = selectedObject.scale.y;
                scaleZ.value = selectedObject.scale.z;
                scaleX.addEventListener("change", update_from_inputs);
                scaleY.addEventListener("change", update_from_inputs);
                scaleZ.addEventListener("change", update_from_inputs);
                add_element(propertyEditor, "hr");
            }
        }
    }

    save_project();
}
