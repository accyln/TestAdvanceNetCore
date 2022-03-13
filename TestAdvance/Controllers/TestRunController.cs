using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestAdvance.Business.Interfaces;

namespace TestAdvance.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestRunController : ControllerBase
    {
        private readonly ILogger<TestRunController> _logger;
        private readonly ITestRunService _testRunService;

        public TestRunController(ITestRunService testRunService, ILogger<TestRunController> logger)
        {
            _logger = logger;
            _testRunService = testRunService;
        }


        [HttpGet]
        [Route("GetAllTestCases")]
        public async Task<IActionResult> GetAllTestCases()
        {

            var result = await _testRunService.GetAllAsync();

            return Ok(result);
        }
    }
}
