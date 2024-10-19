using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FamillyTree.Migrations
{
    /// <inheritdoc />
    public partial class PersonWithLocationCoordinates : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LocationX",
                table: "FamillyMembers",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "LocationY",
                table: "FamillyMembers",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LocationX",
                table: "FamillyMembers");

            migrationBuilder.DropColumn(
                name: "LocationY",
                table: "FamillyMembers");
        }
    }
}
