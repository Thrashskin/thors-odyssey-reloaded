class Enemy extends Character {
    constructor(gameboard, x, y, width, height, src, life, pace, barId) { 
        super(gameboard, x, y, width, height, src, life, pace) ;
        this.barId = barId;
    }


    createAttacks() {
        // here we will define the frequency for the attacks
        //
        if ((Math.floor(Math.random() * 1000) % 15 === 0)) {
            this.attacks.push(new Throwable((this.x + this.width/2), (this.y + this.height/2), 35, 35, 'images/eye.png', 20, 20));
        }

        setTimeout( () => {
            this.createAttacks();
        }, 4000);   
    }
    
    move() {

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
