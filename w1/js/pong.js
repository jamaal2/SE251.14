// Canvas and context
var c = document.querySelector(`#pong`)
var ctx = c.getContext(`2d`)

// Timer to make the game run at 60fps
var timer = setInterval(main, 1000/60)

// Global friction variable
var fy = 0.9

// P1 setup
var c = document.querySelector(`#pong`);
var ctx = c.getContext(`2d`);
var scoreDivs = document.querySelectorAll(`#score div`);

// Timer to make the game run at 60fps
var timer = setInterval(main, 1000/60);

// Global friction variable
var fy = 0.9;

// Player array
var player = [];
var pad = [];

// Player 1 setup
var p1 = new Box();
p1.w = 20;
p1.h = 150;
p1.x = 0 + p1.w / 2;

// P2 setup
var p2 = new Box();
p2.w = 20
p2.h = 150
p2.x = c.width - p2.w/2
p2.color = `gray`
// Player 2 setup
var p2 = new Box(); 
p2.w = 20;
p2.h = 150;
p2.x = c.width - p2.w / 2;
p2.color = `gray`;

// Ball setup
var ball = new Box();
ball.w = 20;
ball.h = 20;
ball.vx = -2;
ball.vy = -2;
ball.color = `white`;

// Player array
var player = [];

// Add player 1
player[0] = new Player();
player[0].pad = new Box();
player[0].pad.w = 20;
player[0].pad.h = 150;
player[0].pad.x = 0 + player[0].pad.w / 2;
var pad = [player[0].pad];
player[0].pad.color = 'gray';
pad[0] = player[0].pad;

// Add player 2
player[1] = new Player();
player[1].pad = new Box();
player[1].pad.w = 20;
player[1].pad.h = 150;
player[1].pad.x = c.width - player[1].pad.w / 2;
player[1].pad.color = 'gray';
pad[1] = player[1].pad;

// Score elements
var scoreElements = document.querySelectorAll('#score div');

function main() {
    // Update paddle movements using for loop
    for (var i = 0; i < pad.length; i++) {
        pad[i].move();
        pad[i].vy *= fy;
        pad[i].draw();
        scoreElements[i].innerText = player[i].score;
    }

 

    // Erases the canvas
    ctx.clearRect(0, 0, c.width, c.height)

    

    // P1 movement
    if (keys[`w`]) {
        p1.vy += -p1.force
    }

    if (keys[`s`]) {
        p1.vy += p1.force
    }

    p1.vy *= fy

    // Update player 1 and player 2 paddles
    pad[0].move();
    pad[1].move();
    pad[0].vy *= fy;
    pad[1].vy *= fy;

    // Draw player 1 and player 2 paddles
    pad[0].draw();
    pad[1].draw();

    // Update score div
    for (var i = 0; i < scoreDivs.length; i++) {
        scoreDivs[i].innerText = player[i].score;
    }

    // Erase the canvas
    ctx.clearRect(0, 0, c.width, c.height);

    // Player scores
    console.log(`${player[0].score} | ${player[1].score}`);

    // Player 1 movement
    if (keys[`w`]) {
        p1.vy += -p1.force;
    }

    if (keys[`s`]) {
        p1.vy += p1.force;
    }

    p1.vy *= fy;
    p1.move();
    p2.move();
    p2.vy *= fy;

    // P2 movement

    if (keys[`ArrowUp`]) {
        p2.vy += -p2.force
    }
    if (keys[`ArrowDown`]) {
        p2.vy += p2.force
    }

    // Ball movement
    ball.move()

    // P1 collision
    if (p1.y < 0 + p1.h / 2) {
        p1.y = 0 + p1.h / 2
    }
    if (p1.y > c.height - p1.h / 2) {
        p1.y = c.height - p1.h / 2
    }

    // P2 collision
    if (p2.y < 0 + p2.h / 2) {
        p2.y = 0 + p2.h / 2
    }
    if (p2.y > c.height - p2.h / 2) {
        p2.y = c.height - p2.h / 2
    }

    // Ball collision
    if (ball.x < 0) {
        ball.x = c.width / 2
        ball.y = c.height / 2
    // Player 2 movement
    if (keys[`ArrowUp`]) {
        p2.vy += -p2.force;
    }
    if (keys[`ArrowDown`]) {
        p2.vy += p2.force;
    }

    // Ball movement
    ball.move();

    // Player 1 collision
    if (p1.y < 0 + p1.h / 2) {
        p1.y = 0 + p1.h / 2;
    }
    if (p1.y > c.height - p1.h / 2) {
        p1.y = c.height - p1.h / 2;
    }

    // Player 2 collision
    if (p2.y < 0 + p2.h / 2) {
        p2.y = 0 + p2.h / 2;
    }
    if (p2.y > c.height - p2.h / 2) {
        p2.y = c.height - p2.h / 2;
    }

    // Ball collision 
    if (ball.x < 0) {
        ball.x = c.width / 2;
        ball.y = c.height / 2;
        player[1].score++;
    }

    if (ball.x > c.width) {
        ball.x = c.width / 2
        ball.vx = -ball.vx / 2
        ball.x = c.width / 2;
        ball.vx = -ball.vx / 2;
        player[0].score++;
    }

    if (ball.y < 0) {
        ball.y = 0
        ball.vy = -ball.vy
    }
    if (ball.y > c.height) {
        ball.y = c.height
        ball.vy = -ball.vy
    }

    // Paddle collision using for loop
    // p1 with ball collision
    if(ball.collide(p1))
    {
        ball.x = p1.x + p1.w/2 + ball.w/2
        ball.vx = -ball.vx;
    }
    
    // p1 with ball collision
    if(ball.collide(p1))
    {
        ball.x = p1.x + p1.w/2 + ball.w/2
        ball.y = 0;
        ball.vy = -ball.vy;
    }
    if (ball.y > c.height) {
        ball.y = c.height;
        ball.vy = -ball.vy;
    }

    // Player 1 with ball collision
    if (ball.collide(p1)) {
        ball.x = p1.x + p1.w / 2 + ball.w / 2;
        ball.vx = -ball.vx;
    }

    // Player 2 with ball collision
    if (ball.collide(p2)) {    
        ball.x = p2.x - p2.w / 2 - ball.w / 2;
        ball.vx = -ball.vx;
    }
    }
    // Draw the objects
    p1.draw()
    p2.draw()
    ball.draw()
    p1.draw();
    p2.draw();
    ball.draw();

}
