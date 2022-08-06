const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // change to app.use express lines
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log('up and running on port', PORT);
});
