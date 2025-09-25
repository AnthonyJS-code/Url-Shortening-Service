const urls = require("../models/urls.models");

module.exports = async (req, res) => {
  id = req.params.id;
  current = await urls.findOne({ shortUrl: id });
  if (current) {
    longUrl = current.url;
    res.redirect(longUrl);
  } else {
    res.status(404).send(`<h1>Yep, Not Found!!!!</h1>`);
  }
};
