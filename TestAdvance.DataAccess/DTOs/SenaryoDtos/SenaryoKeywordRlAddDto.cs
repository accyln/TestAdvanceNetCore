using System;
using System.Collections.Generic;
using System.Text;

namespace TestAdvance.DataAccess.DTOs.SenaryoDtos
{
    public class SenaryoKeywordRlAddDto
    {
        public int SenaryoId { get; set; }
        public int OrderId { get; set; }
        public int KeywordId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string? CreatedBy { get; set; }
    }
}
