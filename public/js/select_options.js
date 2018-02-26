$("#entries_per_page > ul > li").click(function(){
    var entries = $(this).find("label").text();
    var order = $("#order").val();
    if (order == ""){
        order = "time";
    }
    if (entries == "All"){
            window.location.href= "/flashcards/order="+order;
    }
    else{
        var entry = $("#entry").val();
        if (entry != entries){
            window.location.href= "/flashcards/order="+order+"/entries="+entries+"/page=1";
        }
    }




})

$("#sort_order > ul > li").click(function(){
    var order = $(this).find("label").text().toLowerCase();
    var entries = $("#entry").val();
    console.log(entries);
    if(entries=="" || entries == undefined){
        window.location.href = "/flashcards/order="+order;
    }
    else{
        window.location.href= "/flashcards/order="+order+"/entries="+entries+"/page=1";
    }
})

$("#review_order > ul > li").click(function(){
    var order = $(this).find("label").text().toLowerCase();
    var way = $("#way").val();
    var index = $("#index").val();
    window.location.href = "/review_flashcard/order="+order+"/way="+way+"/index="+index;
})

$("#review_way > ul > li").click(function(){
    var way = $(this).find("label").text().toLowerCase();
    var order = $("#order").val();
    var index = $("#index").val();
    window.location.href = "/review_flashcard/order="+order+"/way="+way+"/index="+index;
})