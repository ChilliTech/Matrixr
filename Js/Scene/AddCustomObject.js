// ***************
// This file allows a custom object to be added by clicking points in a canvas
// ***************

function custom_mesh_HTML_reset(){
    customMesh.replaceChildren();
    customMesh.appendChild(customMeshApply);
    customMesh.appendChild(customMeshText);
}

function add_custom_object(){
    let points = [];
    custom_mesh_HTML_reset();

    function remove_event_listeners(){
        customMesh.removeEventListener("click", add_point);
        customMeshApply.removeEventListener("click", apply_points);
    }
    
    function apply_points(){
        if (!confirm("Are you sure you want to continue?", "")) return;
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
        points = [];
        custom_mesh_HTML_reset();
        remove_event_listeners();
        customMesh.style.display = "none";

        select_object(mesh);
        update_scene_tree();
        update_property_editor();
    }

    function add_point(e){
        if (e.target.id == "customMeshApply") return;
        if (e.target.id == "customMeshCloseBtn") return;

        let div = add_element(customMesh, "div");
        div.style.position = "absolute";
        div.style.width = "5px";
        div.style.height = "5px";
        div.style.backgroundColor = "#4ba3f4";
        div.style.left = (e.clientX - customMesh.offsetLeft).toString() + "px";
        div.style.top = (e.clientY - customMesh.offsetTop).toString() + "px";
        points.push(new THREE.Vector3((e.clientX / canvas.offsetWidth) * 3 - 1, 0, (e.clientY / canvas.offsetHeight) * 3 + 1));
    }
    
    customMesh.style.display = "block";

    remove_event_listeners();

    customMesh.addEventListener("click", add_point);
    customMeshApply.addEventListener("click", apply_points);

    customMeshCloseBtn.addEventListener("click", function(){
        remove_event_listeners();
        console.log("Hello")
        points = [];
        custom_mesh_HTML_reset();
        customMesh.style.display = "none";
    });
}