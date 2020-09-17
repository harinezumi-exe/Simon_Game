var level = 0;
var started = false;

let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

$(document).keydown(function() {
    if (!started) {

        $("#level-title").text("Level " + level);
        started = true;
        nextSequence();
    }
})

$(".btn").click(function(evt) {

    var userChosenColour = $(evt.target).attr("id");

    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    userClickedPattern.push(userChosenColour);

    checkAnswer(userClickedPattern.length - 1)
    
});

function nextSequence() {

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.round(Math.random() * 3);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColour) {

    $("#" + currentColour).addClass('pressed');
    
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);

}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        if (gamePattern.length == userClickedPattern.length) {
            
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }

    } else {

        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        startOver();

    }
}

function startOver() {
    
    level = 0;
    started = false;
    gamePattern = [];
}