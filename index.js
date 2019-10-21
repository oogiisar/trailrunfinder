'use strict'

let lat = ''
let lng = ''

const STATES = [
    {
        state: 'Alabama',
        code: 'al'
    },
    {
        state: 'Alaska',
        code: 'ak'
    },
    {
        state: 'Arizona',
        code: 'az'
    },
    {
        state: 'Arkansas',
        code: 'ar'
    },
    {
        state: 'California',
        code: 'ca'
    },
    {
        state: 'Colorado',
        code: 'co'
    },
    {
        state: 'Connecticut',
        code: 'ct'
    },
    {
        state: 'Delaware',
        code: 'de'
    },
    {
        state: 'D.C.',
        code: 'dc'
    },
    {
        state: 'Florida',
        code: 'fl'
    },
    {
        state: 'Georgia',
        code: 'ga'
    },
    {
        state: 'Hawaii',
        code: 'hi'
    },
    {
        state: 'Idaho',
        code: 'id'
    },
    {
        state: 'Illinois',
        code: 'il'
    },
    {
        state: 'Indiana',
        code: 'in'
    },
    {
        state: 'Iowa',
        code: 'ia'
    },
    {
        state: 'Kansas',
        code: 'ks'
    },
    {
        state: 'Kentucky',
        code: 'ky'
    },
    {
        state: 'Louisiana',
        code: 'la'
    },
    {
        state: 'Maine',
        code: 'me'
    },
    {
        state: 'Maryland',
        code: 'md'
    },
    {
        state: 'Massachusetts',
        code: 'MA'
    },
    {
        state: 'Michigan',
        code: 'mi'
    },
    {
        state: 'Minnesota',
        code: 'mn'
    },
    {
        state: 'Mississippi',
        code: 'ms'
    },
    {
        state: 'missouri',
        code: 'mo'
    },
    {
        state: 'Montana',
        code: 'mt'
    },
    {
        state: 'Nebraska',
        code: 'ne'
    },
    {
        state: 'Nevada',
        code: 'nv'
    },
    {
        state: 'New Hampshire',
        code: 'nh'
    },
    {
        state: 'New Jersey',
        code: 'nj'
    },
    {
        state: 'New Mexico',
        code: 'nm'
    },
    {
        state: 'New York',
        code: 'ny'
    },
    {
        state: 'North Carolina',
        code: 'nc'
    },
    {
        state: 'North Dekota',
        code: 'nd'
    },
    {
        state: 'Ohio',
        code: 'oh'
    },
    {
        state: 'Oklahoma',
        code: 'ok'
    },
    {
        state: 'Oregon',
        code: 'or'
    },
    {
        state: 'Pennsylvania',
        code: 'pa'
    },
    {
        state: 'Rhode Island',
        code: 'ri'
    },
    {
        state: 'South Carolina',
        code: 'sc'
    },
    {
        state: 'South Dekota',
        code: 'sd'
    },
    {
        state: 'Tennessee',
        code: 'tn'
    },
    {
        state: 'Texas',
        code: 'tx'
    },
    {
        state: 'Utah',
        code: 'ut'
    },
    {
        state: 'Vermont',
        code: 'vt'
    },
    {
        state: 'Virginia',
        code: 'va'
    },
    {
        state: 'Washington',
        code: 'wa'
    },
    {
        state: 'West Virginia',
        code: 'wv'
    },
    {
        state: 'Wisconsin',
        code: 'wi'
    },
    {
        state: 'Wyoming',
        code: 'wy'
    }
]

function alert() {
    $('.searchContainer').on('click', '.closebtn', function(event){
        this.parentElement.style.display='none';
    });
}

function addStates(){
    for(let i = 0; i < STATES.length; i++){
        $('.states').append(
            `<option value="${STATES[i].code}">${STATES[i].state}</option>`
        )
    }
}

function getQuote() {
    let count = Math.floor(Math.random() * 3)
    if(count === 0) {
        return 'Build a future where people live in harmony with nature.'
    } else if (count === 1) {
        return 'No matter what your motivation is, just keep running.'
    } else {
        return 'Create your own destination and always push the limits.'
    }
}

