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
        public int TestRunId { get; set; }
        public string RunCode { get; set; }
        public string Tags { get; set; }
        public string ReportPath { get; set; }
        public string TriggerType { get; set; }
        public DateTime StartedTime { get; set; }
        public DateTime FinishedTime { get; set; }
    }
}
