const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bodyparser = require('body-parser');

const zaloga = require('../zaloga.json');
const uporabniki = require('../uporabniki.json');

const port = process.env.PORT || 4002;

app.use(cors({
    origin: '*'
}));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.get('/zaloga', async (req, res) => {
    try {
        res.json(zaloga);
    } catch(err)  {
        console.error(err.message);
    }
});

app.post('/prijava', async (req, res) => {
    try {
        const podatki = req.body;
        let uspesnaPrijava = true;

        for(let i = 0; i < uporabniki.uporabniki.length; i++) {
            if(uporabniki.uporabniki[i].username == podatki.username && uporabniki.uporabniki[i].password == podatki.password) {
                res.send(podatki);
                uspesnaPrijava = false;
            }
        }
        
        if(uspesnaPrijava) {
            res.status(404).send({
                message: 'Error'
            });
        }
    } catch(err) {
        console.error(err.message);
    }
});

app.listen(4002, () => {
    console.log(`Server je pognan na portu ${port}`);
});