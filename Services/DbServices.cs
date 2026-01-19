using FamillyTree.Data;
using FamillyTree.Models;

namespace FamillyTree.Services
{
    public class DbServices
    {
        private AppDbContext db;
        private readonly ILogger<DbServices> logger;

        public DbServices(AppDbContext db, ILogger<DbServices> logger)
        {
            this.db = db;
            this.logger = logger;
        }

        public IList<Person> GetPeople()
        {
            var res = db.FamillyMembers.ToList();
            logger.LogInformation($"DB returned with '{res.Count}' people in a list");
            return res;
        }

        public async void AddPerson(Person person)
        {
            db.FamillyMembers.Add(person);
            try
            {
                await db.SaveChangesAsync();
                logger.LogInformation($"New person added '{person.Name} {person.Surname}' to DB. ");

            }
            catch (Exception ex)
            {
                logger.LogError($"Error at saving new person! || \n  {ex.Message}");
            }

        }

        public async Task UpdatePerson(Person person)
        {

            var personToUpdate = db.FamillyMembers.FirstOrDefault(x => x.ID == person.ID);
            if (personToUpdate != null)
            {
                try
                {
                    db.Entry(personToUpdate).CurrentValues.SetValues(person);
                    await db.SaveChangesAsync();
                    logger.LogInformation($"Person '{personToUpdate.Name} {personToUpdate.Surname}' coords updated successfully!");
                }
                catch (Exception ex)
                {
                    logger.LogError($"Error at updating person! || \n {ex.Message}");
                }
            }

        }
        public async Task<bool> DeletePerson(Guid id)
        {
            var result = false;
            var personToDelete = db.FamillyMembers.FirstOrDefault(x => x.ID == id);
            if (personToDelete != null)
            {
                try
                {
                    db.FamillyMembers.Remove(personToDelete);
                    var remove_result = await db.SaveChangesAsync();
                    logger.LogInformation($"Person '{personToDelete.Name} {personToDelete.Surname}' removed succesfully");
                    result = remove_result > 0 ? true : false;
                }
                catch (Exception ex)
                {
                    logger.LogError($"Error at deleting person! || {ex.Message}");
                    result = false;
                }
            }

            return result;
        }
    }
}
