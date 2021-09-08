using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class v1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Izvodjac",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    MestoRodjOsn = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    GodinaRodjOsn = table.Column<string>(type: "nvarchar(4)", maxLength: 4, nullable: true),
                    BrojAlbuma = table.Column<int>(type: "int", nullable: false),
                    BrojAlbumaUKolekciji = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Izvodjac", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Kolekcija",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    N = table.Column<int>(type: "int", nullable: false),
                    M = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kolekcija", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Vinil",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    IzdavackaKuca = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Cena = table.Column<int>(type: "int", nullable: false),
                    Tip = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    KolicinaNaStanju = table.Column<int>(type: "int", nullable: false),
                    X = table.Column<int>(type: "int", nullable: false),
                    Y = table.Column<int>(type: "int", nullable: false),
                    IzvodjacID = table.Column<int>(type: "int", nullable: false),
                    KolekcijaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vinil", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Vinil_Kolekcija_KolekcijaID",
                        column: x => x.KolekcijaID,
                        principalTable: "Kolekcija",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Vinil_KolekcijaID",
                table: "Vinil",
                column: "KolekcijaID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Izvodjac");

            migrationBuilder.DropTable(
                name: "Vinil");

            migrationBuilder.DropTable(
                name: "Kolekcija");
        }
    }
}
