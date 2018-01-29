var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended : true }));

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function(req, res){
})
app.get('/pug_demo', function(req, res){
    res.render('flashcards', { title: 'Hey', message: 'Hello there!', values: ['first', 'second', 'third']});
})

app.get('/flash_cards', function (req, res) {
    var output = "";
    var cards = [];
    function getFlashcards(callback){
        var db = new sqlite3.Database('./flashcard_app.db');

        db.serialize(function () {
            db.all('SELECT * FROM flashcards', function (err, rows) {
                if (err){
                    callback(err, null);
                }
                else{
                    callback(null,rows)
                }
            })
        })

        db.close();
    }

    getFlashcards(function(err, rows){
        if (err){

        }
        else{
            rows.forEach(function(row){
                output += row.word + "<br/> " + row.translation + "<br/> " + row.example + "<br/> <br/>";
                cards.push(row.word);

            })
        }

        //res.send(output);
        res.render('flashcards', { title: 'Flash Cards', message: 'List of Flashcards', values: cards});
    })



})

app.get('/database_test', function (req, res){
    console.log("request from flashcard to get: " +req.body);


    var db = new sqlite3.Database('./flashcard_app.db');

    db.serialize(function () {
        db.each('SELECT * FROM flashcards', function (err, row) {
            //console.log(row.word);
            //console.log(row.translation);
            //console.log(row.example);
        })
    })

    db.close();
    res.send('database get test');
})


app.post('/database_test', function (req, res){
    var word = req.body.original_word;
    var trans = req.body.translation_word;
    var example = req.body.example_use;
    var count = 0;

    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('./flashcard_app.db');

    db.serialize(function () {
        db.all('SELECT * FROM flashcards WHERE word='+word, [], function(err, res){
            //count = res.length;
        });
    })

    if (true){
        var query ="INSERT INTO flashcards(word, translation, example) VALUES ('"+ word +"','" + trans+"','" + example + "')";
        db.run(query);

    }
    db.close();
    console.log("request from flashcard to post: " +req.body.original_word);
    res.send('database post test: '+req.body.original_word);
})


app.listen(3000, function () {
    console.log('Express server is up on port 3000');
});