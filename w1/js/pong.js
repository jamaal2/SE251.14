//canvas and context
var c = document.querySelector(`#pong`)
var ctx = c.getContext(`2d`)

//timer to make the game run at 60fps
var timer = setInterval(main, 1000/60)

//global friction variable
var fy = 0.9

//p1 setup
var p1 = new Box();
p1.w = 20
p1.h = 150
p1.x = 0 + p1.w/2

//p2 setup
var p2 = new Box(); 
p2.w = 20 
p2.h = 150 
p2.x = c.width - p2.w/2
p2.color = `gray`

//ball setup
var ball = new Box();
ball.w = 20
ball.h = 20
ball.vx = -2
ball.vy = -2
ball.color = `black`

var player = [];
var pad = [];



// add player 1
player[0] = new Player();
player[0].pad = new Box();
player[0].pad.w = 20;
player[0].pad.h = 150;
player[0].pad.x = 0 + player[0].pad.w / 2;
pad[0] = player[0].pad;


// add player 2
player[1] = new Player();
player[1].pad = new Box();
player[1].pad.w = 20;
player[1].pad.h = 150;
player[1].pad.x = c.width - player[1].pad.w / 2;
player[1].pad.color = 'gray';
pad[1] = player[1].pad;



function main()
{

     // update player 1 and player 2 paddles
     pad[0].move();
     pad[1].move();
     pad[0].vy *= fy;
     pad[1].vy *= fy;
 
     // draw player 1 and player 2 paddles
     pad[0].draw();
     pad[1].draw();


    //erases the canvas
    ctx.clearRect(0,0,c.width,c.height)
    
    //p1 movement
    if(keys[`w`])
    {
       p1.vy += -p1.force
    }

    if(keys[`s`])
    {
        p1.vy += p1.force
    }
 
    p1.vy *= fy
    p1.move();
    p2.move();
    p2.vy *= fy

    //p2 movement
  
     if (keys[`ArrowUp`]) {
        
        p2.vy += -p2.force 
    }
    if (keys[`ArrowDown`]) {
        
        p2.vy += p2.force 
    }

    //ball movement
    ball.move()

    //p1 collision
    if(p1.y < 0+p1.h/2)
    {
        p1.y = 0+p1.h/2
    }
    if(p1.y > c.height-p1.h/2)
    {
        p1.y = c.height-p1.h/2
    }

    //p2 collision
    if(p2.y < 0+p2.h/2)
    {
        p2.y = 0+p2.h/2
    }
    if(p2.y > c.height-p2.h/2)
    {
        p2.y = c.height-p2.h/2
    }

    //ball collision 
    if(ball.x < 0)
    {
        ball.x = c.width/2
        ball.y  =c.height/2
    }
    if(ball.x > c.width)
    {
        ball.x = c.width
        ball.vx = -ball.vx
    }
    if(ball.y < 0)
    {
        ball.y = 0
        ball.vy = -ball.vy
    }
    if(ball.y > c.height)
    {
        ball.y = c.height
        ball.vy = -ball.vy
       
    }

    //p1 with ball collision
    if(ball.collide(p1))
    {
        ball.x = p1.x + p1.w/2 + ball.w/2
        ball.vx = -ball.vx;
    }

    //p2 with ball collision
    if (ball.collide(p2))
    {    
        ball.x = p2.x - p2.w/2 - ball.w/2 
        ball.vx = -ball.vx 
    }
    //draw the objects
    p1.draw()
    p2.draw()
    ball.draw()
}
