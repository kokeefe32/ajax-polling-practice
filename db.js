const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    text: String,
    sent: Date
});

mongoose.model('Message', MessageSchema);

mongoose.connect('mongodb://localhost/class23-demo-chat',  {useNewUrlParser: true});
