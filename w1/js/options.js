// select options Button
var optionsButton = document.querySelector("#option-button");

// select the .sides div
var sidesDiv = document.querySelector(".sides");

// Toggle the 'hidden' class
optionsButton.addEventListener("click", function () {
    console.log("Options button clicked");
    sidesDiv.classList.toggle("hidden");
});

// Check if the player array is defined and has the correct length
if (Array.isArray(player) && player.length === 2) {
    // Select the fill Inputs
    var fillInputs = document.querySelectorAll(".fill-input");

    // Set initial values for fill inputs
    for (var i = 0; i < fillInputs.length; i++) {
        var playerIndex = i; // 0 for Player 1, 1 for Player 2

        // Check if the player and pad properties are defined
        if (player[playerIndex] && player[playerIndex].pad) {
            fillInputs[i].value = player[playerIndex].pad.color;
            document.querySelectorAll(".output")[playerIndex].innerHTML =
                player[playerIndex].pad.color;

            // Add an input event listener to each fill input
            fillInputs[i].addEventListener("input", function (e) {
                console.log("Fill Input changed");
                var playerIndex = e.target.dataset.player;
                var newFillColor = e.target.value;

                console.log("Player Index:", playerIndex);
                console.log("New Fill Color:", newFillColor);

                // Check if the player and pad properties are defined
                if (player[playerIndex] && player[playerIndex].pad) {
                    // Change the player's fill color
                    player[playerIndex].pad.color = newFillColor;

                    // Update the output to display the appropriate player's fill
                    document.querySelectorAll(".output")[playerIndex].innerHTML = newFillColor;
                }
            });
        }
    }
}

// Select the u inputs
var uInputs = document.querySelectorAll(".u-input");

// Set initial values for u inputs
for (var i = 0; i < uInputs.length; i++) {
    var playerIndex = i; // 0 for Player 1, 1 for Player 2
    uInputs[i].value = player[playerIndex].up;
    document.querySelectorAll(".output")[playerIndex].innerHTML =
        player[playerIndex].up;

    // Add a keydown event listener to each "up" input
    uInputs[i].addEventListener("keydown", function (e) {
        console.log("Up Input changed");
        var playerIndex = e.target.dataset.player;
        var newUpKey = e.key;

        // Change the player's "up" key
        player[playerIndex].up = newUpKey;

        // Update the output to display the appropriate player's "up" key
        document.querySelectorAll(".output")[playerIndex].innerHTML = newUpKey;
    });

    // Add a focus event listener to each "up" input
    uInputs[i].addEventListener("focus", function () {
        console.log("Input focused - game paused");
        // Set the game state to "pause" when the input is focused
        gameState = "pause";
    });
}

// Select the stroke, down, and straight inputs
var strokeInputs = document.querySelectorAll(".stroke-input");
var downInputs = document.querySelectorAll(".d-input");
var straightInputs = document.querySelectorAll(".s-input");

// Set initial values
for (var i = 0; i < strokeInputs.length; i++) {
    var playerIndex = i; // 0 for Player 1, 1 for Player 2
    strokeInputs[i].value = player[playerIndex].pad.strokeColor;
    downInputs[i].value = player[playerIndex].down;
    straightInputs[i].value = player[playerIndex].straight;

    document.querySelectorAll(".output")[playerIndex].innerHTML =
        player[playerIndex].pad.strokeColor;
}

// Add event listener to each stroke input
strokeInputs.forEach(function (strokeInput, index) {
    strokeInput.addEventListener("input", function (event) {
        console.log("Stroke Input changed");
        var playerIndex = index;
        var newStrokeColor = event.target.value;

        // Change player's stroke color
        player[playerIndex].pad.strokeColor = newStrokeColor;

        // Update the output and player's stroke color
        document.querySelectorAll(".output")[playerIndex].innerHTML = newStrokeColor;
    });
});

// event listener to each down input
downInputs.forEach(function (downInput, index) {
    downInput.addEventListener("input", function (event) {
        console.log("Down Input changed");
        var playerIndex = index;
        var newDownKey = event.target.value;

        // Change the player's down key
        player[playerIndex].down = newDownKey;

        // Update the output to display the appropriate player's down key
        document.querySelectorAll(".output")[playerIndex].innerHTML = newDownKey;
    });
});

// event listener to each straight input
straightInputs.forEach(function (straightInput, index) {
    straightInput.addEventListener("input", function (event) {
        console.log("Straight Input changed");
        var playerIndex = index;
        var newStraightKey = event.target.value;

        // Change the player's straight key
        player[playerIndex].straight = newStraightKey;

        // Update the output for appropriate player's straight key
        document.querySelectorAll(".output")[playerIndex].innerHTML = newStraightKey;
    });
});

// Add a focus event listener to pause the game when focused
var allInputs = document.querySelectorAll("input");
allInputs.forEach(function (input) {
    input.addEventListener("focus", function () {
        console.log("Input focused - game paused");
        // Set the game state to "pause" when any input is focused
        gameState = "pause";
    });
});

// Select the ball size input and apply button
var ballSizeInput = document.getElementById("ball-size");
var applyButton = document.getElementById("apply-ball-size");

// Add an event listener to the apply button
applyButton.addEventListener("click", function () {
    // Get the user ball size
    var newSize = parseInt(ballSizeInput.value);

    // size is within the range 
    if (newSize >= parseInt(ballSizeInput.min) && newSize <= parseInt(ballSizeInput.max)) {
        // Update the ball's size
        ball.w = newSize;
        ball.h = newSize;

        // Redraw the ball with the new size
        ball.draw();
    } else {
        alert("Invalid ball size. Please enter a size between " + ballSizeInput.min + " and " + ballSizeInput.max + ".");
    }
});