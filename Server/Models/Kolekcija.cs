using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    [Table("Kolekcija")]
    public class Kolekcija
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Naziv")]
        [MaxLength(255)]
        public string Naziv { get; set; }

        [Column("N")]
        public int N { get; set; }
        
        [Column("M")]
        public int M { get; set; }

        //lista Vinila
        public virtual List<Vinil> Vinili { get; set; }
    }
}