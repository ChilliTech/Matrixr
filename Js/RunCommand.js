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
            
        default:
            break;
    }
}