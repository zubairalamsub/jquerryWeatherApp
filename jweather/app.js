function getWeather(lat, lon) {
    $.ajax({
      url: "https://api.darksky.net/forecast/9c4e8944261ed3b6f5f3438431a5cfa0/" + lat + "," + lon,
      dataType: "jsonp",
      success: function(data) {
        console.log("Current temp: " + data.currently.temperature);
        // get all the information
        var fahrenheit = data.currently.temperature.toFixed(2),
          locationName = data.timezone,
          splice = locationName.indexOf("/"),
          icon = data.currently.icon.toUpperCase()
        console.log(icon)
        console.log(splice)
          //apparently the temperature is returned in kelvin, so we need to quickly convert it to celsius, which gives a horrible number so is rounded to two decimal places. 
        var celsius = ((fahrenheit - 32) * 5 / 9).toFixed(2); // Who in the name of all that is holy uses Fahrenheit? 
        console.log(celsius); // Wh
        $("#tempC").html(celsius + "&deg;C");
        $("#locationName").html(locationName.substring(splice + 1).replace("_", " "));
        $("#tempF").html(fahrenheit + "&deg;F").hide();
 
        $("#toggle").click(function() {
          $("#tempC").toggle("slow")
          $("#tempF").toggle("slow")
        });
        var icons = new Skycons({
          "color": "white"
        });
        icons.set("icon", icon)
        icons.play();
 
        //Alters all of the elements to display the information to the user. 
 
      }
    });
  }
 
  // Gets the users position 
  if (navigator.geolocation) { // Gets the users position 
    navigator.geolocation.getCurrentPosition(function(position) {
      $("#data").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      getWeather(lat, lon); // Calls the getWeather function which is defined above. Passes two arguments which are the user's current lattitude and longitude. 
    });
  }
  // If there is no location the code stalls and temp is replaced with a message telling the user to turn location on!
 
  // API key ""2ca252d74a373acc1b59fe6e45e5d3ae""