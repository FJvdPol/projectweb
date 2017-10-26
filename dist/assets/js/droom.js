var slide = 0;
var container = document.querySelector("main article");
var nextSlide;

function moveToNextSlide(){
    slide += 1;
    curSlide = document.querySelector("main div:nth-of-type("+slide+")");
    nextSlide = document.querySelector("main div:nth-of-type("+(slide+1)+")");
    if (!nextSlide) {
        return false;
    }
    // TweenLite.to(curSlide, 1.6, {opacity: 0, ease: Power2.easeOut});
    TweenLite.to(container, 1.6, {y: "-"+ nextSlide.offsetHeight * slide, ease: Power2.easeOut});
}


document.querySelector("main").addEventListener("click", function(){
    moveToNextSlide();
});
