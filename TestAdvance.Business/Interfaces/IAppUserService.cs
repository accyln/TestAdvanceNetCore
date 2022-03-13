using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TestAdvance.DataAccess.DTOs.AppUserDtos;
using TestAdvance.Entities.Concrete;

namespace TestAdvance.Business.Interfaces
{
    public interface IAppUserService:IGenericService<AppUser>
    {
        Task<AppUser> CheckUserAsync(AppUserLoginDto appUserLoginDto);
        Task<AppUser> FindByNameAsync(string userName);
    }
}
