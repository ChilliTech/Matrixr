// ----------
// Setup backing up the scene, and restoring it from a backup
// ----------

// Function to save the scene to localstorage
function save_project(){
    let sceneStr = JSON.stringify(scene);
    localStorage.setItem("scene", sceneStr);
}

// Function to restore the scene from a localStorage backup
function restore_from_save(){
    let sceneStr = localStorage.getItem("scene");
    let sceneStrJSON = JSON.parse(sceneStr);
    scene = new THREE.ObjectLoader().parse(sceneStrJSON);

    selectedObject = scene;
}

// Function to save a downloaded backup file of the scene
function backup_project(){
    let filename = prompt("Please enter a name for your downloaded backup file:", "");
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
}

// Function to restore from a downloaded backup file.
function restore_from_backup(){
    let upload = document.createElement("INPUT");
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

            // Select the root object in the THREE.js scene
            selectedObject = scene;

            // Although in the html the file - which this function is in - hasn't loaded yet, 
            // by the time the user runs this function it will have loaded (I think)
            update_sceneTree();
        }

        if (file){
            reader.readAsText(file);
        }
    }
}

function reset_project(){
    if (confirm("Are you sure you want to reset the whole project (it will clear everything you have saved - unless you have downloaded a backup)?")){
        localStorage.clear();
        window.location.reload(); // Reload the page
    }
}

// Restore from localstorage whenever the page is refreshed, and this code is run
restore_from_save();