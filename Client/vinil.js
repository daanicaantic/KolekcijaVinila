export class Vinil{

    constructor(naziv, izvodjac, izdavackaKuca, cena, tip, x, y){
        this.naziv = naziv;
        this.izvodjac = izvodjac;
        this.izdavackaKuca = izdavackaKuca;
        this.cena = cena;
        this.tip = tip;
        this.kolicinaNaStanju = 0;
        this.x = x;
        this.y = y;
        this.miniKontejner = null;
    }

    bojaPolja(){
        if(!this.tip)
            return "#838882";
        else
            return this.tip;
    }

    crtajVinil(host){
        this.miniKontejner = document.createElement("div");
        this.miniKontejner.className = "vinil";
        this.miniKontejner.innerHTML = "Prazno";
        this.miniKontejner.style.backgroundColor = this.bojaPolja();
        host.appendChild(this.miniKontejner);
    }

    azurirajPolje(){
        this.miniKontejner.innerHTML = this.naziv
        + "<br />" + this.izvodjac.ime
        + "<br />Izdavačka kuća: " + this.izdavackaKuca
        + "<br />Cena: " + this.cena + " rsd"
        + "<br />Na stanju: " + this.kolicinaNaStanju;
    }

    azurirajVinil(naziv, kolicina, izdavackaKuca, cena, tip, x, y, izvodjac){
        this.naziv = naziv;
        this.kolicinaNaStanju = kolicina;
        this.izdavackaKuca = izdavackaKuca;
        this.cena = cena;
        this.tip = tip;
        this.x = x;
        this.y = y;
        this.izvodjac = izvodjac;

        if(naziv == "")
            this.miniKontejner.innerHTML = "Prazno"; //ovo je kod brisanja vinila, da bi ostalo "Prazno" na poziciji nakon brisanja
        else
            this.azurirajPolje();

        this.miniKontejner.style.backgroundColor = this.bojaPolja();

    }

    azurirajKolicinu(novaVr){
        this.kolicinaNaStanju = novaVr;

        this.azurirajPolje();
    }

    azurirajCenu(novaCena){
        this.cena = novaCena;

        this.azurirajPolje();
    }
}