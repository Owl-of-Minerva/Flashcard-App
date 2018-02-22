var index = parseInt($("#index").val());
var initial_selected = $("#carousel .slider:nth-child(" + index +")");
var initial_number_of_next = initial_selected.nextAll().length;
var initial_number_of_prev = initial_selected.prevAll().length;
var initial_prev;
var initial_next;
var initial_prevLeftSecond;
var initial_nextRightSecond;
if(initial_number_of_next > 0){
    initial_next = initial_selected.next();
}
else{
    initial_next = $("#carousel").children().first();
}
if(initial_number_of_next != 1){
    initial_nextRightSecond = initial_next.next();
}
else{
    initial_nextRightSecond = $("#carousel").children().first();
}
if(initial_number_of_prev > 0){
    initial_prev = initial_selected.prev();
}
else{
    initial_prev = $("#carousel").children().last();
}
if(initial_number_of_prev != 1){
    initial_prevLeftSecond = initial_prev.prev();
}
else{
    initial_prevLeftSecond = $("#carousel").children().last();
}

initial_selected.attr("class", "slider selected");
initial_prev.attr("class", "slider prev");
initial_next.attr("class", "slider next");
initial_prevLeftSecond.attr("class", "slider prevLeftSecond");
initial_nextRightSecond.attr("class", "slider nextRightSecond");
var max = parseInt($("#max").val());

function moveToSelected(element) {
    var prevLeftSecond;
    var prev;
    var selected;
    var next;
    var nextRightSecond;

    function updateClass(){
        $(".prevLeftSecond").attr("class", "hideLeft");
        $(".prev").attr("class", "hideLeft");
        $(".selected").attr("class", "hideLeft");
        $(".next").attr("class", "hideLeft");
        $(".nextRightSecond").attr("class", "hideLeft");
        prevLeftSecond.attr("class", "slider prevLeftSecond");
        prev.attr("class", "slider prev");
        selected.attr("class", "slider selected");
        next.attr("class", "slider next");
        nextRightSecond.attr("class", "slider nextRightSecond");
    }
    if(element == 'next' || element == 'prev'){
        if (element == "next") {
            var number_of_next =  $(".selected").nextAll().length;
            if(number_of_next > 0){
                selected = $(".selected").next();
            }
            else{
                console.log("loop");
                selected = $("#carousel").children().first();
            }

            if(number_of_next != 1){
                next = selected.next();
            }
            else{
                next = $("#carousel").children().first();
            }

            if(number_of_next != 2){
                nextRightSecond = next.next();
            }
            else{
                nextRightSecond = $("#carousel").children().first();
            }

            var number_of_prev = $(".selected").prevAll().length;

            prev= $(".selected")

            if(number_of_prev > 1){
                prevLeftSecond = prev.prev();
            }
            else{
                prevLeftSecond = $("#carousel").children().last();
            }
        }

        else if (element == "prev") {
            var number_of_prev =  $(".selected").prevAll().length;
            if(number_of_prev > 0){
                selected = $(".selected").prev();
            }
            else{
                selected = $("#carousel").children().last();
            }

            if(number_of_prev != 1){
                prev = selected.prev();
            }
            else{
                prev = $("#carousel").children().last();
            }

            if(number_of_prev != 2){
                prevLeftSecond = prev.prev();
            }
            else{
                prevLeftSecond = $("#carousel").children().last();
            }

            var number_of_next = $(".selected").nextAll().length;

            next= $(".selected")

            if(number_of_next > 1){
                nextRightSecond = next.next();
            }
            else{
                nextRightSecond = $("#carousel").children().first();
            }

        }
        updateClass()
    }
    else{
        function changeClass(){
            selected = element;
            console.log(selected);
            selected.attr("class", "slider selected");
            var number_of_prev =  $(".selected").prevAll().length;
            var number_of_next =  $(".selected").nextAll().length;
            if(number_of_next != 0){
                next = selected.next();
            }
            else{
                next = $("#carousel").children().first();
            }
            if(number_of_next != 1){
                nextRightSecond = next.next();
            }
            else{
                next = $("#carousel").children().first();
            }
            if(number_of_prev!=0){
                prev = selected.prev();
            }
            else{
                prev = $("#carousel").children().last();
            }
            if(number_of_prev != 1){
                prevLeftSecond = prev.prev();
            }
            else{
                prevLeftSecond = $("#carousel").children().last();
            }
            prevLeftSecond.attr("class", "slider prevLeftSecond");
            prev.attr("class", "slider prev");
            next.attr("class", "slider next");
            nextRightSecond.attr("class", "slider nextRightSecond");
        }

        $("#carousel > .slider").each(function(){
            $(this).attr("class", "slider hideLeft");
        }).promise().done(function (){
            changeClass();
        })


    }
}

// Eventos teclado
$(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
            moveToSelected('prev');
            break;

        case 39: // right
            moveToSelected('next');
            break;

        default: return;
    }
    e.preventDefault();
});

$('#carousel .slider').click(function() {
    moveToSelected($(this));
});

$('#prev').click(function() {
    moveToSelected('prev');
});

$('#next').click(function() {
    moveToSelected('next');
});
