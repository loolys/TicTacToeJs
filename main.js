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
    
    $("#reset-btn").hide();
    
    $("#reset-btn").click(function(){
        $("button").text("");
        $("button").prop("disabled", false);
        $("#reset-btn").hide();
    });
    
    $("#O").click(function(){
        $("#X").prop("checked", false);
        setSide("O");
        $("button").text("");
        $("button").prop("disabled", false);
    });
    $("#X").click(function(){
        $("#O").prop("checked", false);
        setSide("X");
        $("button").text("");
        $("button").prop("disabled", false);
        $("#0").text("O");
        $("#0").prop("disabled", true);
    });
});

function newGame () {
    var move;
    $("button").click(function(){
        var inSide = getSide();
        
        if (inSide == "O"){
            $("#"+event.target.id).text("O");
            $("#"+event.target.id).prop("disabled", true);
            move = AI("X");
            if (move == "draw"){
                $("#reset-btn").text("Reset");
                $("#reset-btn").show()
            } else {
                makeMove(move);
            }
            
            if ( winMove("X")) {
                console.log("computer win");
                $("#reset-btn").show();
                $("button").text("");
                $("button").prop("disabled", false);
                $("#reset-btn").text("Reset");
                $("#reset-btn").show()
            }
        } else if (inSide == "X") {
            $("#"+event.target.id).text("X");
            $("#"+event.target.id).prop("disabled", true);
            move = AI("O");
            if (move == "draw"){
                $("#reset-btn").text("Reset");
                $("#reset-btn").show()
            } else {
                makeMove(move);
            }
            if ( winMove("O")) {
                console.log("computer win");
                $("#reset-btn").text("Reset");
                $("#reset-btn").show()
            }
        }
    });
    
}

function AI (AI_side) {
    var legalMoves = [];
    
    this.AI_side = AI_side;
    var opponent;
    if (AI_side == "X"){
        opponent = "O";
    } else{
        opponent = "X";
    }
    //console.log(opponent);
    $("button:enabled").each(function(){
        legalMoves.push( $(this).attr("id"));
    });
    
    console.log(legalMoves.length);
    
    if (legalMoves.length == 9 && AI_side == "X"){
        if (legalMoves[3]  == 4){
            return 4;
        }
    }
    
    if (legalMoves.length == 1){
        return "draw";
    }
    if (legalMoves.length == 2){
        $("#"+legalMoves[0]).text("O");
        return "draw";
    }
    
    for (var i = 0; i < legalMoves.length; i++){
        // Checks if a winning legal move is available
        $("#"+legalMoves[i]).text(AI_side);
        if (winMove(AI_side)){
            //console.log("returns in AI Win")
            $("#"+legalMoves[i]).text("");
            return legalMoves[i];
        } else {
            $("#"+legalMoves[i]).text("");
        }     
    }
    for (var i = 0; i < legalMoves.length; i++) {
        // checks if the opponent can win on the next move
        
        $("#"+legalMoves[i]).text(opponent);
            if (winMove(opponent)) {
                //console.log("returns in opponent")
                $("#"+legalMoves[i]).text("");
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
    
    return "draw";
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
    this.move = move;
    var side = getSide();
    //console.log("makeMove:" +side);
    if (side == "O"){
        $("#"+move).text("X");
        $("#"+move).prop("disabled", true);
    }
    else if (side == "X") {
        $("#"+move).text("O");
        $("#"+move).prop("disabled", true);
    }
   
}
newGame();