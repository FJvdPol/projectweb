var Search = {
    form: document.querySelector("#search-form"),
    inputs: [
        document.querySelector("#search-input-zoekwoord"),
        document.querySelector("#search-input-sfeerwoord"),
        document.querySelector("#search-input-kleur")
    ],
    submit: document.querySelector("#search-form input[type='submit']"),
    onFormSubmit: function(){
        Search.values = [Search.input[0].value, Search.input[1].value, Search.input[2].value];
        console.log(Data.all.stories);
    }
}

Search.submit.addEventListener("click", function(e){
    e.preventDefault();
    Search.onFormSubmit();
});
