// Canvas and context setup
var c = document.querySelector(`#pong`);
var ctx = c.getContext(`2d`);

// Game objects and variables
var states = [];
var o = [];
var pad = [];
var goals = [];
var timer, ball, currentState;
var scoreBoard;
var sides = {
    top: 0,
    bottom: c.height 
};

// Player configuration
var player = [
    new User().setProps({ h: 150, force: 1, fill: `#ffff00` }),
    new User().setProps({ h: 150, force: 1, fill: `#ffff00`, keys: { u: `ArrowUp`, d: `ArrowDown`, s: `ArrowLeft` } })
];

// Initialize the game
init();

// Main game loop
function main() {
    // Clear the canvas
    ctx.clearRect(0, 0, c.width, c.height);
    states[currentState]();
}

function init() {
    // Paddles (Player 1 and Player 2)
    o[0] = new Box().setProps(player[0]).setProps({ x: 10, dir: 1 });
    o[1] = new Box().setProps(player[1]).setProps({ x: c.width - 10, dir: -1 });
    o[1].type = 1;

    // Ball
    o[2] = new Box().setProps({ w: 20, h: 20, vx: -2, vy: 0, fill: `rgb(255,255,255)` });

    // Goals for both players
    o[3] = new Box().setProps({ x: o[0].x + ((c.width + 10) * o[0].dir), h: c.height, w: 20, fill: `green` });
    o[4] = new Box().setProps({ x: o[1].x + ((c.width + 10) * o[1].dir), h: c.height, w: 20 });

    // Associate paddles with players
    player[0].pad = o[0];
    player[1].pad = o[1];

    pad = [o[0], o[1]];
    ball = o[2];
    goals = [o[3], o[4]];
    scoreBoard = document.querySelectorAll(`#score div p`);
    currentState = `game`;
    o[1].target = ball;

    // Timer to run the game at 60fps
    clearTimeout(timer);
    timer = setInterval(main, 1000 / 60);
}

// Define game states
states[`pause`] = function () {
    o.forEach(function (i) {
        i.draw();
    });

    if (keys[`Escape`]) {
        currentState = `game`;
    }
};

states[`game`] = function () {
    // Ball movement
    ball.move();

    // Ball collision with top and bottom walls
    if (ball.y < sides.top + ball.h / 2) {
        ball.y = sides.top + ball.h / 2;
        ball.vy = -ball.vy;
    }
    if (ball.y > sides.bottom - ball.h / 2) {
        ball.y = sides.bottom - ball.h / 2;
        ball.vy = -ball.vy;
    }

    // Player movement and collision
    for (let i = 0; i < pad.length; i++) {
        // Player input handling
        if (keys[player[i].keys.u]) {
            pad[i].vy += -player[i].force;
        }
        if (keys[player[i].keys.d]) {
            pad[i].vy += player[i].force;
        }

        // Apply friction
        pad[i].vy *= player[i].fy;

        // Move the player
        pad[i].move();

        // Player collision with top and bottom walls
        if (pad[i].y < pad[i].h / 2) {
            pad[i].y = pad[i].h / 2;
            pad[i].vy = 0;
        }
        if (pad[i].y > c.height - pad[i].h / 2) {
            pad[i].y = c.height - pad[i].h / 2;
            pad[i].vy = 0;
        }

        // Ball and goal collision
        if (ball.collide(goals[i])) {
            ball.x = c.width / 2;
            player[i].score++;
            scoreBoard[i].innerHTML = player[i].score;
        }

        // Ball and paddle collision
        if (ball.collide(pad[i])) {
            ball.x = pad[i].x + pad[i].dir * (pad[i].w / 2 + ball.w / 2);
            ball.vx = pad[i].dir * player[i].power;

            // Check for special action key (s)
            if (keys[player[i].keys.s]) {
                ball.vy = 0;
                ball.vx = player[i].power * pad[i].dir;
            } else {
                if (ball.y < pad[i].y - pad[i].h / 6) {
                    ball.vy = -player[i].power;
                }
                if (ball.y > pad[i].y + pad[i].h / 6) {
                    ball.vy = player[i].power;
                }
            }
        }
    }

    // Draw game objects
    o.forEach(function (i) {
        i.draw();
    });

    // Debugging
    pad.forEach(function (i) {
        i.debug();
    });
};