function searchPage() {
    $('#container').append(
    `<section class=searchContainer>
        <p id="quote"><q>${getQuote()}</q></p>
        <section class="search">
            <form id="js_form">
                <label for="search-term"></label>
                <input type="text" name="enter your city" id="js_search_term" placeholder="Enter Your City" required>
                    <select name="states" class="states">
                    </select>
                <label for="search-button"></label>
                <input type="submit" value="Search" id="search_button">
            </form>
        </section>
    </section>`
    )
    addStates();
}

function homeButton() {
    $('.logo').on('click', function(event) {
        location.reload();
    });
}

function getWeather(lat, lng){
    const URL_LOCATION = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=69Zwc4FSfqEUm9rlLIslDXIdoz6UgRkR&q=${lat}%2C${lng}`;
    return fetch(URL_LOCATION)
    .then(response => {
        if(response.ok){
            return response.json();
        } else {
            throw new Error(response.statusText);
        }
    })
    .then(responseJson => {
        let location = responseJson.Key;
        const URL_WEATHER = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${location}?apikey=69Zwc4FSfqEUm9rlLIslDXIdoz6UgRkR`;
        
        return fetch(URL_WEATHER)
        .then(response => {
            if(response.ok){
                return response.json();
            } else {
                throw new Error(response.statusText);
            }
        })
        .then(responseJson => {
            return responseJson
        });
    });
}

function calculateStars(stars){
    let starIcon = '<i class="fas fa-star result_icon"></i>'
    let halfStarIcon = '<i class="fas fa-star-half-alt result_icon"></i>'
    let emptyStarIcon = '<i class="far fa-star result_icon"></i>'
    const starNum = Math.round(stars*2)/2;
    if(starNum === 5) {
        return `${starIcon.repeat(5)}`;
    } else if(starNum === 4.5) {
        return starIcon.repeat(4) + halfStarIcon;
    } else if (starNum === 4){
        return starIcon.repeat(4) + emptyStarIcon;
    } else if (starNum === 3.5){
        return starIcon.repeat(3) + halfStarIcon + emptyStarIcon;
    } else if (starNum === 3){
        return starIcon.repeat(3) + emptyStarIcon.repeat(2);
    } else if (starNum === 2.5){
        return starIcon.repeat(2) + halfStarIcon + emptyStarIcon.repeat(2);
    } else if(starNum === 2){
        return starIcon.repeat(2) + emptyStarIcon.repeat(3);
    } else if (starNum === 1.5){
        return starIcon.repeat(1) + halfStarIcon + emptyStarIcon.repeat(3);
    } else if (starNum === 1){
        return starIcon.repeat(1) + emptyStarIcon.repeat(4);
    } else if (starNum === 0.5){
        return halfStarIcon + emptyStarIcon.repeat(4);
    } else if (starNum === 0){
        return  emptyStarIcon.repeat(5);
    }
}

function displayTrail(trails){
    $('#container').on('click', '.result_item', function(event){
        const thisTrail = trails[event.currentTarget.id];
        $('.resultContainer').remove();
        let weather = getWeather(lat, lng);
        console.log(thisTrail)
        weather.then(function(result) {
            let HTML=`
            <section class="lastContainer">
                <section id="trail_data">
                    <h2 class="trail_name">
                        ${thisTrail.name}
                    </h2>
                    <p>
                        <img src="${thisTrail.imgMedium}" class="trail_picture">
                    </p>
                    <p id="trail_stats">
                    <i class="fas fa-running result_icon"></i> <span>Distance</span>: ${thisTrail.length} miles <br>   <i class="fas fa-mountain result_icon"></i> <span>Elevation</span>: ${thisTrail.high} feet <br>   <i class="fas fa-flag-checkered result_icon"></i>   <span>Difficulty</span>: ${thisTrail.difficulty} <br>  <span>Ratings</span>: ${calculateStars(thisTrail.stars)}
                    </p>
                    <p> 
                    <i class="fas fa-pen-square result_icon"></i> <span>Description</span>: ${thisTrail.summary}
                    </p>
                </section>
                <section id="weather_box">
                    <h2>Weather</h2>
                    <section  id="weather">`
           for(let i = 0; i < result.DailyForecasts.length; i++){
                HTML =  HTML +  `\n
                        <section class="days">
                            <p><img src="img/weather/${result.DailyForecasts[i].Day.Icon}.png" alt="${result.DailyForecasts[i].Day.IconPhrase}"></p>
                            <p>High: ${result.DailyForecasts[i].Temperature.Maximum.Value}<p>
                            <p>Low: ${result.DailyForecasts[i].Temperature.Minimum.Value}<p>
                        </section>
                `
           }
           console.log(result)
           HTML = HTML + `
                    </section>
                </section>
                <section id="map">
                    <h2>Map</h2>
                    <iframe width="300" height="300""
                        src="https://www.google.com/maps/embed/v1/view?zoom=17&center=${thisTrail.latitude},${thisTrail.longitude}&key=AIzaSyDSgpEvqgcxrbg8p6wVOupU28-Y9VCI2hw" allowfullscreen>
                    </iframe>
                </section>
            `
           $('#container').append(
            HTML
            )
        });
    });
}

