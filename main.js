
// DOM Selector

let current = document.querySelector("#current");
let count = document.querySelector("#count");
let menu = document.querySelector("#menu");
let navList = document.querySelector("#nav-list");
let title = document.querySelector("#title");
let singer = document.querySelector("#singer");
let poster = document.querySelector("#poster");
let prev = document.querySelector("#prev");
let play = document.querySelector("#play");
let next = document.querySelector("#next");
let range = document.querySelector("#range");
let loop = document.querySelector("#loop");
let playSingle = document.querySelector("#playSingle");


// Global Variable

let musics = [
    {
        id : 1,
        title : "Music 1",
        singer : "Singer 1",
        img_path : "img/01.jpg",
        music_path : "music/01.mp3"
    },
    {
        id : 2,
        title : "Music 2",
        singer : "Singer 2",
        img_path : "img/02.jpg",
        music_path : "music/02.mp3"
    },
    {
        id : 3,
        title : "Music 3",
        singer : "Singer 3",
        img_path : "img/02.jpg",
        music_path : "music/01.mp3"
    },
    {
        id : 4,
        title : "Music 4",
        singer : "Singer 4",
        img_path : "img/01.jpg",
        music_path : "music/02.mp3"
    },
    {
        id : 5,
        title : "Music 5",
        singer : "Singer 5",
        img_path : "img/02.jpg",
        music_path : "music/02.mp3"
    },
    {
        id : 6,
        title : "Music 6",
        singer : "Singer 6",
        img_path : "img/01.jpg",
        music_path : "music/01.mp3"
    }
]

let loop1 = false;
let playing = false;
let index = 0;
const track = document.createElement("audio");

// Load Track

function loadTrack(i){
    let index = Number(i);
    range.value = 0;
    title.innerHTML = musics[index].title;
    singer.innerHTML = musics[index].singer;
    poster.src = musics[index].img_path;
    track.src = musics[index].music_path;
    track.load();
    current.innerHTML = index + 1;
    count.innerHTML = musics.length;
    setInterval(trackCurrentTime,1000);
}
loadTrack(index);

// Check Play or Pause

function checkMusic(){
    playing === true ? justPause() : justPlay();
}

// Just Play 

function justPlay(){
    track.play();
    playing = true;
    play.className = "fa fa-pause";
    console.log(track.duration);
    console.log(track.currentTime);
}

// Just Pause 

function justPause(){
    track.pause();
    playing = false;
    play.className = "fa fa-play"
}

// Prev Song 

function prevSong(){
    if(loop1){
        loadTrack(index);
    }else{
        if(index <= 0) index = musics.length - 1;
        else index--;
        loadTrack(index);
    }
    playing = false;
    checkMusic();
}

// next Song 

function nextSong(){
    if(loop1){
        loadTrack(index);
    }else{
        if(index >= musics.length - 1) index = 0;
        else index++;
        loadTrack(index);
    }
    playing = false;
    checkMusic();
}

// Slider Dynamic 

function trackCurrentTime(){
    range.value = track.currentTime * (100 / track.duration);
    if(track.ended){
        if(loop1){
            track.play()
        }else{
            nextSong();
        }
    }
}

// // Dynamic Range 

function changeRange(){
    track.currentTime = range.value * (track.duration / 100);
}

// Check Loop

function looper(){
    loop1 ? loopAll() : loopOne();
}

// Loop One 

function loopOne(){
    loop.innerHTML = "Loop One";
    loop1 = true; 
}

// Loop All 

function loopAll(){
    loop.innerHTML = "Loop All";
    loop1 = false; 
}

// Nav List Toggle

function toggleMenu(){
    navList.classList.toggle("nav-list-active");
    menu.classList.toggle("fa-times")
}

// Fetch Music In My List 

musics.map((music,index) => {
    let li = document.createElement("li");
    li.innerHTML = `
                    <div>
                        <h3>${music.title}</h3>
                        <p>${music.singer}</p>
                    </div>
                    <i class="trackSingle ${index} fas fa-play" id="playSingle"></i>
                    `;
    navList.appendChild(li);                
});

// Load Single Song 

function loadSingleSong(e){
    if(e.target.classList.contains("trackSingle") && e.target.classList.contains("fa-play")){
        loadTrack(e.target.classList[1]);
        playing = false;
        checkMusic();

        Array.from(navList.children).forEach(li => {
            li.lastElementChild.classList.remove("fa-pause");
            li.lastElementChild.classList.add("fa-play");
        })
        e.target.classList.add("fa-pause");
        e.target.classList.remove("fa-play");
    }
    else if(e.target.classList.contains("trackSingle") && e.target.classList.contains("fa-pause")){
        playing = true;
        checkMusic();
        e.target.classList.remove("fa-pause");
        e.target.classList.add("fa-play");
    }
    
}

// Even Listener 

play.addEventListener("click",checkMusic);
prev.addEventListener("click",prevSong);
next.addEventListener("click",nextSong);
loop.addEventListener("click",looper);
range.addEventListener("change",changeRange)
menu.addEventListener("click",toggleMenu)
navList.addEventListener("click",loadSingleSong)

