using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace TestAdvance.DataAccess.DTOs.TestCaseDtos
{  
    public class TestCaseDetailModelDto
    {
       
        public int Id { get; set; }
        public int TestCaseId { get; set; }
        public string TestCaseAdi { get; set; }
        public int IsActive { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public int? KeywordId { get; set; }
        public int? OrderId { get; set; }
        public string? Name { get; set; }
        public string? HomeClass { get; set; }
        public string? TypeClass { get; set; }
    }
}
