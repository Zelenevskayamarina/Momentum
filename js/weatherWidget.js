const city = document.querySelector('.city');
const weatherError = document.querySelector('.weather-error');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');

let keyLanguage = 'en';

city.focus();

async function getWeather() {  
    if(keyLanguage == 'en') {
        try {   
            if (keyLanguage == "en" && city.value =='Минск') {city.value='Minsk'}  
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${keyLanguage}&appid=8c6cda0092090b6ffb1cf06ed5014e97&units=metric`;
            const res = await fetch(url);
            const data = await res.json();
    
            weatherIcon.className = 'weather-icon owf';
            weatherIcon.classList.add(`owf-${data.weather[0].id}`);
            weatherError.textContent = '';
            temperature.textContent = `${data.main.temp}°C`;
            weatherDescription.textContent = data.weather[0].description;
            wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`;
            humidity.textContent = `Humidity: ${data.main.humidity}%`;
        } catch (err) {
            if (city.value.trim().length === 0) {
                weatherError.textContent = 'Please enter the name of the city!';
                temperature.textContent = '';
                weatherDescription.textContent = '';
                wind.textContent = '';
                humidity.textContent = '';
            } else {
                weatherError.textContent = 'Please enter the valid city name!';
                temperature.textContent = '';
                weatherDescription.textContent = '';
                wind.textContent = '';
                humidity.textContent = '';
            }
        }
    }
    else if(keyLanguage == 'ru') {
        try {
            if (keyLanguage == "ru" && city.value =='Minsk') {city.value='Минск'}
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${keyLanguage}&appid=8c6cda0092090b6ffb1cf06ed5014e97&units=metric`;
            const res = await fetch(url);
            const data = await res.json();
    
            weatherIcon.className = 'weather-icon owf';
            weatherIcon.classList.add(`owf-${data.weather[0].id}`);
            weatherError.textContent = '';
            temperature.textContent = `${data.main.temp}°C`;
            weatherDescription.textContent = data.weather[0].description;
            wind.textContent = `Скорость ветра: ${Math.floor(data.wind.speed)} м/с`;
            humidity.textContent = `Влажность: ${data.main.humidity}%`;
        } catch (err) {
            if (city.value.trim().length === 0) {
                weatherError.textContent = 'Пожалуйста, введите название города!';
                temperature.textContent = '';
                weatherDescription.textContent = '';
                wind.textContent = '';
                humidity.textContent = '';
            } else {
                weatherError.textContent = 'Пожалуйста, введите действительное название города!';
                temperature.textContent = '';
                weatherDescription.textContent = '';
                wind.textContent = '';
                humidity.textContent = '';
            }
        }
    }    
}



const englishWeather = document.querySelector('.language-english');
const russianWeather = document.querySelector('.language-russian');


englishWeather.addEventListener('change', () => {
    if(englishWeather.checked) {
        keyLanguage = 'en';
        getWeather();
    }
})

russianWeather.addEventListener('change', () => {
    if(russianWeather.checked) {
        keyLanguage = 'ru';
        getWeather();
    }
})

function setCity(city) {
    if (city.code === 'Enter') {
        getWeather();
        city.blur();
    }
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('change', getWeather);

function setLocalStorage() {
    localStorage.setItem('city', city.value);
    getWeather();
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if (localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
        getWeather();
    }
}
window.addEventListener('load', getLocalStorage);

