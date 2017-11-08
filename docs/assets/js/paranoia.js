var output = document.querySelector("#output");
var allImg = document.querySelectorAll("main img");

var xPos;
var yPos;

if (window.innerWidth < 768){
    document.querySelector("main").addEventListener("click", function(e){
        checkMousePos(e);
    });
} else {
    document.querySelector("main").addEventListener("mousemove", function(e){
        checkMousePos(e);
    });
}
function checkMousePos(e){
    if (e.clientX < window.innerWidth / 3) { //west side
        xPos = "w";
    } else if (e.clientX > window.innerWidth / 3 * 2) { // east
        xPos = "e"
    } else { // middle side
        xPos = "";
    }
    if (e.clientY < window.innerHeight / 3){ // north side
        yPos = "n";
    } else if (e.clientY > window.innerHeight / 3 * 2){ //south side
        yPos = "s"
    } else { //middle side
        yPos = "";
    }
    updateImages(yPos+xPos);
}

function updateImages(source){
    if (source === ""){
        source = "sw";
    }
    source += ".png";
    allImg.forEach(function(img){
        var src = img.src.split("_");
        src.splice(2,1)
        src.push(source)
        src = src.join("_");
        console.log(src);
        img.src = src;
    });
}
