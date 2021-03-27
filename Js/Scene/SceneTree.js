// ***************
// This file populates the scene tree.
// ***************

// This procedure removes everything in scene tree,
// Then goes through all the objects in the THREE.js scene,
// And adds a paragraph with the name of the object (making sure to highlight it if it's selected).
function update_scene_tree(){
    // Remove everything in the scene tree before adding stuff back in again.
    sceneTree.replaceChildren();

    // Add everything back in again.
    function loop_through_scene(scene, indentLevel){
        for (let key in scene){
            if ((key == "children") || (!isNaN(key) == true)){
                loop_through_scene(scene[key], indentLevel + 1);
            } else if (key == "name"){
                let htmlElement = add_element(sceneTree, "p");
                htmlElement.innerHTML = scene[key];
                htmlElement.style.marginLeft = indentLevel * 16 + "px";

                if (scene[key] == selectedObject.name){
                    htmlElement.style.color = "#4ba3f4";
                    htmlElement.style.fontWeight = "bold";
                }
            }
        }
    }

    loop_through_scene(scene, 0);
}

update_scene_tree();

sceneTree.addEventListener("click", function(e){
    let sceneObject = scene.getObjectByName(e.target.innerHTML);
    if (sceneObject != undefined){ 
        select_object(sceneObject);
        update_scene_tree();
        update_property_editor();
    }
});