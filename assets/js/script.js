var searchEl = document.querySelector('#search-by-city')

searchEl.addEventListener('submit', searchOnClick)

function searchOnClick(event) {
    event.preventDefault()
    var searchTerm = document.querySelector('#search-term').value
    getCurrentWeather(searchTerm)
}


var getCurrentWeather = function(city) {

    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=6a58b6d33fa24bab63eab94d11467ca1'
    fetch (apiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data){
            console.log(data)
        })
        } else {
            alert('Error: City Not Found')
        }
    }) 
    .catch(function(error) {
        alert('Unable to connect to Weather Portal')
    })
}

//getCurrentWeather("austin")