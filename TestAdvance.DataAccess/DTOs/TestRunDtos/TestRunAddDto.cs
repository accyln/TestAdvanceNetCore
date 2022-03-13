using System;
using System.Collections.Generic;
using System.Text;

namespace TestAdvance.DataAccess.DTOs.TestRunDtos
{
    public class TestRunAddDto
    {
        public int TestCaseId { get; set; }
        public int TestResultId { get; set; }
        public string RunCode { get; set; }
    }
}
