var buttonColors = ["green","red","yellow","blue"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

document.addEventListener("keydown",function(event){
    if(event.key==="a")
    {
        if(!started)
        {
            newSequence(); 
            started = true;                      
        }        
    }
});

$(".btn").on("click",function(){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    highlight(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function(){newSequence();} , 1000);
        }
    }
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press A to Restart");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function newSequence()
{
    userClickedPattern = [];
    level++;
    $("h1").text("Level "+level);
    var randomNumber = Math.random();
    randomNumber = Math.floor(randomNumber*4);
    randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);
    playSound(randomColor);
    highlight(randomColor);    

}

function playSound(key)
{
    var audio = new Audio("sounds/"+key+".mp3");
    audio.play();
}

function highlight(key)
{
    $("#"+key).addClass("pressed");
    setTimeout(() => {
        $("#"+key).removeClass("pressed");
    }, 100);
}



function startOver()
{
    level = 0;
    started = false;
    gamePattern = [];
}

