using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestAdvance.Business.Concrete;
using TestAdvance.Business.Interfaces;
using TestAdvance.DataAccess.DataContexts;
using TestAdvance.DataAccess.DTOs;
using TestAdvance.DataAccess.DTOs.ModulDtos;
using TestAdvance.DataAccess.DTOs.TestCaseDtos;
using TestAdvance.DataAccess.DTOs.TestRunDtos;
using TestAdvance.DataAccess.Repository.Abstract;
using TestAdvance.DataAccess.Repository.Concrete;
using TestAdvance.Entities.Concrete;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestAdvance.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        public TestContext _context;
        public AdvanceContext _acontext;
        private readonly ILogger<HomeController> _logger;
        private readonly ITestCaseService _testCaseService;
        private readonly ITestRunService _testRunService;

        public HomeController(TestContext context, ITestRunService testRunService, ILogger<HomeController> logger)
        {
            _testRunService = testRunService;
            _context = context;
            _logger = logger;
        }
       

       



    }
}
