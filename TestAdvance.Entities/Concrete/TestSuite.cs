using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using TestAdvance.Entities.Abstract;

namespace TestAdvance.Entities.Concrete
{
    public class TestSuite: IEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string SuiteAdi { get; set; }
        public int ModulId { get; set; }
    }
}
