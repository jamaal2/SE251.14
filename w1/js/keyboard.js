
var keys = [];
document.addEventListener(`keydown`, (e)=>{
    keys[String.fromCharCode(e.keyCode)];
    console.log(String.fromCharCode(e.keyCode))
})

document.addEventListener(`keyup`, (e)=>{
    keys = [];
})