function displayResults(trails){
    $('.searchContainer').remove();
    let HTML = `<section class="resultContainer">`
    for(let i = 0; i < trails.length; i++){
        let stars = calculateStars(trails[i].stars);
        let thumbnail  = ''
        if(trails[i].imgSqSmall === '') {
            thumbnail = `<p class="trail_thumbnail">No image available</p>`;
        } else {
            thumbnail = `<div class="thumbnail" style="background-image:url('${trails[i].imgMedium}');"></div>`
        }
        HTML = HTML + `
            \n<section class="result_item" id="${i}">
                ${thumbnail}
                <p class="trail_summary">${trails[i].name}</p>
                <p class="trail_summary"><i class="fas fa-running result_icon"></i> ${trails[i].length} miles</p>
                <p class="trail_summary">Rating: ${stars}</p>
            </section>`           
    }
    HTML = HTML + `\n</section>`
    $('#container').append(
        HTML
    );
    
    console.log(trails);
    displayTrail(trails);    
}

function findTrails(latlng) {
    const URL = `
    https://www.trailrunproject.com/data/get-trails?${latlng}&maxResults=9&key=200606806-5ae79cd5800169262d1a54f0396a1d5f`;
    fetch(URL)
        .then(response => {
            if(response.ok){
                return response.json();
            } else {
                throw new Error(response.statusText);
            }
        })
        .then(responseJson => {
            if(responseJson.success === 1){
                if(responseJson.trails.length === 0){
                    $('.searchContainer').append(
                        '<p>No Trails Found</p>'
                    )
                } else{
                    displayResults(responseJson.trails);
                }
            } else {
                $('.searchContainer').append(
                    '<p>Oops Something Went Wrong</p>'
                )
            }
           
        });
}
function convertLocation(searchValue) {
    const URL = `https://api.opencagedata.com/geocode/v1/json?key=463a46a2313b4f11bc90c9a627dabc7e&q=${searchValue}`;
    fetch(URL)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.statusText);
            }
        })
        .then(responseJson => {
            let found = 0
            for(let i = 0; i < responseJson.results.length; i++) {
                if(responseJson.results[i].components._type === 'city'){
                    found = 1
                    console.log(responseJson.results[i].geometry);
                    lat = responseJson.results[i].geometry.lat;
                    lng = responseJson.results[i].geometry.lng;
                    let latlng = `lat=${lat}&lon=${lng}`
                    console.log(latlng);
                    findTrails(latlng);
                    break;
                } 
            }
            if(found === 0){
                $('.searchContainer').append(
                    `<div class="alert">
                        <span class="closebtn">&times;</span> 
                        Sorry Location Not Found
                    </div>`
                )
            }
        });
}


function searchSubmit() {
    $('#container').on('submit', function(event){
        event.preventDefault();
        const getCity = $('#js_search_term').val();
        const getState  = $('.states').val();
        const searchValue = `${getCity}+${getState}`
        convertLocation(searchValue);

    })
}
function watchForm(){
    homeButton();
    searchPage();
    searchSubmit();
    alert();
}

$(watchForm);

