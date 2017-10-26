var beams = document.querySelectorAll("body > div");

function moveBeam(beam){
    beams.forEach(function(beam){
        beam.style = "";
    });
    var randomDeg = Math.random() * 3 + 2.5;
    var randomDist = Math.random() * 1 + 2.5;
    for (var i = 0; i < beams.length; i++){
        if (beams[i] === beam){
            beams[i-1].style.transform = "rotateX(45deg) translateY(-"+randomDist+"vh)";
            beam.style.transform = "rotateX(55deg) translateY("+randomDist+"vh) rotate("+randomDeg+"deg)";
        }
    }
}

beams.forEach(function(beam){
    beam.addEventListener("mousedown", function(){moveBeam(beam)});
});
