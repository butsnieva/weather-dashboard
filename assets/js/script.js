var searchEl = document.querySelector('#search-by-city')

searchEl.addEventListener('submit', searchOnClick)

function searchOnClick(event) {
    event.preventDefault()
    var searchTerm = document.querySelector('#search-term').value
    getCurrentWeather(searchTerm)
    getFiveDayForecast(searchTerm)
    shiftToTheLeft()
}

function shiftToTheLeft () {
    document.querySelector('.col-search').style.margin = '0'
    document.querySelector('.col-search').style.width = '25%'
}


function getCurrentWeather (city) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=6a58b6d33fa24bab63eab94d11467ca1&units=imperial'
    fetch (apiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data){
            createCurrentWeatherModal(data)
        })
        } else {
            alert('Error: City Not Found')
        }
    }) 
    .catch(function(error) {
        alert('Unable to connect to Weather Portal')
    })
    
}



function createCurrentWeatherModal (data) {

    var title = $('<h3>').addClass('card-title').text(data.name)
    var todaysDate = $('<h4>').text(moment().format('MM/DD/YYYY'))
    var icon = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
    var card = $('<div>').addClass('card')
    var cardBody = $('<div>').addClass('card-body');
    

    var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + "°F");
    var humidity = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
    var wind = $("<p>").addClass("card-text").text("Wind: " + data.wind.speed + " MPH");
    
    var latitude = data.coord.lat;
    var longitude = data.coord.lon;

    fetch('https://api.openweathermap.org/data/2.5/uvi?appid=6a58b6d33fa24bab63eab94d11467ca1&lat=' + latitude + '&lon=' +longitude)
    .then(function(response) {
    return response.json()
    })
    .then(function(data) {
    var uvEl = $('<p>').addClass('card-text').text('UV Index: ')

    var uvValue = document.createElement('span');
        uvValue.textContent = data.value
    var uvIndex = data.value;
    
    if(uvIndex < 3) {
        uvValue.classList.add('bg-success');
    } else if (uvIndex < 7) {
        uvValue.classList.add('bg-warning');
    } else {
        uvValue.classList.add('bg-danger');
    }

    cardBody.append(uvEl);
    $('#current-weather .card-body').append(uvEl.append(uvValue));
    });
    
    
    title.append(icon);
    cardBody.append(title,todaysDate, temp,humidity,wind);
    card.append(cardBody);
    $('#current-weather').append(card);
}

function getFiveDayForecast (city) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=6a58b6d33fa24bab63eab94d11467ca1&units=imperial')
        .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data)
    })
}

// function createFiveDayForecastModal () {

// }

