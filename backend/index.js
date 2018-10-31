// imports-dependencies
const express = require('express');

// define variables
const app = express();

// body
// Read verb          // request and send
app.get('/main', function(req, res) {
// array of objects
  const data = [{
    style: 'casual',
    image: 'https://notredame.box.com/shared/static/408cbkofqigvcrtddwl0bv5ptjrvwchj.jpg',
    inventory: 3,
    price: '$',
    likes: 10},
    {style: 'athleisure',
    image: '',
    inventory: 5,
    price: '$$',
    likes: 30},
    {style: 'preppy',
    image: '',
    inventory: 7,
    price: '$$$',
    likes: 20}]
  res.status(200).send(data)
});

// in case of environmental variables for privacy
const port = process.env.PORT || 3000;
const httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
  console.log('backend running on port ' + port + '.');
});
// exports
// no exports on index.js
