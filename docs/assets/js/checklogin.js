var account = false;
var Logged;
if (localStorage.getItem("Logged") === null ) {
    localStorage.setItem("Logged", "false");
}
Logged = JSON.parse(localStorage.getItem("Logged"));
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

var accountText = document.querySelector("header nav:first-of-type li:last-of-type a");
var accountIcon = document.querySelector("header nav:nth-of-type(2) li:last-of-type img");
var welcomeText = document.querySelector("header h1");
var checkLogin = function(){
    if(Logged){
        account = JSON.parse(localStorage.getItem("curAcc"));
        accountText.innerText = "Log uit";
        accountIcon.src = accountIcon.src.split("_off.svg").join(".svg");
        if (window.innerWidth > 420){
            welcomeText.innerText = "Welkom, "+ capitalizeFirstLetter(account.name);
        } else {
            welcomeText.innerText = "Verhalen";
        }
        console.log("logged in");
        accountText.addEventListener("click", function(e){
            e.preventDefault();
            localStorage.setItem("Logged", "false");
            location.reload();
        })
    } else {
        var newSrc = accountIcon.src.split("icon.svg").join("icon_off.svg");
        accountIcon.src = newSrc;
        accountText.innerText = "Log in";
    }
}
checkLogin();

window.addEventListener("resize", function(){checkLogin();});



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
                    console.log(account.saved);
                    setTimeout(function(){
                        savedPopup.classList.remove("active");
                    }, 1000);
                } else {
                    this.classList.remove("active");
                    savedPopup.classList.remove("active");
                    var index = account.saved.indexOf(this.dataset.story);
                    if (index !== -1) {
                        account.saved.splice(index, 1);
                    }
                    console.log(account.saved);
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
