var searchEl = document.querySelector('#search-by-city')
var cityBtn = document.querySelector('#city-btns')


searchEl.addEventListener('submit', searchOnClick)

function searchOnClick(event) {
    event.preventDefault()
    var searchTerm = document.querySelector('#search-term').value
    if (!searchTerm) {
        alert('Please enter a city name.')
    } else {
    getCurrentWeather(searchTerm)
    getFiveDayForecast(searchTerm)
    searchEl.reset()    
    }
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
            shiftToTheLeft()
            createCurrentWeatherModal(data)
            cityList.push(data.name)
            localStorage.setItem('cityList', JSON.stringify(cityList))
        })
        } else {
            alert('Error: City Not Found')
            return
        }
    }) 
    .catch(function(error) {
        alert('Unable to connect to the Weather Portal')
    })
    
}



function createCurrentWeatherModal (data) {
    var currentWeatherEl = document.querySelector('#current-weather')
        currentWeatherEl.innerHTML = ''

    var title = $('<h3>').addClass('card-title').text(data.name)
    var todaysDate = $('<h4>').text(moment().format('MM/DD/YYYY'))
    var icon = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png")
    var card = $('<div>').addClass('card')
    var cardBody = $('<div>').addClass('card-body')
    

    var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + "°F")
    var humidity = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%")
    var wind = $("<p>").addClass("card-text").text("Wind: " + data.wind.speed + " MPH")
    
    var latitude = data.coord.lat
    var longitude = data.coord.lon

    fetch('https://api.openweathermap.org/data/2.5/uvi?appid=6a58b6d33fa24bab63eab94d11467ca1&lat=' + latitude + '&lon=' +longitude)
    .then(function(response) {
    return response.json()
    })
    .then(function(data) {
    var uvEl = $('<p>').addClass('card-text').text('UV Index: ')

    var uvValue = document.createElement('span')
        uvValue.textContent = data.value
    var uvIndex = data.value
    
    if(uvIndex < 3) {
        uvValue.classList.add('bg-success')
    } else if (uvIndex < 7) {
        uvValue.classList.add('bg-warning')
    } else {
        uvValue.classList.add('bg-danger')
    }

    cardBody.append(uvEl)
    $('#current-weather .card-body').append(uvEl.append(uvValue))
    })
    
    
    title.append(icon)
    cardBody.append(title,todaysDate, temp,humidity,wind)
    card.append(cardBody)
    $('#current-weather').append(card)
}

function getFiveDayForecast (city) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=6a58b6d33fa24bab63eab94d11467ca1&units=imperial')
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    createFiveDayForecastModal(data)
                })
            } else {
                return
            }}
        )
}

function createFiveDayForecastModal (data) {
    $('#forecast-five-days').html('<h3>5-Day Forecast:</h3>')
    var forecastEl = $('<div>').addClass('forecast-el row')
    $('#forecast-five-days').append(forecastEl)

    for (var i = 0; i < 5; i++) {
        var date = moment().add(i+1, 'days').format('l')
        var cardTitle = $('<h3>').addClass('card-title').text(date)
        var icon = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png")
        var card = $('<div>').addClass('card')
        var cardBody = $('<div>').addClass('card-body')
        var column = $('<div>').addClass('col')
        
        var temp = $("<p>").addClass("card-text").text("Temperature: " + data.list[i].main.temp + "°F")
        var humidity = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + "%")
        var wind = $("<p>").addClass("card-text").text("Wind: " + data.list[i].wind.speed + " MPH")
        
        column.append(card.append(cardBody.append(cardTitle,icon,temp,humidity,wind)))
        forecastEl.append(column)
    }
}



var buttonClickHandler = function(event) {
    var city = event.target.getAttribute('data-attribute')
    if (city) {
        var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=6a58b6d33fa24bab63eab94d11467ca1&units=imperial'
        fetch(apiUrl).then(function(response){
            if (response.ok) {
                response.json().then(function(data){
                    getCurrentWeather(city)
                    getFiveDayForecast(city)
                    shiftToTheLeft()
                })
            } else {
                alert ('Error: City Not Found')
                return
            }
        })
        .catch(function(error) {
            alert('Unable to connect to the Weather Portal')
        })
    }
}
cityBtn.addEventListener('click', buttonClickHandler)






// local storage in progress


function loadFromLocalStorage(){
    cityList = JSON.parse(localStorage.getItem("cityList"))
    if (!cityList) {
        cityList = [] 
    } else {
    for (var i = 0; i < cityList.length; i++){
        console.log(cityList)
    }}
}

function createBtn () {

}

loadFromLocalStorage()