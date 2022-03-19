using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestAdvance.Business.Interfaces;
using TestAdvance.DataAccess.DTOs.TestRunDtos;
using TestAdvance.Entities.Concrete;

namespace TestAdvance.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestRunController : ControllerBase
    {
        private readonly ILogger<TestRunController> _logger;
        private readonly ITestRunService _testRunService;
        private readonly IMapper _mapper;

        public TestRunController(ITestRunService testRunService, ILogger<TestRunController> logger,IMapper mapper)
        {
            _logger = logger;
            _testRunService = testRunService;
            _mapper = mapper;
        }


        [HttpGet]
        [Route("GetAllTestRuns")]
        public async Task<IActionResult> GetAllTestRuns()
        {

            var result = await _testRunService.GetAllAsync();

            return Ok(result);
        }

        [HttpPost]
        [Route("InsertTestRun")]
        public async Task<IActionResult> InsertTestRun(TestRunAddDto testRunAddDto)
        {
            try
            {

                await _testRunService.AddAsync(_mapper.Map<TestRun>(testRunAddDto));


                return Created("",testRunAddDto);

            }
            catch (Exception ex)
            {
                throw ex;

            }

        }

        //[HttpPost]
        //[Route("InsertTestRunDetail")]
        //public async Task<IActionResult> InsertTestRunDetail(TestRunDetailAddDto testRunDetailAddDto)
        //{
        //    try
        //    {
        //        TestRunDetail testRunDetail = new TestRunDetail()
        //        {
        //            TestRunId = testRunDetailAddDto.TestRunId,
        //            RunCode = testRunDetailAddDto.RunCode,
        //            Tags = testRunDetailAddDto.Tags,
        //            StartedTime = testRunDetailAddDto.StartedTime,
        //            FinishedTime = testRunDetailAddDto.FinishedTime,
        //            TriggerType = testRunDetailAddDto.TriggerType,
        //            ReportPath = testRunDetailAddDto.ReportPath
        //        };


        //        _context.TestRunDetails.Add(testRunDetail);
        //        _context.SaveChanges();

        //        return Ok(StatusCode(200));

        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;

        //    }

        //}
    }
}
