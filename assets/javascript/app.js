
// Global Variables
var selectedFilter;

// Write restaurant filters to the page on page load as well as AJAX response as a default setting
$(document).ready(function () {

	loadRestaurantFilters(); 
	restaurantAJAXonLoad();
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

function createErrorMessage() {
    var createErrorMessage = $("<div>");
    createErrorMessage.addClass("error-message");
    createErrorMessage.html("Please enter a zip code or a City, State.");
    $(".user-input").append(createErrorMessage);
}

function selectFilter() {
	$("select.filters").change(function () {
		selectedFilter = $(".filters option:selected").text();
		console.log("User Selected Filter: " + selectedFilter);
		// Write AJAX response information to the page based on selected filter
		restaurantAJAX();
	})
}
selectFilter();


function restaurantAJAXonLoad() { 
		// Write AJAX restaurant response information to the page
	  var cuisine = selectedFilter;
	  var cuisineID = ""
	  
	  var lat = "40.742051";
	  var lng = "-74.004821";

	  var api = "a46b84ae7de46097b35a230d8d7bfd23"
	  var url = "https://developers.zomato.com/api/v2.1/geocode?lat="+lat+"&lon="+lng+"&apikey="+api

	  console.log(url)

	  $.ajax({
	  url: url,
	  method: 'GET',
	  }).done(function(result) {
	  console.log(result);
	    for (var i = 0; i < result.nearby_restaurants.length; i++) {
	      var restaurant = $("<div>");
	      restaurant.addClass("food-listing");
	      restaurant.append("<h5>"+(i+1)+"</h5>");
	      restaurant.append("<h4><strong>"+result.nearby_restaurants[i].restaurant.name + "</strong></h4><a class='view-menu'>View Menu</a><br><a class='my-favorite' href='#'>Add to Favorites <i class='fa fa-heart fa-sm'></i></a>");
	      restaurant.append(result.nearby_restaurants[i].restaurant.location.address + "<br>");
	      restaurant.append(result.nearby_restaurants[i].restaurant.cuisines + "<br>");
	      restaurant.append("Average cost for two: $"+result.nearby_restaurants[i].restaurant.average_cost_for_two+"<br>");
	      restaurant.append("<em>Rating: "+result.nearby_restaurants[i].restaurant.user_rating.aggregate_rating+" out of 5</em>"+"<br>");
	      restaurant.append("<em>Rating Grade: "+result.nearby_restaurants[i].restaurant.user_rating.rating_text+"</em><br>");
	      $("#eventInfo").append(restaurant);

	      var restaurantImage = $("<img>").addClass("food-listing-image");
	      restaurantImage.attr("src", result.nearby_restaurants[i].restaurant.thumb);
	      $("#eventImage").append(restaurantImage);
	    };
	}).fail(function(err) {
	  throw err;
	});
}

function restaurantAJAXEverything() {

	  var zipcode = $("#zipCode").val();
    console.log(zipcode);
    var cuisine = selectedFilter;
    var cuisineID = ""

	  geocoder = new google.maps.Geocoder();
    
    var lat = "";
    var lng = "";
    var address = "";

    if ($("#cityState").val() === "") {
    address = zipcode;
  	} else {
  		address = $("#cityState").val();
  	}

  	console.log(address);

    geocoder.geocode( { 'address': address}, function(results, status) {
    	console.log(results)
      if (status == google.maps.GeocoderStatus.OK) {
         lat = results[0].geometry.location.lat();
         lng = results[0].geometry.location.lng();
        }
      console.log("Latitude: "+lat);
      console.log("Longitude: "+lng);

      if (address === ""){
      	createErrorMessage();
      	return false;
      }

    var api = "a46b84ae7de46097b35a230d8d7bfd23"
	  var url = "https://developers.zomato.com/api/v2.1/geocode?lat="+lat+"&lon="+lng+"&apikey="+api+"&sort=rating&order=desc"

	  $(".error-message").html("")

	  console.log(url)

	  $.ajax({
	  url: url,
	  method: 'GET',
	  }).done(function(result) {
	  console.log(result);
	    for (var i = 0; i < result.nearby_restaurants.length; i++) {
	      var restaurant = $("<div>");
	      restaurant.addClass("food-listing");
	      restaurant.append("<h5>"+(i+1)+"</h5>");
	      restaurant.append("<h4><strong>"+result.nearby_restaurants[i].restaurant.name + "</strong></h4><a class='view-menu'>View Menu</a><br><a class='my-favorite' href='#'>Add to Favorites <i class='fa fa-heart fa-sm'></i></a>");
	      restaurant.append(result.nearby_restaurants[i].restaurant.location.address + "<br>");
	      restaurant.append(result.nearby_restaurants[i].restaurant.cuisines + "<br>");
	      restaurant.append("Average cost for two: $"+result.nearby_restaurants[i].restaurant.average_cost_for_two+"<br>");
	      restaurant.append("<em>Rating: "+result.nearby_restaurants[i].restaurant.user_rating.aggregate_rating+" out of 5</em>"+"<br>");
	      restaurant.append("<em>Rating Grade: "+result.nearby_restaurants[i].restaurant.user_rating.rating_text+"</em><br>");
	      $("#eventInfo").append(restaurant);

	      var restaurantImage = $("<img>").addClass("food-listing-image");
	      restaurantImage.attr("src", "assets/images/everything.jpg");
	      $("#eventImage").append(restaurantImage);
	    };
		}).fail(function(err) {
	  	throw err;
		});
	});
}

function restaurantAJAX() { 
		// Write AJAX restaurant response information to the page
	  event.preventDefault();

	  $("#eventInfo").empty();
	  $("#eventImage").empty();

    var zipcode = $("#zipCode").val();
    console.log(zipcode);
    var cuisine = selectedFilter;
    var cuisineID = ""

    $("#zipCode").empty();
	  $("#cityState").empty();

    geocoder = new google.maps.Geocoder();
    
    var lat = "";
    var lng = "";
    var address = "";

    if ($("#cityState").val() === "") {
    address = zipcode;
  	} else {
  		address = $("#cityState").val();
  	}

    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
         lat = results[0].geometry.location.lat();
         lng = results[0].geometry.location.lng();
        }

      if (address === ""){
      createErrorMessage();
      return false;
      }

      console.log("Latitude: "+lat);
      console.log("Longitude: "+lng);

      if (cuisine === "American"){
		  cuisineID = 1;
		  } else if (cuisine === "BBQ/Steakhouse"){
		  cuisineID = 193;
		  } else if (cuisine === "Breakfast"){
		  cuisineID = 182;
		  } else if (cuisine === "Chinese"){
		  cuisineID = 25;
		  } else if (cuisine === "Coffee Shops"){
		  cuisineID = 161;
		  } else if (cuisine === "Deli"){
		  cuisineID = 192;
		  } else if (cuisine === "Fast Food"){
		  cuisineID = 40;
		  } else if (cuisine === "French"){
		  cuisineID = 45;
		  } else if (cuisine === "Greek"){
		  cuisineID = 156;
		  } else if (cuisine === "Ice Cream"){
		  cuisineID = 233;
		  } else if (cuisine === "Indian"){
		  cuisineID = 148;
		  } else if (cuisine === "Italian"){
		  cuisineID = 55;
		  } else if (cuisine === "Japanese"){
		  cuisineID = 60;
		  } else if (cuisine === "Mexican"){
		  cuisineID = 73;
		  } else if (cuisine === "Pizza"){
		  cuisineID = 82;
		  } else if (cuisine === "Seafood"){
		  cuisineID = 83;
		  } else if (cuisine === "Spanish"){
		  cuisineID = 89;
		  } else if (cuisine === "Thai"){
		  cuisineID = 95;
		  } else {
		  	restaurantAJAXEverything();
		  	return false;
		  }

		  console.log("Cuisine ID: "+cuisineID);

      var api = "a46b84ae7de46097b35a230d8d7bfd23"
      var url = "https://developers.zomato.com/api/v2.1/search?start=0&count=15&sort=rating&sort=desc&lat="+lat+"&lon="+lng+"&cuisines="+cuisineID+"&radius=16090&apikey="+api

      console.log(url)

      $(".error-message").html("")

      $.ajax({
      url: url,
      method: 'GET',
      }).done(function(result) {
      console.log(result);
        for (var i = 0; i < 15; i++) {
          var restaurant = $("<div>");
          restaurant.addClass("food-listing");
          restaurant.append("<h5>"+(i+1)+"</h5>");
          restaurant.append("<h4><strong>"+result.restaurants[i].restaurant.name + "</strong></h4><a class='view-menu'>View Menu</a><br><a class='my-favorite' href='#'>Add to Favorites <i class='fa fa-heart fa-sm'></i></a>");
          restaurant.append(result.restaurants[i].restaurant.location.address + "<br>");
          restaurant.append(result.restaurants[i].restaurant.cuisines + "<br>");
          restaurant.append("Average cost for two: $"+result.restaurants[i].restaurant.average_cost_for_two+"<br>");
          restaurant.append("Rating: "+result.restaurants[i].restaurant.user_rating.aggregate_rating+" out of 5"+"<br>");
          restaurant.append("Rating Grade: "+result.restaurants[i].restaurant.user_rating.rating_text+"<br>");
         	$("#eventInfo").append(restaurant);

         	var restaurantImage = $("<img>").addClass("food-listing-image");
          restaurantImage.attr("src", "assets/images/"+cuisineID+".jpg");
	      	$("#eventImage").append(restaurantImage);
        };
    }).fail(function(err) {
      throw err;
    });
  });
}



