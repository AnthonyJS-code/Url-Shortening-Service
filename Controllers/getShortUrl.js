const encoder = require("../Methods/encoder");
const urls = require("../models/urls.models");
const validator = require("validator");
module.exports = async (req, res) => {
  let { lurl, CC } = req.body;
  try {
    if (lurl.startsWith("http://") || lurl.startsWith("https://")) {
      goAheadWithShortening();
    } else {
      lurl = `https://${lurl}`;
      goAheadWithShortening();
    }
  } catch (e) {
    if (e.name === "TypeError") {
      return res.redirect("/");
    }
    console.log(e);
  }

  async function goAheadWithShortening() {
    baseUrl = `${req.protocol}://${req.get("host")}`;
    // console.log(baseUrl);
    if (validator.isURL(lurl)) {
      d = await urls.findOne({ url: lurl });
      if (d) {
        let dformat = `${baseUrl}/${d.shortUrl}`;
        return res.json({ u: dformat });
      } else {
        if (CC === "") {
          let newUrl = new urls({
            url: lurl,
          });
          p = await newUrl.save();
          id = encoder(p._id.toString());
          let dformat = `${baseUrl}/${id}`;
          p.shortUrl = id;
          p.save();
          return res.json({ u: dformat });
        } else {
          current = await urls.findOne({ shortUrl: CC });
          if (current) {
            res.status(400).json({ warning: "Custom Code already taken. " });
          } else {
            let newUrl = new urls({
              url: lurl,
              shortUrl: CC,
            });
            await newUrl.save();
            let dformat = `${baseUrl}/${CC}`;
            return res.status(200).json({ u: dformat });
          }
        }
      }
    } else {
      res.status(400).json({ warning: "Invalid URL" });
    }
  }
};
