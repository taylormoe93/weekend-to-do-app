//CLIENT.JS

$( document ).ready( onReady );

function onReady(){
    //event listeners 
    $( '#addTaskButton' ).on( 'click', addTask ); //links to addTask function
    // taskComplete button
    // taskDelete button

    // getTasks(); // doesn't exist yet but will be made
};

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
} // end addTask