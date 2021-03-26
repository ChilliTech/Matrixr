// This function adds an element inside another html element in javascript
function add_element(htmlElement, nodeType){
    let node = document.createElement(nodeType);
    htmlElement.appendChild(node);

    return node;
}

// This function displays a message in the header
function display_message(message){
    // Remove the current message from the header (if there is one)
    let headerMessage = document.getElementById("headerMessage");
    if (headerMessage != null){
        headerMessage.parentElement.removeChild("headerMessage");
    }
    console.log(header)
    let messageParagraph = add_element(header, "a");
    messageParagraph.innerHTML = message;
    messageParagraph.style.fontSize = "16px";
    messageParagraph.setAttribute("id", "headerMessage")

    // Remove the error message after a delay - if it hasn't already been removed
    setInterval(
        function(){
            if (messageParagraph.parentElement != null){
                messageParagraph.parentElement.removeChild(messageParagraph);
            }
        },
        6000
    );
}
