


// Nicole ---------------------------------------


// Global Variables
var selectedFilter;


// Write restaurant filters to the page on page load as well as AJAX response as a default setting
$(document).ready(function () {

	loadRestaurantFilters(); 
	restaurantAJAX();
	console.log("Default Filters: " + $(".default").text());

});


function loadRestaurantFilters() { 
	// Change filter listing
	$("#filterList").html("<option class='all-food default'>Whatcha craving? (Everything!)</option> <option class='american'>American</option> <option class='bbq'>BBQ/Steakhouse</option>" 
	+ "<option class='breakfast'>Breakfast</option> <option class='chinese'>Chinese</option> <option class='coffee'>Coffee Shops</option> <option class='delis'>Delis</option>"
	+ "<option class='fast-food'>Fast Food</option> <option class='french'>French</option> <option class='greek'>Greek</option> <option class='dessert'>Ice Cream/Dessert</option>"
	+ "<option class='indian'>Indian</option> <option class='italian'>Italian</option> <option class='japanese'>Japanese</option> <option class='mexican'>Mexican</option>"
	+ "<option class='pizza'>Pizza</option> <option class='seafood'>Seafood</option> <option class='spanish'>Spanish</option> <option class='thai'>Thai</option>");
	$("option").addClass("currentFilterOptions");
}


function loadMovieFilters() {
	$("#filterList").html("<option class='all-movies default'>Whatcha wanna see? (No idea!)</option> <option class='action'>Action/Adventure</option> <option class='comedy'>Comedy</option>"
	+ "<option class='drama'>Drama</option> <option class='horror'>Horror</option> <option class='kids'>Kids/Family</option> <option class='romance'>Romance</option>"
	+ "<option class='sci-fi'>Sci-Fi</option> <option class='suspense'>Suspense/Thriller</option>");
	$("option").addClass("currentFilterOptions");
}


function loadEventFilters() {
	$("#filterList").html("<option class='all-events default'>Whatcha interested in? (Show me it all!)</option>"

	+ "<optgroup label='Arts/Entertainment'> <option class='all-entertainment'>All Entertainment</option>"
	+ "<option class='art'>Art Exhibitions</option> <option class='carnivals'>Carnivals</option> <option class='comedy'>Comedy Shows</option> <option class='kids'>Kids' Events</option>"
	+ "<option class='theatre'>Theatre</option> </optgroup>"

	+ "<optgroup label='Concerts'> <option class='all-concerts'>All Concerts</option>"
	+ "<option class='classical'>Classical</option> <option class='country'>Country</option> <option class='hip-hop'>Hip-Hop</option> <option class='jazz'>Jazz</option>"
	+ "<option class='music-festivals'>Music Festivals</option> <option class='reggae'>Reggae</option> <option class='rock'>Rock</option> </optgroup>"

	+ "<optgroup label='Sporting Events'> <option class='all-sports'>All Sporting Events</option>"
	+ "<option class='baseball'>Baseball</option> <option class='basketball'>Basketball</option> <option class='football'>Football</option> <option class='golf'>Golf</option>"
	+ "<option class='horse-racing'>Horse Racing</option> <option class='hockey'>Ice Hockey</option> <option class='nascar'>Nascar</option> <option class='soccer'>Soccer</option>"
	+ "<option class='tennis'>Tennis</option> </optgroup>");
	$("option").addClass("currentFilterOptions");
}


function selectFilter() {
	$("select.filters").change(function () {
		selectedFilter = $(".filters option:selected").text();
		console.log("User Selected Filter: " + selectedFilter);
		// Write AJAX response information to the page based on selected filter

		// if(selectedFilter === "Action/Adventure") {
				// 
			// }

	})
}
selectFilter();


