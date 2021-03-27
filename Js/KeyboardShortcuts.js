// ***************
// This file allows the user to perform tasks via keyboard shortcuts.
// ***************

document.body.addEventListener("keydown", function(e){
    if (focusing == true) return;

    // Saving - ctrl + s, or cmd + s
    else if ((e.ctrlKey == true) || (e.metaKey == true)){
        if (e.key == "s"){
            e.preventDefault();
            save_project();
        }
    }

    else if (e.key == "e"){
        
    }

    else if (e.key == "r"){
        
    }

    else if (e.key == "t"){
        
    }
});