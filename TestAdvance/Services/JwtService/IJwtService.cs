using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestAdvance.Entities.Concrete;

namespace TestAdvance.Services.JwtService
{
    public interface IJwtService
    {
        public JwtToken GenerateJwt(AppUser appUser);
    }
}
