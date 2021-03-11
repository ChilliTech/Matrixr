// ----------
// Functions to add and remove objects
// ----------

function open_object_panel(){
    objectPanel.style.display = "block";
}

function close_object_panel(){
    objectPanel.style.display = "none";
}

function add_object(type){
    type = type.charAt(0).toUpperCase() + type.slice(1); // Capitalise the first letter of "type"
    let geometry = new THREE[type + "Geometry"];

    let material = new THREE.MeshPhysicalMaterial({color: 0xffffff, vertexColors: THREE.FaceColors});
    material.color.convertSRGBToLinear();
    material.flatShading = true;

    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.y += 0.5;
    mesh.name = "Object (" + sceneTree.children.length + ")";
    scene.add(mesh);

    // Update stuff
    selectedObject = mesh;
    update_project();
}

function delete_object(){
    if (selectedObject != scene){
        if (confirm("Are you sure you want to delete " + selectedObject.name + "?")){
            scene.remove(selectedObject);
            selectedObject = scene;
            update_project();
        }
    } else {
        display_message("Error deleting object; you can't delete the entire scene.");
    }
}

function update_project(){
    update_sceneTree();
    update_properties();
    save_project();
}