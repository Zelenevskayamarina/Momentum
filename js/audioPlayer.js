import playList from './playList.js';

let play = document.querySelector('.play');
const playAudioNext = document.querySelector('.play-next');
const playAudioPrev = document.querySelector('.play-prev');
const containerAudio = document.querySelector('.custom-player-container');
const playListContainer = document.querySelector('.play-list');
let isPlay = false;
let playNum = 0;

const audio = new Audio();
audio.src = playList[playNum].src;

playList.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = playList[index].title;
    li.classList.add('play-item');
    playListContainer.append(li);
});

function playAudio() {
    if (!isPlay) {
        isPlay = true;
        play.classList.add('pause');
        audio.play();
    } else {
        play.classList.remove('pause');
        audio.pause();
        isPlay = false;
    }
    stylePlayList();
    setSongTitle();
}

function changeAudio() {
    if (!isPlay) {
        play.classList.remove('pause');
        play.classList.add('play');
        containerAudio.classList.remove('opacity1');
        containerAudio.classList.add('opacity0');

    } else {
        play.classList.add('pause');
        audio.classList.remove('play');
        containerAudio.classList.add('opacity1');
        containerAudio.classList.remove('opacity0');
    }
}

play.addEventListener('click', function () {
    if (!isPlay) {
        playAudio();
        changeAudio();
        containerAudio.classList.add('opacity1');
    } else {
        playAudio();
        changeAudio();
        containerAudio.classList.add('opacity1');
    }
});

function playNext() {
    if (playNum <= 2) {
        playNum = playNum + 1;
    } else if (playNum == 3) {
        playNum = 0;
    }

    isPlay = false;
    audio.src = playList[playNum].src;
    playAudio();
}

function playPrev() {
    if (playNum >= 1) {
        playNum = playNum - 1;
    } else if (playNum == 0) {
        playNum = 3;
    }

    isPlay = false;
    audio.src = playList[playNum].src;
    playAudio();
}

playAudioNext.addEventListener('click', playNext);
playAudioPrev.addEventListener('click', playPrev);
audio.addEventListener('ended', playNext);


function stylePlayList() {
    for (let i = 1; i < playList.length + 1; i++) {
        const playItem = document.querySelector(`li:nth-child(${i})`);
        playItem.classList.remove('item-active');
    }
    const playItemActive = document.querySelector(`li:nth-child(${playNum + 1})`);
    playItemActive.classList.add('item-active');
}

// audioPlayerCustom
const audioPlayer = document.querySelector(".custom-player");
const progressBar = audioPlayer.querySelector(".progress-bar");
const currentTime = document.querySelector(".player__time-current");
const totalTime = document.querySelector(".player__time-total");
const timeline = audioPlayer.querySelector(".timeline");
const timelineWidth = window.getComputedStyle(timeline).width;
const volumeSlider = document.querySelector(".volume-slider");
const volumeButton = document.querySelector(".volume-button");
const volumeButtonOn = document.querySelector(".volume-button-on");

function setSongTitle() {
    const customPlayerSong = document.querySelector('.custom-player__song');
    customPlayerSong.textContent = playList[playNum].title;

}

const timelineScrub = (event) => {
    const scrubTime = event.offsetX / parseInt(timelineWidth) * audio.duration;
    audio.currentTime = scrubTime;
}
timeline.addEventListener("click", timelineScrub);

const setTotalTime = () => {
    const [min, sec] = (audio.duration / 100).toFixed(2).split(".");
    totalTime.textContent = `${min}:${sec}`;
};

const setCurrentTime = () => {
    const [min, sec] = (audio.currentTime / 100).toFixed(2).split(".");
    currentTime.textContent = `${min}:${sec}`;
};

const handleProgress = () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    timeline.setAttribute("value", parseInt(percent));
};

const setSliderWidth = () => {
    progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
};

const setSliderPosition = (event) => {
    const percent = event.target.value;
    audio.currentTime = (audio.duration / 100) * percent;
};

audio.addEventListener("canplay", setTotalTime);

audio.addEventListener("playing", () => {
    handleProgress();
    setCurrentTime();
    setSliderWidth();
});

audio.addEventListener("timeupdate", () => {
    handleProgress();
    setCurrentTime();
    setSliderWidth();
});

timeline.addEventListener("change", (event) => {
    setSliderWidth();
    setSliderPosition(event);
});

volumeSlider.addEventListener('input', (e) => {
    const value = e.target.value;
    audio.volume = value / 100;
});

volumeButton.addEventListener('click', function () {
    if (audio.muted) {
        audio.muted = false;
        volumeButtonOn.classList.remove('volume-button-off');
    } else {
        audio.muted = true;
        volumeButtonOn.classList.add('volume-button-off');
    }
}, false);