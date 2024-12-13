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
    new Music ("Hit 'em Up", "Tupac", "tupac.jpg", "hit em up.mp3"),
    new Music ("Six", "Menace Santana", "six.jpg", "Six.mp3"),
    new Music ("0.44 Dolar", "Abbas Savage", "abbas.jpg", "44 Dolar.mp3"),
    new Music ("Mask Off", "Abbas Savage", "abbasmaskoff.jpg", "Mask Off Abbas.mp3")
]