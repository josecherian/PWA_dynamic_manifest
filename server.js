const express = require ('express');
const app = express ();
app.set ('view engine', 'hbs');
app.use (express.static (__dirname + '/public'));

app.get ('/manifest.json', (req, res) => {
  // You can dynamically generate your manifest here
  // You can pull the data from database and send it back
  // I will use a template for simplicity

  //Use some logic to extract organization name from referer
  var matches = /\/([a-z]+)\/?$/i.exec (req.headers.referer);
  if (matches && matches.length > 1) {
    var orgName = matches[1];
  } else {
    var orgName = 'ORGA'; //Default
  }

  // Need to set content type, default is text/html
  res.set ('Content-Type', 'application/json');
  res.render ('manifest.hbs', {orgName});
});

app.get ('/:orgName', (req, res) => {
  res.render ('index.hbs', {orgName: req.params.orgName});
});

app.listen (3000, () => console.log ('Whitelist  app listening on port 3000!'));
