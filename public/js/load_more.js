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


$(function() {
    //$(".slider").each().attr("display", "none");
})

/*
	Load more content with jQuery - May 21, 2013
	(c) 2013 @ElmahdiMahmoud
*/

$(function () {
    var first_slice = $(".slider").slice(0, 5);
    first_slice.attr("style", "display: inline-block");
    first_slice.show();
});


$("#load_more").on('click', function (e) {
    e.preventDefault();
    var next_slice = $(".slider:hidden").slice(0, 5);
    next_slice.attr("style", "display: inline-block");
    next_slice.slideDown();
    if ($(".slider[style = 'display: inline-block']").length > 5) {
        $("#load_less").text("Collapse");
    }
    if ($(".slider:hidden").length == 0) {
        $("#load_more").text("");
    }
    $('html,body').animate({
        scrollTop: $(this).offset().top
    }, 1200);
});

$("#load_less").on('click', function (e) {
    e.preventDefault();
    var sliders = $(".slider[style = 'display: inline-block']");
    var length = sliders.length;
    var last_row_count =  length % 5;
    if(last_row_count == 0){
        last_row_count = 5;
    }
    var next_slice = sliders.slice(length-last_row_count, length);
    console.log(length)
    if (length < 11) {
        $("#load_less").text("");
    }
    next_slice.slideUp("slow", function(){
        if ($(".slider:hidden").length > 0) {
            $("#load_more").text("Load More");
        }
    });

    $('html,body').animate({
        scrollTop: $(this).offset().top
    }, 800);

});

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

$("button").mouseup(function(){
    $(this).blur();
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