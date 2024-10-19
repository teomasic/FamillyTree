using FamillyTree.Models;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace FamillyTree.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> opt) : base(opt)
        {
            
        }
        public DbSet<Person> FamillyMembers { get; set; }


        // Dispose pattern.
        public override void Dispose()
        {
            Debug.WriteLine($"{ContextId} context disposed.");
            base.Dispose();
        }

        // Dispose pattern.
        public override ValueTask DisposeAsync()
        {
            Debug.WriteLine($"{ContextId} context disposed async.");
            return base.DisposeAsync();
        }
    }



}
