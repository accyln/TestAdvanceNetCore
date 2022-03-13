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

        // GET: api/<HomeController>
        [HttpGet]
        [Route("GetAllTestCases")]
        public async Task<IActionResult> GetAllTestCases()
        {

            var result= _testCaseService.GetAllAsync(a => a.Id != 0);

            return Ok(result);
        }

        // GET api/<HomeController>/5
        [HttpGet]
        [Route("GetTestCase")]
        public async Task<IActionResult> GetTestCase(int id)
        {
            var result = _testCaseService.GetAllAsync(a => a.Id == id);

            return Ok(result);
        }

        // POST api/<HomeController>
        [HttpPost]
        [Route("InsertTestCase")]
        public async Task<IActionResult> InsertTestCase(TestCaseAddDto testCaseDto)
        {
            try
            {
                TestCase testCase = new TestCase()
                {
                    TestCaseAdi = testCaseDto.TestCaseAdi,
                    SuiteId = testCaseDto.SuiteId,
                    SenaryoId = testCaseDto.SenaryoId,
                    CreatedDate = testCaseDto.CreatedDate,
                    CreatedBy = testCaseDto.CreatedBy,
                    IsActive= testCaseDto.IsActive
                };


                _context.TestCases.Add(testCase);
                _context.SaveChanges();

                return Ok(StatusCode(200));

            } catch(Exception ex)
            {
                throw ex;
                
            }
            
        }


        [HttpPost]
        [Route("InsertTestRun")]
        public async Task<IActionResult> InsertTestRun(TestRunAddDto testRunAddDto)
        {
            try
            {
                TestRun testRun = new TestRun()
                {
                    TestCaseId= testRunAddDto.TestCaseId,
                    TestResultId= testRunAddDto.TestResultId,
                    RunCode = testRunAddDto.RunCode
                    
                };


                _context.TestRuns.Add(testRun);
                _context.SaveChanges();

                return Ok(StatusCode(200));

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
                TestRunDetail testRunDetail = new TestRunDetail()
                {
                    TestRunId=testRunDetailAddDto.TestRunId,
                    RunCode = testRunDetailAddDto.RunCode,
                    Tags = testRunDetailAddDto.Tags,
                    StartedTime = testRunDetailAddDto.StartedTime,
                    FinishedTime = testRunDetailAddDto.FinishedTime,
                    TriggerType = testRunDetailAddDto.TriggerType,
                    ReportPath = testRunDetailAddDto.ReportPath
                };


                _context.TestRunDetails.Add(testRunDetail);
                _context.SaveChanges();

                return Ok(StatusCode(200));

            }
            catch (Exception ex)
            {
                throw ex;

            }

        }

        [HttpPost]
        [Route("InsertTestSuite")]
        public async Task<IActionResult> InsertTestSuite(TestSuiteAddDto testSuiteDto)
        {
            try
            {

                TestSuite suite = new TestSuite()
                {
                    ModulId= testSuiteDto.ModulId,
                    SuiteAdi= testSuiteDto.SuiteAdi
                };

                _context.TestSuites.Add(suite);
                _context.SaveChanges();
                return Ok(StatusCode(200));
            }
            catch (Exception ex)
            {
                throw ex;

            }

        }

        [HttpPost]
        [Route("InsertModul")]
        public async Task<IActionResult> InsertModul(ModulAddDto modulDto)
        {
            try
            {
                Modul modul = new Modul()
                {
                    Email = modulDto.Email,
                    ModulAdi = modulDto.ModulAdi,
                    SorumluPersonel = modulDto.SorumluPersonel
                };

                _context.Moduls.Add(modul);
                _context.SaveChanges();
                return Ok(StatusCode(200));
            }
            catch (Exception ex)
            {
                _logger.LogError("Modül insert işleminde hata alındı");
                throw ex;

            }

        }

        [HttpGet]
        [Route("GetAllRunResults")]
        public async Task<IActionResult> GetAllRunResults()
        {
            

            var result = _testRunService.GetAllAsync(x => x.Id > 0);


            return Ok(result);
        }

        [HttpGet]
        [Route("GetAllSuites")]
        public async Task<IActionResult> GetAllSuites()
        {
            var result = _context.TestSuites.ToList();

            return Ok(result);
        }

        [HttpGet]
        [Route("GetAllModuls")]
        public async Task<IActionResult> GetAllModuls()
        {
            var result = _context.Moduls.ToList();

            return Ok(result);
        }


    }
}
