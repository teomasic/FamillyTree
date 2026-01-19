using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FamillyTree.Migrations
{
    /// <inheritdoc />
    public partial class newfieldtoperson : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BrothersAndSisters",
                table: "FamillyMembers",
                type: "TEXT",
                nullable: false,
                defaultValue: "[]");

            migrationBuilder.AddColumn<Guid>(
                name: "Father",
                table: "FamillyMembers",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "Husband",
                table: "FamillyMembers",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "Mother",
                table: "FamillyMembers",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "Wife",
                table: "FamillyMembers",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BrothersAndSisters",
                table: "FamillyMembers");

            migrationBuilder.DropColumn(
                name: "Father",
                table: "FamillyMembers");

            migrationBuilder.DropColumn(
                name: "Husband",
                table: "FamillyMembers");

            migrationBuilder.DropColumn(
                name: "Mother",
                table: "FamillyMembers");

            migrationBuilder.DropColumn(
                name: "Wife",
                table: "FamillyMembers");
        }
    }
}
