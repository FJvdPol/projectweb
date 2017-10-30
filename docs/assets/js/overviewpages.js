var Data = {}
var resultContainer = document.querySelector("#resultContainer");


function loadData(url, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", url, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

var dataurl = window.location.href.split("/");
dataurl.pop();
dataurl = dataurl.join("/") + "/assets/data/data.json";
loadData(dataurl, function(result){
    onLoad(result);
});

var stories;

var url = window.location.href.split("/");
url = url[url.length - 1];

var onLoad = function(data){
    Data.all = JSON.parse(data);
    console.log(Data.all.stories);
    allArticles = document.querySelectorAll("#resultContainer article");

    if (allArticles){
        allArticles.forEach(function(article){
            article.remove();
        });
    }

    if (!Logged){return false;}


    if (url === "mijnverhalen.html"){
        updateArticleList(getSavedStories());
    } else if (url === "index.html"){
        updateArticleList(Data.all.stories);
    }


}

function getSavedStories(){
    var account = JSON.parse(localStorage.getItem("curAcc"));
    var savedStories = [];
    if (account.saved){
        account.saved.forEach(function(story){
            Data.all.stories.forEach(function(dataStory){
                if (dataStory.title.toLowerCase() === story){
                    savedStories.push(dataStory);
                }
            });
        });
        return savedStories;
    }
    return false;
}

function updateArticleList(stories) {
    console.log("updateArticleList: ",stories);
    resultContainer.innerHTML = "";
    var articles = [];
    if (!stories.length > 0 || stories === false){
        return false;
    }
    document.querySelector("#resultContainer").classList.add("show");
    var emptyState = document.querySelector("#emptyState");
    if (emptyState){
        emptyState.classList.add("remove");
    }
    stories.forEach(function(story){
        story.link = story.title.split(" ").join("-").toLowerCase();
        var html = "<article><div><img src='"+story.img+"' alt=''></div><ul><li><button aria-label='Like'></button></li><li><button aria-label='Opslaan' data-story='"+story.title.toLowerCase()+"'></button></li><li><button aria-label='Download verhaal'></button></li></ul><h3>"+story.title+"</h3><p>"+story.summary+"</p><a href='verhalen/"+story.link+".html'>Lees meer van '"+story.title+"'</a></article>";
        articles.push(html);
    });
    resultContainer.innerHTML += articles.join(" ");
    articleActionButtons(account);
}

function articleActionButtons(account){
    var savedPopup = document.querySelector("#popup");
    var actionButtons = document.querySelectorAll("main article button");
    if (actionButtons){
        actionButtons.forEach(function(button){
            if (button.dataset.story){
                if (account.saved.indexOf(button.dataset.story.toLowerCase()) > -1) {
                    button.classList.add("active");
                }
                button.addEventListener("click", function(e){
                    if (!this.classList.contains("active")){
                        this.classList.add("active");
                        savedPopup.classList.add("active");
                        account = JSON.parse(localStorage.getItem("curAcc"));
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
                        if (url === "mijnverhalen.html") {
                            updateArticleList(getSavedStories());
                            savedPopup.classList.add("active");
                            setTimeout(function(){
                                savedPopup.classList.remove("active");
                            }, 3000);
                        } else {
                            savedPopup.classList.remove("active");
                        }
                        this.classList.remove("active");
                        account = JSON.parse(localStorage.getItem("curAcc"));
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
}
