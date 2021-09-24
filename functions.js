// ES5 syntax / old syntax
// Everything is compiled back to ES5
// function increaseSize() {

// }




// ES6 syntax / Fat arrow syntax / lambda expression 
// Preferred
const increaseSize = () => {
    // get font size of class font-class
    let elements = document.getElementsByClassName("font-class");
    console.log(elements)
    for (element of elements) {
        console.log(element.style.fontSize)
        let size = element.style.fontSize;
        let sizeNum = size.split('px')[0];
        
        element.style.fontSize = `${sizeNum + 2}px`;
    }
}

const decreaseSize = () => {
    // get font size of class font-class
    let elements = document.getElementsByClassName("font-class");
    console.log(elements)
    for (element of elements) {
        console.log(element.style.fontSize)
        let size = element.style.fontSize;
        let sizeNum = size.split('px')[0];
        
        element.style.fontSize = `${sizeNum - 2}px`;
    }
}