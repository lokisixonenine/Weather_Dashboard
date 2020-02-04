const apiKey = "527c3e91b03d76d0c938d2a15e7af232";
let searched;

updateSearch = () => {
    searched = JSON.parse(localStorage.getItem('searchHistory')) || [];
    $('#searchHistory').html('')
    searched.forEach(item => $('#searchHistory').append(`<button class='btn' 
    style='border-width:1px; border-color:black; margin:auto; width:100%'>${item}</button>`))
}


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
      </div>`): ''
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