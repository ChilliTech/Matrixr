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