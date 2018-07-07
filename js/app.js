
var playerImages = [
    'images/char-princess-girl.png',
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png'    
];

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += dt * this.speed;
    if((this.y === player.y) && (player.x >= this.x) && (player.x <= (this.x + 75))) {
        player.y = 375;
        player.life--;
        player.sprite = playerImages[player.life];
    }
    if (this.x >= 505) {
        this.x = 0;
        this.y = ((Math.floor(Math.random()* 10 ) % 3) * 75) + 75;
        this.speed = Math.random()*800;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
    this.sprite = playerImages[0];
    this.x = 200;
    this.y = 375;
    this.score =0;
    this.life = 4;
};

Player.prototype.update = function(s) {

};

Player.prototype.render = function() {
    ctx.fillText("Score:- " + this.score +'\t\t\t\t' +"Life:- " + (this.life + 1),250,50);
    if (player.life === -1){
        ctx.fillText("GAME OVER !!!",250,270);
    }
    else{
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

Player.prototype.handleInput = function(keyPressed) {
    switch(keyPressed){
        case 'left' : 
            ((this.x === 0) || (this.x -= 100)); break;
        case 'right': 
            ((this.x === 400) || (this.x += 100)); break;
        case 'up': 
            (((this.y === 75) && (this.y = 375) && (this.score++)) || (this.y -= 75)); 
            console.log(this.score); break;
        case 'down': 
            ((this.y === 375) || (this.y += 75));
    }
};


var allEnemies = [];
var player = new Player();

for (var i=0; i<2; i++) {
    allEnemies.push(new Enemy(Math.random()*500, ((Math.floor(Math.random()* 10 ) % 3) * 75) + 75, Math.random()*800))
}

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
