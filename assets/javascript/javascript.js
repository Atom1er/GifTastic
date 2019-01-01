// Globable variables
var UserInput = $("#UserInput");
var UserButton = $(".UserButton");
var submitButton = $("#submitButton");
var result = $("#result");
var error = $("#error");
var test;
var animation;
var active = false;
// List of Button
var list = ['cat', 'Ferrari 250GT', 'Herbie The Love Bug', 'Batmobile', 'Chrysler LeBaron Wagon', 'Dodge Charger', 'Alfa Romeo 33 Stradale'];


ButtonGenerator();
clickEvent();
// animation();

// Adding button on click
submitButton.on('click', function () {
    console.log("ON SUBMITBUTTON ");
    var input = UserInput.val();
    if (input !== "" && input !== test) {
        list.push(input);
        UserButton.empty();
        ButtonGenerator();
        test = input;
    } else if (input === test) {
        error.css('display', 'block');
        error.text('Please enter a different search word!');
    };
    clickEvent();
});

// button Generator
function ButtonGenerator() {
    console.log("BUTTON GENERATOR");
    error.css('display', 'none');
    for (var i = 0; i < list.length; i++) {
        var button = $('<button>');
        button.text(list[i]);
        button.attr('value', list[i]);
        var essaie = button.val();
        console.log(essaie);
        button.attr('class', 'click btn btn-outline-success my-2 my-sm-0');
        UserButton.append(button);
    };
};


// AJAX JSON
function clickEvent() {
    // animation();
    $(".click").on('click', function () {
        console.log("ON CLICK EVENT FUNCTION");
        result.empty();
        var chosen = $(this).attr('value');
        // console.log(chosen);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + chosen + "&api_key=jTOJZ7sLc7MuRO7bchfas0KBgAIXTRxr&limit=10";
        // console.log(queryURL);
        var qURL = $.get(queryURL);
        qURL.done(function (response) {
            console.log(response);
            for (var j=0 ; j<10 ; j++){
                var img = $("<img>");
                img.attr('src', response.data[j].images.fixed_height_still.url);
                img.data('data-still', response.data[j].images.fixed_height_still.url);
                img.data('data-animated', response.data[j].images.fixed_height.url);
                img.data('data-state', "still");
                img.attr('class', 'response');
                result.prepend(img);
            }
            
            animation();
        });
        
        
        // Working
        //var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +chosen+ "&api_key=jTOJZ7sLc7MuRO7bchfas0KBgAIXTRxr&limit=5";
        // $.ajax({
        //     url: queryURL,
        //     method: "GET"
        // }).then(function(response){
        //     console.log(response);
        // })

    })
}

function animation(){
    $(".response").on('click', function(){
        var state = $(this).data('data-state');
        console.log(state);
        if(state === "still"){
            var animation = $(this).data('data-animated');
            $(this).attr('src', animation);
            $(this).data('data-state',"animate");
            state = $(this).data('data-state');
        }else if(state === "animate"){
            var animation = $(this).data('data-still');
            $(this).attr('src', animation);
            $(this).data('data-state',"still");
            state = $(this).data('data-state');
        }
    })

}



