using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using TestAdvance.Entities.Abstract;

namespace TestAdvance.Entities.Concrete
{
    [Table("TestRun")]
    public class TestRun:IEntity
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int TestCaseId { get; set; }
        public int TestResultId { get; set; }
        public string RunCode { get; set; }
    }
}
