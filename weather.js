const apiKey ="527c3e91b03d76d0c938d2a15e7af232";
let searched; 

updateSearch =()=>{
    searched = json.parse(localStorage.getItem('searchHistory')) || [];
    $('#searchHistory').html('');
    searched.forEach(item=>$('#searchHistory').append('<button class='btn'
    style='border-width: 1px; border-color: gray; margin:auto; width: 100%;'>${item} 
    </button>'))
}
updateSearch()

handleSearch = (val) =>{
    $ajax({
        method: "GET",
        url: 'https://api.openweathermap.org/data/2.5/forecast?q=${val}&{appKey}'
    }).then(data=>{
        searched.push(val)
        localStorage.setItem('searchHistory', JSON.stringify(searched))
        updateSearch()
        $('.col-8').prePend('<div class="Row"><h3>5 Day Forecast:</h3></div>')
        data.list.forEach((datum, i)=> {
            (!((i+4)%8)) ?
                $('#results').append('<div class="card col-2" style="width: 8rem;">'
                <img class ="card-imag-top" src="..." alt="Card Image Cap">
                    <div class="card-body">
                        <h5 class="card-title">Card titel</h5>
                        <p class="card=text">Some quick text to build on the card and make up the bulk of the content.</p>
                        <a href="#" class="btn btn-primary">Go Somewhere</a>
                    </div>
                </div>')
                : ''
            })
        }).catch(err=> console.log(err))
}
$('btn').on('click', funciton () {
    console.log($(this).text())
    if($(this).text()==="Search"){
        let city = $('#search').val().trim()
        handleSearch(city)
    }else{
        handleSearch($(this).text())
    }
})
