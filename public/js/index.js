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
        var clickedText = $(this);
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
            $(clickedText).text($(clickedText).text() + "(" + result + ")");
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


var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var mask;
var pointCount = 1200;
var str = "Translate";
var fontStr = "bold 108pt Helvetica Neue, Helvetica, Arial, sans-serif";

ctx.font = fontStr;
ctx.textAlign = "center";
c.width = ctx.measureText(str).width;
c.height = 128; // Set to font size

var whitePixels = [];
var points = [];
var point = function(x,y,vx,vy){
    this.x = x;
    this.y = y;
    this.vx = vx || 1;
    this.vy = vy || 1;
}
point.prototype.update = function() {
    ctx.beginPath();
    ctx.fillStyle = "#95a5a6";
    ctx.arc(this.x,this.y,1,0,2*Math.PI);
    ctx.fill();
    ctx.closePath();

    // Change direction if running into black pixel
    if (this.x+this.vx >= c.width || this.x+this.vx < 0 || mask.data[coordsToI(this.x+this.vx, this.y, mask.width)] != 255) {
        this.vx *= -1;
        this.x += this.vx*2;
    }
    if (this.y+this.vy >= c.height || this.y+this.vy < 0 || mask.data[coordsToI(this.x, this.y+this.vy, mask.width)] != 255) {
        this.vy *= -1;
        this.y += this.vy*2;
    }

    for (var k = 0, m = points.length; k<m; k++) {
        if (points[k]===this) continue;

        var d = Math.sqrt(Math.pow(this.x-points[k].x,2)+Math.pow(this.y-points[k].y,2));
        if (d < 5) {
            ctx.lineWidth = .2;
            ctx.beginPath();
            ctx.moveTo(this.x,this.y);
            ctx.lineTo(points[k].x,points[k].y);
            ctx.stroke();
        }
        if (d < 20) {
            ctx.lineWidth = .1;
            ctx.beginPath();
            ctx.moveTo(this.x,this.y);
            ctx.lineTo(points[k].x,points[k].y);
            ctx.stroke();
        }
    }

    this.x += this.vx;
    this.y += this.vy;
}

function loop() {
    ctx.clearRect(0,0,c.width,c.height);
    for (var k = 0, m = points.length; k < m; k++) {
        points[k].update();
    }
}

function init() {
    // Draw text
    ctx.beginPath();
    ctx.fillStyle = "#000";
    ctx.rect(0,0,c.width,c.height);
    ctx.fill();
    ctx.font = fontStr;
    ctx.textAlign = "left";
    ctx.fillStyle = "#fff";
    ctx.fillText(str,0,c.height/2+(c.height / 2));
    ctx.closePath();

    // Save mask
    mask = ctx.getImageData(0,0,c.width,c.height);

    // Draw background
    ctx.clearRect(0,0,c.width,c.height);

    // Save all white pixels in an array
    for (var i = 0; i < mask.data.length; i += 4) {
        if (mask.data[i] == 255 && mask.data[i+1] == 255 && mask.data[i+2] == 255 && mask.data[i+3] == 255) {
            whitePixels.push([iToX(i,mask.width),iToY(i,mask.width)]);
        }
    }

    for (var k = 0; k < pointCount; k++) {
        addPoint();
    }
}

function addPoint() {
    var spawn = whitePixels[Math.floor(Math.random()*whitePixels.length)];
    var p = new point(spawn[0],spawn[1], Math.floor(Math.random()*2-1), Math.floor(Math.random()*2-1));
    points.push(p);
}

function iToX(i,w) {
    return ((i%(4*w))/4);
}
function iToY(i,w) {
    return (Math.floor(i/(4*w)));
}
function coordsToI(x,y,w) {
    return ((mask.width*y)+x)*4;

}

setInterval(loop,20);
init();

