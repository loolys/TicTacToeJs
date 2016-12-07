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
        }
    });
    
}

function AI (clicked) {
    var legalMoves = [];
    $("button:enabled").each(function(){
        legalMoves.push( $(this).attr("id"));
    });
    console.log(legalMoves);
    if (clicked == 4){
        $("#0").text("X");
        $("#0").prop("disabled", true);
    }
}

newGame();