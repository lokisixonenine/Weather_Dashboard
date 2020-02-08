let d = new Date()
let date = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
console.log(date);

$("button").on("click", function () {
    let city = $("#search-value").val();
    $(".history").append(`<li class="list-group-item">${city}</li>`);

    let APIKey = "527c3e91b03d76d0c938d2a15e7af232";
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function (response) {
            console.log(response);
            appendWeather(response)
        })
})

function appendWeather(data) {
    $("#today").html(`<h1 style="float:left">${data.name} (${date})</h1><img style="float:left" 
  src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png"/>`);
    $("#today").append(`<div class="row" style="float:left; width:100%">
  <div style="width:100%">Temperature: ${Math.round((data.main.temp - 273.15)*1.8 +32)}° F</div>
  <div style="width:100%">Humidity: ${data.main.humidity}</div>
  <div style="width:100%">Wind Speed: ${data.wind.speed}</div>
  <div id="UV" style="width:100%">UV Index:${data.uv}</div>
  </div>
  <div class="row"><h2>5-Day Forecast:</h2></div>`);

    for (let i = 0; i < 5; i++) {
        $("#forecast").append(`<div class="col-2">
      <p>${date}</>
      <img class="owf owf-803" src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png"/>
      <p>Temp: ${Math.round((data.main.temp - 273.15)*1.8 +32)}° F</p>
      <p>Humidity: ${data.main.humidity}</p>
    </div>`);
    }
}

 function getuvindex(lat, lon) {
     queryURL = baseURL + "uvi?" + apiKey + "&lat=" + lat + "&lon=" + lon;

     $.ajax({
             url: queryURL,
             method: "GET"
         })
         .then(function (response) {

             var pUVI = $("<p>").html("<b>UV Index : <b>");
             var spanUVI = $("<span>").html("<b>" + response.value + "</b>");
             spanUVI.attr("class", "uvindex");
             pUVI.append(spanUVI);
             $(".currentcity").append(pUVI);
         });

 }
