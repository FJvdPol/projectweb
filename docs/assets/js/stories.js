var backButton = document.querySelector("header > a");
backButton.addEventListener("click", function(e){
    e.preventDefault();
    window.history.back();
});


var saveButton = document.querySelector("main > button + section button:nth-of-type(2)");
var savedPopup = document.querySelector("#popup");
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
            if (account.saved.indexOf(button.dataset.story) > -1) {
                button.classList.add("active");
            }
            button.addEventListener("click", function(e){
                e.stopPropagation();
                e.stopImmediatePropagation();
                if (!this.classList.contains("active")){
                    this.classList.add("active");
                    savedPopup.classList.add("active");
                    this.innerText = "Opgeslagen";
                    if(account.saved){
                        account.saved.push(this.dataset.story);
                    } else {
                        account.saved = [];
                        account.saved.push(this.dataset.story);
                    }
                    localStorage.setItem("curAcc", JSON.stringify(account));
                    setTimeout(function(){
                        savedPopup.classList.remove("active");
                    }, 3000);
                } else {
                    this.classList.remove("active");
                    savedPopup.classList.remove("active");
                    this.innerText = "Opslaan";
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
