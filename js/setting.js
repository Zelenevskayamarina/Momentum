const myBtn = document.getElementById('mySetting');
const settingContainer = document.querySelector('.setting__container');

let settings = {
  languages: "en",
  photos: "github",

}

myBtn.addEventListener("click", () => {
  settingContainer.classList.toggle("setting__container");
}, false);


const timeShow = document.querySelector('.show-time');
const timeBlock = document.querySelector('.time');

function changeTime() {
  if (timeShow.checked) {
    timeBlock.classList.remove('opacity0');
  } else {
    timeBlock.classList.add('opacity0');
  }
};

timeShow.addEventListener('change', changeTime);

const dateShow = document.querySelector('.show-date');
const dateBlock = document.querySelector('.date');

dateShow.addEventListener('change', () => {
  if (dateShow.checked) {
    dateBlock.classList.remove('opacity0');
  } else {
    dateBlock.classList.add('opacity0');
  }
});

const greetingShow = document.querySelector('.show-greeting');
const greetingBlock = document.querySelector('.greeting-container');

greetingShow.addEventListener('change', () => {
  if (greetingShow.checked) {
    greetingBlock.classList.remove('opacity0');
  } else {
    greetingBlock.classList.add('opacity0');
  }
});

const weatherShow = document.querySelector('.show-weather');
const weatherBlock = document.querySelector('.weather');

weatherShow.addEventListener('change', () => {
  if (weatherShow.checked) {
    weatherBlock.classList.remove('opacity0');
  } else {
    weatherBlock.classList.add('opacity0');
  }
});

const quoteShow = document.querySelector('.show-quote');
const quoteBlock = document.querySelector('.quote');
const quoteAuthorBlock = document.querySelector('.author');
const quoteButtonBlock = document.querySelector('.change-quote');

quoteShow.addEventListener('change', () => {
  if (quoteShow.checked) {
    quoteBlock.classList.remove('opacity0');
    quoteAuthorBlock.classList.remove('opacity0');
    quoteButtonBlock.classList.remove('opacity0');
  } else {
    quoteBlock.classList.add('opacity0');
    quoteAuthorBlock.classList.add('opacity0');
    quoteButtonBlock.classList.add('opacity0');
  }
});

const audioPlayerShow = document.querySelector('.show-audio-player');
const playerBlock = document.querySelector('.player');
const playerCustomBlock = document.querySelector('.custom-player');

audioPlayerShow.addEventListener('change', () => {
  if (audioPlayerShow.checked) {
    playerBlock.classList.remove('opacity0');
    playerCustomBlock.classList.remove('opacity0');
  } else {
    playerBlock.classList.add('opacity0');
    playerCustomBlock.classList.add('opacity0');
  }
});

const englishSetting = document.querySelector('.language-english');
const russianSetting = document.querySelector('.language-russian');
let keyLanguageSetting = 'en';
const languages = document.querySelector('.languages');
const englishLanguage = document.querySelector('.english');
const russianLanguage = document.querySelector('.russian');
const photos = document.querySelector('.photos');
const placeholderUnsplashPhotos = document.querySelector(".tag-unsplash");
const placeholderFlickrPhotos = document.querySelector(".tag-flickr");
const blocks = document.querySelector('.show-blocks');
const timeText = document.querySelector('.time-text');
const dateText = document.querySelector('.date-text');
const greetingText = document.querySelector('.greeting-text');
const weatherText = document.querySelector('.weather-text');
const quoteText = document.querySelector('.quote-text');
const audioText = document.querySelector('.audio-text');
let keyLanguage = 'en';


englishSetting.addEventListener('change', () => {
  if (englishSetting.checked) {
    keyLanguage == 'en'
    languages.textContent = 'Languages';
    englishLanguage.textContent = 'English';
    russianLanguage.textContent = 'Russian';
    photos.textContent = 'Photos';
    placeholderUnsplashPhotos.placeholder = 'Enter the topic (Ex.: nature)';
    placeholderFlickrPhotos.placeholder = 'Enter the topic (Ex.: nature)';
    blocks.textContent = 'Show blocks';
    timeText.textContent = 'Time';
    dateText.textContent = 'Date';
    greetingText.textContent = 'Greeting';
    weatherText.textContent = 'Weather';
    quoteText.textContent = 'Quote';
    audioText.textContent = 'Audio player';
  }
});

russianSetting.addEventListener('change', () => {
  if (russianSetting.checked) {
    keyLanguage == 'ru'
    languages.textContent = 'Языки';
    englishLanguage.textContent = 'Английский';
    russianLanguage.textContent = 'Русский';
    photos.textContent = 'Фотографии';
    placeholderUnsplashPhotos.placeholder = 'Введите тему (Напр.: природа)';
    placeholderFlickrPhotos.placeholder = 'Введите тему (Напр.: природа)';
    blocks.textContent = 'Показать блоки';
    timeText.textContent = 'Время';
    dateText.textContent = 'Дата';
    greetingText.textContent = 'Приветствие';
    weatherText.textContent = 'Погода';
    quoteText.textContent = 'Цитата';
    audioText.textContent = 'Аудиоплеер';
  }
});