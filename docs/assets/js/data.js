var Data = {}


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
    Data.all = JSON.parse(result);
    console.log(Data.all.stories);
});
