const express = require('express');
const tasksRouter = express.Router();


// DATABASE CONNECTION
const pg = require('pg');
const Pool = pg.Pool;
const pool = new Pool({
    database: 'weekend-to-do-app', // name of database
    host: 'localhost',
    port: 5432,
    max: 10, 
    idleTimeoutMillis: 10000 
}); 

// GET - connect to the GET in client.js
tasksRouter.get( '/', (req, res ) => {
    console.log( 'in GET' );
    
    const query = `SELECT * from "tasks" ORDER by "id";`;

    pool.query( query ).then( ( results ) => {
        res.send( results.rows );
    }).catch( (err) => {
        console.log( 'ERROR with GET:', err );
        res.sendStatus( 500 );
    })
}) // end /tasks GET


// POST - connect to the POST in client.js
tasksRouter.post( '/' , ( req, res ) => {
    console.log( 'in POST:', req.body );

    const query = `INSERT INTO "tasks" ( "task" ) VALUES ($1);`;
    const values = [ req.body.task ];

    pool.query( query, values ).then( results => {
        res.sendStatus( 200 );
    }).catch( (err) => {
        console.log( 'ERROR with INSERT:', err );
        res.sendStatus( 500 );
    })
}); //end /tasks POST

module.exports = tasksRouter;

// DELETE - connect to taskDelete in client.js
tasksRouter.delete( '/:id', ( req, res ) => {
    console.log( '/tasks DELETE:', req.params.id );

    const query = `DELETE FROM "tasks" WHERE id=$1;`;
    const values = [ req.params.id ];

    pool.query( query, values ).then( ( response ) => {
        res.sendStatus( 200 );
    }).catch( ( err ) => {
        console.log( 'error with DELETE:', err );
        res.sendStatus( 500 );
    })
}); // end /tasks DELETE

// TOGGLE COMPLETE
tasksRouter.put( '/:id', (req, res ) => {
    console.log( '/tasks PUT:', req.params.id, req.body.status );
    const id = req.params.id;
    const query = `UPDATE "tasks" SET "status" = TRUE WHERE "id" = $1;`;
    pool.query( query, [id] ).then( (results) => {
        res.sendStatus( 200 );
    }).catch( ( err ) => {
        console.log( 'error with update:', err );
        res.sendStatus ( 500 );
    })
}); // end /tasks PUT

