display_message("Press 'a' to open the context editor.");

// Make it so when you click the canvas it hides the context editor & selects the object that's being clicked
document.getElementById("mainCanvas").addEventListener("mouseup", function(e){
    if (dragged == true) return;

    hide_context_editor();

    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObjects(scene.children);
    if (intersects[0] == undefined) return;

    select_object(intersects[0].object);
});

function animate() {
    // Handle window resizing
    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
