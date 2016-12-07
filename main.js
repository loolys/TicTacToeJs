var getSide, setSide;

(function () {
    
    var side = "O";
    
    getSide = function () {
        return side;
    };
    
    setSide = function (choice) {
        side = choice;
    };
}());


$(document).ready(function(){
    
    $("#O").click(function(){
        $("#X").prop("checked", false);
        setSide("O");
        newGame();
    });
    $("#X").click(function(){
        $("#O").prop("checked", false);
        setSide("X");
        newGame();
    });
});

function newGame () {
    var side = getSide();
    $("button").click(function(){
        if (side == "O"){
            $("#"+event.target.id).text("O");
            $("#"+event.target.id).prop("disabled", true);
            AI(event.target.id);
        } else {
            $("#"+event.target.id).text("X");
            $("#"+event.target.id).prop("disabled", true);
            AI(event.target.id);
        }
    });
    
}

function AI (clicked) {
    var legalMoves = [];
    $("button:enabled").each(function(){
        legalMoves.push( $(this).attr("id"));
    });
    for (var i = 0; i < legalMoves.length; i++){
        // Checks if a winning legal move is available
        $("#"+legalMoves[i]).text("X");
        console.log(winMove("X"));
        if (winMove("X")){
            break;
        } else {
            $("#"+legalMoves[i]).text("");
        }
        
    }
}

function winMove ( letter ) {
    return (( $("#0").text() == letter && $("#1").text() == letter &&  $("#2").text() == letter) ||
        ( $("#3").text() == letter && $("#4").text() == letter &&  $("#5").text() == letter) ||
        ( $("#6").text() == letter && $("#7").text() == letter &&  $("#8").text() == letter) ||
        ( $("#0").text() == letter && $("#3").text() == letter &&  $("#6").text() == letter) ||
        ( $("#1").text() == letter && $("#4").text() == letter &&  $("#7").text() == letter) ||
        ( $("#2").text() == letter && $("#5").text() == letter &&  $("#8").text() == letter) ||
        ( $("#0").text() == letter && $("#4").text() == letter &&  $("#8").text() == letter) ||
        ( $("#2").text() == letter && $("#4").text() == letter &&  $("#6").text() == letter));
}
    
newGame();