// ----------
// Handle the selection of objects with the sceneTree, and clicking on an object in the canvas
// ----------

// Make it so that when an object in "sceneTree" is clicked, it selects the clicked object
// "selectedObject" contains the clicked object as a THREE.js object
sceneTree.addEventListener("click", function(event){
    let sceneObject = scene.getObjectByName(event.target.innerHTML);

    if (sceneObject != undefined){
        selectedObject = sceneObject;
    }

    update_sceneTree();
});

// Make it so that you can select an object by clicking on the canvas - but not by dragging
let dragged = false;
document.body.addEventListener('mousedown', function () { dragged = false });
document.body.addEventListener('mousemove', function () { dragged = true });