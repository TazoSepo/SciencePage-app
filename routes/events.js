const express = require("express");
const router = express.Router();
const Event = require('../models/event');

// All event route
router.get('/', async (req,res) => {
    try{
        const events = await Event.find({})
        res.render('events/index', {events: events});
    }
    catch{
        res.redirect('/')
    }
    
});

// New Event Route
router.get('/new', (req,res) =>{
    res.render("events/new", {event: new Event()})
})

// Craete new event
router.post('/', async (req,res) =>{
    const event = new Event({
        name: req.body.name
    })
    try{
        const newEvent = await event.save()
        res.redirect('events')
    }
    catch{
        res.render("events/new", () => {
            console.log("Error adding the event")
        })
    }
    
    res.send("Created")
})

module.exports = router