function movieAJAX() {
	// Write all AJAX response information to the page upon category click

	var movie1 = $("<div><h4>Movie 1</h4><a class='my-favorite' href='#'><i class='fa fa-heart fa-lg'></i></a></div>").addClass("movie-listing");
	var movie2 = $("<div><h4>Movie 2</h4><a class='my-favorite' href='#'><i class='fa fa-heart fa-lg'></i></a></div>").addClass("movie-listing");
	var movie3 = $("<div><h4>Movie 3</h4><a class='my-favorite' href='#'><i class='fa fa-heart fa-lg'></i></a></div>").addClass("movie-listing");
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
	var event1 = $("<div><h4>Event 1</h4><a class='my-favorite' href='#'><i class='fa fa-heart fa-lg'></i></a></div>").addClass("event-listing");
	var event2 = $("<div><h4>Event 2</h4><a class='my-favorite' href='#'><i class='fa fa-heart fa-lg'></i></a></div>").addClass("event-listing");
	var event3 = $("<div><h4>Event 3</h4><a class='my-favorite' href='#'><i class='fa fa-heart fa-lg'></i></a></div>").addClass("event-listing");
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
	restaurantAJAXonLoad();
	$(".login").hide();
	$(".new-account").hide();
	$(".user-input").show();
	$("#filterList").show();
	$(".category-buttons").show();
	$(".bored-label").show();
	$(".bored-input").show();
	$(".category").removeAttr("id", "selected");
	$(".cat-restaurants").attr("id", "selected");
}


