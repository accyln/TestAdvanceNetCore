using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestAdvance.DataAccess.DataContexts;
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
        private readonly ILogger<HomeController> _logger;

        public HomeController(TestContext context, ILogger<HomeController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/<HomeController>
        [HttpGet]
        [Route("GetAllTestCases")]
        public async Task<IActionResult> GetAllTestCases()
        {
            var result = _context.TestCases.ToList();

            EfRepositoryBase<TestCase> efRepository = new EfRepositoryBase<TestCase>(_context);
            var result2=efRepository.GetFromQuery(a=>a.Id!=0);

            return Ok(result2);
        }

        // GET api/<HomeController>/5
        [HttpGet]
        [Route("GetTestCase")]
        public async Task<IActionResult> GetTestCase(int id)
        {
            var result=_context.TestCases.Where(a=>a.Id==id).ToList();

            return Ok(result);
        }

        // POST api/<HomeController>
        [HttpPost]
        [Route("InsertTestCase")]
        public async Task<IActionResult> InsertTestCase(TestCase testCase)
        {
            try
            {
                _context.TestCases.Add(testCase);
                _context.SaveChanges();
                return Ok(StatusCode(200));
            } catch(Exception ex)
            {
                throw ex;
                
            }
            
        }

        [HttpPost]
        [Route("InsertTestSuite")]
        public async Task<IActionResult> InsertTestSuite(TestSuite testSuite)
        {
            try
            {
                _context.TestSuites.Add(testSuite);
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
        public async Task<IActionResult> InsertModul(Modul modul)
        {
            try
            {
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
            var result = _context.TestRuns.ToList();

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
