using FamillyTree.Data;
using FamillyTree.Models;

namespace FamillyTree.Services
{
    public class DbServices
    {
        private AppDbContext db;

        public DbServices(AppDbContext db)
        {
            this.db = db;
        }

        public IList<Person> GetPeople()
        {
            return db.FamillyMembers.ToList();
        }

        public async void AddPerson(Person person)
        {
            db.FamillyMembers.Add(person);
            await db.SaveChangesAsync();

        }

        public async void UpdatePerson(Person person)
        {
            var personToUpdate = db.FamillyMembers.FirstOrDefault(x => x.ID == person.ID);
            if(personToUpdate != null)
            {
                personToUpdate.Profession = person.Profession;
                personToUpdate.Name = person.Name;
                personToUpdate.Surname = person.Surname;
                personToUpdate.BirthPlace = person.BirthPlace;
                personToUpdate.Birthdate = person.Birthdate;
                personToUpdate.PlaceOfDeath = person.PlaceOfDeath;
                personToUpdate.DateOfDeath = person.DateOfDeath;

                personToUpdate.LifeEvents = person.LifeEvents;

                await db.SaveChangesAsync();
            }

        }
        public async Task<bool> DeletePerson(Guid id)
        {
            var result = false;
            var personToDelete = db.FamillyMembers.FirstOrDefault(x => x.ID == id);
            if(personToDelete != null)
            {
                db.FamillyMembers.Remove(personToDelete);
                var remove_result = await db.SaveChangesAsync();
                result = remove_result > 0 ? true : false; 
            }

            return result;
        }
    }
}
