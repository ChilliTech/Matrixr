// ----------
// Setup the scene hierarchy
// ----------

display_message("Note: AUTOSAVE is working - although you can backup the project to an external file if you want to.");

// Function to update "sceneTree" with everything in "scene" - relies on the structure of scenes in THREE.js
function update_sceneTree(){
    // First, remove everything in "sceneTree" (before adding an updated version of it back again)
    sceneTree.replaceChildren();
    
    // Then go through all the objects & children in three.js, and add it to "sceneTree"
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
    update_properties();
    save_project();
}

update_sceneTree();
update_properties();