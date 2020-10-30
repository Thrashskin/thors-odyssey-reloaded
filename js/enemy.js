class Enemy extends Character {
    constructor(gameboard, x, y, width, height, src, life, pace, barId) { 
        super(gameboard, x, y, width, height, src, life, pace) ;
        this.barId = barId;
        this.alive = true;
    }


    createAttacks() {
        // here we will define the frequency for the attacks
        //
        if (this.alive === false) {
            this.attacks = [];
        } else {
            if ((Math.floor(Math.random() * 1000) % 15 === 0)) {
                this.attacks.push(new Throwable((this.x + this.width/2), (this.y + this.height/2), 35, 35, 'images/eye.png', 20, 20));
            }
    
            setTimeout( () => {
                this.createAttacks();
            }, 4000);
        }  
    }
    
    move() {

        if (this.alive === false) {
            this.x = 0;
            this.y = 0;
        }

        let randMod = Math.floor(Math.random() * (4 - 1) + 1);
        this.x += this.pace;

        if (this.x + this.width + this.pace >= this.gameboard.canvas.width || this.x + this.pace <= 0) {
            this.pace *= -randMod;

        }
        if (this.pace > 35 || this.pace < -35) {
            this.pace = 5;
        }
    }
}
