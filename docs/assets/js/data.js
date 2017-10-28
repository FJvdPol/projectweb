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
loadData(url, onLoad(data));


var onLoad = function(result){
    Data.all = JSON.parse(result);
    console.log(Data.all.stories);
    var articles = [];
    Data.all.stories.forEach(function(story){
        story.link = story.title.split(" ").join("-").toLowerCase();
        console.log(story.link);
        var html = "<article><img src='https://unsplash.it/400/200' alt=''><ul><li>Like</li><li>Save</li><li>Download</li></ul><h3>"+story.title"+</h3>            <p>"+story.summary+"</p><a href='verhalen/"+story.link+".html'>Lees meer van '"+story.title+"'</a></article>";
        articles.push(html);
    });
    resultContainer.innerHTML = articles.join(" ");
}
