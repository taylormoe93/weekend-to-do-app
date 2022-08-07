//CLIENT.JS

$( document ).ready( onReady );

function onReady(){
    //event listeners 
    $( '#addTaskButton' ).on( 'click', addTask ); //links to addTask function
    // taskComplete button
    // taskDelete button

    // getTasks(); // doesn't exist yet but will be made
};

//ADD TASK FUNCTION AND POST
function addTask() {
    let objectToSend = {
        task: $( '#inputTask' ).val()
    };

    console.log( 'in addTask:', objectToSend ); // he lives!

    // send to server
    $.ajax({
        type: 'POST',
        url: '/tasks', //double check this if it throws an error. Might be just /.
        data: 'objectToSend'
    }).then( function( response ){
        console.log( 'back from POST:', response );
        //clear inputs
        $( 'input' ).val('');
        //refresh data and DOM
        // getTasks(); DON'T FORGET ME!
    }).catch( function( err ){
        alert( 'error adding item:', err );
    })
} // end addTask. Linked to app.post on server.js. Erroring right now, but it doesn't have all the necessary data.

//GET TASKS
function getTasks(){
    $.ajax({
        type:'GET',
        url: '/tasks' // MIGHT NEED TO CHANGE TO '/'
    }).then( function( response ){
        let taskDisplay = $( '#tasksOut' );
        taskDisplay.empty();

        // render to DOM // may need to change this for the toggle of complete vs incomplete task
        for( let i=0; i<response.length; i++){
            taskDisplay.append(`
                <li>
                    ${ response[i].task }
                    <button class="completeButton" data-id="${ response[i].id }" data-status="${ response[i].status }">complete</button>
                    <button class="deleteButton" data-id="${ response[i].id }">delete</button>
                </li>   
            `)
        }
    }).catch(function(err){
        alert('error getting tasks', err); 
    })
}