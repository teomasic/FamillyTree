using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FamillyTree.Models
{
    public class Person
    {
        private int _age;


        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; }
        public string Surname { get; set; }
        public int Age
        {
            get
            {
                return _age;
            }
            private set
            {
                _age = DateTime.Now.Year - Birthdate.Year;
            }
        }

        [DataType(DataType.Date)]
        public DateTime Birthdate { get; set; }
        public string BirthPlace { get; set; }

        public string LifeEvents { get; set; }
        public string Profession { get; set; }

        public DateTime DateOfDeath { get; set; }
        public string PlaceOfDeath { get; set; }
    }
}
