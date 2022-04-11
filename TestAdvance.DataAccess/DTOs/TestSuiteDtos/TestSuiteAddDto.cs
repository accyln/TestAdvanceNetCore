using System;
using System.Collections.Generic;
using System.Text;

namespace TestAdvance.DataAccess.DTOs
{
    public class TestSuiteAddDto
    {
        public string SuiteAdi { get; set; }
        public int ModulId { get; set; }
        public int IsActive { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
    }
}
