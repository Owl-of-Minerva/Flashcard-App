$("#next_button").click(function(event){
    console.log("next button clicked")
    var max = parseInt($("#max").val());
    console.log("max raw: "+$("#max").val());
    console.log("max: "+max);
    var current = parseInt(this.value) + "";
    var next = current;
    while(current == next ){
        next = Math.floor(Math.random() * Math.floor(max));
    }
    console.log("next: "+next);
    var digits = current.length;
    var url = window.location.href;
    var cut_url = url.substring(0, url.length-digits)
    var new_url = cut_url + next;
    console.log(cut_url+next);
    window.location = new_url;
})



$("#show_translation").click(function (event) {
    console.log("button value: " + $(this).val() )
    if($(this).val() == "show"){
        $("#translation").removeAttr("hidden");
        $("#example").removeAttr("hidden");
        $(this).text("Hide Translation");
        $(this).val("hide");
    }
    else{
        $("#translation").attr("hidden", true);
        $("#example").attr("hidden", true);
        $(this).text("Show Translation");
        $(this).val("show");
    }
})