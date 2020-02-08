$(document).ready(function () {

    const apiKey = '&apikey=527c3e91b03d76d0c938d2a15e7af232';

    var cityArr = JSON.parse(localStorage.getItem('cityArr')) || [];
    var city = "";
    dataGet();

    function dataset() {

        city = $('#city-Name').val().trim();
        cityArr.push(city);
        localStorage.setItem('cityArr', JSON.stringify(cityArr));
    }

    function dataGet() {
        for (var i = 0; i < cityArr.length; i++) {
            var list = $('<li>');
            list.addClass('list-group-item');
            list.css({
                'padding-right': "0px",
                'padding-left': '0px',
                "margin-top": "4px"
            });
            var cityBtn = $('<button>');
            cityBtn.addClass('history-btn');
            cityBtn.attr('type', 'button');
            cityBtn.css({
                'width': '100%',
                'text-align': 'center',
                'font-size': '1.5rem'
            });
            cityBtn.text(cityArr[i]);
            list.html(cityBtn);
            $(".list-group").empty();
            $('.list-group').prepend(list);
        }
    }

    $(document).on('click', '.history-btn', function () {
        var searchCity = $(this).text();
        renderWeather(searchCity);
        fiveDay(searchCity);
    });

    $('#searchBtn').on('click', function () {
        var city = $('#city-Name').val();
        dataset();
        dataGet();
        renderWeather(city);
        fiveDay();
    });

    $('searchBtn').keypress(function (event) {
        var key = event.which;
        if (key == 13) {
            event.preventDefault();
            dataset();
            dataGet();
            renderWeather(city);
        }
    })

    var renderWeather = function (city) {
        var baseUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + apiKey;
        $.ajax({
            url: baseUrl,
            method: "GET",

        }).then(function (response) {
            console.log(response);

            var icon = response.weather[0].icon;
            var imgSrc = "https://openweathermap.org/img/wn/" + icon + ".png";
            var img = $("<img>").attr("src", imgSrc);
            img.attr('alt', response.weather[0].main);

            $("#city-Name").text(response.name + ", " + response.sys.country + " " + moment().format('l'));
            $("#imgIcon").html(img);
            $("#temp").text(response.main.temp + " °F");
            $("#temp").wrap("<strong></strong>");
            $("#humidity").text(response.main.humidity + "%");
            $("#humidity").wrap("<strong></strong>");
            $("#wind-speed").text(response.wind.speed + " MPH");
            $("#wind-speed").wrap("<strong></strong>");

            renderUV(response);

        });

    }

    var fiveDay = function () {
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey,
            method: "GET",

        }).then(function (response) {
            console.log(response);
            //1st day forecast
            var code6 = response.list[6].weather[0].icon;
            var imgSrc6 = "https://openweathermap.org/img/wn/" + code6 + ".png";
            var img6 = $("<img>").attr("src", imgSrc6);

            //2nd day forecast
            var code14 = response.list[14].weather[0].icon;
            var imgSrc14 = "https://openweathermap.org/img/wn/" + code14 + ".png";
            var img14 = $("<img>").attr("src", imgSrc14);

            //3rd day forecast
            var code22 = response.list[22].weather[0].icon;
            var imgSrc22 = "https://openweathermap.org/img/wn/" + code22 + ".png";
            var img22 = $("<img>").attr("src", imgSrc22);

            //4th day forecast
            var code30 = response.list[30].weather[0].icon;
            var imgSrc30 = "https://openweathermap.org/img/wn/" + code30 + ".png";
            var img30 = $("<img>").attr("src", imgSrc30);

            //5th day forecast
            var code38 = response.list[38].weather[0].icon;
            var imgSrc38 = "https://openweathermap.org/img/wn/" + code38 + ".png";
            var img38 = $("<img>").attr("src", imgSrc38);

            // setting 1st day forecast details
            $("#dayOne h6").text(moment().add(1, "days").format("l"));
            $("#dayOne .img-Icon-5").html(img6);
            $("#dayOne .temp-5").text ("Temp: " + response.list[6].main.temp + " °F");
            $("#dayOne .humidity-5").text("Humidity: " + response.list[6].main.humidity + "%");

            // setting 2nd day forecast details
            $("#dayTwo h6").text(moment().add(2, "days").format("l"));
            $("#dayTwo .img-Icon-5").html(img14);
            $("#dayTwo .temp-5").text("Temp: " + response.list[14].main.temp + " °F");
            $("#dayTwo .humidity-5").text("Humidity: " + response.list[14].main.humidity + "%");

            // setting 3rd day forecast details
            $("#dayThree h6").text(moment().add(3, "days").format("l"));
            $("#dayThree .img-Icon-5").html(img22);
            $("#dayThree .temp-5").text("Temp: " + response.list[22].main.temp + " °F");
            $("#dayThree .humidity-5").text("Humidity: " + response.list[22].main.humidity + "%");

            // setting 4th day forecast details
            $("#dayFour h6").text(moment().add(4, "days").format("l"));
            $("#dayFour .img-Icon-5").html(img30);
            $("#dayFour .temp-5").text("Temp: " + response.list[30].main.temp + " °F");
            $("#dayFour .humidity-5").text("Humidity: " + response.list[30].main.humidity + "%");

            // setting 5th day forecast details
            $("#dayFive h6").text(moment().add(5, "days").format("l"));
            $("#dayFive .img-Icon-5").html(img38);
            $("#dayFive .temp-5").text("Temp: " + response.list[38].main.temp + " °F");
            $("#dayFive .humidity-5").text("Humidity: " + response.list[38].main.humidity + "%");

        });

    }
    var renderUV = function (data) {
        var queryURL = "http://api.openweathermap.org/data/2.5/uvi?" + apiKey + "&lat=" + data.coord.lat + "&lon=" + data.coord.lon;
        $.ajax({
            url: queryURL,
            method: "GET",

        }).then(function (response) {
            console.log("UV Index :");
            console.log(response);
            var num = parseInt(response.value);
            var renderNum = parseFloat(response.value).toFixed(2);
            $('#UV').text(response.value);

        });

    }

    fiveDay();
    renderUV();

});
