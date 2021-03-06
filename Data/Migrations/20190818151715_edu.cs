﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace dotnetProfile.Data.Migrations
{
    public partial class edu : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Positions",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "Positions");
        }
    }
}
