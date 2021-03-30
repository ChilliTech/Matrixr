// ***************
// This file populates the property editor panel.
// ***************

// This function automates some stuff to do with the properties editor.
// It adds a label & input field, handles some stuff to do with focusing, etc.
function add_input_field(htmlElement, title, inputType, value){
    let label = add_element(htmlElement, "label");
    label.innerHTML = title;

    let inputField = add_element(label, "input");
    inputField.type = inputType;
    inputField.value = value;
    inputField.addEventListener("focus", function(){ focusing = true });
    inputField.addEventListener("focusout", function(){ focusing = false });
    inputField.addEventListener("change", function(){ save_project() });

    return inputField;
}

function update_property_editor(){
    // First, remove everything in "propertyEditor" (before adding an updated version of it back again)
    propertyEditor.replaceChildren();

    // Next, add a button to delete the selected object
    let deleteObjectBtn = add_element(propertyEditor, "button");
    deleteObjectBtn.innerHTML = "Delete This Object";
    deleteObjectBtn.addEventListener("click", function(){
        if (confirm("Are you sure you want to delete '" + selectedObject.name + "'?")){
            scene.remove(selectedObject);
            select_object(scene);
            update_scene_tree();
            update_property_editor();
            save_project();
        }
    });

    add_element(propertyEditor, "hr");

    // After that, add a button to duplicate the selected object
    let duplicateObjectBtn = add_element(propertyEditor, "button");
    duplicateObjectBtn.innerHTML = "Duplicate This Object";
    duplicateObjectBtn.addEventListener("click", function(){
        duplicate_object(selectedObject);
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
                    save_project();
                });

                add_element(propertyEditor, "hr");
            } else if (key == "material"){
                // The color of the material
                if (selectedObject.material.color != undefined){
                    let materialColorR = selectedObject.material.color.r * 255;
                    let materialColorG = selectedObject.material.color.g * 255;
                    let materialColorB = selectedObject.material.color.b * 255;
    
                    let materialColorInput = add_input_field(propertyEditor, "Material Color: ", "color", rgbToHex(materialColorR, materialColorG, materialColorB));
                    materialColorInput.addEventListener("change", function(){
                        selectedObject.material.color.r = hexToRgb(materialColorInput.value).r / 255;
                        selectedObject.material.color.g = hexToRgb(materialColorInput.value).g / 255;
                        selectedObject.material.color.b = hexToRgb(materialColorInput.value).b / 255;
                        save_project();
                    });
                }
                
                // The emissive color of the material
                if (selectedObject.material.emissive != undefined){
                    let materialEmissiveR = selectedObject.material.emissive.r * 255;
                    let materialEmissiveG = selectedObject.material.emissive.g * 255;
                    let materialEmissiveB = selectedObject.material.emissive.b * 255;
    
                    let materialEmissiveInput = add_input_field(propertyEditor, "Material Emissive: ", "color", rgbToHex(materialEmissiveR, materialEmissiveG, materialEmissiveB));
                    materialEmissiveInput.addEventListener("change", function(){
                        selectedObject.material.emissive.r = hexToRgb(materialEmissiveInput.value).r / 255;
                        selectedObject.material.emissive.g = hexToRgb(materialEmissiveInput.value).g / 255;
                        selectedObject.material.emissive.b = hexToRgb(materialEmissiveInput.value).b / 255;
                        save_project();
                    });
                }
                
                // The flat shading property of the material
                if (selectedObject.material.flatShading != undefined){
                    let materialFlatShading = selectedObject.material.flatShading;
    
                    let materialFlatShadingInput = add_input_field(propertyEditor, "Material Flat Shading:", "checkbox", false);
                    materialFlatShadingInput.checked = materialFlatShading == true;
                    materialFlatShadingInput.addEventListener("change", function(){
                        selectedObject.material.flatShading = materialFlatShadingInput.checked == true;
                        selectedObject.material.needsUpdate = true;
                        save_project();
                    });
                }

                // The wireframe property of the material
                if (selectedObject.material.wireframe != undefined){
                    let materialWireframe = selectedObject.material.wireframe;
    
                    let materialWireframeInput = add_input_field(propertyEditor, "Material Wireframe:", "checkbox", false);
                    materialWireframeInput.checked = materialWireframe == true;
                    materialWireframeInput.addEventListener("change", function(){
                        selectedObject.material.wireframe = materialWireframeInput.checked == true;
                        selectedObject.material.needsUpdate = true;
                        save_project();
                    });
                }

                // The roughness property of the material
                if (selectedObject.material.roughness != undefined){
                    let materialRoughness = selectedObject.material.roughness;

                    let materialRoughnessInput = add_input_field(propertyEditor, "Material Roughness: ", "range", materialRoughness);
                    materialRoughnessInput.min = 0;
                    materialRoughnessInput.max = 100;
                    materialRoughnessInput.addEventListener("change", function(){
                        selectedObject.material.roughness = materialRoughnessInput.value / 100;
                        selectedObject.material.needsUpdate = true;
                        save_project();
                    });
                }

                // The metalness property of the material
                if (selectedObject.material.metalness != undefined){
                    let materialMetalness = selectedObject.material.metalness;

                    let materialMetalnessInput = add_input_field(propertyEditor, "Material Metalness: ", "range", materialMetalness);
                    materialMetalnessInput.min = 0;
                    materialMetalnessInput.max = 100;
                    materialMetalnessInput.addEventListener("change", function(){
                        selectedObject.material.metalness = materialMetalnessInput.value / 100;
                        selectedObject.material.needsUpdate = true;
                        save_project();
                    });
                }

                // The reflectivity property of the material
                if (selectedObject.material.reflectivity != undefined){
                    let materialReflectivity = selectedObject.material.reflectivity;

                    let materialReflectivityInput = add_input_field(propertyEditor, "Material Reflectivity: ", "range", materialReflectivity);
                    materialReflectivityInput.min = 0;
                    materialReflectivityInput.max = 100;
                    materialReflectivityInput.addEventListener("change", function(){
                        selectedObject.material.reflectivity = materialReflectivityInput.value / 100;
                        selectedObject.material.needsUpdate = true;
                        save_project();
                    });
                }

                // The clearcoat property of the material
                if (selectedObject.material.clearcoat != undefined){
                    let materialClearcoat = selectedObject.material.clearcoat;

                    let materialClearcoatInput = add_input_field(propertyEditor, "Material Clearcoat: ", "range", materialClearcoat);
                    materialClearcoatInput.min = 0;
                    materialClearcoatInput.max = 100;
                    materialClearcoatInput.addEventListener("change", function(){
                        selectedObject.material.clearcoat = materialClearcoatInput.value / 100;
                        selectedObject.material.needsUpdate = true;
                        save_project();
                    });
                }

                // The clearcoat roughness property of the material
                if (selectedObject.material.clearcoatRoughness != undefined){
                    let materialClearcoatRoughness = selectedObject.material.clearcoatRoughness;

                    let materialClearcoatRoughnessInput = add_input_field(propertyEditor, "Material Clearcoat Roughness: ", "range", materialClearcoatRoughness);
                    materialClearcoatRoughnessInput.min = 0;
                    materialClearcoatRoughnessInput.max = 100;
                    materialClearcoatRoughnessInput.addEventListener("change", function(){
                        selectedObject.material.clearcoatRoughness = materialClearcoatRoughnessInput.value / 100;
                        selectedObject.material.needsUpdate = true;
                        save_project();
                    });
                }

                add_element(propertyEditor, "hr");
            } else if (key == "intensity"){
                let intensity = selectedObject.intensity;

                let intensityInput = add_input_field(propertyEditor, "Intensity", "number", intensity);
                intensityInput.step = 0.25;
                intensityInput.addEventListener("change", function(){
                    selectedObject.intensity = intensityInput.value;
                });

                add_element(propertyEditor, "hr");
            } else if (key == "background"){
                let colorR = selectedObject.background.r * 255;
                let colorG = selectedObject.background.g * 255;
                let colorB = selectedObject.background.b * 255;

                let colorInput = add_input_field(propertyEditor, "Background Color: ", "color", rgbToHex(colorR, colorG, colorB));
                colorInput.addEventListener("change", function(){
                    selectedObject.background.r = hexToRgb(colorInput.value).r / 255;
                    selectedObject.background.g = hexToRgb(colorInput.value).g / 255;
                    selectedObject.background.b = hexToRgb(colorInput.value).b / 255;
                    save_project();
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

update_property_editor();