// ***************
// This file populates the object creator panel
// ***************

// This allows you to search through available objects to add a new instance of it into the scene.
for (let key in availableObjects){
    // Avoid looping through everything twice (because of __proto__ objects)
    if (availableObjects.hasOwnProperty(key)){
        let element = add_element(objectCreatorResults, "p");
        element.style.color = "var(--highlightColor)";
        element.style.textDecoration = "underline";
        element.innerHTML = key;
        element.addEventListener("click", function(){ availableObjects[key].add() });
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
                element.addEventListener("click", function(){ availableObjects[key].add() });
                save_project();
            }
        }
    }
});