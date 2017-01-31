let assetsToLoad = [];
let assetsLoaded = 0;
//tileset
let image = new Image();

image.addEventListener("load", loadHandler, false);
image.src = "assets/tileset.png";
assetsToLoad.push(image);

function loadImages() {

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