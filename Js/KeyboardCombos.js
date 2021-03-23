// This function handles all the keyboard shortcuts for the context editor
document.body.addEventListener("keydown", function(e) {
    if (focusing == true) return;

    // Saving - ctrl + s, or cmd + s
    else if ((e.ctrlKey == true) || (e.metaKey == true)){
        if (e.key == "s"){
            e.preventDefault();
            save_project();
        }
    }

    if (e.key == "x") update_transforms("X");
    if (e.key == "X") update_transforms("Shift + X");
    if (e.key == "y") update_transforms("Y");
    if (e.key == "Y") update_transforms("Shift + Y");
    if (e.key == "z") update_transforms("Z");
    if (e.key == "Z") update_transforms("Shift + Z");

    if (e.key == "e") set_transform_mode("scale");
    if (e.key == "r") set_transform_mode("rotation");
    if (e.key == "t") set_transform_mode("position");

    update_properties_editor();
});
