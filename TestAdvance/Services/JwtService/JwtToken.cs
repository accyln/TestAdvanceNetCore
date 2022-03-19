using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestAdvance.Entities.Abstract;

namespace TestAdvance.Services.JwtService
{
    public class JwtToken:IToken
    {
            public string Token { get; set; }
        
    }
}
