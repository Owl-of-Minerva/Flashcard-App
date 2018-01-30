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
                cards.push(row);

            })
        }

        //res.send(output);
        res.render('flashcards', { title: 'Flash Cards', message: 'List of Flashcards', values: cards});
    })

})




app.post('/flash_cards', function (req, res){
    var word = req.body.original_word;
    var trans = req.body.translation_word;
    var example = req.body.example_use;
    var count = 0;
    var db = new sqlite3.Database('./flashcard_app.db');
    var check_query = 'SELECT * FROM flashcards WHERE word="'+word + '"';
    var insert_query = "INSERT INTO flashcards(word, translation, example) VALUES ('"+ word +"','" + trans+"','" + example + "')";
    function checkIfExist(callback, next){
       db.serialize(function(){
           db.all(check_query, [], function(err, rows){
               if (err){
                   callback(err, rows, next);
               }
               else{
                   callback(null, rows, next);
               }
           })
       })
    }

    function addFlashcard(err, rows, callback){
        if(err){

        }
        else{
            if(rows.length>1){
                res.send('duplicate found');
            }
            else{
                db.run(insert_query, function(err){
                    if(err){
                        callback(err);
                    }
                    else{
                        callback(null);
                    }
                })
            }
            db.close();
        }
    }

    checkIfExist(addFlashcard, function(err){
        if(err){

        }
        else{
            res.redirect('/')
        }
    })



})

app.get('/delete/:word', function(req, res){
    console.log(req.params.word);
    var word = req.params.word;
    var db = new sqlite3.Database('./flashcard_app.db');
    var query = 'DELETE FROM flashcards WHERE word="'+word+'"';

    function deleteFlashcard(callback){
        db.serialize(function(){
            db.run(query, [], function(err, result){
                if (err){
                    callback(err, result);
                }
                else{
                    callback(null, result);
                }
            })
        })
    }


    deleteFlashcard(function(err, result){
        if(err){

        }
        else{

        }
        res.redirect('/flash_cards');
        db.close();
    })

})

app.get('/edit/:word', function(req, res){
    console.log(req.params.word);
    var word = req.params.word;
    var result;
    var db = new sqlite3.Database('./flashcard_app.db');
    var query = 'SELECT * FROM flashcards WHERE word="'+word+'"';

    function editFlashcard(callback){
        console.log(query);
        db.serialize(function () {
            db.all(query, [], function(err, rows){
                if(err){
                    callback(err, rows)
                }
                else{
                    callback(null, rows)
                }

                }
            );
        })
    }

    editFlashcard(function(err, rows){
        if(err){

        }
        else{
            result = rows[0];
            console.log(result);
        }
        res.render('edit_flashcard', {word: result.word, translation: result.translation, example: result.example});
        db.close();
    })

})


app.post('/edit/:word', function(req, res){
    console.log(req);
    console.log(req.body);
    var word = req.body.original_word;
    var trans = req.body.translation_word;
    var example = req.body.example_use;
    var db = new sqlite3.Database('./flashcard_app.db');
    var query = "UPDATE flashcards SET translation='"+ trans + "', example= '" + example + "' WHERE word='" + word + "'"

    console.log(query)
    function editFlashcard(callback){
        db.serialize(function(){
            db.run(query, [], function(err){
                if(err){
                    callback(err)
                }
                else{
                    callback(null)
                }
            })
        })
    }


    editFlashcard(function(err){
        if(err){
            res.send("err");
        }
        else{
            db.close();
            res.redirect('/flash_cards');
        }
    })

})



app.listen(3000, function () {
    console.log('Express server is up on port 3000');
});