var account = false;
if (localStorage.getItem("Logged") === null ) {
    localStorage.setItem("Logged", "false");
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

var accountText = document.querySelector("header nav:first-of-type li:last-of-type a");
var accountIcon = document.querySelector("header nav:nth-of-type(2) li:last-of-type img");
var welcomeText = document.querySelector("header h1");
var checkLogin = function(){
    if(JSON.parse(localStorage.getItem("Logged"))){
        account = JSON.parse(localStorage.getItem("curAcc"));
        accountText.innerText = "Log uit";
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
        accountText.innerText = "Log in";
    }
}
checkLogin();

window.addEventListener("resize", function(){checkLogin();});
