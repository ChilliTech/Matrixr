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

    else if (e.key == "?"){
        if (helpWindow.style.display == "none") helpWindow.style.display = "block";
        else if (helpWindow.style.display == "block") helpWindow.style.display = "none";
    }

    else if (e.key == "q"){
        switch_ui_mode();
    }

    else if (e.key == "e"){
        
    }

    else if (e.key == "r"){
        
    }

    else if (e.key == "t"){
        
    }
});