using Microsoft.EntityFrameworkCore;

namespace Server.Models
{
    public class VinilKolekcijaContext : DbContext
    {
        public DbSet<Kolekcija> Kolekcije { get; set; }
        public DbSet<Vinil> Vinili { get; set; }
        public DbSet<Izvodjac> Izvodjaci { get; set; }
    
        public VinilKolekcijaContext(DbContextOptions options) : base(options)
        {

        }
    }
}