// imports-dependencies
const express = require('express');

// define variables
const app = express();

// enable CORS on /list route only
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

// body
// Read verb          // request and send
app.get('/main', function(req, res) {
// array of objects
  const data = [{
    style: 'casual',
    image: 'https://notredame.box.com/shared/static/408cbkofqigvcrtddwl0bv5ptjrvwchj.jpg',
    inventory: 1,
    price: '$',
    likes: 10},
    {style: 'athleisure',
    image: '',
    inventory: 1,
    price: '$$',
    likes: 30},
    {style: 'dressy',
    image: '',
    inventory: 1,
    price: '$$$',
    likes: 20}]
  res.status(200).send(data)
});

app.get('/looks/casual', function(req, res) {
  const data = [{
    look: 'elixaberh',
    shoes: 'https://notredame.box.com/s/s2vcwd3xphq57flmmg2gsjj4pxozvq3l',
    rings: 'https://notredame.box.com/s/vmx1j5mwq6fnefd13nb8g765c5jqcwky',
    necklace: 'https://notredame.box.com/s/azdtffg08doldkaj1e6rlugxmqyqqsty',
    outfit: 'https://notredame.box.com/s/ogo6po3798uq286653s52itzwxvf992b'},
    {look: 'cheong',
    shoes: 'https://notredame.box.com/s/s2vcwd3xphq57flmmg2gsjj4pxozvq3l',
    rings: 'https://notredame.box.com/s/vmx1j5mwq6fnefd13nb8g765c5jqcwky',
    necklace: 'https://notredame.box.com/s/azdtffg08doldkaj1e6rlugxmqyqqsty',
    outfit: 'https://notredame.box.com/s/ogo6po3798uq286653s52itzwxvf992b'},
    {look: 'lara',
    shoes: 'https://notredame.box.com/s/s2vcwd3xphq57flmmg2gsjj4pxozvq3l',
    rings: 'https://notredame.box.com/s/vmx1j5mwq6fnefd13nb8g765c5jqcwky',
    necklace: 'https://notredame.box.com/s/azdtffg08doldkaj1e6rlugxmqyqqsty',
    outfit: 'https://notredame.box.com/s/ogo6po3798uq286653s52itzwxvf992b'}]
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
