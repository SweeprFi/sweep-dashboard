const express = require("express");
const serverless = require('serverless-http');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('build'));

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.get("/forbidden", (req, res) => {
    res.json("App not allowed in the US");
});

app.get('*', (req, res) => {
    res.sendFile('index.html', { root: 'build' });
});

module.exports.handler = serverless(app);
module.exports.APP = app;
