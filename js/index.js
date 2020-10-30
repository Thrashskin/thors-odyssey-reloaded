window.onload = () => {

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let backGroundImg = new Image();

    backGroundImg.onload = () => {
            ctx.drawImage(backGroundImg, 0, 0, canvas.width, canvas.height);
        };

    backGroundImg.src = 'images/sky.jpg';

    [...document.getElementsByClassName('start-button')].forEach(button => {
        button.addEventListener('click', () => {
            let difficultyLevel = button.getAttribute('id');
            startGame(difficultyLevel);
            [...document.getElementsByClassName('start-button')].forEach(button => button.disabled = true);
        });
    });

    function startGame(difficultyLevel) {
        let gameboard = new Gameboard(difficultyLevel);
        gameboard.init();
        //console.log(difficultyLevel);
    }

    document.getElementById('reset').addEventListener('click', () => {
        window.location.reload('false');
    });

};
