using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using TestAdvance.Entities.Abstract;

namespace TestAdvance.Entities.Concrete
{
    [Table("Modul")]
    public class Modul:IEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string ModulAdi { get; set; }
        public string Email { get; set; }
        public string SorumluPersonel { get; set; }
        List<TestSuite> suites { get; set; }

    }
}
