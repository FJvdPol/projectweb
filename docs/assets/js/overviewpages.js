var savedPopup = document.querySelector("#popup");
var actionButtons = document.querySelectorAll("main article button");
if (actionButtons){
    var account = JSON.parse(localStorage.getItem("curAcc"));
    actionButtons.forEach(function(button){
        if (button.dataset.story){
            if (account.saved.indexOf(button.dataset.story.toLowerCase()) > -1)
                    button.classList.add("active");
            }
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
