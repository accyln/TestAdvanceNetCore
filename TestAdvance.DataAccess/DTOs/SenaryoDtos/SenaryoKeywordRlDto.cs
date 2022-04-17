using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace TestAdvance.DataAccess.DTOs.SenaryoDtos
{
    [Table("Senaryo_Keyword_rl")]
    public class SenaryoKeywordRlDto
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int SenaryoId { get; set; }
        public int OrderId { get; set; }
        public int KeywordId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string? CreatedBy { get; set; }
    }
}
