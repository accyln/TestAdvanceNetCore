using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using TestAdvance.Entities.Abstract;

namespace TestAdvance.Entities.Concrete
{
    [Table("TestRunDetails")]
    public class TestRunDetails:IEntity
    {
        [Key]
        public int Id { get; set; }
        public int TestRunId { get; set; }
        public int TestCaseId { get; set; }
        public int TestResultId { get; set; }
    }
}
