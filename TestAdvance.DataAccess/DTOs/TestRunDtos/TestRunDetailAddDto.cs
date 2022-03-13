using System;
using System.Collections.Generic;
using System.Text;

namespace TestAdvance.DataAccess.DTOs.TestRunDtos
{
    public class TestRunDetailAddDto
    {
        public int TestRunId { get; set; }
        public string RunCode { get; set; }
        public string Tags { get; set; }
        public string ReportPath { get; set; }
        public string TriggerType { get; set; }
        public DateTime StartedTime { get; set; }
        public DateTime FinishedTime { get; set; }
    }
}
