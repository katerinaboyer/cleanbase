const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://jon:UJ62J1tfuqRuZ1WV@cluster0.qxidv.mongodb.net/<cb-test>?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

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

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});