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

// Function to update "propertyEditor" to include all the values of the selected object
function update_properties(){
    // First, remove everything in "propertyEditor" (before adding an updated version of it back again)
    propertyEditor.replaceChildren();

    // Add the update button in
    let updateBtn = add_element(propertyEditor, "button", "updatePropertiesBtn");
    updateBtn.innerHTML = "Update Properties";

    updateBtn.addEventListener("click", function(){
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
    });


    // Next add input fields for the object if they exist (colour, position, etc)
    for (let key in selectedObject){
        // Avoid looping through everything twice (because of __proto__ objects)
        if (selectedObject.hasOwnProperty(key)){
            if (key == "name"){
                add_input_field(propertyEditor, "text", "Text:", "name").value = selectedObject.name;
                add_element(propertyEditor, "hr");
            } else if (key == "color"){
                var colorInput = add_input_field(propertyEditor, "color", "Color:", "color", "colorInputs");
                colorInput.value = rgbToHex(selectedObject.color.r * 255, selectedObject.color.g * 255, selectedObject.color.b * 255);
                add_element(propertyEditor, "hr");
            } else if (key == "material"){
                var materialColorInput = add_input_field(propertyEditor, "color", "Material Color:", key+"Color", "colorInputs");
                materialColorInput.value = rgbToHex(selectedObject.material.color.r * 255, selectedObject.material.color.g * 255, selectedObject.material.color.b * 255);
                add_element(propertyEditor, "hr");
            } else if (key == "position"){
                add_input_field(propertyEditor, "number", "Position X:", key+"X").value = selectedObject.position.x;
                add_input_field(propertyEditor, "number", "Position Y:", key+"Y").value = selectedObject.position.y;
                add_input_field(propertyEditor, "number", "Position Z:", key+"Z").value = selectedObject.position.z;
                add_element(propertyEditor, "hr");
            } else if (key == "rotation"){
                add_input_field(propertyEditor, "number", "Rotation X:", key+"X").value = THREE.Math.radToDeg(selectedObject.rotation.x);
                add_input_field(propertyEditor, "number", "Rotation Y:", key+"Y").value = THREE.Math.radToDeg(selectedObject.rotation.y);
                add_input_field(propertyEditor, "number", "Rotation Z:", key+"Z").value = THREE.Math.radToDeg(selectedObject.rotation.z);
                add_element(propertyEditor, "hr");
            } else if (key == "scale"){
                add_input_field(propertyEditor, "number", "Scale X:", key+"X").value = selectedObject.scale.x;
                add_input_field(propertyEditor, "number", "Scale Y:", key+"Y").value = selectedObject.scale.x;
                add_input_field(propertyEditor, "number", "Scale Z:", key+"Z").value = selectedObject.scale.x;
                add_element(propertyEditor, "hr");
            }
        }
    }

    save_project();
}
