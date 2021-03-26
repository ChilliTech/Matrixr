// ***************
// This file allows any command to be performed.
// ***************

function run_command(command){
    switch(command){
        case "saveProject":
            save_project();
            break;

        case "resetProject":
            reset_project();
            break;
            
        case "backupProject":
            backup_project();
            break;
             
        case "restoreFromBackup":
            restore_from_backup();
            break;
            
        case "updateSceneTree":
            update_scene_tree();
            break;
        
        case "updateObjectCreator":
            update_object_creator();
            break;
    
        case "updatePropertyEditor":
            update_property_editor();
            break;
            
        default:
            break;
    }
}

// When the page loads or is refreshed, update some stuff
run_command("updateSceneTree");
run_command("updateObjectCreator");
run_command("updatePropertyEditor");