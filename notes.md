

Document.ready on ready

USE GIT BRANCHES FOR EACH FEATURE!
Reference: koala project
and physical full stack

# onReady
Click listeners for:
    [X] "Add task" button. This triggers the function: addTask. 
    - "Task Complete" button 
    - "Task Delete" button    
    
# addTask function
[X] addTask function creates an object called objectToSend with task: and status: $.val(). 


### Send to server 

## AJAX POST
# Client Post 
which sends the objectToSend object to the server. Uses URL "/tasks".

# Server app.post.
Client Post connects to app.post on server.js. Uses URL "/tasks". 
We create the const query which will enter SQL code: `INSERT INTO "tasks" ("task:", "status:") VALUES $1, $2);` 
as well as const values with all the req.bodies.THING's. 
And pool.query (which connects to the database.sql | query <- and -> results). Which then has a res.send that sends the data back to the response of getTasks.


### RENDER TO DOM

## AJAX GET 
# getTasks()
AJAX GET object:GET, '/tasks'.

.then: create a variable called taskDisplay = the output div in Index.html where the tasks will display as an unordered list.
Empty it.
Then do a for loop which loops through the tasks and appends the tasks to the DOM as a list with a complete button and a delete button. 

# app.get route (server.js)
const query = `SELECT * from "tasks" ORDER BY "id"` (double check this in postico!)

### DELETE TASK
# function deleteTask()
(Linked to click listener)
(Make a button with an X [bootstrap it red if time allows)

Send an AJAX DELETE request. Url: `/tasks/${id}` 
.then -- response, call getTasks(), catch errors.

pool.query.

# app.delete route (server.js)
app.delete
    const query = `DELETE FROM "tasks" WHERE id=$1;` ;
    const values = [req.params.id];
    pool.query

### COMPLETE TASK
(click listener for completeTask() )
# function completeTask()
const id 

const completeStatus = $( this ).data( 'status' )

AJAX PUT

# app.put (server.js)
const query = `UPDATE "tasks" SET status=$1 WHERE id=$2; ` 
const values
pool.query



### VISUALS
Check out bootstrap










