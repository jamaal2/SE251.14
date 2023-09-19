// Array for keys
var keys = [];

// Keydown event listener
document.addEventListener(`keydown`, (e) => {
    keys[e.key] = true;
});

// Keyup event listener
document.addEventListener(`keyup`, (e) => {
    keys[e.key] = false;
});