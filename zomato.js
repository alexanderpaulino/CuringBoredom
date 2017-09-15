$("#runSearch").on("click", function(event) {
    $("#searchResults").empty();
    event.preventDefault();

    var zipcode = $("#zipInput").val();
    console.log(zipcode);
    var cuisine = $("#cuisine").val();
    console.log(cuisine);
    var cuisineID = ""

    geocoder = new google.maps.Geocoder();
    
    var lat = "";
    var lng = "";
    var address = zipcode;
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
         lat = results[0].geometry.location.lat();
         lng = results[0].geometry.location.lng();
        } else {
      alert("Geocode was not successful for the following reason: " + status);
      }
      console.log("Latitude: "+lat);
      console.log("Longitude: "+lng);

      if (cuisine === "Chinese"){
      cuisineID = 25;
      }

      console.log("Cuisine ID: "+cuisineID);

      var api = "a46b84ae7de46097b35a230d8d7bfd23"
      var url = "https://developers.zomato.com/api/v2.1/search?start=0&count=15&sort=rating&sort=desc&lat="+lat+"&lon="+lng+"&cuisines="+cuisineID+"&radius=16090&apikey="+api

      console.log(url)

      $.ajax({
      url: url,
      method: 'GET',
      }).done(function(result) {
      console.log(result);
        for (var i = 0; i < 15; i++) {
          var restaurant = $("<div>");
          restaurant.append("<h3>"+(i+1)+"</h3>");
          restaurant.append(result.restaurants[i].restaurant.name + "<br>");
          restaurant.append(result.restaurants[i].restaurant.location.address + "<br>");
          restaurant.append(result.restaurants[i].restaurant.cuisines + "<br>");
          restaurant.append("Average cost for two: $"+result.restaurants[i].restaurant.average_cost_for_two+"<br>");
          restaurant.append("Rating: "+result.restaurants[i].restaurant.user_rating.aggregate_rating+" out of 4"+"<br>");
          restaurant.append("Rating Grade: "+result.restaurants[i].restaurant.user_rating.rating_text+"<br>");
          $("#searchResults").append(restaurant);
          $("#searchResults").append("<br>");
        };
    }).fail(function(err) {
      throw err;
    });
  });
});

$("#clearAll").on("click", function(event) {
    event.preventDefault();
    $("#searchResults").empty();
});