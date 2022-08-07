const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static('server/public'));
app.use(express.urlencoded( {extended: true}));


//ROUTER
const tasksRouter = require('./route/tasks.router.js')
app.use('/tasks', tasksRouter)

// START SERVER
app.listen(PORT, () => {
    console.log('up and running on port', PORT);
});

module.exports = tasksRouter;