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
            var move = AI("X");
            makeMove(move);
        } else {
            $("#"+event.target.id).text("X");
            $("#"+event.target.id).prop("disabled", true);
            var move = AI("O");
            makeMove(move);
        }
    });
    
}

function AI (AI_side) {
    var legalMoves = [];
    $("button:enabled").each(function(){
        legalMoves.push( $(this).attr("id"));
    });
    for (var i = 0; i < legalMoves.length; i++){
        // Checks if a winning legal move is available
        $("#"+legalMoves[i]).text("X");
        console.log(winMove("X"));
        if (winMove("X")){
            $("#"+legalMoves[i]).text("");
            console.log("returned on win");
            return legalMoves[i];
        } else {
            $("#"+legalMoves[i]).text("");
        }     
    }
    for (var i = 0; i < legalMoves.length; i++) {
        // checks if the opponent can win on the next move
        $("#"+legalMoves[i]).text("O");
            if (winMove("O")) {
                console.log("returned on opponent win");
                return legalMoves[i];
            } else {
                $("#"+legalMoves[i]).text("");
            }
    }
    
    for (var i = 0; i <legalMoves.length; i++){
        // Takes corner if available
        console.log("");
        if (legalMoves[i] == 0){
            return 0;
        } else if(legalMoves[i] == 2){
            return 2;
        } else if (legalMoves[i] == 6) {
            return 6;
        } else if (legalMoves[i] == 8) {
            return 8;
        }
    }
    for (var i = 0; i < legalMoves.length; i++) {
        // takes center if available
        if(legalMoves[i] ==4) {
            return 4;
        }
    }
    for (var i = 0; i < legalMoves.length; i++) {
        // makes any legal move.
        return legalMoves[i];
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

function makeMove(move){
    $("#"+move).text("X");
    $("#"+move).prop("disabled", true);
}
    
newGame();