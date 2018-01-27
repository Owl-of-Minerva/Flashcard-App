var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function(req, res){
})

app.get('/flash_cards', function (req, res) {
    console.log("Got a GET request for /flash_cards");
    res.send('List of flashcards');
})

app.get('/database_test', function (req, res){
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database(':memory:');

    db.serialize(function () {
        db.run('CREATE TABLE lorem (info TEXT)');
        var stmt = db.prepare('INSERT INTO lorem VALUES (?)');

        for (var i = 0; i < 10; i++) {
            stmt.run('Ipsum ' + i);
        }

        stmt.finalize();

        db.each('SELECT rowid AS id, info FROM lorem', function (err, row) {
            console.log(row.id + ': ' + row.info);
        })
    })

    db.close();
    res.send('database test')
})
app.listen(3000, function () {
    console.log('Express server is up on port 3000');
});