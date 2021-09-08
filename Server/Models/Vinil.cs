using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Server.Models
{
    [Table("Vinil")]
    public class Vinil
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Naziv")]
        [MaxLength(255)]
        public string Naziv { get; set; }

        [Column("IzdavackaKuca")]
        [MaxLength(255)]
        public string IzdavackaKuca { get; set; }

        [Column("Cena")]
        public int Cena { get; set; }

        [Column("Tip")]
        [MaxLength(255)]
        public string Tip { get; set; }

        [Column("KolicinaNaStanju")]
        public int KolicinaNaStanju { get; set; }

        [Column("X")]
        public int X { get; set; }

        [Column("Y")]
        public int Y { get; set; }

        //Strani kljuc - ForeignKey
        [Column("IzvodjacID")]
        public int IzvodjacID { get; set; }

        //referenca na Kolekciju
        [JsonIgnore]
        public Kolekcija Kolekcija { get; set; }
    }
}