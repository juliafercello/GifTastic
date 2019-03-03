
//Initial topic array
var topics = ["oh snap", "ugh", "eye roll", "no"];

//function to create the buttons
function displayButtons() {
    $("#buttonHolder").empty();

    // Loops through the topic array and add buttons for each item to the page
    for (var i = 0; i < topics.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("btn btn-secondary m-1 searchTopic");
        newButton.attr("data-search", topics[i]);
        newButton.text(topics[i]);
        newButton.appendTo($("#buttonHolder"));
    }
}

//function that adds a new search option to the list of buttons
$("#submitNewSearch").on("click", function (event) {
    event.preventDefault();
    if ($("#newSearchOption").val().trim().length > 0) {
        var topic = $("#newSearchOption").val().trim();
        topics.push(topic);
        displayButtons();
        $("#newSearchOption").val("");
    }
});

//function that calls giphy and returns images based on selected button/search topic
$(document).on("click", ".searchTopic", displayGifs);

function displayGifs() {
    var searchQuery = $(this).attr("data-search");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchQuery + "&api_key=lh4xNA332h0tpqHHIOJuWBEoMSuYDwrE&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After the data comes back from the API
        .then(function (response) {
            console.log(response);
            var topicGifs = response.data;
            for (var i = 0; i < topicGifs.length; i++) {
                //          if (topicGifs[i].rating !== "r" && topicGifs[i].rating !== "pg-13") {
                var gifDiv = $("<div>");
                gifDiv.addClass("float-left");
                var rating = topicGifs[i].rating;
                var title = topicGifs[i].title; 
                var gifInfo = $("<p>").html("Rating: " + rating);
                var topicImage = $("<img>");
                
                //set src to static image at first
                topicImage.attr("src", topicGifs[i].images.fixed_height_still.url);
                topicImage.attr("src-animate", topicGifs[i].images.fixed_height.url);
                topicImage.attr("src-still", topicGifs[i].images.fixed_height_still.url);
                topicImage.attr("gifState", "still")
                topicImage.addClass("gifTastic float-left m-2")

                gifDiv.append(topicImage);
                gifDiv.append(gifInfo);
                $("#gifHolder").prepend(gifDiv);
            }

            //when user clicks on an image it will change to animated or still
            $(".gifTastic").on("click", function () {

                var state = $(this).attr("gifState");

                if (state === "still") {
                    $(this).attr("src", $(this).attr("src-animate"));
                    $(this).attr("gifState", "animate");
                }
                else {
                    $(this).attr("src", $(this).attr("src-still"));
                    $(this).attr("gifState", "still");
                }
            });
        });
}
//display the initial topic list as buttons
displayButtons();



