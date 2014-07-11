var express = require('express'),
    app     = express(),
    server  = require('http').Server(app).listen(3000),
    bus     = require('bus.io')(server);

// Serve our static files
app.use(express.static(__dirname + '/public'));

// Each time a user connects, add the user to
// a "public" channel called "everyone"
bus.socket(function(socket) {
    bus.alias(socket, 'everyone');
});

// Listen for the 'user-message' event from the client
bus.on('user-message', function(message) {

    // The "message" passed to this callback contains the
    // text the user submitted to the chat. When we change
    // the target of the message to "everyone" and deliver
    // the message, the text will be displayed in the public
    // channel
    message.target('everyone');

    // Now, deliver the message to all connected users
    message.deliver();
});
