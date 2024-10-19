using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FamillyTree.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FamillyMembers",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Surname = table.Column<string>(type: "TEXT", nullable: false),
                    Age = table.Column<int>(type: "INTEGER", nullable: false),
                    Birthdate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    BirthPlace = table.Column<string>(type: "TEXT", nullable: false),
                    LifeEvents = table.Column<string>(type: "TEXT", nullable: false),
                    Profession = table.Column<string>(type: "TEXT", nullable: false),
                    DateOfDeath = table.Column<DateTime>(type: "TEXT", nullable: false),
                    PlaceOfDeath = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FamillyMembers", x => x.ID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FamillyMembers");
        }
    }
}
