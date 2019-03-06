//Initial topic array
var topics = ["oh snap", "dubious", "eye roll", "no", "nailed it"];
var offsetNum = 0;

//function to create the buttons
function displayButtons() {
    $("#buttonHolder").empty();

    // Loops through the topic array and add buttons for each item to the page
    for (var i = 0; i < topics.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("btn btn-secondary m-1 searchTopic");
        newButton.attr("data-search", topics[i]);
        newButton.attr("offset", offsetNum);
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
function displayGifs() {
    var searchQuery = $(this).attr("data-search");
    var searchOffset = $(this).attr("offset");

    //increase offset parameter by 10 so user gets new gifs on a repeat button click
    var nextOffset = parseInt($(this).attr("offset")) + 10;
    $(this).attr("offset", nextOffset);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchQuery + "&api_key=lh4xNA332h0tpqHHIOJuWBEoMSuYDwrE&limit=10&offset=" + searchOffset;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After the data comes back from the API
        .then(function (response) {
            console.log(response);
            var topicGifs = response.data;
            for (var i = 0; i < topicGifs.length; i++) {
                var gifDiv = $("<div>");
                gifDiv.addClass("float-left");
                var rating = topicGifs[i].rating;
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
        });
}

//when user clicks on an image it will change to animated or still
function animate() {
    var state = $(this).attr("gifState");

    if (state === "still") {
        $(this).attr("src", $(this).attr("src-animate"));
        $(this).attr("gifState", "animate");
    }
    else {
        $(this).attr("src", $(this).attr("src-still"));
        $(this).attr("gifState", "still");
    }
};

//display the initial topic list as buttons
displayButtons();

//Display gifs when the user clicks on a search topic
$(document).on("click", ".searchTopic", displayGifs);

//Animate or Pause the gifs when clicked
$(document).on("click", ".gifTastic", animate);