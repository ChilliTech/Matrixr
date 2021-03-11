// ----------
// Functions to handle modes (translate, rotate, scale, etc) and some of the relevant & associated shortcuts
// ----------

function set_transform_mode(mode){
    // Un-highlight the icon for the transform mode ("transformMode")
    document.getElementById(transformMode + "Icon").src = "./images/" + transformMode + "Icon.svg"

    // Highlight the new image
    let icon = document.getElementById(mode + "Icon");
    icon.src = "./images/" + mode + "IconSelected.svg";

    // Actually change the mode
    transformMode = mode;
}

// Handle keyboard shortcuts
//document.body.addEventListener("keydown", function (e){
function keyboard_shortcut(e){
    let event = window.event ? window.event : e;
    let eventKey = event.key.toLowerCase();
    let eventShiftKey = event.shiftKey? 1 : -1; // integer version of event.shiftKey (1 = shift is pressed, -1 = shift isn't pressed)

    if ((eventKey == "x") || (eventKey == "y") || (eventKey == "z")){
        let mode = undefined;

        // Some simple inline if statements
        mode = ((transformMode == "translate") ? "position" : undefined);
        mode = ((transformMode == "rotate") ? "rotation" : mode);
        mode = ((transformMode == "scale") ? "scale" : mode);

        // If it's rotation, make it degrees not radians (because that will make more sense for users)
        if (mode == "rotation"){
            selectedObject[mode][eventKey] += THREE.Math.degToRad(eventShiftKey * 2);
        } else{
            selectedObject[mode][eventKey] += (eventShiftKey / 2);
        }

        update_project();
    } else if (eventKey == "e"){ // "e" for enlarge (scale - it's next to R & T on a keyboard)
        set_transform_mode("scale");
    } else if (eventKey == "r"){
        set_transform_mode("rotate");
    } else if (eventKey == "t"){
        set_transform_mode("translate");
    } else if (eventKey == "a"){
        open_object_panel();
    }
}