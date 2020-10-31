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
        this.warrior = new Warrior(this, 300, 482, 100, 125, 'images/thor.png', 2000, 15);
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;

        this.sounds = {
            bullet_thor : new Audio('./sound-effects/throwknife2.mp3'),
            bullet_enemy : new Audio('./sound-effects/shoot_cthulhu.mp3'),
            explosion : new Audio('./sound-effects/explosion.mp3'),
            super_attack : new Audio('./sound-effects/missile.mp3')
        };

        switch(this.difficultyLevel) {

                case 'easy':
                    this.enemies.push(new Enemy(this, 0, 10, 100, 125, 'images/cthulhu.png', 3000, 5, 'health-cthulhu'));
                    break;
                case 'medium':
                    this.enemies.push(new Enemy(this, 0, 10, 100, 125, 'images/cthulhu.png', 3000, 5, 'health-cthulhu'));
                    this.enemies.push(new Enemy(this, 150, 40, 100, 125, 'images/kraken.png', 3500, 5, 'health-kraken'));
                    break;
                case 'hard':
                    this.enemies.push(new Enemy(this, 0, 10, 100, 125, 'images/cthulhu.png', 3000, 5, 'health-cthulhu'));
                    this.enemies.push(new Enemy(this, 150, 40, 100, 125, 'images/kraken.png', 3500, 5, 'health-kraken'));
                    this.enemies.push(new Enemy(this, 300, 40, 100, 125, 'images/pasta.png', 4000, 5, 'health-pasta'));
                    break;
        }

        this.createCharacters(this.difficultyLevel);
        this.warriorHealthBar = document.getElementById('health-warrior');
        this.powerBar = this.createPowerBar('power-warrior');
        console.log(this.powerBar);
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
            
            if(this.allEnemiesDead()) {
                console.log('death');
                this.drawDeath(250,80,500,500, 'images/awesome.png');
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
        img.onload = () => {
            this.ctx.drawImage(
                img,
                x,
                y,
                width,
                height
            );
        };
        

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
                nodes[1].children[1].setAttribute('id', 'health-cthulhu');
                nodes[1].children[1].setAttribute('value', this.enemies[0].health);
                nodes[1].children[1].setAttribute('max', this.enemies[0].health);

                break;

            case 'medium':

                nodes[0].children[0].innerHTML = 'THOR';
                nodes[0].children[1].setAttribute('id', 'health-warrior');
                nodes[0].children[1].setAttribute('value', this.warrior.health);
                nodes[0].children[1].setAttribute('max', this.warrior.health);
                
                nodes[1].children[0].innerHTML = 'CTHULHU';
                nodes[1].children[1].setAttribute('id', 'health-cthulhu');
                nodes[1].children[1].setAttribute('value', this.enemies[0].health);
                nodes[1].children[1].setAttribute('max', this.enemies[0].health);

                nodes[2].children[0].innerHTML = 'THE KRAKEN';
                nodes[2].children[1].setAttribute('id', 'health-kraken');
                nodes[2].children[1].setAttribute('value', this.enemies[1].health);
                nodes[2].children[1].setAttribute('max', this.enemies[1].health);

                break;

            case 'hard':

                nodes[0].children[0].innerHTML = 'THOR';
                nodes[0].children[1].setAttribute('id', 'health-warrior');
                nodes[0].children[1].setAttribute('value', this.warrior.health);
                nodes[0].children[1].setAttribute('max', this.warrior.health);
                
                nodes[1].children[0].innerHTML = 'CTHULHU';
                nodes[1].children[1].setAttribute('id', 'health-cthulhu');
                nodes[1].children[1].setAttribute('value', this.enemies[0].health);
                nodes[1].children[1].setAttribute('max', this.enemies[0].health);

                nodes[2].children[0].innerHTML = 'THE KRAKEN';
                nodes[2].children[1].setAttribute('id', 'health-kraken');
                nodes[2].children[1].setAttribute('value', this.enemies[1].health);
                nodes[2].children[1].setAttribute('max', this.enemies[1].health);

                nodes[3].children[0].innerHTML = 'PASTA MONSTER';
                nodes[3].children[1].setAttribute('id', 'health-pasta');
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

    createPowerBar(id){
        let emptyBar = this.createCharacterElement();
        let powerBar = document.getElementById('characters').parentNode.appendChild(emptyBar);

        powerBar.children[0].innerHTML = 'POWER';
        powerBar.children[1].setAttribute('id', id);
        powerBar.children[1].setAttribute('value', this.warrior.power);
        powerBar.children[1].setAttribute('max', 1000);

        return powerBar.children[1];
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
                if (this.enemies[j].alive === false) {
                    continue;
                } else {
                    this.checkCollisionAndDamage(this.enemies[j], throwable, this.enemies[j].barId, i, j);   
                }
            }
        }

        for (let i=0; i<this.warrior.superAttacks.length; i++) {
            let throwable = this.warrior.superAttacks[i];
            throwable.move(false);
            this.sounds.super_attack.play();
            throwable.img.src = throwable.src;
            this.ctx.drawImage(
                throwable.img, 
                throwable.x, 
                throwable.y, 
                throwable.width, 
                throwable.height
            );

            for (let j = 0; j < this.enemies.length; j++) {

                if (this.enemies[j].alive === false) {
                    continue;
                } else {
                    this.checkCollisionAndDamage(this.enemies[j], throwable, this.enemies[j].barId, i, j);  
                }
            }

            if (throwable.y < 0) {
                this.warrior.superAttacks.splice(i, 1);
            }


        }
    }

    checkCollisionAndDamage(enemy, throwable, i, j) {

        let healthBar = document.getElementById(enemy.barId);

        if (throwable.hasCollided(enemy, true)) {
            this.warrior.attacks.splice(i, 1);
            enemy.health -= throwable.damage;
            healthBar.value = enemy.health;
            this.sounds.explosion.play();
            this.drawExplosion(throwable, throwable.y, './images/explosion_2.png');

            switch(this.difficultyLevel) {
                case 'easy':
                    this.warrior.power += 10;
                    break;
                case 'medium':
                    this.warrior.power += 15;
                    break;
                case 'hard':
                    this.warrior.power += 15;
                    break;
            }
            this.powerBar.value = this.warrior.power;
        }

        if(enemy.health <= 0) {
            //this.drawDeath(enemy.x-100, enemy.y - 160 ,enemy.width*2+40, enemy.height*2+20, './images/ghost.png');
            //enemy.attacks = null;
            enemy.x = -100;
            enemy.y = -100;
            enemy.width = 1;
            enemy.height = 1;
            enemy.src = '';
            enemy.alive = false;
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
                this.drawExplosion(throwable, this.warrior.y, './images/explosion_2.png');
                enemy.attacks.splice(i, 1);
                this.warriorHealthBar.value = this.warrior.health;
            }

            if (throwable.y > 590) {
                this.sounds.explosion.play();
                this.drawExplosion(throwable, 550, './images/explosion_2.png');
                enemy.attacks.splice(i, 1);
            }

            if(this.warrior.health <= 0) {
                this.drawDeath(this.warrior.x-20, this.warrior.y, this.warrior.width, this.warrior.height,'./images/tombstone.png');
                this.drawDeath(250,50,400,350, './images/gameover.png');
                clearInterval(this.interval);
            }
            
    }

    }

    allEnemiesDead() {
        let alive = this.enemies.filter(enemy => enemy.alive === true);
        
        if (alive.length > 0)  {
            return false;
        } else {
            return true;
        }
    }

}
