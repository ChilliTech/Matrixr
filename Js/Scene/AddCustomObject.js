// ***************
// This file allows a custom object to be added by clicking points in a canvas
// ***************

function add_custom_object(){
    let points = [];
    let cubeVertices = [];
    let lineEdges = [];

    function apply_points(){
        if (!"applyCustomMeshPrompt") return;
        if (points.length < 3) return;

        points.push(points[0]);
        let shape = new THREE.Shape();
        shape.moveTo(points[0].x, points[0].z);

        for (let i = 0; i < points.length; i++){
            shape.lineTo(points[i].x, points[i].z);
        }
        
        let extrudeSettings = {
            steps: 1,
            depth: 1,
            bevelEnabled: false
        };

        let geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        let material = new THREE.MeshPhysicalMaterial({color: 0xffffff, vertexColors: THREE.FaceColors});
        let mesh = new THREE.Mesh(geometry, material);
        mesh.name = "Object (" + scene.children.length + ")";
        mesh.rotation.x = THREE.Math.degToRad(90);
        mesh.position.x = 0;
        mesh.position.y = 0;
        mesh.position.z = 0;
        scene.add(mesh);

        // Remove all the points from customMesh
        customMesh.style.display = "none";
        customMesh.removeEventListener("click", add_point);
        customMeshApply.removeEventListener("click", apply_points);
        customMesh.replaceChildren();
        customMesh.appendChild(customMeshApply);
        customMesh.appendChild(customMeshText);

        select_object(mesh);
        update_scene_tree();
        update_property_editor();
    }

    function add_point(e){
        if (e.target.id == "customMeshApply") return;

        let div = add_element(customMesh, "div");
        div.style.position = "absolute";
        div.style.width = "10px";
        div.style.height = "10px";
        div.style.backgroundColor = "#4ba3f4";
        div.style.left = (e.clientX - customMesh.offsetLeft).toString() + "px";
        div.style.top = (e.clientY - customMesh.offsetTop).toString() + "px";
        points.push(new THREE.Vector3((e.clientX / canvas.offsetWidth) * 2 - 1, 0, (e.clientY / canvas.offsetHeight) * 2 + 1));
    }

    customMesh.style.display = "block";
    customMeshApply.removeEventListener("click", apply_points);
    customMeshApply.addEventListener("click", apply_points);
    customMesh.addEventListener("click", function(e){ add_point(e) });
}