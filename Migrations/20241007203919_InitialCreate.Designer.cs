﻿// <auto-generated />
using System;
using FamillyTree.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace FamillyTree.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20241007203919_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.8");

            modelBuilder.Entity("FamillyTree.Models.Person", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<int>("Age")
                        .HasColumnType("INTEGER");

                    b.Property<string>("BirthPlace")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Birthdate")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DateOfDeath")
                        .HasColumnType("TEXT");

                    b.Property<string>("LifeEvents")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("PlaceOfDeath")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Profession")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("ID");

                    b.ToTable("FamillyMembers");
                });
#pragma warning restore 612, 618
        }
    }
}
