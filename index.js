let state = document.getElementById("dark")
// Using TinyColor
const isMatch = tinycolor.equals( 'rgb(128 115 115)'); // true

let bgcolor = window.getComputedStyle(document.body).getPropertyValue("background-color");

state.addEventListener(darkMode(bgcolor))

function darkMode(color) {
    if(color === '#000000'){
        return 0;
    }else {

    }
}