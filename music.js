class Music {
    constructor(title, singer, img , file) {
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.file = file;
    }

    getName() {
        return this.title;
    }

    getFullName() {
        return `${this.title} - ${this.singer}`;
    }

}


const musicList = [
    new Music ("California Dreamin'", "Mamas and Papas", "california.jpg", "california.mp3"),
    new Music ("Bohemian Rhapsody", "Queen", "bohemian rhapsody.jpg", "Bohemian Rhapsody.mp3"),
    new Music ("Stayin' Alive", "Bee Gees", "stayinalive.jpg", "Stayin' Alive.mp3"),
    new Music ("Come Together", "Beatles", "beatles.jpg", "Come Together.mp3"),
    new Music ("In Dreams", "Roy Orbison", "roy.jpg", "In Dreams.mp3")
]