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
using TestAdvance.DataAccess.DTOs.TestCaseDtos;
using TestAdvance.Entities.Concrete;

namespace TestAdvance.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestCaseController : AuthenticatedBaseController
    {
        private readonly ILogger<TestCaseController> _logger;
        private readonly ITestCaseService _testCaseService;
        private readonly IMapper _mapper;
        private readonly AdvanceContext _advanceContext;

        public TestCaseController(ITestCaseService testCaseService, ILogger<TestCaseController> logger,IMapper mapper,AdvanceContext advanceContext)
        {
            _logger = logger;
            _testCaseService = testCaseService;
            _mapper = mapper;
            _advanceContext = advanceContext;
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
            var result =await _testCaseService.GetAllAsync(a => a.Id == id);

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

        [HttpGet]
        [Route("GetTestCaseDetails")]
        public async Task<IActionResult> GetTestCaseDetails(int testCaseId)
        {
            List<TestCaseDetailModelDto> testCaseDetailModelDto = new List<TestCaseDetailModelDto>();
            testCaseDetailModelDto =  _advanceContext.TestCaseDetails.Where(a=>a.TestCaseId==testCaseId).OrderBy(a=>a.OrderId).ToList();

            return Ok(testCaseDetailModelDto);
        }

        [HttpPost]
        [Route("UpdateTestCase")]
        public async Task<IActionResult> UpdateTestCase(TestCase testCase)
        {
            try
            {
                
                var testCase1 = _testCaseService.GetAllAsync(a => a.Id == testCase.Id).Result.FirstOrDefault();

                if (testCase1 != null)
                {
                    TestCase tcase= new TestCase()
                    {
                        Id = testCase1.Id,
                        SuiteId = testCase.SuiteId,
                        TestCaseAdi = testCase.TestCaseAdi,
                        SenaryoId = testCase1.SenaryoId,
                        IsActive = testCase1.IsActive,
                        CreatedDate = testCase1.CreatedDate,
                        CreatedBy = testCase1.CreatedBy
                    };

                    await _testCaseService.UpdateAsync(tcase);

                    return Ok(tcase);

                }
                else
                {
                    return Conflict();
                }


            }
            catch (Exception ex)
            {
                throw ex;

            }

        }

        [HttpPost]
        [Route("DeleteTestCase")]
        public async Task<IActionResult> DeleteTestCase(int testCaseId)
        {
            try
            {
                var tcase = _testCaseService.GetAllAsync(a => a.Id == testCaseId).Result.FirstOrDefault();

                if (tcase != null)
                {

                    await _testCaseService.RemoveAsync(tcase);

                    return Ok(tcase);

                }
                else
                {
                    return Conflict();
                }


            }
            catch (Exception ex)
            {
                throw ex;

            }

        }

    }
}
