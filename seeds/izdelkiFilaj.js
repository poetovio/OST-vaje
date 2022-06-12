exports.seed = function(knex, Promise) {
    
    return knex('izdelki').del()
        .then(function () {
            return knex('izdelki').insert([
                {
                    "id": 1,
                    "oznaka": "izdelek0",
                    "ime": "Nizkobeljakovinske testenine",
                    "opis": "Testenine z nizko vsebnostjo beljakovin",
                    "src": "Slike/testeninePKU.jpg",
                    "kolicina": 30,
                    "cena": 3.5,
                    "popust": 20
                },
                {
                    "id": 2,
                    "oznaka": "izdelek1",
                    "ime": "Nizkobeljakovinski kruh",
                    "opis": "Kruh z nizko vsebnostjo beljakovin",
                    "src": "Slike/kruhPKU.jpg",
                    "kolicina": 25,
                    "cena": 2.6,
                    "popust": 10
                },
                {
                    "id": 3,
                    "oznaka": "izdelek2",
                    "ime": "Nizkobeljakovinski keksi",
                    "opis": "Keksi z nizko vsebnostjo beljakovin",
                    "src": "Slike/keksiPKU.jpg",
                    "kolicina": 15,
                    "cena": 3.2,
                    "popust": 15
                },
                {
                    "id": 4,
                    "oznaka": "izdelek3",
                    "ime": "Brezglutenski kruh",
                    "opis": "Kruh brez vsebnosti glutena",
                    "src": "Slike/kruhGluten.jpg",
                    "kolicina": 40,
                    "cena": 2.1,
                    "popust": 10
                },
                {
                    "id": 5,
                    "oznaka": "izdelek4",
                    "ime": "Nizkobeljakovinska pizza",
                    "opis": "Pizza z nizko vsebnostjo beljakovin",
                    "src": "Slike/pizzaPKU.jpg",
                    "kolicina": 10,
                    "cena": 5.8,
                    "popust": 120
                },
                {
                    "id": 6,
                    "oznaka": "izdelek5",
                    "ime": "Brezglutenske prestice",
                    "opis": "Prestice brez vsebnosti glutena",
                    "src": "Slike/presticeGluten.jpg",
                    "kolicina": 25,
                    "cena": 1.9,
                    "popust": 10
                },
                {
                    "id": 7,
                    "oznaka": "izdelek6",
                    "ime": "Nizkobeljakovinska moka",
                    "opis": "Moka z nizko vsebnostjo beljakovin",
                    "src": "Slike/mokaPKU.jpg",
                    "kolicina": 66,
                    "cena": 3.1,
                    "popust": 5
                },
                {
                    "id": 8,
                    "oznaka": "izdelek7",
                    "ime": "Nizkobeljakovinski špageti",
                    "opis": "Špageti z nizko vsebnostjo beljakovin",
                    "src": "Slike/spagetiPKU.jpg",
                    "kolicina": 39,
                    "cena": 3.4,
                    "popust": 10
                },
                {
                    "id": 9,
                    "oznaka": "izdelek8",
                    "ime": "Nizkobeljakovinski čips",
                    "opis": "Čips z nizko vsebnostjo beljakovin",
                    "src": "Slike/cipsPKU.jpg",
                    "kolicina": 22,
                    "cena": 1.7,
                    "popust": 5
                },
                {
                    "id": 10,
                    "oznaka": "izdelek9",
                    "ime": "Nizkobeljakovinski riž",
                    "opis": "Riž z nizko vsebnostjo beljakovin",
                    "src": "Slike/rizPKU.png",
                    "kolicina": 40,
                    "cena": 3.1,
                    "popust": 15
                }
            ]);
        });
};