// ***************
// This file contains all the possible objects the user can add to the scene
// ***************

let availableObjects = {
    "Custom Mesh": {
        "metadata": ["custom", "mesh", "shape", "model"],
        "add": function(){
            let points = [];
            let cubeVertices = [];
            let lineEdges = [];

            customMeshApply.addEventListener("click", function(){
                if (!"applyCustomMeshPrompt") return;

                points.push(points[0]);
                let shape = new THREE.Shape();
                shape.moveTo(points[0].x, points[0].z);

                for (var i = 0; i < points.length; i++){
                    shape.lineTo(points[i].x, points[i].z);
                }
                
                let extrudeSettings = {
                    steps: 1,
                    depth: 1,
                    bevelEnabled: false
                };

                var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
                var material = new THREE.MeshPhysicalMaterial({color: 0xffffff, vertexColors: THREE.FaceColors});
                var mesh = new THREE.Mesh(geometry, material);
                mesh.name = "Object (" + scene.children.length + ")";
                mesh.rotation.x = THREE.Math.degToRad(90);
                mesh.position.x = 0;
                mesh.position.y = 0;
                mesh.position.z = 0;
                scene.add(mesh);

                customMesh.style.display = "none";
                customMesh.removeEventListener("click", add_point);
                customMesh.replaceChildren();
                customMesh.appendChild(customMeshApply);
                
                update_scene_tree();
                update_property_editor();
                save_project();

            });

            customMesh.style.display = "block";
            
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

            customMesh.addEventListener("click", function(e){ add_point(e) });
        }
    },

    "Cube Mesh": {
        "metadata": ["cube", "mesh", "square", "box", "shape"],
        "add": function(){
            let geometry = new THREE.CubeGeometry();
            let material = new THREE.MeshPhysicalMaterial({color: 0xffffff, vertexColors: THREE.FaceColors});
            material.color.convertSRGBToLinear();
            material.flatShading = true;

            let mesh = new THREE.Mesh(geometry, material);
            mesh.name = "Object (" + scene.children.length + ")";
            scene.add(mesh);
            select_object(mesh);
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
            mesh.name = "Object (" + scene.children.length + ")";
            scene.add(mesh);
            select_object(mesh);
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
            mesh.name = "Object (" + scene.children.length + ")";
            scene.add(mesh);
            select_object(mesh);
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
            mesh.name = "Object (" + scene.children.length + ")";
            scene.add(mesh);
            select_object(mesh);
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
            mesh.name = "Object (" + scene.children.length + ")";
            scene.add(mesh);
            select_object(mesh);
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
            mesh.name = "Object (" + scene.children.length + ")";
            scene.add(mesh);
            select_object(mesh);
        }
    },

    "Directional Light": {
        "metadata": ["light", "directional", "lighting", "illumination", "lights"],
        "add": function(){
            let light = new THREE.DirectionalLight(0xcccccc);
            light.name = "Object (" + scene.children.length + ")";
            scene.add(light);

            let lightHelper = new THREE.DirectionalLightHelper(light, 2, 0x888888);
            lightHelper.name = "Object (" + scene.children.length + ") Helper";
            light.add(lightHelper);
            select_object(light);
        }
    },

    "Ambient Light": {
        "metadata": ["light", "ambient", "lighting", "illumination", "lights", "background"],
        "add": function(){
            let light = new THREE.AmbientLight(scene.background, 0.15);
            light.name = "Object (" + scene.children.length + ")";
            scene.add(light);
            select_object(light);
        }
    },

    "Hemisphere Light": {
        "metadata": ["light", "hemisphere", "lighting", "illumination", "lights"],
        "add": function(){
            let light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
            light.name = "Object (" + scene.children.length + ")";
            scene.add(light);

            let lightHelper = new THREE.HemisphereLightHelper(light, 2, 0x888888);
            lightHelper.name = "Object (" + scene.children.length + ") Helper";
            light.add(lightHelper);
            select_object(light);
        }
    }
};