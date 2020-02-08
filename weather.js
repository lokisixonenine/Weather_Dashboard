var apiKey = "527c3e91b03d76d0c938d2a15e7af232";
var baseURL="https://api.openweather.org/data/2.5";
var tempUnits="imperial";

$(document).read(function () {
    var cities=[];
    var listDiv=$(".cities");

    $(".currentcity").hide();
})

if (localstorage["cities"]) {
    cites = JSON.parse(localStorage["cities"]);
    cities.forEach(element => {
        liTag=$("<button>").html("<b>" + element + "</b>");
        liTag.attr("data-city", element);
        liTag.addClass("list-group-item list-group-item-action list-group-item-primary citybutton");
        listDiv.append(liTag);
    });
    rendercity(cities[cities.length -1]);
} else {
    console.log("no cities");
}

$(document).on("click", ".citybutton", function () {
    cityName=$(this)[0].dataset.city;
    rendercity(cityName);
});

$("#searchCity").on("click", function (){
    var inputSearchCity=$(".addcity").val().trim().toLowerCase();
    if(inputSearchCity === "") {
        return;
    }

    inputSearchCity = inputSearchCity.split(" ");
    searchCity="";

    inputSearchCity.forEach(element => {
        searchCity += " " + element.charAt(0).toUpperCase() + element.slice(1);
    });

 if(cities.includes(searchCity)) {
     $(".addcity").val("");
     return;
 }

 cities.push(searchCity);
 localStorage.setItem("cities",JSON.stringify(cities));

liTag=$("<button>").html("<b>" + searchCity + "</br>");
liTag.attr("data-city", searchCity);
liTag.addClass("list-group-item list-group-item-action list-group-item-primary citybutton");
listDiv.append(liTag);
$("addcity").val("");
render(searchCity);

});

function rendercity(searchCity) {
    queryURL = baseURL + "weather?q=" + searchCity + "&units=" + tempUnits + "&" + apiKey;
    $(".currentcity").show();
    $(".currentcity").empty();
    $(".fivedays").empty();

    $ajax({
        url: queryURL,
        method: "GET",
        statusCode: {
            404: function () {
                $(".currentcity").hide();
                alert("Sorry! City" + searchCity + "not found");
            }
        }
    })

    .then(function(response) {
        console.log(response);
        cityName=response.name;
        cityID=response.id;
        coutnryName=response.sys.country;
        cityLat=response.coord.lat;
        cityLon=response.coord.lon;
        var icon=response.weather[0].icon;

        var h3=$("<h3>");
        $(".currentcity").append($("<h4>").text(moment().format("11")));
        h3.append($("<span>").text(cityName + ", " + coutnryName));
    

    if(icon == "01d") {
        h3.append($("<span>").append($("<img>").attr({
            src: "assets/images/sunny.png",
            height: "15%",
            width: "20%"
        })));
    } else {
        h3.append($("<span>").append($("<img>").attr("src", "https://openweathermap.org/img/wn" +icon+ "@2x.png")));
    }

    var spanTemp=$("<span>");
    spanTemp.html(Math.round(response.main.temp) + " \2109");
    spanTemp.addClass("spantemp");
    h3.append(spanTemp);
    $(".currentcity").append(h3);
    $(".currentcity").append($("<p>").html("<b>Humidity : " +response.main.humidity + "%</b>"));
    $(".currentcity").append($("<p>").html("<b>Wind Speed : "+response.wind.speed+ " mph</b>"));

    getuvindex(cityLat, cityLon);
    getforcast(cityID);
    });

}

function getuvindex(lat, lon) {
    queryURL = baseURL+"uvi?"+ apiKey + "%lat=" + lat + "&lon=" + lon;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {

            var pUVI = $("<p>").html("<b>UV Index : </b>");
            var spanUVI = $("<span>").html("<b>" + response.value + "</b>");
            spanUVI.attr("class","uvindex");
            pUVI.append(spanUVI);
            $(".currentcity").append(pUVI);
        });
}

/* updateSearch = () => {
    searched = JSON.parse(localStorage.getItem('searchHistory')) || [];
    $('#searchHistory').html('')
    searched.forEach(item => $('#searchHistory').append(`<button class='btn' 
    style='border-width:1px; border-color:black; margin:auto; width:100%'>${item}</button>`))
}
updateSearch()
handleSearch = (val) => {
    $.ajax({
        method: "GET",
        url: `https://api.openweathermap.org/data/2.5/forecast?q=${val}&appid=${apiKey}`
    }).then(data => {
        searched.push(val)
        localStorage.setItem('searchHistory', JSON.stringify(searched))
        updateSearch()
        $('.col-8').prepend('<div class="row"><h3>5 Day Forecast:</h3></div>')
        data.list.forEach((datum, i) => {
            (!((i + 4) % 8)) ?
                $('#results').append(`<div class="card col-2" style="width: 8rem;">
        <img class="card-img-top" src="..." alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>`)
                : ''
        })
    }).catch(err => console.log(err))
}
$('.btn').on('click', function () {
    console.log($(this).text())
    if ($(this).text() === "Search") {
        let city = $('#search').val().trim()
        handleSearch(city)
    } else {
        handleSearch($(this).text())
    }


})