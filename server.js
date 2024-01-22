const express = require("express");
const app = express();

const BLOCKED_COUNTRY = "US";
const GEOBLOCKER_REDIRECT_TARGET = "https://www.sweepr.finance/unavailable";

function geoblocker(req, res, next) {
  if (!req.geo || !req.geo.country || !req.geo.country.code) return next();

  const country = req.geo.country.code;

  if (country === BLOCKED_COUNTRY) {
    return res.redirect(GEOBLOCKER_REDIRECT_TARGET);
  }
}


app.use(geoblocker);

// Serve static files from the 'build' folder generated by CRACO
app.use(express.static("build"));

// Send index.html for any other requests
 app.get('*', (req, res) => {
   res.sendFile(__dirname + '/build/index.html');
  });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

