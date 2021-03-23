let availableObjects = {
    "Cube Mesh": {
        "metadata": ["cube", "mesh", "square", "box", "shape"],
        "add": function(){
            let geometry = new THREE.CubeGeometry();
            let material = new THREE.MeshPhysicalMaterial({color: 0xffffff, vertexColors: THREE.FaceColors});
            material.color.convertSRGBToLinear();
            material.flatShading = true;

            let mesh = new THREE.Mesh(geometry, material);
            mesh.name = "Object (" + sceneTree.children.length + ")";
            scene.add(mesh);

            select_object(mesh);
            update_scene_tree();
            update_properties_editor();
        }
    },

    "Cone Mesh": {
        "metadata": ["cone", "mesh", "pyramid", "shape"],
        "add": function(){
            let geometry = new THREE.ConeGeometry();
            let material = new THREE.MeshPhysicalMaterial({color: 0xffffff, vertexColors: THREE.FaceColors});
            material.color.convertSRGBToLinear();
            material.flatShading = true;

            let mesh = new THREE.Mesh(geometry, material);
            mesh.name = "Object (" + sceneTree.children.length + ")";
            scene.add(mesh);

            select_object(mesh);
            update_scene_tree();
            update_properties_editor();
        }
    },

    "Cylinder Mesh": {
        "metadata": ["cylinder", "mesh", "prism", "shape"],
        "add": function(){
            let geometry = new THREE.CylinderGeometry();
            let material = new THREE.MeshPhysicalMaterial({color: 0xffffff, vertexColors: THREE.FaceColors});
            material.color.convertSRGBToLinear();
            material.flatShading = true;

            let mesh = new THREE.Mesh(geometry, material);
            mesh.name = "Object (" + sceneTree.children.length + ")";
            scene.add(mesh);

            select_object(mesh);
            update_scene_tree();
            update_properties_editor();
        }
    },

    "Plane Mesh": {
        "metadata": ["plane", "mesh", "shape"],
        "add": function(){
            let geometry = new THREE.PlaneGeometry();
            let material = new THREE.MeshPhysicalMaterial({color: 0xffffff, vertexColors: THREE.FaceColors});
            material.color.convertSRGBToLinear();
            material.flatShading = true;

            let mesh = new THREE.Mesh(geometry, material);
            mesh.name = "Object (" + sceneTree.children.length + ")";
            scene.add(mesh);

            select_object(mesh);
            update_scene_tree();
            update_properties_editor();
        }
    },

    "Sphere Mesh": {
        "metadata": ["sphere", "mesh", "shape"],
        "add": function(){
            let geometry = new THREE.SphereGeometry();
            let material = new THREE.MeshPhysicalMaterial({color: 0xffffff, vertexColors: THREE.FaceColors});
            material.color.convertSRGBToLinear();
            material.flatShading = true;

            let mesh = new THREE.Mesh(geometry, material);
            mesh.name = "Object (" + sceneTree.children.length + ")";
            scene.add(mesh);

            select_object(mesh);
            update_scene_tree();
            update_properties_editor();
        }
    },

    "Torus Mesh": {
        "metadata": ["torus", "donut", "mesh", "shape"],
        "add": function(){
            let geometry = new THREE.TorusGeometry();
            let material = new THREE.MeshPhysicalMaterial({color: 0xffffff, vertexColors: THREE.FaceColors});
            material.color.convertSRGBToLinear();
            material.flatShading = true;

            let mesh = new THREE.Mesh(geometry, material);
            mesh.name = "Object (" + sceneTree.children.length + ")";
            scene.add(mesh);

            select_object(mesh);
            update_scene_tree();
            update_properties_editor();
        }
    }
};
