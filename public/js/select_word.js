var complete_input = $('#complete_input');
complete_input.click(function(event){
    console.log("clicked");
    var input = $('#translate_input');
    console.log(input);
    $('#user_input').text(input.val());
    // $('#user_input').html(input.val().replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, "$1<br/>$2"));
    //console.log(input.val().replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, "$1<br/>$2"));
    $("#user_input").html( $("#user_input").text().replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, "$1<br/>$2").replace(/(\S+)/g, "<span>$1</span>"));

    $("#user_input span").click(function(event){
        console.log('clicked');
        console.log($(this));

        $(this).css("background-color","#00ff00");


       // var sourceLang = "hi";
       // var targetLang = "en";
        var sourceLang = $("#source").val();
        var targetLang = $("#target").val();
        console.log(sourceLang+ "-> "+ targetLang);
        var sourceText = $(this).text().replace(/[।?!",]/g, "");
        console.log("Word selected: "+ sourceText);
        var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="
            + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);

        var translatedText = "";
        //var result = JSON.parse(UrlFetchApp.fetch(url).getContentText());
        ;

        var selectedWord = $(this);

        $.getJSON(url).done(function(data) {
            var result = data[0][0][0];
            console.log("translation result: "+result);
            translatedText = result;
            console.log("translated text: "+translatedText);
            selectedWord.attr('title', translatedText);
            $('#translation_list').append('<div class="translation_div"><li>'+ sourceText+": "+result+ '</li class="translation_result"> ' +
                '<button class="add_card"> Add to Flashcard</button> <button class="remove_card">Remove</button></div>');
            $( function() {
                var dialog, form;
                    dialog = $( "#dialog-form" ).dialog({
                        autoOpen: false,
                        height: 400,
                        width: 350,
                        modal: true,
                        buttons: {
                            // "Create an account": addUser,
                            Cancel: function() {
                                dialog.dialog( "close" );
                            }
                        },
                        close: function() {
                            //form[ 0 ].reset();
                            //allFields.removeClass( "ui-state-error" );
                        }
                    });

                //form = dialog.find( "form" ).on( "submit", function( event ) {
                //  event.preventDefault();
                //addUser();
                //});



                $( "button.add_card" ).click(function(event) {
                    console.log('add card clicked');

                    $("#dialog-form #original_word").val(sourceText);
                    $("#dialog-form #translation_word").val(result);
                    dialog.dialog( "open" );
                });

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

//var div = $("#text");
//div.html(div.text().replace(/(\S+)/g, "<span>$1</span>"));




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
    var result = "";
    console.log("generate list");
    $("#translation_list li").each(function(index){
        //console.log($(this ).text());
        result = result +  $(this ).text()+ "<br/>";
    })
   // console.log("done generating:\n" + result);
    $("#generated_list").html(result);
})

$("#remove_translation_list").click(function(event){
    $("#translation_list .translation_div").each(function (index) {
        $(this).remove();
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

