// ***************
// This file allows the user to perform tasks via keyboard shortcuts.
// ***************

let transformsBefore = {
    "position": {
        "x": 0,
        "y": 0,
        "z": 0
    },

    "rotation": {
        "x": 0,
        "y": 0,
        "z": 0
    },

    "scale": {
        "x": 0,
        "y": 0,
        "z": 0
    }
}

let mousePosBefore = {
    "x": 0,
    "y": 0
}

// Used to move the object
// Values can be:
// * false
// * "position"
// * "rotation"
// * "scale"
let transforming = false;
let transformingAxis = "xz"; // I NEED TO IMPLEMENT THIS SO THAT THE USER CAN USE THE MOUSE TO TRANSFORM ALONG A CERTAIN AXIS

function reset_object_position(object){
    object.position.x = transformsBefore.position.x;
    object.position.y = transformsBefore.position.y;
    object.position.z = transformsBefore.position.z;

    object.rotation.x = transformsBefore.rotation.x;
    object.rotation.y = transformsBefore.rotation.y;
    object.rotation.z = transformsBefore.rotation.z;

    object.scale.x = transformsBefore.scale.x;
    object.scale.y = transformsBefore.scale.y;
    object.scale.z = transformsBefore.scale.z;
}

document.body.addEventListener("keyup", function(e){
    if (focusing == true) return;

    // Saving - ctrl + s, or cmd + s
    else if ((e.ctrlKey == true) || (e.metaKey == true)){
        if (e.key == "s"){
            e.preventDefault();
            save_project();
        }
    }

    else if (e.key == "?"){
        if (helpWindow.style.display == "none") helpWindow.style.display = "block";
        else if (helpWindow.style.display == "block") helpWindow.style.display = "none";
    }

    else if (e.key == "f"){
        switch_ui_mode();
    }

    else if ((e.key == "s") || (e.key == "r") || (e.key == "p")){
        if (transforming != false){
            transforming = false;
            transformingAxis = "xz";
            save_project();
            return;
        }

        if (e.key == "s") transforming = "scale";
        if (e.key == "r") transforming = "rotation";
        if (e.key == "p") transforming = "position";

        mousePosBefore.x = mousePos.x;
        mousePosBefore.y = mousePos.y;
        
        transformsBefore.position.x = selectedObject.position.x;
        transformsBefore.position.y = selectedObject.position.y;
        transformsBefore.position.z = selectedObject.position.z;

        transformsBefore.rotation.x = selectedObject.rotation.x;
        transformsBefore.rotation.y = selectedObject.rotation.y;
        transformsBefore.rotation.z = selectedObject.rotation.z;

        transformsBefore.scale.x = selectedObject.scale.x;
        transformsBefore.scale.y = selectedObject.scale.y;
        transformsBefore.scale.z = selectedObject.scale.z;
    }

    else if ((e.key == "x") || (e.key == "y") || (e.key == "z")){
        if (transforming == false) return;

        reset_object_position(selectedObject);

        // If you press the same axis twice, change the axis to the default value
        if (e.key == transformingAxis) transformingAxis = "xz";
        else transformingAxis = e.key;
    }

    else if ((e.key == "X") || (e.key == "Y") || (e.key == "Z")){
        if (transforming == false) return;
        
        reset_object_position(selectedObject);
        if (e.key == "X") transformingAxis = "yz";
        if (e.key == "Y") transformingAxis = "xz";
        if (e.key == "Z") transformingAxis = "xy";
    }

    else if (e.key == "Escape"){
        if (transforming == false) return;

        reset_object_position(selectedObject);

        transforming = false;
        draw_bbox(selectedObject);
        save_project();
    }

    else if (e.key == "d"){
        duplicate_object(selectedObject);
    }
});