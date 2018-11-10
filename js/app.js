let game = true;


// Place the player object in a variable called player
let Player = function(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.height = 50;
    this.width = 75;
}

const player = new Player(200, 400, "images/char-cat-girl.png");
const enemyPosition = [55, 140, 230];

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


Player.prototype.update = function(dt) {
    // update lives, gems, etc.
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(input) {
    const horizontal = 100;
    const vertical = 85;
    if (input === "left" && (this.x - horizontal >= 0)) {
        this.x -= horizontal;
    } else if (input === "right" && (this.x + horizontal < ctx.canvas.width - 100)) {
        this.x += horizontal; 
    } else if (input === "up" && (this.y - vertical >= -100)) {
        this.y -= vertical;
    } else if (input === "down" && (this.y + vertical < ctx.canvas.height - 200)) {
        this.y += vertical;
    }
}

// Enemies our player must avoid
let Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
    this.height = 50;
    this.width = 75;
    this.hit = false;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > ctx.canvas.width + this.width) {
        this.x = -150 * Math.floor(Math.random() * 4) + 1;
    } else {
        this.x += 150 * dt;
    }

    // If a bug hits a player, the game sets the player back to start
    if (hit(player.x, player.y, player.width, player.height, this.x, this.y, this.width, this.height)) {
        this.hit = true;
        if (player) {
            player.x = 200;
            player.y = 400;
        }
    } else {
        this.hit = false;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Place all enemy objects in an array called allEnemies
const allEnemies = enemyPosition.map((y, index) => {
    return new Enemy((-100 * (index + 1)), y);
})

// determine if the player was hit
function hit(px, py, pw, ph, ex, ey, ew, eh) {
    return (Math.abs(px - ex) * 2 < (pw + ew) && Math.abs(py - ey) * 2 < (ph + eh))
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});