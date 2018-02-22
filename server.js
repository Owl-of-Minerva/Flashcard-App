var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();
var path = require('path');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended : true }));
app.locals.basedir = path.join(__dirname, '/');

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function(req, res){
    var translations = [];
    var textarea_input = "";
    var db = new sqlite3.Database('./flashcard_app.db');
    var query1 = "SELECT * FROM input";
    var query2 = "SELECT * FROM translations";
    function initialize(callback, next){
        db.serialize(function(){
            db.all(query1, [], function(err, rows){
                if(err){
                    callback(err, rows, next);
                }
                else{
                    callback(null, rows, next);
                }
            })
        })
    }

    function populate_translations(err, rows, callback){
        if(err){
            res.render('index', {translations: [], textarea_input: ""});
        }
        else{
            textarea_input = rows[0].input;
            db.serialize(function(){
                db.all(query2, [], function(err, rows){
                    if(err){
                        callback(err);
                    }
                    else{
                        rows.forEach(function(row) {
                            translations.push({source: row.word, result:row.translations});
                        })
                        callback(null)
                    }
                })
            })
        }
    }

    initialize(populate_translations, function(err){
        db.close();
        if(err){
            res.render('index', {translations: [], textarea_input: ""});
        }
        else{
            res.render('index', {translations: translations, textarea_input: textarea_input});
        }
    })
})

app.post('/', function(req, res){
    var db = new sqlite3.Database('./flashcard_app.db');
    var query = "DELETE FROM translations";
    var input = req.body.translate_input;
    function cleanup(callback){
        db.serialize(function(){
            db.run(query, function(err){
                if(err){
                    callback(err);
                }
                else{
                    callback(null);
                }
            })
        })
    }

    cleanup(function(err){
        db.close();
        if(err){

        }
        else{
            res.render('index', {translations: [], textarea_input: input});
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
            db.run(query, [], function(err){
                if (err){
                    callback(err);
                }
                else{
                    callback(null);
                }
            })
        })
    }

    deleteFlashcard(function(err){
        db.close();
        if(err){

        }
        else{

        }
        res.redirect('/flashcards');
    })

})

app.get('/add/:word', function(req, res){
    var source = req.query.source;
    var result = req.query.result;
    res.render('add_flashcard', {source: source, result: result});
})

app.get('/edit/:word', function(req, res){
    console.log(req.params.word);
    var word = req.params.word;
    var result;
    var db = new sqlite3.Database('./flashcard_app.db');
    var query = 'SELECT * FROM flashcards WHERE word="' + word + '"';

    function editFlashcard(callback){
        console.log(query);
        db.serialize(function () {
            db.all(query, [], function(err, rows){
                    if(err){
                        callback(err, rows);
                    }
                    else{
                        callback(null, rows);
                    }

                }
            );
        })
    }

    editFlashcard(function(err, rows){
        db.close();
        if(err){

        }
        else{
            result = rows[0];
        }
        res.render('edit_flashcard', {word: result.word, translation: result.translation, example: result.example});
    })

})

app.post('/edit/:word', function(req, res){
    var word = req.body.original_word;
    var trans = req.body.translation_word;
    var example = req.body.example_use;
    var db = new sqlite3.Database('./flashcard_app.db');
    var query = "UPDATE flashcards SET translation='"+ trans + "', example= '" + example + "' WHERE word='" + word + "'";
    function editFlashcard(callback){
        db.serialize(function(){
            db.run(query, [], function(err){
                if(err){
                    callback(err);
                }
                else{
                    callback(null);
                }
            })
        })
    }


    editFlashcard(function(err){
        db.close();
        if(err){

        }
        else{
            res.redirect('/flashcards');
        }
    })

})

app.get('/review_flashcard/', function(req, res){
    res.render("review_flashcard");
})

app.get('/review_flashcard/alphabetical', function(req, res){
    res.redirect("/review_flashcard/alphabetical/1");
})

app.get('/review_flashcard/alphabetical/:index', function(req, res){
    var db = new sqlite3.Database('./flashcard_app.db');
    var query = "SELECT * FROM flashcards order by word";
    var index = parseInt(req.params.index);

    function review_flashcard(callback){
        db.serialize(function(){
            db.all(query, [], function(err, rows){
                if(err){
                    callback(err, rows);
                }
                else{
                    callback(null, rows);
                }
            })
        })
    }

    review_flashcard(function(err,rows){
        db.close();
        if(err){

        }
        else{
            if(index > rows.length){
                res.redirect('/review_flashcard/alphabetical/'+ rows.length);
            }
            else if (index < 0){
                res.redirect("/review_flashcard/alphabetical/1");
            }
            else{
                res.render('review_flashcard_order', {index: index, max: rows.length, flashcards: rows});
            }
        }
    })
})

app.get('/review_flashcard/chronological', function(req, res){
    res.redirect("/review_flashcard/chronological/1");
})

app.get('/review_flashcard/chronological/:index', function(req, res){
    var db = new sqlite3.Database('./flashcard_app.db');
    var query = "SELECT * FROM flashcards";
    var index = parseInt(req.params.index);

    function review_flashcard(callback){
        db.serialize(function(){
            db.all(query, [], function(err, rows){
                if(err){
                    callback(err, rows);
                }
                else{
                    callback(null, rows);
                }
            })
        })
    }

    review_flashcard(function(err,rows){
        db.close();
        if(err){

        }
        else{
            if(index > rows.length){
                res.redirect('/review_flashcard/chronological/'+ rows.length);
            }
            else if (index < 1){
                res.redirect("/review_flashcard/chronological/1");
            }
            else{
                res.render('review_flashcard_order', {index: index, max: rows.length, flashcards: rows});
            }
        }
    })
})

