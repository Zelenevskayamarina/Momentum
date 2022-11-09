//1. Часы и календарьz
const data = document.querySelector('.date');
let keyLanguage = 'en';

function showDate() {
    const date = new Date();
    const options = {
        month: "long",
        day: 'numeric',
        weekday: 'long',
        timeZone: 'UTC'
    };

    if (keyLanguage == 'en') {
        const currentDate = date.toLocaleDateString('en-US', options);
        data.innerHTML = currentDate;
    } else if (keyLanguage == 'ru') {
        const currentDate = date.toLocaleDateString('ru-RU', options);
        data.innerHTML = currentDate;
    }
}

const englishSetting = document.querySelector('.language-english');
const russianSetting = document.querySelector('.language-russian');

englishSetting.addEventListener('change', () => {
    if (englishSetting.checked) {
        keyLanguage = 'en';
        showDate();
    }
})

russianSetting.addEventListener('change', () => {
    if (russianSetting.checked) {
        keyLanguage = 'ru';
        showDate();
    }
})

const time = document.querySelector('.time');

function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    setTimeout(showTime, 1000);

    showDate();
    // getTimeOfDay();
}
showTime();

//2. Приветствие
const greetingText = document.querySelector('.greeting');

function showGreeting() {
    const date = new Date();
    const hours = date.getHours();
    return hours;
}
showGreeting();

function getTimeOfDay() {
    timeOfDay = showGreeting();

    if (keyLanguage == 'en') {
        switch (timeOfDay) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                timeOfDay = 'night';
                break;
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
                timeOfDay = 'morning';
                break;
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
            case 17:
                timeOfDay = 'afternoon';
                break;
            case 18:
            case 19:
            case 20:
            case 21:
            case 22:
            case 23:
                timeOfDay = 'evening';
                break;
            default:
                break;
        }
    } else if (keyLanguage == 'ru') {
        switch (timeOfDay) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                timeOfDay = 'ночи';
                break;
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
                timeOfDay = 'утро';
                break;
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
            case 17:
                timeOfDay = 'день';
                break;
            case 18:
            case 19:
            case 20:
            case 21:
            case 22:
            case 23:
                timeOfDay = 'вечер';
                break;
            default:
                break;
        }
    }
    return timeOfDay;
}
getTimeOfDay();

timeOfDay = getTimeOfDay();
greetingText.textContent = `Good ${timeOfDay},`;


englishSetting.addEventListener('change', () => {
    if (englishSetting.checked) {
        keyLanguage = 'en';
        showGreeting();
        timeOfDay = getTimeOfDay();
        if (keyLanguage == 'en') {
            greetingText.textContent = `Good ${timeOfDay},`;
        }

        let placeholderInput = document.querySelector(".name");
        placeholderInput.placeholder = '[Enter name]';
    }
})

russianSetting.addEventListener('change', () => {
    if (russianSetting.checked) {
        keyLanguage = 'ru';
        showGreeting();
        timeOfDay = getTimeOfDay();

        if (keyLanguage == 'ru') {
            if (timeOfDay == 'ночи') {
                greetingText.textContent = `Доброй ${timeOfDay},`;
            } else if (timeOfDay == 'утро') {
                greetingText.textContent = `Доброе ${timeOfDay},`;
            } else if (timeOfDay == 'день') {
                greetingText.textContent = `Добрый ${timeOfDay},`;
            } else if (timeOfDay == 'вечер') {
                greetingText.textContent = `Добрый ${timeOfDay},`;
            }
        }
        let placeholderInput = document.querySelector(".name");
        placeholderInput.placeholder = '[Введите имя]';
    }
})

const name = document.querySelector('.name')

function setLocalStorage() {
    localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if (localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
}
window.addEventListener('load', getLocalStorage)


//3. Слайдер изображений
const body = document.querySelector('body');
let keyPhotos = 'github';
const tagUnsplash = document.querySelector('.tag-unsplash');
const tagFlickr = document.querySelector('.tag-flickr');


body.style.backgroundImage = `url('https://raw.githubusercontent.com/Zelenevskayamarina/stage1-tasks/main/images/${timeOfDay}/18.webp')`;

function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}

let randomNumber = getRandomNum(1, 20);
const baseImage = `https://raw.githubusercontent.com/Zelenevskayamarina/stage1-tasks/main/images/${getTimeOfDay()}/`;

