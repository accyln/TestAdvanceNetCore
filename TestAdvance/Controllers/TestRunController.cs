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
using TestAdvance.DataAccess.DTOs.TestRunDtos;
using TestAdvance.Entities.Concrete;

namespace TestAdvance.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestRunController : AuthenticatedBaseController
    {
        private readonly ILogger<TestRunController> _logger;
        private readonly ITestRunService _testRunService;
        private readonly ITestRunDetailService _testRunDetailService;
        private readonly IMapper _mapper;
        AdvanceContext dbContext;

        public TestRunController(ITestRunService testRunService,ITestRunDetailService testRunDetailService, ILogger<TestRunController> logger,IMapper mapper, AdvanceContext dbContext)
        {
            _logger = logger;
            _testRunService = testRunService;
            _testRunDetailService = testRunDetailService;
            _mapper = mapper;
            this.dbContext = dbContext;
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

        [HttpPost]
        [Route("InsertTestRunDetail")]
        public async Task<IActionResult> InsertTestRunDetail(TestRunDetailAddDto testRunDetailAddDto)
        {
            try
            {

                await _testRunDetailService.AddAsync(_mapper.Map<TestRunDetail>(testRunDetailAddDto));


                return Created("",testRunDetailAddDto);

            }
            catch (Exception ex)
            {
                _logger.LogError("InsertTestRunDetail", ex);
                throw ex;

            }

        }

        [HttpGet]
        [Route("GetTestResults")]
        public async Task<IActionResult> GetTestResults()
        {
            try
            {

                var result= dbContext.TestResults.ToList();

            return Ok(result);

            }
              catch (Exception ex)
            {
                _logger.LogError("GetTestResults", ex);
                throw ex;

            }
}

        [HttpGet]
        [Route("GetTestResultDashboard")]
        public async Task<IActionResult> GetTestResultDashboard()
        {
            try
            {

                var result = dbContext.TestResultDashboard.ToList();

            return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError("GetTestResultDashboard", ex);
                throw ex;

            }
        }

        [HttpGet]
        [Route("GetTestResultGunlukDashboard")]
        public async Task<IActionResult> GetTestResultGunlukDashboard(DateTime testRunDate)
        {
            try
            {
                var result = dbContext.TestResultDashboard.Where(a=>a.TestRunDate==testRunDate).FirstOrDefault();

            return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError("GetTestResultGunlukDashboard", ex);
                throw ex;

            }
        }
    }
}
