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
    $("#load_more").on('click', function (e) {
        e.preventDefault();
        var next_slice = $(".slider:hidden").slice(0, 5);
        next_slice.attr("style", "display: inline-block");
        next_slice.slideDown();
        if ($(".slider:hidden").length == 0) {
            $("#load").fadeOut("slow");
            $(this).text("End of All Cards");
        }
        $('html,body').animate({
            scrollTop: $(this).offset().top
        }, 2000);
    });
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