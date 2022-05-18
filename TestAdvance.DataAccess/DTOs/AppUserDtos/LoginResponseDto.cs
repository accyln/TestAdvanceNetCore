using System;
using System.Collections.Generic;
using System.Text;

namespace TestAdvance.DataAccess.DTOs.AppUserDtos
{
    public class LoginResponseDto
    {
        public string Name { get; set; }
        public string SurName { get; set; }
        public string Token { get; set; }
    }
}
