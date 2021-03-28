// ***************
// This file contains the main animation loop
// ***************

// Make it so when you click the canvas it selects the object that's being clicked
document.getElementById("mainCanvas").addEventListener("mouseup", function(e){
    if (dragged == true) return;
    if (transforming != false){
        transforming = false;
        save_project();
        return;
    }
    helpWindow.style.display = "none";

    // Left click, select objects
    if (e.button == 0){
        let raycaster = new THREE.Raycaster();
        let mouse = new THREE.Vector2();
        let rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / (rect.right - rect.left)) * 2 - 1;
        mouse.y = - ((e.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;
    
        raycaster.setFromCamera(mouse, camera);
        let intersects = raycaster.intersectObjects(scene.children);

        // If nothing was clicked, don't select anything (return = exit out of the function)
        if (intersects[0] == undefined) return;

        // Don't let linesegments be selected for bug reasons
        if (intersects[0].object.type == "LineSegments") return;

        select_object(intersects[0].object);
        update_scene_tree();
        update_property_editor();
    }
});

// This function runs each frame and renders the scene
function animate() {
    // Handle the window resizing
    window.addEventListener("resize", () => {
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    });

    if (transforming != false){
        for (i = 0; i < transformingAxis.length; i++){
            let axis = transformingAxis[i];
            let value;
            if (axis != "z"){
                value = transformsBefore[transforming][axis] + (mousePos[axis] / (window.innerWidth / 100)) - (mousePosBefore[axis] / (window.innerWidth / 100));
            } else {
                value = transformsBefore[transforming][axis] + (mousePos.y / (window.innerWidth / 100)) - (mousePosBefore.y / (window.innerWidth / 100));
            }
            selectedObject[transforming][axis] = value;
        }
        update_property_editor();
        draw_bbox(selectedObject);
    }

    orientationGizmo.update();

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();