function restaurantAJAX() { 
	// Write AJAX restaurant response information to the page
	$("#eventInfo").empty();
	$("#eventImage").empty();
	var restaurant1 = $("<div><h3>Restaurant 1</h3><a class='my-favorite' href='#'><i class='fa fa-heart fa-lg'></i></a></div>").addClass("food-listing");
	var restaurant2 = $("<div><h3>Restaurant 2</h3><a class='my-favorite' href='#'><i class='fa fa-heart fa-lg'></i></a></div>").addClass("food-listing");
	var restaurant3 = $("<div><h3>Restaurant 3</h3><a class='my-favorite' href='#'><i class='fa fa-heart fa-lg'></i></a></div>").addClass("food-listing");
	// Write AJAX restaurant images to the page
	var restaurantImage1 = $("<img>").addClass("food-listing-image");
	restaurantImage1.attr("src", "http://via.placeholder.com/350x150");
	var restaurantImage2 = $("<img>").addClass("food-listing-image");
	restaurantImage2.attr("src", "http://via.placeholder.com/350x150");
	var restaurantImage3 = $("<img>").addClass("food-listing-image");
	restaurantImage3.attr("src", "http://via.placeholder.com/350x150");

	$("#eventInfo").append(restaurant1);
	$("#eventInfo").append(restaurant2);
	$("#eventInfo").append(restaurant3);

	$("#eventImage").append(restaurantImage1);
	$("#eventImage").append(restaurantImage2);
	$("#eventImage").append(restaurantImage3);
}


function movieAJAX() {
	// Write all AJAX response information to the page upon category click
	$("#eventInfo").empty();
	$("#eventImage").empty();
	var movie1 = $("<div><h3>Movie 1</h3><a class='my-favorite' href='#'><i class='fa fa-heart fa-lg'></i></a></div>").addClass("movie-listing");
	var movie2 = $("<div><h3>Movie 2</h3><a class='my-favorite' href='#'><i class='fa fa-heart fa-lg'></i></a></div>").addClass("movie-listing");
	var movie3 = $("<div><h3>Movie 3</h3><a class='my-favorite' href='#'><i class='fa fa-heart fa-lg'></i></a></div>").addClass("movie-listing");
		// Write AJAX restaurant images to the page
	var movieImage1 = $("<img>").addClass("movie-listing-image");
	movieImage1.attr("src", "http://via.placeholder.com/350x150");
	var movieImage2 = $("<img>").addClass("movie-listing-image");
	movieImage2.attr("src", "http://via.placeholder.com/350x150");
	var movieImage3 = $("<img>").addClass("movie-listing-image");
	movieImage3.attr("src", "http://via.placeholder.com/350x150");

	$("#eventInfo").append(movie1);
	$("#eventInfo").append(movie2);
	$("#eventInfo").append(movie3);

	$("#eventImage").append(movieImage1);
	$("#eventImage").append(movieImage2);
	$("#eventImage").append(movieImage3);
}


function eventAJAX() {
	// Write all AJAX response information to the page upon category click
	$("#eventInfo").empty();
	$("#eventImage").empty();
	var event1 = $("<div><h3>Event 1</h3><a class='my-favorite' href='#'><i class='fa fa-heart fa-lg'></i></a></div>").addClass("event-listing");
	var event2 = $("<div><h3>Event 2</h3><a class='my-favorite' href='#'><i class='fa fa-heart fa-lg'></i></a></div>").addClass("event-listing");
	var event3 = $("<div><h3>Event 3</h3><a class='my-favorite' href='#'><i class='fa fa-heart fa-lg'></i></a></div>").addClass("event-listing");
		// Write AJAX restaurant images to the page
	var eventImage1 = $("<img>").addClass("event-listing-image");
	eventImage1.attr("src", "http://via.placeholder.com/350x150");
	var eventImage2 = $("<img>").addClass("event-listing-image");
	eventImage2.attr("src", "http://via.placeholder.com/350x150");
	var eventImage3 = $("<img>").addClass("event-listing-image");
	eventImage3.attr("src", "http://via.placeholder.com/350x150");

	$("#eventInfo").append(event1);
	$("#eventInfo").append(event2);
	$("#eventInfo").append(event3);

	$("#eventImage").append(eventImage1);
	$("#eventImage").append(eventImage2);
	$("#eventImage").append(eventImage3);
}


