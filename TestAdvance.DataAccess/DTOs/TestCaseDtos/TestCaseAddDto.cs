using System;
using System.Collections.Generic;
using System.Text;

namespace TestAdvance.DataAccess.DTOs.TestCaseDtos
{
    public class TestCaseAddDto
    {
        public string TestCaseAdi { get; set; }
        public int SuiteId { get; set; }
        public int SenaryoId { get; set; }
        public int IsActive { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
    }
}
