using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestAdvance.DataAccess.DTOs;
using TestAdvance.DataAccess.DTOs.AppUserDtos;
using TestAdvance.DataAccess.DTOs.ModulDtos;
using TestAdvance.DataAccess.DTOs.TestCaseDtos;
using TestAdvance.DataAccess.DTOs.TestRunDtos;
using TestAdvance.Entities.Concrete;

namespace TestAdvance.Mapping.AutoMapperProfile
{
    public class MapProfile:Profile
    {
        public MapProfile()
        {
            CreateMap<ModulAddDto, Modul>();
            CreateMap<Modul, ModulAddDto>();

            CreateMap<TestCaseAddDto, TestCase>();
            CreateMap<TestCase, TestCaseAddDto>();

            CreateMap<TestSuiteAddDto, TestSuite>();
            CreateMap<TestSuite, TestSuiteAddDto>();

            CreateMap<TestRunAddDto, TestRun>();
            CreateMap<TestRun, TestRunAddDto>();

            CreateMap<AppUserLoginDto, AppUser>();
            CreateMap<AppUser, AppUserLoginDto>();
        }



    }
}
