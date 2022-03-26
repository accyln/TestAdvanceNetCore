using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestAdvance.Business.Interfaces;
using TestAdvance.DataAccess.DataContexts;
using TestAdvance.DataAccess.DTOs;
using TestAdvance.Entities.Concrete;

namespace TestAdvance.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestSuiteController : ControllerBase
    {

        private readonly ILogger<TestSuiteController> _logger;
        private readonly ITestSuiteService _testSuiteService;
        private readonly IMapper _mapper;

        public TestSuiteController(ITestSuiteService testSuiteService, ILogger<TestSuiteController> logger,IMapper mapper)
        {
            _logger = logger;
            _testSuiteService = testSuiteService;
            _mapper = mapper;
        }


        [HttpGet]
        [Route("GetAllTestSuites")]
        public async Task<IActionResult> GetAllTestSuites()
        {

            var result = await _testSuiteService.GetAllAsync();

            return Ok(result);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetModul(int id)
        {

            var result = await _testSuiteService.GetAllAsync(a => a.Id == id);

            return Ok(result);
        }

        [HttpPost]
        [Route("InsertTestSuite")]
        public async Task<IActionResult> InsertTestSuite(TestSuiteAddDto testSuiteDto)
        {
            try
            {

                await _testSuiteService.AddAsync(_mapper.Map<TestSuite>(testSuiteDto));


                return Created("",testSuiteDto);
            }
            catch (Exception ex)
            {
                throw ex;

            }

        }

    }
}
