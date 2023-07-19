var c = document.querySelector(`#pong`)
var ctx = c.getContext(`2d`)
var timer = setInterval(main, 1000/60)


var ball = new Box();
ball.vx = 10;

var wall = new Box()
wall. x = c.width - 100
wall.color = `black`


function main()
{
    ctx.clearRect(0,0,c.width,c.height)
    ball.move()

    if(ball.collide(wall))
    {
        ball.vx = -ball.vx
    }

    ball.draw()
    wall.draw()

}
