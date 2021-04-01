// ***************
// This file allows the saving of the scene.
// ***************

// This procedure resets everything that the user had saved - in localStorage.
function new_project(){
    if (!confirm(resetProjectPrompt)) return;

    localStorage.clear();
    window.location.reload();
}

// This procedure saves the scene to localstorage
function save_project(){
    scene.remove(selectedObjectBBox);
    localStorage.setItem("scene", JSON.stringify(scene));
    scene.add(selectedObjectBBox);
    display_message("Your project has been saved.");
}

// This procedure restores the scene from a localStorage backup
function restore_from_save(){
    let sceneStr = localStorage.getItem("scene");

    if (sceneStr == null) return;

    let sceneStrJSON = JSON.parse(sceneStr);
    scene = new THREE.ObjectLoader().parse(sceneStrJSON);

    select_object(scene);
}

// This procedure creates a TXT backup file with a custom name of everything the user has in "scene".
function backup_project(){
    scene.remove(selectedObjectBBox);
    let filename = prompt(backupFileNamePrompt, "");
    if (filename == null){
        return;
    } else if (filename == ""){
        filename = scene.name;
    }

    let data = JSON.stringify(scene);
    let type = "txt";
    let file = new Blob([data], {type: type});

    // IE10+
    if (window.navigator.msSaveOrOpenBlob){
        window.navigator.msSaveOrOpenBlob(file, filename);
    }

    // Others
    else {
        let a = document.createElement("a");
        let url = URL.createObjectURL(file);

        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();

        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }

    scene.add(selectedObjectBBox);
}

// This procedure restores the scene from a previously created TXT backup file
function restore_from_backup(){
    let upload = document.createElement("INPUT");
    upload.style.display = "none";
    upload.setAttribute("type", "file");
    document.body.appendChild(upload);

    upload.addEventListener('change', readURL, true);
    upload.click();

    function readURL(){
        let file = upload.files[0];
        let reader = new FileReader();

        reader.onloadend = function(){
            let sceneStr = reader.result;
            let sceneStrJSON = JSON.parse(sceneStr);
            scene = new THREE.ObjectLoader().parse(sceneStrJSON);

            // Select the root object in the THREE.js scene.
            save_project();
            select_object(scene);
            upload.parentElement.removeChild(upload);
        }

        if (file){
            reader.readAsText(file);
        }
    }
}

// When the file is refreshed or opened, this file (along with all the other source files) will be run.
// So, when you refresh or open the page, it'll run this function.
restore_from_save();

// Save the project when the page is left
window.onbeforeunload = function(){
    //save_project();
}