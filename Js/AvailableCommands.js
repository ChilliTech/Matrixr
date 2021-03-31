// ***************
// This file keeps track of what commands there are
// ***************

let availableCommands = {
    "add_custom_object": {
        "metadata": ["add", "custom", "mesh", "object", "unique", "new", "different"],
        "apply": function(){ add_custom_object() }
    },

    "render": {
        "metadata": ["render", "export"],
        "apply": function(){ render_image() }
    }
}

// This allows you to search through available objects to add a new instance of it into the scene.
for (let key in availableCommands){
    // Avoid looping through everything twice (because of __proto__ objects)
    if (availableCommands.hasOwnProperty(key)){
        let element = add_element(searchMenuResults, "p");
        element.style.color = "var(--highlightColor)";
        element.style.textDecoration = "underline";
        element.innerHTML = key;
        element.addEventListener("click", function(){ 
            availableCommands[key].add()

            update_scene_tree();
            update_property_editor();
            save_project();
        });
    }
}

searchMenuSearchBar.addEventListener("change", function(){
    let searchTerm = searchMenuSearchBar.value;
    searchTerm = searchTerm.toLowerCase();

    // Clear all the search terms:
    searchMenuResults.replaceChildren();
    
    for (let key in availableCommands){
        // Avoid looping through everything twice (because of __proto__ objects)
        if (availableCommands.hasOwnProperty(key)){
            if ((availableCommands[key].metadata.some(item => searchTerm.split(" ").includes(item))) || (searchTerm == "")){
                let element = add_element(searchMenuResults, "p");
                element.style.color = "var(--highlightColor)";
                element.style.textDecoration = "underline";
                element.innerHTML = key;
                element.addEventListener("click", function(){
                    availableCommands[key].apply()

                    update_scene_tree();
                    update_property_editor();
                    save_project();
                });
            }
        }
    }
});