// ***************
// This file contains the main animation loop
// ***************

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

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();