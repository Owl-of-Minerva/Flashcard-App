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