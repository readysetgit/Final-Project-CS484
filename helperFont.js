function setFontSize(value){
//    get mycontainer element
    var containerName = document.getElementById("myContainer");
    containerName.className = "size-"+value.toLowerCase();
    console.log(containerName.className);

}