// select the Options Button
var optionsButton = document.querySelector("#option-button");

// select the .sides div
var sidesDiv = document.querySelector(".sides");

// add a click event listener to toggle the 'hidden' class
optionsButton.addEventListener("click", function() {
    sidesDiv.classList.toggle("hidden");
});


// select the fill Inputs
var fillInputs = document.querySelectorAll(".fill-input");

// set initial values
for (var i = 0; i < fillInputs.length; i++) {
  var playerIndex = i; // 0 for Player 1, 1 for Player 2
  fillInputs[i].value = player[playerIndex].pad.color;
  document.querySelectorAll(".output")[playerIndex].innerHTML = player[playerIndex].pad.color;

  // add an input event listener to each fill input
  fillInputs[i].addEventListener("input", function (e) {
    console.log("Input changed");
    var playerIndex = e.target.dataset.player; 
    var newFillColor = e.target.value;

    // change the player's fill color
    player[playerIndex].pad.color = newFillColor;

    // update the output to display the appropriate player's fill
    document.querySelectorAll(".output")[playerIndex].innerHTML = newFillColor;
  });
}