const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // change to app.use express lines
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

app.listen(PORT, () => {
    console.log('up and running on port', PORT);
});

// DB CONNECTION
const pg = require('pg');
const Pool = pg.Pool;
const config = {
    database: 'weekend-to-do-app', // name of database
    host: 'localhost',
    port: 5432,
    max: 10, // max number of concurrent connections
    idleTimeoutMillis: 10000 // attempt to connect for 10 seconds
}; 
const pool = new Pool(config);

pool.on('connect', () => {
    console.log('postgresql connected');
});

pool.on('error', (error) => {
    console.log('Error connecting to db', error);
});



// APP.GET - connect to the GET in client.js
app.get( '/tasks', (req, res ) => {
    console.log( 'in /tasks GET' );
    
    const query = `SELECT * from "tasks" ORDER by "id";`;

    pool.query( query ).then( ( results ) => {
        res.send( results.rows );
    }).catch( (err) => {
        console.log( 'ERROR with GET:', err );
        res.sendStatus( 500 );
    })
}) // end /tasks GET

// APP.POST - connect to the POST in client.js
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

