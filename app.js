require('./db');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

const Message = mongoose.model('Message');
app.get('/api/messages', (req, res) => {
    const q = {};
    if(req.query.lastSentDate) {
        q.sent = {$gt: new Date(req.query.lastSentDate)};
    }
    // TODO: get the "recent" ones
    // chaining calls to mongoose model
    // to have long queries
    // and to assign callback
    // mongoose support promises
    Message.find(q).sort('sent').exec((err, result, count) => {
        res.json(result) ;
    }); 
});

app.post('/api/message', (req, res) => {
    const msg = new Message({
        text: req.body.message,  
        sent: new Date()
    });
    msg.save((err, result, count) => {
        // send back object that was saved
        res.json(result); 
    });
});








app.listen(3000);








