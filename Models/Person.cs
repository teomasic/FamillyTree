using System.ComponentModel.DataAnnotations;

namespace FamillyTree.Models
{
    public class Person
    {
        private int _age;


        public Guid ID { get; set; }

        [Required]
        [MinLength(2, ErrorMessage = "Name can not be empty")]
        public string Name { get; set; } = string.Empty;

        [Required(AllowEmptyStrings = false, ErrorMessage = "Surname can not be empty")]
        public string Surname { get; set; } = string.Empty;
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

        public Guid Mother { get; set; }
        public Guid Father { get; set; }
        public List<Guid> BrothersAndSisters { get; set; } = new List<Guid>();
        public Guid Wife { get; set; }
        public Guid Husband { get; set; }
        public List<Guid> Sons { get; set; }
        public List<Guid> Dauthers { get; set; }
        public List<Guid> Cousins { get; set; } = new List<Guid>();
        public List<Guid> Grandmas { get; set; } = new List<Guid>();
        public List<Guid> Grandpas { get; set; } = new List<Guid>();

    }
}
