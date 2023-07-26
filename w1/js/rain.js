//canvas and context
var c = document.querySelector(`#pong`)
var ctx = c.getContext(`2d`)

//timer to make the game run at 60fps
var timer = setInterval(main, 1000/60)

var p = []
var amt = 5000 //amount of rain

for(let i=0; i<amt; i++)
{
    p[i] = new Box();
    p[i].x = c.width/2  //Math.random() * c.width; 
    p[i].y = c.height/2 //Math.random() * c.height;
    p[i].w = rand(10, 20)
    p[i].h = p[i].w
    p[i].vy = p[i].w * .85; //velocity
}

function rand(l, h)
{
    return Math.random() * (h - l) + 1
}

function main()
{
    //erases the canvas
    ctx.clearRect(0,0,c.width,c.height) 
    for(let i=0; i<p.length; i++)
    {
        p[i].move()
        if(p[i].y > c.height + p[i].h)
        {
            p[i].y = -p[i].h
            p[i].x = Math.random() * c.width;
        }
        p[i].draw()
    }

}
