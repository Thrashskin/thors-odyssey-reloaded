class Throwable {
    constructor(x, y, width, height, src, damage, pace) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.img = new Image();
        this.src = src;
        this.damage = damage;
        this.pace = pace;
    }

    move(down) {
        if (down === true) {
            this.y += this.pace;
        } else {
            this.y -= this.pace;
        }
    }

    hasCollided(character, warriorToEnemy) {
        let front = undefined;
        let left = undefined;
        let right = undefined;


        if (warriorToEnemy) { //Attack from warrior to enemy
            front = (this.y < (character.y + character.height)) && (this.y > (character.y+character.height-this.pace-10)) && (this.x > character.x ) && ((this.x + this.width) < (character.x + character.width));
            left = (this.y < (character.y + character.height)) && (this.y > (character.y+character.height-this.pace-10)) && ((this.x + this.width) >= character.x) && ((this.x + this.width) <= character.x + (character.width/2));
            right = (this.y < (character.y + character.height)) && (this.y > (character.y+character.height-this.pace-10)) && (this.x >= (character.x + (character.width/2))) && (this.x <= (character.x + character.width));

            if (front || left || right) {
                return true;
            }


            // if (front) {
            //     // console.log('front:', this);
            //     // console.log('warrior:', character);
            // } else if (left) {
            //     // console.log('left: ', this);
            //     // console.log('warrior:', character);
            // } else if (right) {
            //     console.log('right: ', this);
            //     console.log('warrior:', character);
            // }


        } else { //attack from enemy to warrior
            front = (((this.y + this.height) > character.y) && ((this.y + this.height) < (character.y + this.pace+10))) &&  (((this.x + this.width) > character.x ) && (this.x + this.width < (character.x + character.width)));
            left = ((this.y + this.height) > character.y) && ((this.y + this.height) < (character.y + character.height)) && ((this.x + this.width) >= character.x) && ((this.x + this.width) <= character.x + (character.width/2));
            right = ((this.y + this.height) > character.y) && ((this.y + this.height) < (character.y + character.height)) && (this.x >= (character.x + (character.width/2))) && (this.x <= (character.x + character.width));

            if (front || left || right) {
                return true;
            }

            
         }
        
    }
}
