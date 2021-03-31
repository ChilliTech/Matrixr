// ***************
// This file contains all the possible objects the user can add to the scene
// ***************

let availableObjects = {
    "Custom Mesh": {
        "parameters": {},
        "metadata": ["custom", "mesh", "shape", "model"],
        "add": function(){
            add_custom_object();
        }
    },

    "Cube Mesh": {
        "parameters": {
            "widthSegments": 1,
            "heightSegments": 1,
            "depthSegments": 1
        },
        "metadata": ["cube", "mesh", "square", "box", "shape"],
        "add": function(){
            let geometry = new THREE.CubeGeometry(1, 1, 1, this.parameters.widthSegments, this.parameters.heightSegments, this.parameters.depthSegments);
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
        "parameters": {
            "radius": 1,
            "radialSegments": 8,
            "heightSegments": 1,
            "thetaStart": 0,
            "thetaLength": 2 * Math.PI
        },
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