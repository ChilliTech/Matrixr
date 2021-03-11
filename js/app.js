// ----------
// The main three.js sceneloop
// ----------

function animate() {
    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
