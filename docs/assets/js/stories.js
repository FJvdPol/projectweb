var saveButton = document.querySelector("main > button + section button:nth-of-type(2)");
var savedPopup = document.querySelector("main > button ~ div:nth-of-type(2)");
var storyActionButton = document.querySelector("main > button");
var storyActionSection = document.querySelector("main > button + section");
function switchActionButtonState(){
    if (storyActionSection.classList.contains("active")){
        storyActionSection.classList.remove("active");
        storyActionSection.style = " ";
        storyActionButton.style.transform = "rotate(0deg)";
        storyActionButton.setAttribute("aria-label", "open acties");
    } else {
        storyActionSection.classList.add("active");
        TweenLite.to(storyActionSection, 1, {maxWidth: "100%", maxHeight: "100%", ease: Power1.easeOut});
        storyActionButton.style.transform = "rotate(-45deg)";
        storyActionButton.setAttribute("aria-label", "sluit acties");
    }
}

if (storyActionButton){
    storyActionButton.addEventListener("click", function(e){
        e.stopPropagation();
        e.stopImmediatePropagation();
        switchActionButtonState();
    });
}

var actionButtons = document.querySelectorAll("main > button + section button");
if (actionButtons){
    var account = JSON.parse(localStorage.getItem("curAcc"));
    actionButtons.forEach(function(button){
        if (button === saveButton){
            button.addEventListener("click", function(e){
                e.stopPropagation();
                e.stopImmediatePropagation();
                if (!this.classList.contains("active")){
                    this.classList.add("active");
                    savedPopup.classList.add("active");
                    if(account.saved){
                        account.saved.push(this.dataset.story);
                    } else {
                        account.saved = [];
                        account.saved.push(this.dataset.story);
                    }
                    localStorage.setItem("curAcc", JSON.stringify(account));
                    setTimeout(function(){
                        savedPopup.classList.remove("active");
                    }, 1000);
                } else {
                    this.classList.remove("active");
                    savedPopup.classList.remove("active");
                    var index = account.saved.indexOf(this.dataset.story);
                    if (index !== -1) {
                        account.saved.splice(index, 1);
                        localStorage.setItem("curAcc", JSON.stringify(account));
                    }
                }
            });
        } else {
            button.addEventListener("click", function(e){
                e.stopPropagation();
                e.stopImmediatePropagation();
                this.classList.toggle("active");
            });
        }
    });
}
