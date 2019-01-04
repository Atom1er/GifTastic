// Globable variables
var UserInput = $("#UserInput");
var UserButton = $(".UserButton");
var submitButton = $("#submitButton");
var result = $("#result1");
var result2 = $("#result2");
var error = $("#error");
var test;
var animation;
var active = false;
// List of Button
var topics = ['toyota', 'Ferrari 250GT', 'Herbie The Love Bug', 'Batmobile', 'Chrysler LeBaron Wagon', 'Dodge Charger', 'Alfa Romeo 33 Stradale'];


ButtonGenerator();
clickEvent();
// animation();

// Adding button on click
submitButton.on('click', function () {
    console.log("ON SUBMITBUTTON ");
    var input = UserInput.val();
    if (input !== "" && input !== test) {
        topics.push(input);
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
    for (var i = 0; i < topics.length; i++) {
        var button = $('<button>');
        button.text(topics[i]);
        button.attr('value', topics[i]);
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
        result2.empty();
        var chosen = $(this).attr('value');
        // console.log(chosen);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + chosen + "&api_key=jTOJZ7sLc7MuRO7bchfas0KBgAIXTRxr&limit=20";
        // console.log(queryURL);
        var qURL = $.get(queryURL);
        qURL.done(function (response) {
            var table = $("<table>");
            table.css('class', 'table');
            console.log(response);
            for (var j=0 ; j<10;){
                var tr =$("<tr>");
                for (var t = 0; t < 2; t++){
                    var td = $("<td>");
                    var img = $("<img>");
                    var figcaption = $("<figcaption>");
                    var fig;
                    img.attr('src', response.data[j].images.fixed_height_still.url);
                    img.data('data-still', response.data[j].images.fixed_height_still.url);
                    img.data('data-animated', response.data[j].images.fixed_height.url);
                    img.data('data-state', "still");
                    img.attr('class', 'response img-fluid');
                    fig = response.data[j].rating;
                    figcaption.text("rating: "+fig);
                    td.append(img, figcaption);
                    tr.append(td);
                    table.append(tr);
                    // result.prepend(figcaption);
                    result.prepend(table);
                    j++;
                }


            }
            animation();
            $("#more").on('click', function(){
                result2.empty();
                for (var j=0 ; j<10;){
                    var tr =$("<tr>");
                    for (var t = 0; t < 2; t++){
                        var td = $("<td>");
                        var img = $("<img>");
                        var figcaption = $("<figcaption>");
                        var fig;
                        var n = j+10;
                        img.attr('src', response.data[n].images.fixed_height_still.url);
                        img.data('data-still', response.data[n].images.fixed_height_still.url);
                        img.data('data-animated', response.data[n].images.fixed_height.url);
                        img.data('data-state', "still");
                        img.attr('class', 'response img-fluid');
                        fig = response.data[n].rating;
                        figcaption.text("rating: "+fig);
                        td.append(img, figcaption);
                        tr.append(td);
                        table.append(tr);
                        result2.prepend(table);
                        j++;
                    }
                }
                animation();
                $("#more").css('display','none');
            });
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
    $("#ShowMore").css('display','block');
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



