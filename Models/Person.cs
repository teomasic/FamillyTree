using System.ComponentModel.DataAnnotations;

namespace FamillyTree.Models
{
    public class Person
    {
        private int _age;


        public Guid ID { get; set; }
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
        public string BirthPlace { get; set; } = String.Empty;

        public string LifeEvents { get; set; } = String.Empty;
        public string Profession { get; set; } = String.Empty;

        public DateTime DateOfDeath { get; set; }
        public string PlaceOfDeath { get; set; } = String.Empty;

        public int LocationX { get; set; }
        public int LocationY { get; set; }
    }
}
