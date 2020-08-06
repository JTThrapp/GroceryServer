 //ENV
require('dotenv').config();

// Express
const express = require('express');
const app = express();

// // Controllers
const item = require('./controllers/itemcontroller');


// //Database
const sequelize = require('./db');
sequelize.sync();
app.use(express.json())
// app.use(require('./middleware/headers'));

// // Routes
// // app.use('/auth', user)
app.use(require('./middleware/validate-session'));
app.use('/item', item);

app.listen(process.env.PORT, function(){
    console.log(`App listening on port ${process.env.PORT}`);
})