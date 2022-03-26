using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;
using TestAdvance.Business.Concrete;
using TestAdvance.Business.Interfaces;
using TestAdvance.DataAccess.Concrete.Repository;
using TestAdvance.DataAccess.Interfaces;
using TestAdvance.DataAccess.Repository.Abstract;
using TestAdvance.DataAccess.Repository.Concrete;

namespace TestAdvance.Business.DiContainer
{
    public static class CustomExtensions
    {
        public static void AddContainerWithDependencies(this IServiceCollection services)
        {
            services.AddScoped(typeof(IGenericDal<>), typeof(EfGenericRepository<>));
            services.AddScoped(typeof(IGenericService<>), typeof(GenericManager<>));

            services.AddScoped<ITestCaseService, TestCaseManager>();
            services.AddScoped<ITestRunService, TestRunManager>();
            services.AddScoped<ITestSuiteService, TestSuiteManager>();
            services.AddScoped<IModulService, ModulManager>();
            services.AddScoped<ITestRunDetailService, TestRunDetailManager>();
            services.AddScoped<IAppUserService, AppUserManager>();


            services.AddScoped<ITestCaseDal, EfTestCaseRepository>();
            services.AddScoped<ITestRunDal, EfTestRunRepository>();
            services.AddScoped<ITestSuiteDal, EfTestSuiteRepository>();
            services.AddScoped<IModulDal, EfModulRepository>();
            services.AddScoped<IAppUserDal, EfAppUserRepository>();

            


        }
    }
}
