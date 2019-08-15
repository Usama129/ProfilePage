using Microsoft.EntityFrameworkCore.Migrations;

namespace dotnetProfile.Data.Migrations
{
    public partial class @new : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "userProfiles",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "userProfiles",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "userProfiles");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "userProfiles");
        }
    }
}
