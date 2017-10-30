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

var url = window.location.href.split("/")
url.pop();
url = url.join("/") + "/assets/data/data.json";
loadData(url, function(result){
    onLoad(result);
});


var onLoad = function(data){
    Data.all = JSON.parse(data);
    console.log(Data.all.stories);
    allArticles = document.querySelectorAll("#resultContainer article");
    allArticles.forEach(function(article){
        article.remove();
    });
    var articles = [];
    Data.all.stories.forEach(function(story){
        story.link = story.title.split(" ").join("-").toLowerCase();
        console.log(story.link);
        var html = "<article><img src='"+story.img+"' alt=''><ul><li><button aria-label='Like'></button></li><li><button aria-label='Opslaan' data-story='"+story.title.toLowerCase()+"'></button></li><li><button aria-label='Download verhaal'></button></li></ul><h3>"+story.title+"</h3><p>"+story.summary+"</p><a href='verhalen/"+story.link+".html'>Lees meer van '"+story.title+"'</a></article>";
        articles.push(html);
    });
    resultContainer.innerHTML += articles.join(" ");
}
