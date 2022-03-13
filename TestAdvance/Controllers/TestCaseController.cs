using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestAdvance.Business.Interfaces;
using TestAdvance.DataAccess.DTOs.TestCaseDtos;
using TestAdvance.Entities.Concrete;

namespace TestAdvance.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestCaseController : ControllerBase
    {
        private readonly ILogger<TestCaseController> _logger;
        private readonly ITestCaseService _testCaseService;
        private readonly IMapper _mapper;

        public TestCaseController(ITestCaseService testCaseService, ILogger<TestCaseController> logger,IMapper mapper)
        {
            _logger = logger;
            _testCaseService = testCaseService;
            _mapper = mapper;
        }


        [HttpGet]
        [Route("GetAllTestCases")]
        public async Task<IActionResult> GetAllTestCases()
        {

            var result = await _testCaseService.GetAllAsync();

            return Ok(result);
        }

        [HttpGet]
        [Route("GetTestCase")]
        public async Task<IActionResult> GetTestCase(int id)
        {
            var result = _testCaseService.GetAllAsync(a => a.Id == id);

            return Ok(result);
        }

        [HttpPost]
        [Route("InsertTestCase")]
        public async Task<IActionResult> InsertTestCase(TestCaseAddDto testCaseDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {

                await _testCaseService.AddAsync(_mapper.Map<TestCase>(testCaseDto));

                return Created("", testCaseDto);

            }
            catch (Exception ex)
            {
                throw ex;

            }

        }
    }
}