function loadSearchScreen() {
	loadRestaurantFilters(); 
	restaurantAJAX();
	$(".login").hide();
	$(".new-account").hide();
	$(".bored-label").show();
	$(".bored-input").show();
	$("#filterList").show();
	$(".category-buttons").show();
	$(".bored-label").show();
	$(".bored-input").show();
	$(".category").removeAttr("id", "selected");
	$(".cat-restaurants").attr("id", "selected");
}


function loadSignInScreen() {
	$("#eventInfo").empty();
	$("#eventImage").empty();
	$(".bored-label").hide();
	$(".bored-input").hide();
	$("#filterList").hide();
	$(".category-buttons").hide();
	var signInScreen = ($("<h2 class='login-heading'>Login</h2><br><h5 class='create-account'><a href='#'>New User? Create an Account</a></h5>"
									+ "<div class='row'><div class='col-md-12'><div class='form-group login-form'>"
									+ "<input type='text' class='form-control' id='userName' placeholder='First Name'>"
									+ "<input type='password' class='form-control' id='userPassword' placeholder='Password'>"
									+ "<input type='email' class='form-control' id='userEmail' placeholder='Email'></div></div></div>"
								  + "<button type='submit' class='btn btn-default login-submit-button submit-button'>Submit</button>"
									));

	$(signInScreen).addClass("login");
	$("#eventView").append(signInScreen);
}


function loadCreateAccountScreen() {
	var createAccountScreen = ($("<h2 class='login-heading'>Create Account</h2><br><h5 class='create-account'><a href='#'>New User? Create an Account</a></h5>"
									+ "<div class='row'><div class='col-md-12'><div class='form-group login-form'>"
									+ "<input type='text' class='form-control' id='userName' placeholder='First Name'>"
									+ "<input type='password' class='form-control' id='userPassword' placeholder='Password'>"
									+ "<input type='password' class='form-control' id='userPassword' placeholder='Confirm Password'>"
									+ "<input type='email' class='form-control' id='userEmail' placeholder='Email'></div></div></div>"
								  + "<button type='submit' class='btn btn-default login-submit-button submit-button'>Submit</button>"
									));

	$(createAccountScreen).addClass("new-account");
	$(".login").hide();
	$("#eventView").append(createAccountScreen);
}




// All on click events
$(document).on("click", ".search", function() {
	$(".sign-in").prop("disabled", false);
	loadSearchScreen();
});


$(document).on("click", ".sign-in", function() {
	$(".sign-in").prop("disabled", true);
	$(".new-account").hide();
	loadSignInScreen();
});

$(document).on("click", ".create-account", function() {
	loadCreateAccountScreen();
	$(".create-account").hide();
});

$(document).on("click", ".bored-submit-button", function(event) {
	event.preventDefault();
	$(".bored-label").hide();
	$(".bored-input").hide();
});


// On click events for categories - List different options in each category
$(document).on("click", ".category", function() {
	$(".cat-restaurants").removeAttr("id", "selected");
	$(".category").removeAttr("id", "selected");
	$(this).attr("id", "selected");


	if($(this).hasClass("cat-restaurants")) {
		// Change filter listing
		loadRestaurantFilters();
		// Retrieve default filters on category click with ".default"
		console.log("Default Filters: " + $(".default").text());
		// Write all AJAX response information to the page upon category click
		restaurantAJAX();
	}


	if($(this).hasClass("cat-movies")) {
		// Change filter listing
		loadMovieFilters();
		// Retrieve default filters on category click with ".default"
		console.log("Default Filters: " + $(".default").text());
		// Write all AJAX response information to the page upon category click
		movieAJAX();
	}


	if($(this).hasClass("cat-events")) {
		// Change filter listing
		loadEventFilters();
		// Retrieve default filters on category click with ".default"
		console.log("Default Filters: " + $(".default").text());
		// Write all AJAX response information to the page upon category click
		eventAJAX();
	}


});




