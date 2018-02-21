$(".next_page").click(function(event){
    var max = parseInt($("#max_page").val());
    console.log(max);
    var url = window.location.href;
    var page = url.split("page=")[1];
    console.log(page);
    var next_page_number = parseInt(page) + 1;
    if (next_page_number > max){
        next_page_number = max;
    }
    console.log("next page: "+ next_page_number);
    var new_url = url.split("page=")[0] + "page=" + next_page_number;
    console.log("new url: " + new_url);
    window.location = new_url;
    }
)



$(".previous_page").click(function(event){
        var url = window.location.href;
        var page = url.split("page=")[1];
        console.log(page);
        var previous_page_number = parseInt(page) - 1;
        if(previous_page_number < 0){
            previous_page_number = 0;
        }
        console.log("next page: "+ previous_page_number);
        var new_url = url.split("page=")[0] + "page=" + previous_page_number;
        console.log("new url: " + new_url);
        window.location = new_url;
    }
)


$('a[href=#top]').click(function () {
    $('body,html').animate({
        scrollTop: 0
    }, 600);
    return false;
});

$(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
        $('.totop a').fadeIn();
    } else {
        $('.totop a').fadeOut();
    }
});


$(".show_translation").click(function (event) {
    if($(this).val() == "show"){
        $(this).text("Hide Translation");
        $(this).val("hide");
        $(this).parent().find(".slide_translation").removeAttr("hidden");
    }
    else{
        $(this).parent().find(".slide_translation").attr("hidden", true);
        $(this).text("Show Translation");
        $(this).val("show");
    }
})

$("#show_all_translations").click(function(event){
    console.log("clicked to show all");
    if($(this).val()=="show"){
       $(this).text("Hide All Translations");
       $(this).val("hide");
       $(".slider .slide_translation").each(function(){
           $(this).removeAttr("hidden")
       })
   }
   else{
       $(this).text("Show All Translations");
       $(this).val("show");
        $(".slider .slide_translation").each(function(){
            $(this).attr("hidden", true);
        })
   }
})

$("button").mouseup(function(){
        $(this).blur();
})