// ***************
// This file populates the object creator panel
// ***************

function add_object(key){
    objectParameterMenu.style.display = "grid";
    objectParameterMenu.replaceChildren();

    let btns = add_element(objectParameterMenu, "p");
    btns.style.margin = "0px";

    // Add the submit btn:
    let submitBtn = add_element(btns, "p");
    submitBtn.innerHTML = "&#8677";
    submitBtn.style.marginTop = "0px";
    submitBtn.style.float = "left";
    submitBtn.classList.add("hover");
    submitBtn.addEventListener("click", function(){
        objectParameterMenu.style.display = "none";
        availableObjects[key].add();

        update_scene_tree();
        update_property_editor();
        save_project();
    });

    // Add the close btn
    let closeBtn = add_element(btns, "span");
    closeBtn.innerHTML = "&#x2715";
    closeBtn.classList.add("closeBtn");
    closeBtn.addEventListener("click", function(){
        objectParameterMenu.style.display = "none";
    });

    if (Object.keys(availableObjects[key].parameters).length == 0){
        objectParameterMenu.style.display = "none";
        availableObjects[key].add();

        update_scene_tree();
        update_property_editor();
        save_project();
    }

    // Add the input fields with the parameters
    for (let param in availableObjects[key].parameters){
        let paramInputField = add_input_field(objectParameterMenu, param + ": ", "number", availableObjects[key].parameters[param]);
        paramInputField.addEventListener("change", function(){
            availableObjects[key].parameters[param] = paramInputField.value;
        });
    }
}

// This allows you to search through available objects to add a new instance of it into the scene.
for (let key in availableObjects){
    // Avoid looping through everything twice (because of __proto__ objects)
    if (availableObjects.hasOwnProperty(key)){
        let element = add_element(objectCreatorResults, "p");
        element.style.color = "var(--highlightColor)";
        element.style.textDecoration = "underline";
        element.innerHTML = key;
        element.addEventListener("click", function(){
            add_object(key);
        });
    }
}

objectSearchBar.addEventListener("change", function(){
    let searchTerm = objectSearchBar.value;
    searchTerm = searchTerm.toLowerCase();

    // Clear all the search terms:
    objectCreatorResults.replaceChildren();
    
    for (let key in availableObjects){
        // Avoid looping through everything twice (because of __proto__ objects)
        if (availableObjects.hasOwnProperty(key)){
            if ((availableObjects[key].metadata.some(item => searchTerm.split(" ").includes(item))) || (searchTerm == "")){
                let element = add_element(objectCreatorResults, "p");
                element.style.color = "var(--highlightColor)";
                element.style.textDecoration = "underline";
                element.innerHTML = key;
                element.addEventListener("click", function(){
                    add_object(key);
                });
            }
        }
    }
});