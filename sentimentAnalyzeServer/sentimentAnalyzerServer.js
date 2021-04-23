const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const nlu = require('./services/nluService');

const app = new express();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", async (req, res) => {
    const url = req.query.url;

    try {
        const response = await nlu.analyze({
            url,
            features: {
                emotion: {}
            }
        });

        return res.send(response.result.emotion);
    } catch(e) {
        return res.send(e);
    }
});

app.get("/url/sentiment", async (req,res) => {
    const url = req.query.url;

    try {
        const response = await nlu.analyze({
            url,
            features: {
                sentiment: {}
            }
        });

        return res.send(response.result.sentiment);
    } catch(e) {
        return res.send(e);
    }
});

app.get("/text/emotion", async (req, res) => {
    const text = req.query.text;

    try {
        const response = await nlu.analyze({
            text,
            features: {
                emotion: {}
            }
        });

        return res.send(response.result.emotion);
    } catch(e) {
        return res.send(e);
    }
});

app.get("/text/sentiment", async (req, res) => {
    const text = req.query.text;

    try {
        const response = await nlu.analyze({
            text,
            features: {
                sentiment: {}
            }
        });

        return res.send(response.result.sentiment);
    } catch(e) {
        return res.send(e);
    }
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

