// ***************
// This file contains all the possible objects the user can add to the scene
// ***************

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

            run_command("selectObjectAndUpdate", mesh);
            run_command("updateSceneTree");
            run_command("updatePropertyEditor");
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

            run_command("selectObjectAndUpdate", mesh);
            run_command("updateSceneTree");
            run_command("updatePropertyEditor");
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

            run_command("selectObjectAndUpdate", mesh);
            run_command("updateSceneTree");
            run_command("updatePropertyEditor");
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

            run_command("selectObjectAndUpdate", mesh);
            run_command("updateSceneTree");
            run_command("updatePropertyEditor");
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

            run_command("selectObjectAndUpdate", mesh);
            run_command("updateSceneTree");
            run_command("updatePropertyEditor");
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

            run_command("selectObjectAndUpdate", mesh);
            run_command("updateSceneTree");
            run_command("updatePropertyEditor");
        }
    },

    "Directional Light": {
        "metadata": ["light", "directional", "lighting", "illumination", "lights"],
        "add": function(){
            let light = new THREE.DirectionalLight(0xcccccc);
            light.name = "Object (" + sceneTree.children.length + ")";
            scene.add(light);

            let lightHelper = new THREE.DirectionalLightHelper(light, 2, 0x888888);
            lightHelper.name = "Object (" + sceneTree.children.length + ") Helper";
            light.add(lightHelper);

            run_command("selectObjectAndUpdate", mesh);
            run_command("updateSceneTree");
            run_command("updatePropertyEditor");
        }
    },

    "Ambient Light": {
        "metadata": ["light", "ambient", "lighting", "illumination", "lights", "background"],
        "add": function(){
            let light = new THREE.AmbientLight(scene.background, 0.15);
            light.name = "Object (" + sceneTree.children.length + ")";
            scene.add(light);

            run_command("selectObjectAndUpdate", mesh);
            run_command("updateSceneTree");
            run_command("updatePropertyEditor");
        }
    },

    "Hemisphere Light": {
        "metadata": ["light", "hemisphere", "lighting", "illumination", "lights"],
        "add": function(){
            let light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
            light.name = "Object (" + sceneTree.children.length + ")";
            scene.add(light);

            let lightHelper = new THREE.HemisphereLightHelper(light, 2, 0x888888);
            lightHelper.name = "Object (" + sceneTree.children.length + ") Helper";
            light.add(lightHelper);

            run_command("selectObjectAndUpdate", mesh);
            run_command("updateSceneTree");
            run_command("updatePropertyEditor");
        }
    }
};