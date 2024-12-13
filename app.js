const musicContainer = document.querySelector('.music-container');
const image = document.querySelector('#music-image');
const title = document.querySelector('#music-details .title');
const singer = document.querySelector('#music-details .singer');
const prev = document.querySelector('#controls #prev');
const play = document.querySelector('#controls #play');
const next = document.querySelector('#controls #next');
const duration = document.querySelector('#duration');
const currentTime = document.querySelector('#current-time');
const progressBar = document.querySelector('#progress-bar');
const volume = document.querySelector('#volume');
const volumeBar = document.querySelector('#volume-bar');
const backgroundImg = document.querySelector('.bg-image');
const listButton = document.querySelector('.list-button');
const playlist = document.querySelector('#music-list');
const ul = document.querySelector("ul");

const player = new MusicPlayer(musicList);



window.addEventListener("load", () => {
    let music = player.getMusic();
    displayMusic(music);
    displayPlaylist(player.musicList);
    nowPlaying();
});

function displayMusic(music) {
    title.innerText = music.getName();
    singer.innerText = music.singer;
    image.src = "img/" + music.img;
    audio.src = "mp3/" + music.file;
    backgroundImg.style.backgroundImage = `url(img/${music.img})`;
}

play.addEventListener("click", () => {

    const isPlaying = musicContainer.classList.contains("playing");
 
    isPlaying ? pauseMusic() : playMusic();
})

prev.addEventListener("click", () => {
    prevMusic();
})

function prevMusic() {
    player.previous();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    nowPlaying();
}

next.addEventListener("click", () => {
    nextMusic();
})

function nextMusic() {
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    nowPlaying();
}

function pauseMusic() {
    musicContainer.classList.remove("playing");
    play.querySelector("i").classList = "fa-solid fa-play";
    audio.pause();
}

function playMusic() {
    musicContainer.classList.add("playing");
    play.querySelector("i").classList = "fa-solid fa-pause";
    audio.play();
}

const calculateTime = (seconds) => {
    const minute = Math.floor(seconds / 60);
    const second = Math.floor(seconds % 60);
    const updatedSecond = second < 10 ? `0${second}`: `${second}`;
    const total = `${minute}:${updatedSecond}`;
    return total;
}

audio.addEventListener("loadedmetadata", () => {
    duration.textContent = calculateTime(audio.duration);
    progressBar.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.textContent = calculateTime(progressBar.value);
});

progressBar.addEventListener("input", () => {
    currentTime.textContent = calculateTime(progressBar.value);
    audio.currentTime = progressBar.value;
});

let muteState = "unmuted";

volumeBar.addEventListener("input", (e) => {
    const value = e.target.value;
    audio.volume = value / 100;
    if(value == 0){
        audio.muted = true;
        muteState = "muted";
        volume.classList = "fa-solid fa-volume-xmark";
    }else {
        audio.muted = false;
        muteState = "unmuted";
        volume.classList = "fa-solid fa-volume-high";
    }
});

volume.addEventListener("click", () => {
    if(muteState === "unmuted"){
        audio.muted = true;
        muteState = "muted";
        volume.classList = "fa-solid fa-volume-xmark";
        volumeBar.value = 0;
    }else {
        audio.muted = false;
        muteState = "unmuted";
        volume.classList = "fa-solid fa-volume-high";
        volumeBar.value = 100;
        audio.volume = 1;
    }
});

//İlk tıkta attribute almıyor boş dönüyor veysele sor.
listButton.addEventListener("click", () => {
    if(playlist.style.display==""){
        playlist.style.display = "none";
    }else{
        playlist.style.display = "";
    }
});

const displayPlaylist = (list) => {
    for(let i=0; i<list.length ; i++){
        let liTag = `
            <li li-index='${i}' onclick="selectedMusic(this)" class="list-item">
                <span class="list-text">${list[i].getFullName()}</span>
                <span id="music-${i}" class="badge"></span>
                <audio class="music-${i}" src="mp3/${list[i].file}"></audio>
            </li>
        `;
        ul.insertAdjacentHTML("beforeend", liTag);

        let liAudioDuration = ul.querySelector(`#music-${i}`);
        let liAudioTag = ul.querySelector(`.music-${i}`);

        liAudioTag.addEventListener("loadeddata", () => {
            liAudioDuration.innerText = calculateTime(liAudioTag.duration);
        })

        
    }
}

const selectedMusic = (li) => {
    player.index = parseInt(li.getAttribute("li-index"));
    displayMusic(player.getMusic());
    playMusic();
    nowPlaying();
}

const nowPlaying = () => {
    for(let li of ul.querySelectorAll("li")){
        if(li.classList.contains("now-playing")){
            li.classList.remove("now-playing");
        }

        if(li.getAttribute("li-index") == player.index){
            li.classList.add("now-playing");
        }
    }
}

audio.addEventListener("ended", () => {
    nextMusic();
})