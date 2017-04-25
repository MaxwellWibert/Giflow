var genres = ["Cats", "Donald Trump", "Ultraman", "Hummus"];
renderButtons();

function displayGifs(){
	var genre = $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + genre + "&api_key=dc6zaTOxFJmzC";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		for(var i = 0; i < 10; i++){
			console.log(response.data[i])
			var imgURL = response.data[i].images.original.url;
			var stillURL = response.data[i].images.original_still.url;
			var rating = response.data[i].rating;
			var ratingPlusGif = $("<div>");
			var ratingElement = $("<h2>");
			var imageElement = $("<img>");
			ratingElement.html("Rating: " + rating);
			imageElement.attr("src", stillURL);
			imageElement.attr("data-state", "still");
			imageElement.attr("data-still", stillURL);
			imageElement.attr("data-animate", imgURL);
			imageElement.addClass("gif");

			ratingPlusGif.append(ratingElement);
			ratingPlusGif.append(imageElement);

			$("#gif-div").prepend(ratingPlusGif);
		}
		
		$(".gif").on("click", function(){
			let state = $(this).attr("data-state");
			if(state === "still"){
				$(this).attr("src", $(this).attr("data-animate"));
		     	$(this).attr("data-state", "animate");
			}else{
		    	$(this).attr("src", $(this).attr("data-still"));
		     	$(this).attr("data-state", "still");
			}
		});
	});
}

function renderButtons(){
	$("#buttons-view").empty();

	for (var i = 0; i < genres.length; i++){
		var a = $("<button>");

		a.addClass("genre");

		a.attr("data-name", genres[i]);

		a.text(genres[i]);

		$("#buttons-view").append(a);
	}
}

$("#add-genre").on("click", function(event){
	event.preventDefault();
	var genre = $("#genre-input").val().trim();

	genres.push(genre);

	renderButtons();
});

$(document).on("click", ".genre", displayGifs);




