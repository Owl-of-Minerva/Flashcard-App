$('#complete_input').click(function(event){
    var input = $('#translate_input');
    $("#instruction").removeAttr('hidden');
    $('#user_input').text(input.val());
    $("#user_input").html( $("#user_input").text().replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, "$1<br/>$2").replace(/(\S+)/g, "<span>$1</span>"));
    $("#user_input span").click(function(event){
        console.log('clicked');
        console.log($(this));
        $(this).css("background-color","#00ff00");
        var sourceLang = $("#source").val();
        var targetLang = $("#target").val();
        console.log(sourceLang+ "-> "+ targetLang);
        var sourceText = $(this).text().replace(/[।?!",]/g, "");
        console.log("Word selected: "+ sourceText);
        var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="
            + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);
        var translatedText = "";
        var selectedWord = $(this);
        $.getJSON(url).done(function(data) {
            var result = data[0][0][0];
            console.log("translation result: "+result);
            translatedText = result;
            console.log("translated text: "+translatedText);
        $('#translation_list').append('<form class="translation_div" action="/add/' + sourceText + '" method="get"><li class="translation_result"><input class="source" type="text" name="source" value="' + sourceText + '"><label>:</label><input class="result" type="text" name="result" value="' + result +'"></li><button type="submit">Add</button><button class="remove_card">Remove</button></form>')
            $( function() {
                $("button.remove_card").click(function (event) {
                    console.log('remove card clicked');
                    //$(this).parent("#translation_div").remove();
                    console.log($(this).parent().remove());
                })
            } );

        }).fail(function() {
            alert("Error")
        });


    });



});


$("#text span").click(function(event){
    console.log($(this).text());

    var sourceLang = "hi";
    var targetLang = "en";
    var sourceText = $(this).text();
    var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="
        + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);

    var translatedText = "";
    //var result = JSON.parse(UrlFetchApp.fetch(url).getContentText());

    $.getJSON(url).done(function(data) {
        var result = data;
        console.log(result[0][0][0]);

    }).fail(function() {
        alert("Error")
    });

});

$("#generate_list").click(function(event){
    var list = "";
    $("#translation_list li").each(function(){
        console.log("source: " + $(this).find(".source"))
        var source = $(this).find(".source").val();
        var result = $(this).find(".result").val();
        list = list + source + ": " + result + "<br/>";
    })

    $("#generated_list").html(list);
})

$("#remove_translation_list").click(function(event){
    $("#translation_list .translation_div").each(function (index) {
        $(this).remove();
    })
    $("#user_input span").each(function(){
        console.log("removed");
        $(this).removeAttr("style");
    })
})

$("#download").click(function(event){
    console.log($('#user_input').html());
    var text = $('#user_input').html();
    var fileName = $('#download_name').val();
    $(this).attr("href", 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    $(this).attr("download", fileName+".html");
});

$("#route").click(function(event){
    console.log("route clicked");
    $(location).attr('href', '/flash_cards');
})

//https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Sending_forms_through_JavaScript
var iframe = document.createElement("iframe");
iframe.name = "add_all_list_iframe";
window.addEventListener("load", function(){
    iframe.style.display = "none";
    document.body.appendChild(iframe);
})

function sendData(data){
    var name;
    var form = document.createElement("form");
    var node = document.createElement("input");
    form.action = "/add_flashcards";
    form.method = "post";
    //form.target=iframe.name;
    for(name in data) {
        node.name  = name;
        node.value = data[name];
        form.appendChild(node.cloneNode());
    }
    //form.style.display = "none";
    document.body.appendChild(form);
    form.submit();
    //document.body.removeChild(form);
}


$("#add_all_list").click(function(event){
    var data={};
    $("#translation_list li").each(function(){
        var source = $(this).find(".source").val();
        var result = $(this).find(".result").val();
        console.log("add all list: " + source + ":" + result);
        data[source] = result;
    })
    sendData(data);
})
