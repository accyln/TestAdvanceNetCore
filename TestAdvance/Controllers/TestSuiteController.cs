using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestAdvance.Business.Interfaces;
using TestAdvance.DataAccess.DataContexts;

namespace TestAdvance.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestSuiteController : ControllerBase
    {

        private readonly ILogger<TestSuiteController> _logger;
        private readonly ITestSuiteService _testSuiteService;

        public TestSuiteController(ITestSuiteService testSuiteService, ILogger<TestSuiteController> logger)
        {
            _logger = logger;
            _testSuiteService = testSuiteService;
        }


        [HttpGet]
        [Route("GetAllTestSuites")]
        public async Task<IActionResult> GetAllTestSuites()
        {

            var result = await _testSuiteService.GetAllAsync();

            return Ok(result);
        }

    }
}
