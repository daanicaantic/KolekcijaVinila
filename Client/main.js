import { Izvodjac } from "./izvodjac.js";
import { Kolekcija } from "./kolekcija.js";

//const kolekcija1 = new Kolekcija(1, "RECORD STORE", 5, 5);
//kolekcija1.crtajKolekciju(document.body);

fetch("https://localhost:5001/VinilKolekcija/PreuzimanjeKolekcije").then(p => {
    p.json().then(data => {
        data.forEach(kolekcija => {
            const kolek = new Kolekcija(kolekcija.id, kolekcija.naziv, kolekcija.n, kolekcija.m);
            kolek.crtajKolekciju(document.body);

            kolekcija.vinili.forEach(vinil => {
                fetch("https://localhost:5001/VinilKolekcija/PreuzimanjeIzvodjaca").then(p => {
                    p.json().then(data => {
                        data.forEach(izv => {
                            if(izv.id == vinil.izvodjacID){
                                const izvodjac = new Izvodjac(izv.id, izv.ime, izv.mestoRodjOsn, izv.godinaRodjOsn, izv.brojAlbuma);
                                kolek.listaVinila[vinil.x * kolek.m + vinil.y].azurirajVinil(vinil.naziv, vinil.kolicinaNaStanju, vinil.izdavackaKuca, vinil.cena, vinil.tip, vinil.x, vinil.y, izvodjac)
                            }
                        });
                    });
                });
            });
        });
    });
});