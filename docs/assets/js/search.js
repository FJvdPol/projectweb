var backButton = document.querySelector("header li:first-of-type a");
backButton.addEventListener("click", function(e){
    e.preventDefault();
    window.history.back();
});

var Search = {
    form: document.querySelector("#search-form"),
    inputs: [
        document.querySelector("#search-input-zoekwoord"),
        document.querySelector("#search-input-sfeerwoord"),
        document.querySelector("#search-input-kleur")
    ],
    mobForm: document.querySelector("header form"),
    onFormSubmit: function(){
        updateArticleList(Data.all.stories);
    }
}
Search.mobForm.addEventListener("submit", function(e){
    e.preventDefault();
    Search.onFormSubmit();
})
Search.form.addEventListener("submit", function(e){
    e.preventDefault();
    Search.onFormSubmit();
});
