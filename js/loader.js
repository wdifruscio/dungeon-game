let assetsToLoad = [];
let assetsLoaded = 0;
//tileset
let image = new Image();



function loadImages() {
    image.addEventListener("load", loadHandler, false);
    image.src = "assets/tileset.png";
    assetsToLoad.push(image);
}


function loadHandler() {
    assetsLoaded++;
    if(assetsLoaded === assetsToLoad.length) {
    //Remove the load handler
    image.removeEventListener("load", loadHandler, false);
    //Build the map
    gameState = BUILD_MAP;
    }
}