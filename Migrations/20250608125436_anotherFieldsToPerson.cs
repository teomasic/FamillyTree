using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FamillyTree.Migrations
{
    /// <inheritdoc />
    public partial class anotherFieldsToPerson : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Cousins",
                table: "FamillyMembers",
                type: "TEXT",
                nullable: false,
                defaultValue: "[]");

            migrationBuilder.AddColumn<string>(
                name: "Dauthers",
                table: "FamillyMembers",
                type: "TEXT",
                nullable: false,
                defaultValue: "[]");

            migrationBuilder.AddColumn<string>(
                name: "Grandmas",
                table: "FamillyMembers",
                type: "TEXT",
                nullable: false,
                defaultValue: "[]");

            migrationBuilder.AddColumn<string>(
                name: "Grandpas",
                table: "FamillyMembers",
                type: "TEXT",
                nullable: false,
                defaultValue: "[]");

            migrationBuilder.AddColumn<string>(
                name: "Sons",
                table: "FamillyMembers",
                type: "TEXT",
                nullable: false,
                defaultValue: "[]");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Cousins",
                table: "FamillyMembers");

            migrationBuilder.DropColumn(
                name: "Dauthers",
                table: "FamillyMembers");

            migrationBuilder.DropColumn(
                name: "Grandmas",
                table: "FamillyMembers");

            migrationBuilder.DropColumn(
                name: "Grandpas",
                table: "FamillyMembers");

            migrationBuilder.DropColumn(
                name: "Sons",
                table: "FamillyMembers");
        }
    }
}