function loadFavoritesScreen() {
	$(".login").hide();
	$(".new-account").hide();
	$(".user-input").hide();
	$("#filterList").hide();
	$(".category-buttons").hide();
	$(".bored-label").hide();
	$(".bored-input").hide();
}


function loadSignInScreen() {
	$("#eventInfo").empty();
	$("#eventImage").empty();
	$(".user-input").hide();
	$("#filterList").hide();
	$(".category-buttons").hide();
	var signInScreen = ($("<h2 class='login-heading'>Login</h2><br><h5 class='create-account'><a href='#'>New User? Create an Account</a></h5>"
						+ "<div class='row'><div class='col-md-12'><div class='form-group login-form'>"
						+ "<input type='text' class='form-control' id='userName' placeholder='First Name'>"
						+ "<input type='text' class='form-control' id='accountName' placeholder='Account Name'>"
						+ "<input type='password' class='form-control' id='userPassword' placeholder='Password'>"
						+ "<button type='submit' class='btn btn-default user-login submit-button'>Submit</button>"
						));

	$(signInScreen).addClass("login");
	$("#eventView").append(signInScreen);
}


function loadCreateAccountScreen() {
	var createAccountScreen = ($("<h2 class='login-heading'>Create Account</h2><br><h5 class='create-account'><a href='#'>New User? Create an Account</a></h5>"
							+ "<div class='row'><div class='col-md-12'><div class='form-group login-form'>"
							+ "<input type='text' class='form-control' id='newUserName' placeholder='First Name'>"
							+ "<input type='text' class='form-control' id='newAccountName' placeholder='Account Name'>"
							+ "<input type='password' class='form-control' id='newUserPassword' placeholder='Password'>"
							+ "<input type='password' class='form-control' id='confirmPassword' placeholder='Confirm Password'>"
							+ "<input type='email' class='form-control' id='newUserEmail' placeholder='Email'></div></div></div>"
							+ "<button type='submit' class='btn btn-default add-user submit-button'>Submit</button>"
							));

	$(createAccountScreen).addClass("new-account");
	$(".login").hide();
	$("#eventView").append(createAccountScreen);
}



