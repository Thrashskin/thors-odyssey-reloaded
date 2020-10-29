class Gameboard {
    
    constructor(difficultyLevel) {
        this.canvas = undefined;
        this.ctx = undefined;
        this.backgroundImg = new Image();
        this.score = 0;
        this.warrior = undefined;
        this.activeEnemies = undefined;
        //this.enemy = undefined;
        this.x = undefined;
        this.y = undefined;
        this.width = undefined;
        this.height = undefined;
        this.interval = undefined;
        this.warriorHealthBar = undefined;
        this.difficultyLevel = difficultyLevel;
        this.enemies = [];
        // this.enemies = {
        //     enemy_1 : undefined,
        //     enemy_2 : undefined,
        //     enemy_3 : undefined
        // }
    };

    init() {
        this.canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');
        this.warrior = new Warrior(this, 300, 482, 100, 125, 'images/thor.png', 20000, 15);
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.sounds = {
            bullet_thor : new Audio('./sound-effects/shoot_thor.mp3'),
            bullet_enemy : new Audio('./sound-effects/shoot_cthulhu.mp3'),
            explosion : new Audio('./sound-effects/explosion.mp3')
        };

        switch(this.difficultyLevel) {

                // case 'easy':
                //     this.enemies.enemy_1 = new Enemy(this, 0, 10, 100, 125, 'images/cthulhu.png', 5000, 5);
                //     this.activeEnemies = 1;
                //     break;
                // case 'medium':
                //     this.enemies.enemy_1 = new Enemy(this, 0, 10, 100, 125, 'images/cthulhu.png', 5000, 5);
                //     this.enemies.enemy_2 = new Enemy(this, 150, 40, 100, 125, 'images/kraken.png', 5000, 5);
                //     this.activeEnemies = 2;
                //     break;
                // case 'hard':
                //     this.enemies.enemy_1 = new Enemy(this, 0, 10, 100, 125, 'images/cthulhu.png', 5000, 5);
                //     this.enemies.enemy_2 = new Enemy(this, 150, 20, 100, 125, 'images/kraken.png', 6000, 5);
                //     this.enemies.enemy_3 = new Enemy(this, 300, 40, 100, 125, 'images/pasta.png', 7000, 5);
                //     this.activeEnemies = 3;
                //     break;

                case 'easy':
                    this.enemies.push(new Enemy(this, 0, 10, 100, 125, 'images/cthulhu.png', 5000, 5));
                    break;
                case 'medium':
                    this.enemies.push(new Enemy(this, 0, 10, 100, 125, 'images/cthulhu.png', 5000, 5));
                    this.enemies.push(new Enemy(this, 150, 40, 100, 125, 'images/kraken.png', 5000, 5));
                    break;
                case 'hard':
                    this.enemies.push(new Enemy(this, 0, 10, 100, 125, 'images/cthulhu.png', 5000, 5));
                    this.enemies.push(new Enemy(this, 150, 20, 100, 125, 'images/kraken.png', 6000, 5));
                    this.enemies.push(new Enemy(this, 300, 40, 100, 125, 'images/pasta.png', 7000, 5));
                    break;
        }
        this.createCharacters(this.difficultyLevel);
        this.warriorHealthBar = document.getElementById('health-warrior');
        this.start();
    }

    start() {
        this.clear();   
        this.drawBackground();
        this.drawWarrior(this.warrior.x, this.warrior.y, this.warrior.width, this.warrior.height);
        //this.drawEnemy(this.enemy.x, this.enemy.y, this.enemy.width, this.enemy.height);
        this.interval = setInterval( () => {

            this.clear();
            this.drawBackground();
            
            this.warrior.act();
            this.drawWarrior(this.warrior.x, this.warrior.y, this.warrior.width, this.warrior.height);
            this.executeWarriorActions();

            for (let i = 0; i <this.enemies.length; i++) {
                this.enemies[i].move();
                this.drawEnemy(this.enemies[i], this.enemies[i].x, this.enemies[i].y, this.enemies[i].width, this.enemies[i].height);    
                this.enemies[i].createAttacks();
                this.executeEnemyActions(this.enemies[i]);
            }

            

            // switch(this.difficultyLevel) {

            //     case 'easy':

            //         this.enemies.enemy_1.move();
            //         this.drawEnemy(this.enemies.enemy_1, this.enemies.enemy_1.x, this.enemies.enemy_1.y, this.enemies.enemy_1.width, this.enemies.enemy_1.height);    
            //         this.enemies.enemy_1.createAttacks();
            //         this.executeEnemyActions(this.enemies.enemy_1);

            //         break;

            //     case 'medium':
                    
            //         this.enemies.enemy_1.move();
            //         this.drawEnemy(this.enemies.enemy_1, this.enemies.enemy_1.x, this.enemies.enemy_1.y, this.enemies.enemy_1.width, this.enemies.enemy_1.height);    
            //         this.enemies.enemy_1.createAttacks();
            //         this.executeEnemyActions(this.enemies.enemy_1);

            //         this.enemies.enemy_2.move();
            //         this.drawEnemy(this.enemies.enemy_2, this.enemies.enemy_2.x, this.enemies.enemy_2.y, this.enemies.enemy_2.width, this.enemies.enemy_2.height);    
            //         this.enemies.enemy_2.createAttacks();
            //         this.executeEnemyActions(this.enemies.enemy_2);

            //         break;

            //     case 'hard':
            //         this.enemies.enemy_1.move();    
            //         this.drawEnemy(this.enemies.enemy_1, this.enemies.enemy_1.x, this.enemies.enemy_1.y, this.enemies.enemy_1.width, this.enemies.enemy_1.height);    
            //         this.enemies.enemy_1.createAttacks();
            //         this.executeEnemyActions(this.enemies.enemy_1);

            //         this.enemies.enemy_2.move();
            //         this.drawEnemy(this.enemies.enemy_2, this.enemies.enemy_2.x, this.enemies.enemy_2.y, this.enemies.enemy_2.width, this.enemies.enemy_2.height);    
            //         this.enemies.enemy_2.createAttacks();
            //         this.executeEnemyActions(this.enemies.enemy_2);

            //         this.enemies.enemy_3.move();
            //         this.drawEnemy(this.enemies.enemy_3, this.enemies.enemy_3.x, this.enemies.enemy_3.y, this.enemies.enemy_3.width, this.enemies.enemy_3.height);    
            //         this.enemies.enemy_3.createAttacks();
            //         this.executeEnemyActions(this.enemies.enemy_3);
            //         break;
            // }
            
            if(this.enemies.length === 0) {
                console.log('death');
                clearInterval(this.interval);
            }

        } ,50);
    }

    

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawBackground() {

        this.backgroundImg.src = './images/sky.jpg';
        this.ctx.drawImage(
            this.backgroundImg,
            this.x,
            this.y,
            this.width,
            this.height
            );
    }

    drawWarrior(x, y, width, height) {
    
        this.warrior.characterImg.src = this.warrior.src;
        this.ctx.drawImage(
            this.warrior.characterImg, 
            x, 
            y, 
            width, 
            height);

    }

    drawEnemy(enemy, x, y, width, height) {
        enemy.characterImg.src = enemy.src;
        this.ctx.drawImage(
            enemy.characterImg, 
            x, 
            y, 
            width, 
            height);
    }


    drawExplosion(throwable, y, src) {
        let attack = throwable;
        let explosion = new Image();
        explosion.src = src;
        this.ctx.drawImage(
            explosion, 
            attack.x, 
            y, 
            50, 
            50
        );        
    }

    drawDeath(x, y, width, height, src) {
        let img = new Image();
        img.src = src;  
        this.ctx.drawImage(
            img,
            x,
            y,
            width,
            height
        );
        // img.onload = () => {
        //     this.ctx.drawImage(
        //         img,
        //         x,
        //         y,
        //         width,
        //         height
        //     );
        // };
    }

    createCharacters(difficultyLevel) {
        this.createDomElements(difficultyLevel);
        let nodes = document.getElementById('characters').children;
        

        switch(difficultyLevel) {

            case 'easy':

                nodes[0].children[0].innerHTML = 'THOR';
                nodes[0].children[1].setAttribute('id', 'health-warrior');
                nodes[0].children[1].setAttribute('value', this.warrior.health);
                nodes[0].children[1].setAttribute('max', this.warrior.health);
                
                nodes[1].children[0].innerHTML = 'CTHULHU';
                nodes[1].children[1].setAttribute('id', 'health-enemy1');
                nodes[1].children[1].setAttribute('value', this.enemies[0].health);
                nodes[1].children[1].setAttribute('max', this.enemies[0].health);

                break;

            case 'medium':

                nodes[0].children[0].innerHTML = 'THOR';
                nodes[0].children[1].setAttribute('id', 'health-warrior');
                nodes[0].children[1].setAttribute('value', this.warrior.health);
                nodes[0].children[1].setAttribute('max', this.warrior.health);
                
                nodes[1].children[0].innerHTML = 'CTHULHU';
                nodes[1].children[1].setAttribute('id', 'health-enemy1');
                nodes[1].children[1].setAttribute('value', this.enemies[0].health);
                nodes[1].children[1].setAttribute('max', this.enemies[0].health);

                nodes[2].children[0].innerHTML = 'THE KRAKEN';
                nodes[2].children[1].setAttribute('id', 'health-enemy2');
                nodes[2].children[1].setAttribute('value', this.enemies[1].health);
                nodes[2].children[1].setAttribute('max', this.enemies[1].health);

                break;

            case 'hard':

                nodes[0].children[0].innerHTML = 'THOR';
                nodes[0].children[1].setAttribute('id', 'health-warrior');
                nodes[0].children[1].setAttribute('value', this.warrior.health);
                nodes[0].children[1].setAttribute('max', this.warrior.health);
                
                nodes[1].children[0].innerHTML = 'CTHULHU';
                nodes[1].children[1].setAttribute('id', 'health-enemy1');
                nodes[1].children[1].setAttribute('value', this.enemies[0].health);
                nodes[1].children[1].setAttribute('max', this.enemies[0].health);

                nodes[2].children[0].innerHTML = 'THE KRAKEN';
                nodes[2].children[1].setAttribute('id', 'health-enemy2');
                nodes[2].children[1].setAttribute('value', this.enemies[1].health);
                nodes[2].children[1].setAttribute('max', this.enemies[1].health);

                nodes[3].children[0].innerHTML = 'PASTA MONSTER';
                nodes[3].children[1].setAttribute('id', 'health-enemy3');
                nodes[3].children[1].setAttribute('value', this.enemies[2].health);
                nodes[3].children[1].setAttribute('max', this.enemies[2].health);
                
                break;
        }
    }

    createDomElements(difficultyLevel) {
        switch(difficultyLevel) {
            case 'easy':
                document.getElementById('characters').append(this.createCharacterElement(), this.createCharacterElement());
                break;
            case 'medium':
                document.getElementById('characters').append(this.createCharacterElement(),this.createCharacterElement(), this.createCharacterElement());
                break;
            case 'hard':
                document.getElementById('characters').append(this.createCharacterElement(), this.createCharacterElement(), this.createCharacterElement(), this.createCharacterElement());
                break;
        }
    }

    createCharacterElement() {
        let divTag = document.createElement('div');
        let pTag = document.createElement('p');
        let progressTag = document.createElement('progress');

        divTag.append(pTag, progressTag);

        return divTag;
    }

    executeWarriorActions() {

        for (let i=0; i<this.warrior.attacks.length; i++) {
            let throwable = this.warrior.attacks[i];
            throwable.move(false);
            this.sounds.bullet_thor.play();
            throwable.img.src = throwable.src;
            this.ctx.drawImage(
                throwable.img, 
                throwable.x, 
                throwable.y, 
                throwable.width, 
                throwable.height
            );

            for (let j = 0; j < this.enemies.length; j++) {
                this.checkCollisionAndDamage(this.enemies[j], throwable, `health-enemy${j+1}`, i, j);
            }
            // switch(this.difficultyLevel) {
            //     case 'easy':
            //         this.checkCollisionAndDamage(this.enemies.enemy_1, throwable, 'health-enemy1', i);
            //         break;
            //     case 'medium':
            //         this.checkCollisionAndDamage(this.enemies.enemy_1, throwable, 'health-enemy1', i);
            //         this.checkCollisionAndDamage(this.enemies.enemy_2, throwable, 'health-enemy2', i);
            //         break;
            //     case 'hard':
            //         this.checkCollisionAndDamage(this.enemies.enemy_1, throwable, 'health-enemy1', i);
            //         this.checkCollisionAndDamage(this.enemies.enemy_2, throwable, 'health-enemy2', i);
            //         this.checkCollisionAndDamage(this.enemies.enemy_3, throwable, 'health-enemy3', i);
            //         break;
            // }


            if (throwable.y < 0) {
                this.warrior.attacks.splice(i, 1);
            }


        }
    }

    checkCollisionAndDamage(enemy, throwable, healthBarId, i, j) {

        let healthBar = document.getElementById(healthBarId);

        if (throwable.hasCollided(enemy, true)) {
            this.warrior.attacks.splice(i, 1);
            enemy.health -= throwable.damage;
            healthBar.value = enemy.health;
            this.sounds.explosion.play();
            this.drawExplosion(throwable, throwable.y, 'images/explosion_2.png');
        }

        if(enemy.health <= 0) {
            this.drawDeath(enemy.x-100, enemy.y - 160 ,enemy.width*2+40, enemy.height*2+20, 'images/ghost.png');
            enemy.attacks = null;
            //this.activeEnemies--;
            this.enemies.splice(j, 1);
        }
    }
    

    executeEnemyActions(enemy) {

        for (let i=0; i<enemy.attacks.length; i++) {

            let throwable = enemy.attacks[i];
            throwable.move(true);
            throwable.img.src = throwable.src;
            this.sounds.bullet_enemy.play();
            this.ctx.drawImage(
                throwable.img, 
                throwable.x, 
                throwable.y, 
                throwable.width, 
                throwable.height
            );

            if (throwable.hasCollided(this.warrior, false)) {
                this.warrior.health -= throwable.damage;
                this.sounds.explosion.play();
                this.drawExplosion(throwable, this.warrior.y, 'images/explosion_2.png');
                enemy.attacks.splice(i, 1);
                this.warriorHealthBar.value = this.warrior.health;
            }

            if (throwable.y > 590) {
                this.sounds.explosion.play();
                this.drawExplosion(throwable, 550, 'images/explosion_2.png');
                enemy.attacks.splice(i, 1);
            }

            if(this.warrior.health <= 0) {
                this.drawDeath(this.warrior.x-20, this.warrior.y, this.warrior.width, this.warrior.height,'images/tombstone.png');
                
                clearInterval(this.interval);
            }
            
    }

    }

}
