const dns = require("dns");

const UrlModel = require("../models/UrlModel");

// shorten url handler to shorten a url and save to database
module.exports.shortenUrl = (req, res) => {
  const { url } = req.body;

  try {
    // Remove the protocol (http:// or https://) for DNS lookup
    const urlWithoutProtocol = url.replace(/^https?:\/\//, "").replace(/\/.*$/, "");

    // DNS lookup to validate the URL
    dns.lookup(urlWithoutProtocol, (err, address) => {
      if (err) {
        // If DNS lookup fails, return error
        return res.json({ error: "invalid url" });
      } else {
        // Check if the URL already exists in the database
        UrlModel.findOne({ original_url: url })
          .then((existingUrl) => {
            if (existingUrl) {
              // If the URL already exists, return its short_url
              res.json({
                original_url: existingUrl.original_url,
                short_url: existingUrl.short_url,
              });
            } else {
              // Store the original URL with a new short URL ID
              const shortUrlId = Math.floor(Math.random() * 10000); // Simple random short URL generation
              const newUrl = new UrlModel({
                original_url: url,
                short_url: shortUrlId,
              });

              newUrl
                .save()
                .then(() => {
                  res.json({
                    original_url: url,
                    short_url: shortUrlId,
                  });
                })
                .catch((err) => {
                  res.json({ error: "Failed to save URL to database" });
                  console.error(err);
                });
            }
          })
          .catch((err) => {
            res.json({ error: "Database error" });
            console.error(err);
          });
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ error: "invalid url" });
  }
};

// a handler to get the original url using the short url id
module.exports.getOriginalUrl = (req, res) => {
  const shortUrlId = req.params.short_url;

  // Look up the short URL in the database
  UrlModel.findOne({ short_url: shortUrlId })
    .then((urlRecord) => {
      if (urlRecord) {
        // Redirect the user to the original URL
        res.redirect(urlRecord.original_url);
      } else {
        // If no matching short URL found, return error
        res.json({ error: "No short URL found for the given input" });
      }
    })
    .catch((err) => {
      res.json({ error: "Database error" });
      console.error(err);
    });
};
