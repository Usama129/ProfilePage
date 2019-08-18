using Microsoft.EntityFrameworkCore.Migrations;

namespace dotnetProfile.Data.Migrations
{
    public partial class exp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Positions");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Positions",
                columns: table => new
                {
                    StartTime = table.Column<string>(nullable: false),
                    Detail = table.Column<string>(nullable: true),
                    EndTime = table.Column<string>(nullable: true),
                    Image = table.Column<string>(nullable: true),
                    Location = table.Column<string>(nullable: true),
                    Title = table.Column<string>(nullable: true),
                    Workplace = table.Column<string>(nullable: true),
                    userID = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Positions", x => x.StartTime);
                });
        }
    }
}
