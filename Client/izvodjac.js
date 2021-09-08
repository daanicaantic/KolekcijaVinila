export class Izvodjac{
    
    constructor(id, ime, mestoRodjOsn, godinaRodjOsn, brojAlbuma){
        this.id = id;
        this.ime = ime;
        this.mestoRodjOsn = mestoRodjOsn;
        this.godinaRodjOsn = godinaRodjOsn;
        this.brojAlbuma = brojAlbuma;
        this.brojAlbumaUKolekciji = 0; //broj Albuma koji su prikazani u Kolekcijama
    }

    azurirajAlbume(unos){
        if(unos == 1)
            this.brojAlbumaUKolekciji++;
            //kod dodavanja albuma
        else
            this.brojAlbumaUKolekciji--;
            //kod brisanja albuma
    }
}