function setBg(src) {
    if (keyPhotos == 'github') {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            body.style.backgroundImage = `url(${src})`;
        };
    } else if (keyPhotos == 'unsplash') {
        getLinkToImageUnsplash();
    } else if (keyPhotos == 'flickr') {
        getLinkToImageFlickr();
    }
}

async function getLinkToImageUnsplash() {
    if (tagUnsplash.value) {
        const url = `https://api.unsplash.com/photos/random?search/photos?page=1&query=${tagUnsplash.value}&client_id=IsokTIKgeasrgkezr_SdBuaHkakFt6pZXBL_iU1kSL8`;
        const res = await fetch(url);
        const data = await res.json();
        console.log(data.urls.regular)

        const img = new Image();
        img.src = data.urls.regular;
        img.onload = () => {
            body.style.backgroundImage = `url(${data.urls.regular})`;
        };
    } else if (tagUnsplash.value.trim().length === 0) {
        const url = `https://api.unsplash.com/photos/random?search/photos?page=1&query=${timeOfDay}&client_id=IsokTIKgeasrgkezr_SdBuaHkakFt6pZXBL_iU1kSL8`;
        const res = await fetch(url);
        const data = await res.json();
        console.log(data.urls.regular)

        const img = new Image();
        img.src = data.urls.regular;
        img.onload = () => {
            body.style.backgroundImage = `url(${data.urls.regular})`;
        };
    }
}

async function getLinkToImageFlickr() {
    if (tagFlickr.value) {
        const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=2eb39d22cd595bea5e8d96d1a21cec42&tags=${tagFlickr.value}&extras=url_l&format=json&nojsoncallback=1`;
        console.log(url);
        const res = await fetch(url);
        const data = await res.json();
        let index = Math.floor(Math.random() * (50 - 0) + 0);
        console.log(data.photos.photo[index].url_l);

        const img = new Image();
        img.src = data.photos.photo[index].url_l;
        img.onload = () => {
            body.style.backgroundImage = `url('${data.photos.photo[index].url_l}')`;
        };
    } else if (tagFlickr.value.trim().length === 0) {
        const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=2eb39d22cd595bea5e8d96d1a21cec42&tags=${timeOfDay}&extras=url_l&format=json&nojsoncallback=1`;
        console.log(url);
        const res = await fetch(url);
        const data = await res.json();
        let index = Math.floor(Math.random() * (50 - 0) + 0);
        console.log(data.photos.photo[index].url_l);

        const img = new Image();
        img.src = data.photos.photo[index].url_l;
        img.onload = () => {
            body.style.backgroundImage = `url('${data.photos.photo[index].url_l}')`;
        };
    }
}

const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');

function getSlideNext() {
    if (randomNumber < 10) {
        const imageSrc = baseImage + (randomNumber++).toString().padStart(2, "0") + '.webp';
        setBg(imageSrc);
    } else if (randomNumber >= 10 && randomNumber < 20) {
        const imageSrc = baseImage + randomNumber++ + '.webp';
        setBg(imageSrc);
    } else if (randomNumber == 20) {
        const imageSrc = baseImage + randomNumber++ + '.webp';
        setBg(imageSrc);
        randomNumber = 1;
    }
}

function getSlidePrev() {
    if (randomNumber >= 10 && randomNumber <= 20) {
        const imageSrc = baseImage + randomNumber-- + '.webp';
        setBg(imageSrc);
    } else if (randomNumber > 1 && randomNumber < 10) {
        const imageSrc = baseImage + (randomNumber--).toString().padStart(2, "0") + '.webp';
        setBg(imageSrc);
    } else if (randomNumber == 1) {
        const imageSrc = baseImage + (randomNumber--).toString().padStart(2, "0") + '.webp';
        setBg(imageSrc);
        randomNumber = 20;
    }
}

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);


const photosGithub = document.querySelector('.photos-github');
const photosUnsplash = document.querySelector('.photos-unsplash');
const photosFlickr = document.querySelector('.photos-flickr');

photosGithub.addEventListener('change', () => {
    if (photosGithub.checked) {
        keyPhotos = 'github';
        setBg();
    }
});

photosUnsplash.addEventListener('change', () => {
    if (photosUnsplash.checked) {
        keyPhotos = 'unsplash';
        setBg();
    }
});

photosFlickr.addEventListener('change', () => {
    if (photosFlickr.checked) {
        keyPhotos = 'flickr';

        setBg();
    }
});
