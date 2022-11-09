const textQuote = document.querySelector('.quote');
const authorQuote = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');
let keyLanguage = 'en';

function getRandomQuotes(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomQuotes = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomQuotes;
}

async function getQuotes() {
    const randomQuotes = getRandomQuotes(0, 9);
    if (keyLanguage == 'en') {
        const quotes = '/json/data_en.json';
        const res = await fetch(quotes);
        const data = await res.json();

        textQuote.textContent = `"${data[randomQuotes].text}."`;
        authorQuote.textContent = `${data[randomQuotes].author}`;
    } else if (keyLanguage == 'ru') {
        const quotes = '/json/data_ru.json';
        const res = await fetch(quotes);
        const data = await res.json();

        textQuote.textContent = `"${data[randomQuotes].text}."`;
        authorQuote.textContent = `${data[randomQuotes].author}`;
    }
}
getQuotes();

changeQuote.addEventListener('click', getQuotes);

const englishSetting = document.querySelector('.language-english');
const russianSetting = document.querySelector('.language-russian');

englishSetting.addEventListener('change', () => {
    if (englishSetting.checked) {
        keyLanguage = 'en';
        getQuotes();
    }
})

russianSetting.addEventListener('change', () => {
    if (russianSetting.checked) {
        keyLanguage = 'ru';
        getQuotes();
    }
})