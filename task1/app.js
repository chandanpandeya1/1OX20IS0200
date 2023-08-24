const express = require('express');
const axios = require('axios');
const validUrl = require('valid-url');
const app = express();
const apicache = require('apicache');
const port = 8008;

const cache = apicache.middleware;

app.use(cache('5 minutes'));
app.get('/numbers', async (req, res) => {
    const urls = Array.isArray(req.query.url) ? req.query.url : [req.query.url];
    let numbers = [];


    for (let url of urls) {
        if (validUrl.isUri(url)) {
            try {
                const response = await axios.get(url, { timeout: 500 });
                numbers = numbers.concat(response.data.numbers);
            } catch (error) {
                console.log(`Failed to fetch data from ${url}`);
            }
        }
    }


    numbers = [...new Set(numbers)].sort((a, b) => a - b);

    res.json({ numbers });
});

const server = app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

module.exports = server;