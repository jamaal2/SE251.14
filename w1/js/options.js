// select the Options Button
var optionsButton = document.querySelector("#options-button");

// select the .sides div
var sidesDiv = document.querySelector(".sides");

// add a click event listener to toggle the 'hidden' class
optionsButton.addEventListener("click", function() {
    sidesDiv.classList.toggle("hidden");
});


