// ███████╗███████╗██████╗ ██╗   ██╗███████╗██████╗      █████╗ ██████╗ ██╗
// ██╔════╝██╔════╝██╔══██╗██║   ██║██╔════╝██╔══██╗    ██╔══██╗██╔══██╗██║
// ███████╗█████╗  ██████╔╝██║   ██║█████╗  ██████╔╝    ███████║██████╔╝██║
// ╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝██╔══╝  ██╔══██╗    ██╔══██║██╔═══╝ ██║
// ███████║███████╗██║  ██║ ╚████╔╝ ███████╗██║  ██║    ██║  ██║██║     ██║
// ╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝    ╚═╝  ╚═╝╚═╝     ╚═╝

// dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt')
const app = express();
Schema = mongoose.Schema,
    User = require('./userModel');
// const port = 7000
require('dotenv').config();

//config
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

// MongoDb Setup and connection
const DB_URL = process.env.DB_URL

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB Atlas is connected");
});

/*------------------------------------------------------------ User Database (queries) ------------------------------------------------------*/
// posts new user information to the database
app.post('/users', (req, res) => {

    const newUser = new User({
        _id: req.body.id,
        first_name: req.body.first_name,
        surname: req.body.surname,
        username: req.body.username,
        password: req.body.password,
    })
    newUser.save()
        .then((event) => res.json(event))
        .catch((err) => res.status(400).json(console.log('Error: ' + err)))
});

//gets info from frontend - checks if user exists then checks if the password matches the hashed password
app.post('/login', async function (req, res) {
    var {username,password}=req.body
    if(!username || !password )
    {
        return res.status(422).json({error:"Please add all fields"})
    }
    User.findOne({username:username})
    .then((user)=>{
        if(!user){
            return res.status(422).json(console.log({error:"Invalid Email or password"}))
       }
        bcrypt.compare(password,user.password)
        .then(match=>{
            if(match)
            {
                res.json({message:"Login Successfull"})
            }
            else{
                return res.status(422).json(console.log({error:"Invalid Email or password"}))
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    })
});

/*------------------------------------------------------------ Event Database (schema, queries) ------------------------------------------------------*/

//sets schema for the db
const eventSchema = {
    clientId: Number,
    nativeClient: String,
    customerWebsite: String,
    eventType: String,
    eventSubType: String,
    eventMessage: String,
    eventDate: Date,
    server: String,
    enviroment: String,
    system: String,
    webUrl: String,
    data: {
        name: String,
        value: Number,
    },
    ticketStatus: Boolean,
    severity: String,
}

//data model for mongoDB
const Event = mongoose.model("Event", eventSchema);

// Create route and main endpoint for data to be sent to the API. Once API receives data it updates on the database
app.post('/eventlog', (req, res) => {
    const newEvent = new Event({
        _id: req.body.id,
        clientId: req.body.id,
        nativeClient: req.body.nativeCustomer,
        customerWebsite: req.body.customerWebsite,
        eventType: req.body.eventType,
        eventSubType: req.body.eventSubType,
        eventMessage: req.body.eventMessage,
        eventDate: req.body.eventDate,
        server: req.body.server,
        enviroment: req.body.enviroment,
        system: req.body.system,
        webUrl: req.body.webUrl,
        data: {
            name: req.body.name,
            value: req.body.value
        },
        ticketStatus: req.body.ticketStatus,
        severity: req.body.severity,
    })
    newEvent.save()
        .then((event) => res.json(event))
        .catch((err) => res.status(400).json('Error: ' + err))
})

//main read route to pull all data from the database. Data also gets filtered through this function which is passed to the front end.
// Only data that has a ticketStatus of false will be provided to the frontend. A limit of results has also been added. 
app.get('/eventlog', async (req, res) => {
    var filters = {};
    if (req.query.nativeClient != null) {
        filters.nativeClient = req.query.nativeClient;
    }
    if (req.query.customerWebsite != null) {
        filters.customerWebsite = req.query.customerWebsite;
    }
    if (req.query.server != null) {
        filters.server = req.query.server;
    }
    if (req.query.environment != null) {
        filters.environment = req.query.environment;
    }
    if (req.query.eventType != null) {
        filters.eventType = req.query.eventType;
    }
    if (req.query.system != null) {
        filters.system = req.query.system;
    }
    if (req.query.eventSubType != null) {
        filters.eventSubType = req.query.eventSubType;
    }

    Event.find(filters).
        where('ticketStatus').equals('false').
        limit(20).
        select(
            '_id nativeClient customerWebsite eventType eventSubType server system environment eventMessage eventDate webUrl severity')
        .then((event) => res.json(event))
        .catch(("Error" + err))
})

//below function receives put request from the frontend to update the ticketStatus field on the database to true. 
app.put('/update', (req, res) => {

    const id = req.body.id;
    const newTicketStatus = req.body.newTicketStatus;
    console.log(id);
    console.log(newTicketStatus)

    Event.findById(id).then((event) => {
        return Object.assign(event, { ticketStatus: newTicketStatus });
    }).then((event) => {
        return event.save();
    }).then((event) => {
        res.json({
            msg: 'model updated',
            event
        });
    }).catch((err) => {
        res.send(err);
    });
});

//query used in systemEvents on React. Query to find all tickets with a field of high and displays event type, subtype and message.
// This function also has a filter component that gets passed to the frontend. 
app.get('/eventlog/severity', async (req, res) => {

    var filters = {};
    if (req.query.nativeClient != null && req.query.nativeClient != '') {
        filters.nativeClient = req.query.nativeClient;
    }
    if (req.query.eventType != null && req.query.eventType != '') {
        filters.eventType = req.query.eventType;
    }
    if (req.query.eventSubType != null && req.query.eventSubType != '') {
        filters.eventSubType = req.query.eventSubType;
    }
    if (req.query.system != null && req.query.system != '') {
        filters.system = req.query.system;
    }

    Event.
        find(filters).
        where('severity').equals('high').
        where('ticketStatus').equals('false').
        limit(20).
        select('_id eventType eventSubType eventMessage nativeClient system ticketStatus')
        .then((event) => res.json(event))
        .catch((err) => res.status(400).json('Error: ' + err))
});

/*------------------------------------------------------------ Connecting to port ------------------------------------------------------*/

//port listen function
app.listen(process.env.PORT, function () {
    console.log("Server listening on port")
}) 