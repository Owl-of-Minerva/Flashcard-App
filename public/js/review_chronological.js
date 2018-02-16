$("#next_button").click(function(event){
    console.log("next button clicked")
    var next = parseInt(this.value) + 1 + "";
    var digits = next.length
    var url = window.location.href;
    var cut_url = url.substring(0, url.length-digits)
    var new_url = cut_url + next;
    this.value= next;
    console.log(next);
    console.log(cut_url+next);
    window.location = new_url;
})



$("#previous_button").click(function(event){
    console.log("previous button clicked")
    var previous = parseInt(this.value) - 1 + "";
    if ( parseInt(this.value) - 1 < 0){
        previous = "0";
    }
    var digits = previous.length
    var url = window.location.href;
    var cut_url = url.substring(0, url.length-digits)
    var new_url = cut_url + previous;
    this.value= previous;
    console.log(previous);
    console.log(cut_url+previous);
    window.location = new_url;
})

$("#show_translation").click(function (event) {

    console.log("button value: " + $(this).val() )
    if($(this).val() == "show"){
        $("#translation").removeAttr("hidden");
        $(this).text("Hide Translation");
        $(this).val("hide");
    }
    else{
        $("#translation").attr("hidden", true);
        $(this).text("Show Translation");
        $(this).val("show");
    }

})