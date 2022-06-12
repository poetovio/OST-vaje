const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bodyparser = require('body-parser');

app.use(express.static('public'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
const datoteka = require('./knexfile').development;
const knex = require('knex')(datoteka);
const bookshelf = require('bookshelf')(knex);

/*
const zaloga = require('../private/zaloga');
const uporabniki = require('../private/uporabniki.json');
*/
const exp = require('constants');

const port = process.env.PORT || 4002;

app.use(cors({
    origin: '*'
}));

// tabele v podatkovni bazi

const Izdelek = bookshelf.Model.extend({
    tableName: 'izdelki',
    idAttribute: 'id'
});

const Nakup = bookshelf.Model.extend({
    tableName: 'nakupi',
    idAttribute: 'id'
});

const Uporabnik = bookshelf.Model.extend({
    tableName: 'uporabniki',
    idAttribute: 'id'
});



app.get('/zaloga', async (req, res) => {
    try {
        const zaloga = await new Izdelek().fetchAll();
        res.json(zaloga);
    } catch(err)  {
        console.error(err.message);
    }
});

app.post('/prijava/:username/:password', async (req, res) => {
    try {
        const podatki = {username: req.params.username, password: req.params.password};
        const uporabniki = await new Uporabnik().fetchAll();
        const sprememba = uporabniki.toJSON();

        console.log(podatki);

        let uspesnaPrijava = true;


        for(let i = 0; i < sprememba.length; i++) {
            if(sprememba[i].username == podatki.username && sprememba[i].password == podatki.password) {
                let json = {"id": sprememba[i].id};
                res.send(json);
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

app.post('/nakup', async (req, res) => {
    try {

        const nakup = req.body;

        let zapis = JSON.stringify(nakup);

        try {
            const nakupi = new Nakup().count('id').then(async function(max) {
                const izdelanNakup = {
                    id: max + 1,
                    nakupi: nakup.nakupi,
                    znesek: nakup.znesek,
                    datumNakupa: (new Date(Date.now())).toISOString().split('T')[0]
                };
                const zapisNakupa = await new Nakup().save(izdelanNakup);
                res.json(izdelanNakup);
            });
        } catch(err) {
            console.error(err.message);
        }
    } catch(err) {
        console.error(err.message);
    }
});


app.listen(4002, () => {
    console.log(`Server je pognan na portu ${port}`);
});