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
var accountPageLink = document.querySelector("header nav:nth-of-type(2) li:last-of-type a");
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
        accountPageLink.addEventListener("click", function(e){
            e.preventDefault();
            localStorage.setItem("Logged", "false");
            location.reload();
        });
        accountText.addEventListener("click", function(e){
            e.preventDefault();
            localStorage.setItem("Logged", "false");
            location.reload();
        });
    } else {
        var newSrc = accountIcon.src.split("icon.svg").join("icon_off.svg");
        accountIcon.src = newSrc;
        accountText.innerText = "Log in";
    }
}
checkLogin();

window.addEventListener("resize", function(){checkLogin();});
