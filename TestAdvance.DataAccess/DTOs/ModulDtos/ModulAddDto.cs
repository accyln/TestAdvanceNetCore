using System;
using System.Collections.Generic;
using System.Text;
using TestAdvance.Entities.Concrete;

namespace TestAdvance.DataAccess.DTOs.ModulDtos
{
    public class ModulAddDto
    {
        public string ModulAdi { get; set; }
        public string Email { get; set; }
        public string SorumluPersonel { get; set; }
    }
}
