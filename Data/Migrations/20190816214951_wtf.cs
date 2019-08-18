using Microsoft.EntityFrameworkCore.Migrations;

namespace dotnetProfile.Data.Migrations
{
    public partial class wtf : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
               name: "Positions",
               columns: table => new
               {
                   userID = table.Column<string>(nullable: false),
                   Title = table.Column<string>(nullable: true),
                   Workplace = table.Column<string>(nullable: true),
                   StartTime = table.Column<string>(nullable: true),
                   EndTime = table.Column<string>(nullable: true),
                   Detail = table.Column<string>(nullable: true),
                   Image = table.Column<string>(nullable: true)
               });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
