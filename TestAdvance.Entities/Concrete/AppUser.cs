using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using TestAdvance.Entities.Abstract;

namespace TestAdvance.Entities.Concrete
{
    [Table("AppUser")]
    public class AppUser:IEntity
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string SurName { get; set; }
    }
}
