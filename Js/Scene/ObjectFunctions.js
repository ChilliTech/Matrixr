// ***************
// This file contains some functions to do with objects.
// ***************

function delete_object(){
    console.log("DELETE OBJECT")
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
}

function duplicate_object(selectedObject){
    let mesh = selectedObject.clone();
    mesh.name = "Object (" + scene.children.length + ")";
    scene.add(mesh);

    select_object(mesh);
    update_scene_tree();
    update_property_editor();
    save_project();
}