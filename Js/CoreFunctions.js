// ***************
// This file contains some core functions.
// ***************

// This function converts a given hex code into an rgb value.
// it outputs a dictionary with an r, g & b value.
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// This function turns an r, g & b value into a hex code.
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

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

function switch_ui_mode(){
    // Get the root element
    let r = document.querySelector(':root');

    // Get the css styles for the root
    let rs = getComputedStyle(r);

    // if it's currently light mode, change it to dark mode
    if (isLightMode == true){
        r.style.setProperty("--highlightColor", "#4ba3f4");
        r.style.setProperty("--primaryBackgroundColor", "#323232");
        r.style.setProperty("--secondaryBackgroundColor", "#444444");
        r.style.setProperty("--textColor", "#ffffff");

        isLightMode = false;
    } else {
        r.style.setProperty("--highlightColor", "#4ba3f4");
        r.style.setProperty("--primaryBackgroundColor", "#ffffff");
        r.style.setProperty("--secondaryBackgroundColor", "#f5f5f5");
        r.style.setProperty("--textColor", "#000000");

        isLightMode = true;
    }
}

function render_image(){
    
}

document.getElementById("helpWindowCloseBtn").addEventListener("click", function(){ helpWindow.style.display = "none" });