// All on click events
$(document).on("click", ".search", function() {
	$("#eventInfo").empty();
	$("#eventImage").empty();
	$(".sign-in").prop("disabled", false);
	loadSearchScreen();
});

$(document).on("click", ".favorites", function() {
	$("#eventInfo").empty();
	$("#eventImage").empty();
	$(".sign-in").prop("disabled", false);
	loadFavoritesScreen();
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
    var zip = $("#zipCode").val();
    var city = $("#cityState").val();
    console.log(zip.length);
    console.log(city.length);

    if (zip.length != 5 && $("#cityState").val() === "") {
      createErrorMessage();
      return false;
    } else { 
        restaurantAJAX();
        $(".error-message").remove();
    }
});


// On click events for categories - List different options in each category
$(document).on("click", ".category", function() {
	$("#eventInfo").empty();
	$("#eventImage").empty();
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



 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAH0p97UUJUHYcSXplmLkCUDPTbTOWituw",
    authDomain: "curingboredom-d4b4e.firebaseapp.com",
    databaseURL: "https://curingboredom-d4b4e.firebaseio.com",
    projectId: "curingboredom-d4b4e",
    storageBucket: "curingboredom-d4b4e.appspot.com",
    messagingSenderId: "403783343234"
  };

  firebase.initializeApp(config);

   var dataRef = firebase.database();

   var newName = "";
   var newAccountName = "";
   var newPassword = "";
   var newEmail = "";

   var name = "";
   var accountName = "";
   var password = "";
   var storedUserName = [];


   // When user creates a new account
   $(document).on("click", ".add-user", function(event) { 
   	event.preventDefault();

   	newUserName = $("#newUserName").val().trim().toLowerCase();
    newAccountName = $("#newAccountName").val().trim().toLowerCase();
   	newUserPassword = $("#newUserPassword").val().trim();
   	newUserEmail = $("#newUserEmail").val().trim();

    // Code for the push
    dataRef.ref().push({

    newName: newUserName,
    newAccount: newAccountName,
    newPassword: newUserPassword,
    newEmail: newUserEmail,
    });

	clearNewUserInput();

   });


   // When user logs in

   $(document).on("click", ".user-login", function(event) { 
   	event.preventDefault();

   	name = $("#userName").val().trim().toLowerCase();
    accountName = $("#accountName").val().trim().toLowerCase();
   	password = $("#userPassword").val().trim();


   	dataRef.ref().on("child_added", function(childSnapshot) {
   		console.log(childSnapshot.val());
   		storedUserName.push(childSnapshot.val());

   	// 	if(childSnapshot.child("newName").exists()) { 

    //     if(storedUserName.newName === name) {
    //     	alert("user exists");
    //     } else {
    //     	alert("create a new account");
    //     }

    //     console.log(storedUserName);
    //     console.log(storedUserName.newName);


    // }
	});


   });



  // Empty the values of the input fields
  function clearNewUserInput() {
    $("#newUserName").val("");
    $("#newAccountName").val("");
    $("#newUserPassword").val("");
    $("#confirmPassword").val("");
    $("#newUserEmail").val("");
  }

