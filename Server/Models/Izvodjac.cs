using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    [Table("Izvodjac")]
    public class Izvodjac
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Ime")]
        [MaxLength(255)]
        public string Ime { get; set; }

        [Column("MestoRodjOsn")]
        [MaxLength(255)]
        public string MestoRodjOsn { get; set; }

        [Column("GodinaRodjOsn")]
        [MaxLength(4)]
        public string GodinaRodjOsn { get; set; }

        [Column("BrojAlbuma")]
        public int BrojAlbuma { get; set; }

        [Column("BrojAlbumaUKolekciji")]
        public int BrojAlbumaUKolekciji { get; set; }
    }  
}