class Warrior extends Character {
    constructor(gameboard, x, y, width, height, src, life, pace) {
        super(gameboard, x, y, width, height, src, life, pace);
        this.power = 0;
        this.superAttacks = [];
    }

    act() {
        // window.addEventListener('keydown', (e) => {
        //     switch(e.keyCode) {
        //         case 37: //left arrow
        //             if (this.x >= 10) this.x -= 20;
        //             console.log('xxx', this.x);
        //             break;
        //         case 39: //right arrow
        //             if (this.x <= 490 - this.width) this.x += 20;
        //             console.log('xxx', this.x);
        //             break;
        //     }
        // });   

        document.onkeydown = event => {
            const key = event.keyCode;
            switch(key) {
                case 37: //left arrow
                    if (this.x >= this.pace) { //left boundary
                        this.x -= this.pace;
                    } 
                    break;
                case 39: //right arrow
                    if (this.x <= 1000 - this.width - this.pace) { //right boundary
                        this.x += this.pace;
                    } 
                    break;
                case 65:
                    this.attacks.push(new Throwable((this.x + this.width/2), (this.y), 35, 35, 'images/magentafireball.png', 20, 25));
                    break;
                case 81:
                    if (this.power > 1000) {
                        this.superAttacks.push(new Throwable((this.x + this.width/2), this.y, 100, 100, 'images/superAttack.png', 150, 50));
                        this.power = 0;
                    }
                    break;
                case 32:
                    break;
            }
        };   
    }


    // superAttack() {
        
    // }
}

