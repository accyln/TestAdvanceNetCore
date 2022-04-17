using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace TestAdvance.Entities.Concrete
{
    [Table("Keyword")]
    public class Keyword
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string HomeClass { get; set; }
        public string TypeClass { get; set; }
        public string Type { get; set; }
        public string SubType { get; set; }
        public int? ParameterCount { get; set; }
    }
}
