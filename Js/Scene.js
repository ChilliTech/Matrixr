// Keep track of whether an element with the id of "input" is being focused on
let focusing = false;

function is_focused(){
    for (let i = 0; i < document.getElementsByTagName("input").length; i++){
        let inputField = document.getElementsByTagName("input")[i];
        
        inputField.addEventListener("focus", function(){ focusing = true });
        inputField.addEventListener("focusout", function(){ focusing = false });
    }
}

is_focused();