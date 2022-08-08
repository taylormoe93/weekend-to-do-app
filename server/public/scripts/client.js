//CLIENT.JS

$( document ).ready( onReady );

function onReady(){
    //event listeners 
    $( '.addTaskButton' ).on( 'click', addTask ); //links to addTask function
    // $( '.completeButton' ).on( 'click', );
    $( '#outputDiv' ).on( 'click', '.deleteButton', deleteTask );

    getTasks(); 
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
        url: '/tasks', 
        data: objectToSend
    }).then( function( response ){
        console.log( 'back from POST:', response );
        //clear inputs
        $( 'input' ).val('');
        //refresh data and DOM
       getTasks(); 
    }).catch( function( err ){
        alert( 'error in POST:', err );
    })
}; // end addTask. Linked to app.post on server.js. Erroring right now, but it doesn't have all the necessary data.





//GET TASKS
function getTasks(){
    $.ajax({
        type:'GET',
        url: '/tasks' 
    }).then( function( response ){
        let taskDisplay = $( '#tasksOut' );
        taskDisplay.empty();

        // render to DOM // may need to change this for the toggle of complete vs incomplete task
        for( let i=0; i<response.length; i++)
            if(response[i].status === false){ // if status === false, stay neutral color
                 taskDisplay.append(`
                 <li>
                    ${ response[i].task }
                    <button class="completeButton" data-id="${ response[i].id }" data-status="${ response[i].status }">complete</button>
                    <button class="deleteButton" data-id="${ response[i].id }">delete</button>
                </li>   
            `)} else { // if status ==== true, then we will append to green in CSS
            taskDisplay.append(`
                <li class="complete">
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

function deleteTask(){
    const id = $( this ).data( 'id' );
    console.log( 'in delete:', id );
    $.ajax({
        type: 'DELETE',
        url: `/tasks/${ id }`
    }).then( function( response ){
        console.log( `back from DELETE:`, response );
        getTasks();
    }).catch( function( err ){
        alert( 'Error with Delete:', err );
    })
};