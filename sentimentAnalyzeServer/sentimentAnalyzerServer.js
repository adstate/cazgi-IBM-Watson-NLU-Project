const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = new express();
const nlu = getNLUInstance();

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({ apikey: api_key }),
        serviceUrl: api_url,
    });

    return naturalLanguageUnderstanding;
}

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

