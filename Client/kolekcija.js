import { Vinil } from "./vinil.js";
import { Izvodjac } from "./izvodjac.js";

export class Kolekcija{

    constructor(id, naziv, n, m) {
        this.id = id;
        this.naziv = naziv;
        this.n = n;
        this.m = m;
        this.listaVinila = [];
        this.listaIzvodjaca = [];
        this.kontejner = null;
    }

    dodajVinil(vinil){
        this.listaVinila.push(vinil);
    }

    dodajIzvodjaca(izvodjac){
        this.listaIzvodjaca.push(izvodjac);
    }

    crtajKolekciju(host){
        if(!host)
            throw new Error("Host nije definisan!");

        const kont = document.createElement("div");
        host.appendChild(kont);

        const naslov = document.createElement("h3");
        naslov.innerHTML = this.naziv;
        kont.appendChild(naslov);

        this.kontejner = document.createElement("div");
        this.kontejner.classList.add("kontejner");
        kont.appendChild(this.kontejner);

        this.crtajFormu(this.kontejner);
        this.crtajVinil(this.kontejner);
    }

    crtajFormu(host){
        const kontejnerForme = document.createElement("div");
        kontejnerForme.className = "kontejnerForme";
        host.appendChild(kontejnerForme);

        var labela = document.createElement("h4");
        labela.innerHTML = "DODAVANJE VINILA";
        kontejnerForme.appendChild(labela);

        labela = document.createElement("label");
        labela.innerHTML = "Naziv albuma: ";
        kontejnerForme.appendChild(labela);

        let element = document.createElement("input");
        element.className = "nazivAlbuma";
        kontejnerForme.appendChild(element);

        labela = document.createElement("label");
        labela.innerHTML = "Cena: ";
        kontejnerForme.appendChild(labela);

        element = document.createElement("input");
        element.type = "number";
        element.className = "cena";
        kontejnerForme.appendChild(element);

        labela = document.createElement("label");
        labela.innerHTML = "Količina na stanju: ";
        kontejnerForme.appendChild(labela);

        element = document.createElement("input");
        element.type = "number";
        element.className = "kolicina";
        kontejnerForme.appendChild(element);

        labela = document.createElement("label");
        labela.innerHTML = "Izdavačka kuća: ";
        kontejnerForme.appendChild(labela);

        element = document.createElement("input");
        element.className = "izdavackaKuca";
        kontejnerForme.appendChild(element);

        labela = document.createElement("label");
        labela.innerHTML = "Tip: ";
        kontejnerForme.appendChild(labela);

        let tipovi = ["hip-hop", "reggae", "pop", "electronic", "rock&roll"];
        let boje = ["#d0c7f1", "#a2e8b1", "#e3c0b9", "#f3f4a6", "#a7cfc4"];
        
        let radio = null;
        let opcija = null;
        let radioDiv = null;

        tipovi.forEach((tip, index) => {
            radioDiv = document.createElement("div");
            radioDiv.className = "radioButton";
            radio = document.createElement("input");
            radio.type = "radio";
            radio.name = this.naziv;
            radio.value = boje[index];

            opcija = document.createElement("label");
            opcija.innerHTML = tip;

            radioDiv.appendChild(radio);
            radioDiv.appendChild(opcija);
            kontejnerForme.appendChild(radioDiv);
        });

        let izvodjacDiv = document.createElement("div");
        let izvodjacSelect = document.createElement("select");
        izvodjacDiv.className = "izvodjacDiv";
        labela = document.createElement("label");
        labela.innerHTML = "Izvođač: ";
        
        izvodjacDiv.appendChild(labela);
        izvodjacDiv.appendChild(izvodjacSelect); //na div element postavljamo labelu i select element

        let izvodjac = null; //ovo ce biti vrednost za svaku opciju - prva ce biti null

        izvodjac = document.createElement("option");
        izvodjac.innerHTML = "";
        izvodjac.value = null;
        izvodjacSelect.appendChild(izvodjac); //na select element postavljamo sve opcije (izvodjace)

        //fetch prikaz (READ - HttpGet) svih izvodjaca za select element ***!
        fetch("https://localhost:5001/VinilKolekcija/PreuzimanjeIzvodjaca").then(p => {
            p.json().then(data => {
                data.forEach(i => {
                    const izv = new Izvodjac(i.id, i.ime, i.mestoRodjOsn, i.godinaRodjOsn, i.brojAlbuma);
                    this.dodajIzvodjaca(izv);
                    izvodjac = document.createElement("option");
                    izvodjac.innerHTML = izv.ime;
                    izvodjac.value = izv.ime;
                    izvodjacSelect.appendChild(izvodjac);
                })
            })
        })

        kontejnerForme.appendChild(izvodjacDiv);

        const dugmeInfoIzvodjac = document.createElement("button");
        dugmeInfoIzvodjac.className = "button1";
        dugmeInfoIzvodjac.innerHTML = "Podaci o izvođaču";
        kontejnerForme.appendChild(dugmeInfoIzvodjac);

        //READ IZVODJAC
        dugmeInfoIzvodjac.onclick = (ev) => {

            //fetch preuzimanje (READ - HttpGet) jednog izvodjaca za alert klikom na dugme ***!
            fetch("https://localhost:5001/VinilKolekcija/PreuzimanjeIzvodjaca").then(p => {
                p.json().then(data => {
                    data.forEach(izvodjac => {
                        console.log(izvodjac);
                        if(izvodjac.ime == izvodjacSelect.value)
                        {
                            let trenutni = "Izvodjac: " + `${izvodjac.ime}` +
                                "\nMesto rođenja/osnivanja: " + `${izvodjac.mestoRodjOsn}` +
                                "\nGodina rođenja/osnivanja: " + `${izvodjac.godinaRodjOsn}` +
                                "\nBroj albuma: " + `${izvodjac.brojAlbuma}` +
                                "\nBroj albuma u kolekcijama: " + `${izvodjac.brojAlbumaUKolekciji}`;
                            alert(trenutni);
                        }
                    });
                });
            });
        }

        labela = document.createElement("label");
        labela.innerHTML = "Pozicija vinila:";
        kontejnerForme.appendChild(labela);

        //vrsta vinila
        let pozicijaDiv = document.createElement("div");
        let vrsta = document.createElement("select");
        labela = document.createElement("label");
        labela.innerHTML = "Vrsta: ";
        pozicijaDiv.appendChild(labela);
        pozicijaDiv.appendChild(vrsta);

        let x = null;
        for(let i = 0; i < this.n; i++) {
            x = document.createElement("option");
            x.innerHTML = i+1;
            x.value = i;
            vrsta.appendChild(x);
        }
        kontejnerForme.appendChild(pozicijaDiv);

        //kolona vinila
        pozicijaDiv = document.createElement("div");
        let kolona = document.createElement("select");
        labela = document.createElement("label");
        labela.innerHTML = "Kolona: ";
        pozicijaDiv.appendChild(labela);
        pozicijaDiv.appendChild(kolona);

        let y = null;
        for(let i = 0; i < this.m; i++) {
            y = document.createElement("option");
            y.innerHTML = i+1;
            y.value = i;
            kolona.appendChild(y);
        }
        kontejnerForme.appendChild(pozicijaDiv);
    
        const dugmeDodajVinil = document.createElement("button");
        dugmeDodajVinil.className = "button2";
        dugmeDodajVinil.innerHTML = "Dodaj vinil";
        kontejnerForme.appendChild(dugmeDodajVinil);

        //CREATE VINIL
        dugmeDodajVinil.onclick = (ev) => {
            const naziv = this.kontejner.querySelector(".nazivAlbuma").value;
            const kolicina = parseInt(this.kontejner.querySelector(".kolicina").value);
            const izdavackaKuca = this.kontejner.querySelector(".izdavackaKuca").value;
            const cena = parseInt(this.kontejner.querySelector(".cena").value);
            const tipAlbuma = this.kontejner.querySelector(`input[name='${this.naziv}']:checked`); //hvata radio button koji je selektovan
            const izvodjacIzabrani = izvodjacSelect.value;
            let izvodjac = this.listaIzvodjaca.find(i => i.ime == izvodjacIzabrani);

            console.log(tipAlbuma);

            //validacija unosa
            if(naziv == ""){
                alert("Niste uneli naziv albuma!");
            }
            else if(isNaN(cena)){
                alert("Niste uneli cenu!");
            }
            else if(isNaN(kolicina)){
                alert("Niste uneli količinu vinila na stanju!");
            }
            else if(izdavackaKuca == ""){
                alert("Niste uneli izdavačku kuću!");
            }
            else if(tipAlbuma == null){
                alert("Niste izabrali tip!");
            }
            else if(izvodjac == null){
                alert("Niste izabrali izvođača!");
            }
            else{
                let i = parseInt(vrsta.value);
                let j = parseInt(kolona.value);

                //fetch dodavanje (CREATE - HttpPost) jednog vinila na poziciju ***!
                fetch("https://localhost:5001/VinilKolekcija/DodavanjeVinila/" + this.id, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        //naziv, izvodjac, izdavackaKuca, cena, tip, x, y
                        naziv: naziv,
                        izdavackaKuca: izdavackaKuca,
                        cena: cena,
                        kolicina: kolicina,
                        tip: tipAlbuma.value,
                        x: i,
                        y: j,
                        izvodjacID: izvodjac.id
                    })
                }).then(p => {
                    if(p.ok){
                        this.listaVinila[i * this.m + j].azurirajVinil(naziv, kolicina, izdavackaKuca, cena, tipAlbuma.value, i, j, izvodjac);
                        izvodjac.azurirajAlbume(1); //zove funkciju izvodjaca
                    }
                    else if(p.status == 400){
                        /*const postojeci = { x: 0, y: 0};
                        p.json().then(q => {
                            postojeci.x = q.x;
                            postojeci.y = q.y;
                            alert("Ovaj vinil se nalazi u kolekciji. Pozicija (" + (postojeci.x + 1) + ", " + (postojeci.y + 1) + ")");
                        });*/
                        alert("Ovaj vinil se nalazi u kolekciji.");
                    }
                    else if(p.status == 409){
                        alert("Za promenu količine/cene vinila, klik na dugme \"Promeni količinu/Promeni cenu\".");
                    }
                    else{
                        alert("Greška prilikom dodavanja vinila.");
                    }
                });
            }
        }

        const dugmeIzmeniKolicinuVinil = document.createElement("button");
        dugmeIzmeniKolicinuVinil.className = "button3";
        dugmeIzmeniKolicinuVinil.innerHTML = "Promeni količinu";
        kontejnerForme.appendChild(dugmeIzmeniKolicinuVinil);

        //UPDATE VINIL
        dugmeIzmeniKolicinuVinil.onclick = (ev) => {
            const kolicina = parseInt(this.kontejner.querySelector(".kolicina").value); 
            
            let i = parseInt(vrsta.value);
            let j = parseInt(kolona.value);
            
            //fetch azuriranje (UPDATE - HttpPut) kolicine jednog vinila na odredjenoj poziciji ***!
            fetch("https://localhost:5001/VinilKolekcija/AzuriranjeKolicine/" + this.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "kolicinaNaStanju": kolicina,
                    "x": i,
                    "y": j
                })
            }).then(p => {
                if(p.ok){
                    this.listaVinila[i * this.m + j].azurirajKolicinu(kolicina);
                }
                else{
                    alert("Greška prilikom ažuriranja količine vinila.");
                }
            });
        }

        const dugmeIzmeniCenuVinil = document.createElement("button");
        dugmeIzmeniCenuVinil.className = "button4";
        dugmeIzmeniCenuVinil.innerHTML = "Promeni cenu";
        kontejnerForme.appendChild(dugmeIzmeniCenuVinil);

        dugmeIzmeniCenuVinil.onclick = (ev) => {
            const cena = parseInt(this.kontejner.querySelector(".cena").value); 
            
            let i = parseInt(vrsta.value);
            let j = parseInt(kolona.value);
            
            //fetch azuriranje (UPDATE - HttpPut) cene jednog vinila na odredjenoj poziciji ***!
            fetch("https://localhost:5001/VinilKolekcija/AzuriranjeCene/" + this.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "cena": cena,
                    "x": i,
                    "y": j
                })
            }).then(p => {
                if(p.ok){
                    this.listaVinila[i * this.m + j].azurirajCenu(cena);
                }
                else{
                    alert("Greška prilikom ažuriranja cene vinila.");
                }
            });
        }

        const dugmeObrisiVinil = document.createElement("button");
        dugmeObrisiVinil.className = "button5";
        dugmeObrisiVinil.innerHTML = "Obriši vinil";
        kontejnerForme.appendChild(dugmeObrisiVinil);

        //DELETE VINIL
        dugmeObrisiVinil.onclick = (ev) => {
            let i = parseInt(vrsta.value);
            let j = parseInt(kolona.value);

            console.log(i);
            console.log(j);

            let trenutni = this.listaVinila.find(vinil => vinil.x == i && vinil.y == j);

            //fetch brisanje (DELETE - HttpDelete) jednog vinila sa odredjene pozicije ***!
            fetch("https://localhost:5001/VinilKolekcija/BrisanjeVinila/" + this.id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "x": i,
                    "y": j,
                    "izvodjacID": trenutni.izvodjac.id,
                    "id": trenutni.id
                })
            }).then(p => {
                if(p.ok){
                    this.listaVinila[i * this.m + j].azurirajVinil("", 0, "", 0, "", i, j, null);
                    this.listaVinila[i * this.m + j].izvodjac.azurirajAlbume(0); //zove funkciju izvodjaca
                }
                else if(p.status == 406){
                    alert("Neispravna pozicija vinila.");
                }
                else{
                    alert("Greška prilikom brisanja vinila.");
                }
            });
        }
    }

    crtajVinil(host){
        const kontejnerVinila = document.createElement("div");
        kontejnerVinila.className = "kontejnerVinila";
        host.appendChild(kontejnerVinila);

        let vrsta;
        let vin;

        for(let i = 0; i < this.n; i++){
            vrsta = document.createElement("div");
            vrsta.className = "vrsta";
            kontejnerVinila.appendChild(vrsta);

            for(let j = 0; j < this.m; j++){
                vin = new Vinil("", "", "", 0, "", i, j);
                this.dodajVinil(vin);
                vin.crtajVinil(vrsta);
            }
        }
    }
}