app.get('/review_flashcard/random', function(req, res){
    res.redirect("/review_flashcard/random/0");
})

app.get('/review_flashcard/random/:index', function(req, res){
    var db = new sqlite3.Database('./flashcard_app.db');
    var query = "SELECT * FROM flashcards";
    var index = parseInt(req.params.index);

    function review_flashcard(callback){
        db.serialize(function(){
            db.all(query, [], function(err, rows){
                if(err){
                    callback(err, rows);
                }
                else{
                    callback(null, rows);
                }
            })
        })
    }

    review_flashcard(function(err,rows){
        db.close();
        if(err){

        }
        else{
                var max = rows.length;
                var row = rows[index];
                var word = row.word;
                var translation = row.translation;
                var example = row.example;
                res.render('review_flashcard_random', { index: index, max: max, word: word, translation: translation, example: example});
        }
    })
})

app.post('/review_flashcard', function(req, res){
    var order = req.body.order;
    res.redirect("/review_flashcard/"+order);
})

app.get('/flashcards', function(req, res){
    var db = new sqlite3.Database('./flashcard_app.db');
    var query = "SELECT * FROM  flashcards";
    function fetchFlashcards(callback){
        db.serialize(function(){
            db.all(query, function (err, rows){
                if(err){
                    callback(err, rows);
                }
                else{
                    callback(null, rows);
                }
            })
        })
    }

    fetchFlashcards(function(err, rows){
        db.close();
        if(err){

        }
        else{
            res.render('flashcards_single', { message: 'List of Flashcards', values: rows});
        }
    })

})

app.post('/flashcards', function (req, res){
    var word = req.body.original_word;
    var trans = req.body.translation_word;
    var example = req.body.example_use;
    var db = new sqlite3.Database('./flashcard_app.db');
    var check_query = 'SELECT * FROM flashcards WHERE word="' + word + '"';
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
            db.close();
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
        }
    }

    checkIfExist(addFlashcard, function(err){
        db.close();
        if(err){

        }
        else{
            res.redirect('/');
        }
    })
})

app.get('/flashcards/entries=:number', function(req,res){
    var number = req.params.number;
    res.redirect('/flashcards/entries=' + number + "/page=1");
})

app.get('/flashcards/entries=:number/page=:page', function(req, res){
    var number = parseInt(req.params.number);
    var page = parseInt(req.params.page);
    var db = new sqlite3.Database('./flashcard_app.db');
    var query = "SELECT * FROM  flashcards";

    function fetchFlashcards(callback){
        db.serialize(function(){
            db.all(query, function (err, rows){
                if(err){
                    callback(err, rows);
                }
                else{
                    callback(null, rows);
                }
            })
        })
    }

    fetchFlashcards(function(err, rows){
        db.close();
        if(err){

        }
        else{
            var max = Math.ceil(rows.length / number);
            var begin = (page-1) * number;
            var end = page * number;
            var flashcards = rows.slice(begin, end);
            res.render('flashcards', {current: page, max: max, title: 'Flash Cards', message: 'List of Flashcards', values: flashcards});
        }
    })

})

app.post('/add_flashcards', function(req, res){
    var body = req.body;
    var values = [];
    for (word in body){
        values.push({word: word, translation: body[word]});
    }

    res.render('add_flashcards', {values: values});
})

app.post('/add_batch', function(req, res){
    console.log(req.body);
    var body = req.body;
    var words = [];
    var translations = [];
    var examples = [];
    var values = "";
    var count = 0;
    for (name in req.body){
       if (count % 3 == 0){
          words.push(body[name]);
       }
       else if (count % 3 == 1){
          translations.push(body[name]);
       }
       else{
          examples.push(body[name]);
       }
       count++;
    }
    console.log(words);
    console.log(translations);
    console.log(examples);
    for (var i = 0; i < words.length; i++){
        var word = words[i];
        var translation = translations[i];
        var example = examples[i];
        values = values + "('" + word + "', '" + translation + "', '" + example + "'),"
    }
    var query = "INSERT INTO flashcards(word,translation,example) VALUES" + values;
    query = query.slice(0, query.length-1);
    console.log(query);
    var db = new sqlite3.Database('./flashcard_app.db');
    function insertFlashcards(callback){
        db.serialize(function(){
            db.run(query, function(err){
                if(err){
                    callback(err);
                }
                else{
                    callback(null);
                }
            })
        })
    }

    insertFlashcards(function(err){
        db.close();
        if(err){

        }
        else{
            res.redirect('/flashcards');
        }
    })
})

app.get('/moving', function(req, res){
    var db = new sqlite3.Database('./flashcard_app.db');
    var query = "SELECT * FROM  flashcards";
    function fetchFlashcards(callback){
        db.serialize(function(){
            db.all(query, function (err, rows){
                if(err){
                    callback(err, rows);
                }
                else{
                    callback(null, rows);
                }
            })
        })
    }

    fetchFlashcards(function(err, rows){
        db.close();
        if(err){

        }
        else{
            res.render('review_flashcard_moving', { flashcards: rows});
    }
    })
})
app.listen(3000, function () {
    console.log('Express server is up on port 3000');
});