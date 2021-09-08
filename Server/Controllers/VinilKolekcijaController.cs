using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VinilKolekcijaController : ControllerBase
    {
        public VinilKolekcijaContext Context { get; set; }

        public VinilKolekcijaController(VinilKolekcijaContext context)
        {
            Context = context;
        }

        //READ kolekcija
        [Route("PreuzimanjeKolekcije")]
        [HttpGet]
        public async Task<List<Kolekcija>> PreuzimanjeKolekcije()
        {
            return await Context.Kolekcije.Include(k => k.Vinili).ToListAsync();
        }

        //READ vinil
        [Route("PreuzimanjeVinila")]
        [HttpGet]
        public async Task<List<Vinil>> PreuzimanjeVinila()
        {
            return await Context.Vinili.ToListAsync();
        }

        //READ izvodjac
        [Route("PreuzimanjeIzvodjaca")]
        [HttpGet]
        public async Task<List<Izvodjac>> PreuzimanjeIzvodjaca()
        {
            return await Context.Izvodjaci.ToListAsync();
        }

        //CREATE kolakcija
        [Route("DodavanjeKolekcije")]
        [HttpPost]
        public async Task DodavanjeKolekcije([FromBody] Kolekcija kol)
        {
            Context.Kolekcije.Add(kol);
            await Context.SaveChangesAsync();
        }

        //CREATE vinil
        [Route("DodavanjeVinila/{idKolekcije}")]
        [HttpPost]
        public async Task<IActionResult> DodavanjeVinila(int idKolekcije, [FromBody] Vinil vin)
        {
            var kol = await Context.Kolekcije.FindAsync(idKolekcije);
            var izv = await Context.Izvodjaci.FindAsync(vin.IzvodjacID);
            var filtiranjeVinila = Context.Vinili.Where(vinil => vinil.Kolekcija.ID == idKolekcije);
            //prvo moramo naci odredjenu kolekciju da bismo samo nad njom radili dodavanje, ostale kolekcije tako nisu u opticaju!

            vin.Kolekcija = kol;

            //hocu da proverim samo ukoliko se pozicija i Naziv i Izvodjac ne poklapaju, ostalo moze
            if(filtiranjeVinila.Any(t => t.Naziv == vin.Naziv && t.IzvodjacID == vin.IzvodjacID && (t.X != vin.X || t.Y != vin.Y)))
            {
                var poz = Context.Vinili.Where(i => i.IzvodjacID == vin.IzvodjacID).FirstOrDefault();
                return BadRequest(new {X = poz?.X, Y = poz?.Y});
            }

            var tr = Context.Vinili.Where(v => v.X == vin.X && v.Y == vin.Y && v.Kolekcija.ID == idKolekcije).FirstOrDefault();
        
            if(tr != null)
            {
                if(tr.KolicinaNaStanju != vin.KolicinaNaStanju)
                    return StatusCode(409);
                else
                    return StatusCode(406);
            }
            else
            {
                izv.BrojAlbumaUKolekciji++;
                Context.Vinili.Add(vin);
                await Context.SaveChangesAsync();
                return Ok();
            }
        }

        //CREATE izvodjac
        [Route("DodavanjeIzvodjaca")]
        [HttpPost]
        public async Task DodavanjeIzvodjaca([FromBody] Izvodjac izv)
        {
            Context.Izvodjaci.Add(izv);
            await Context.SaveChangesAsync();
        }

        //UPDATE vinil
        [Route("AzuriranjeKolicine/{idKolekcije}")]
        [HttpPut]
        public async Task AzuriranjeKolicine(int idKolekcije, [FromBody] Vinil vin)
        {
            var tr = Context.Vinili.Where(v => v.X == vin.X && v.Y == vin.Y && v.Kolekcija.ID == idKolekcije).FirstOrDefault();
            tr.KolicinaNaStanju = vin.KolicinaNaStanju;

            Context.Update<Vinil>(tr);
            await Context.SaveChangesAsync();
        }

        //UPDATE vinil
        [Route("AzuriranjeCene/{idKolekcije}")]
        [HttpPut]
        public async Task AzuriranjeCene(int idKolekcije, [FromBody] Vinil vin)
        {
            var tr = Context.Vinili.Where(v => v.X == vin.X && v.Y == vin.Y && v.Kolekcija.ID == idKolekcije).FirstOrDefault();
            tr.Cena = vin.Cena;

            Context.Update<Vinil>(tr);
            await Context.SaveChangesAsync();
        }

        //DELETE kolekcija
        [Route("BrisanjeKolekcije/{idKolekcije}")]
        [HttpDelete]
        public async Task BrisanjeKolekcije(int idKolekcije)
        {
            var kol = await Context.Kolekcije.FindAsync(idKolekcije);
            Context.Remove(kol);
            await Context.SaveChangesAsync();
        }

        //DELETE vinil
        [Route("BrisanjeVinila/{idKolekcije}")]
        [HttpDelete]
        public async Task<IActionResult> BrisanjeVinila(int idKolekcije, [FromBody] Vinil vin)
        {
            var tr = Context.Vinili.Where(v => v.X == vin.X && v.Y == vin.Y && v.Kolekcija.ID == idKolekcije).FirstOrDefault();
            var izv = await Context.Izvodjaci.FindAsync(vin.IzvodjacID);

            if(tr != null)
            {
                izv.BrojAlbumaUKolekciji--;
                Context.Remove<Vinil>(tr);
                await Context.SaveChangesAsync();
                return Ok();
            }
            else
                return StatusCode(406);
        }

        //DELETE izvodjac
        [Route("BrisanjeIzvodjaca/{idIzvodjaca}")]
        [HttpDelete]
        public async Task BrisanjeIzvodjaca(int idIzvodjaca)
        {
            var izv = await Context.Izvodjaci.FindAsync(idIzvodjaca);
            Context.Remove(izv);
            await Context.SaveChangesAsync();
        }
    }
}
