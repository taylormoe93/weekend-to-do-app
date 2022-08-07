const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // change to app.use express lines
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

app.listen(PORT, () => {
    console.log('up and running on port', PORT);
});

// connect to the POST in client.js
app.post( '/tasks' ), ( req, res ) => {
    console.log( 'in /tasks POST:', req.body );

    const query = `INSERT INTO "tasks" ( "task" ) VALUE ($1);`;
    const values = [ req.body.task ];

    pool.query( query, values ).then( results => {
        res.sendStatus( 201 );
    }).catch( (err) => {
        console.log( 'ERROR with INSERT:', err );
        res.sendStatus( 500 );
    })
}; //end /tasks POST