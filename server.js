// Import npm packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000; // Step 1

// Step 2
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://jon:UJ62J1tfuqRuZ1WV@cluster0.qxidv.mongodb.net/<cb-test>?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

mongoose.connection.once('open', () => {
    console.log('Mongoose is connected');
});

// Data parsing
app.use(express.json());
app.use(cors());
//app.use(express.urlencoded({ extended: false }));

// Step 3

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}


// HTTP request logger
const usersRouter = require('./routes/users');
const buildingsRouter = require('./routes/buildings');
const floorsRouter = require('./routes/floors');
const roomsRouter = require('./routes/rooms');
const desksRouter = require('./routes/desks');
const reservationsRouter = require('./routes/reservations');
const selfIllnessReportRouter = require('./routes/selfIllnessReport');
const accountsRouter = require('./routes/accounts');

app.use('/users', usersRouter);
app.use('/buildings', buildingsRouter);
app.use('/rooms', roomsRouter);
app.use('/floors', floorsRouter);
app.use('/desks', desksRouter);
app.use('/reservations', reservationsRouter);
app.use('/selfIllnessReport', selfIllnessReportRouter);
app.use('/accounts', accountsRouter);




app.listen(PORT, console.log(`Server is starting at ${PORT}`));