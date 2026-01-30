const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("Hello CI/CD Pipeline");
});

app.get('/user', (req, res) => {
    const name = req.query.name || "Guest";
    res.send(`Hello ${name.replace(/[^a-zA-Z]/g, "")}`);
});

app.listen(3000, () => {
    console.log("App running on port 3000");
});
