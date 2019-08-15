using Microsoft.EntityFrameworkCore.Migrations;

namespace dotnetProfile.Data.Migrations
{
    public partial class herewego : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "userProfiles",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Specialty",
                table: "userProfiles",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Location",
                table: "userProfiles");

            migrationBuilder.DropColumn(
                name: "Specialty",
                table: "userProfiles");
        }
    }
}
