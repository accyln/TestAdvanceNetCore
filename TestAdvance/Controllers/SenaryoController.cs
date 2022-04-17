using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestAdvance.DataAccess.DataContexts;
using TestAdvance.DataAccess.DTOs.SenaryoDtos;

namespace TestAdvance.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SenaryoController : ControllerBase
    {
        private readonly ILogger<SenaryoController> _logger;
        private readonly IMapper _mapper;
        private readonly AdvanceContext _advanceContext;

        public SenaryoController(ILogger<SenaryoController> logger, IMapper mapper, AdvanceContext advanceContext)
        {
            _logger = logger;
            _mapper = mapper;
            _advanceContext = advanceContext;
        }

        [HttpGet]
        [Route("GetAllSenaryoSteps")]
        public async Task<IActionResult> GetAllSenaryoSteps(int testCaseId)
        {

            var result = _advanceContext.SenaryoKeywords.ToList();

            return Ok(result);
        }

        [HttpGet]
        [Route("GetAvaliableKeywords")]
        public async Task<IActionResult> GetAvaliableKeywords(string HomeClass)
        {

            var result = _advanceContext.Keywords.Where(a => a.HomeClass.Equals(HomeClass));

            return Ok(result);
        }


        [HttpGet]
        [Route("GetCaseSenaryoSteps")]
        public async Task<IActionResult> GetCaseSenaryoSteps(int testCaseId)
        {

            var testCase = _advanceContext.TestCases.Where(a => a.Id == testCaseId).FirstOrDefault();
            var senaryo = _advanceContext.SenaryoKeywords.Where(a => a.SenaryoId == testCase.SenaryoId);

            return Ok(senaryo);
        }


        [HttpGet]
        [Route("DeleteSenaryo")]
        public async Task<IActionResult> DeleteSenaryo(int testCaseId)
        {

            var testCase = await _advanceContext.TestCases.FirstOrDefaultAsync(a => a.Id == testCaseId);
            var senaryo = await _advanceContext.SenaryoKeywords.Where(a => a.SenaryoId == testCase.SenaryoId).ToListAsync();
            if (senaryo != null)
            {
                foreach (var item in senaryo)
                {
                    _advanceContext.Remove(item);
                    _advanceContext.SaveChanges();
                }
            }

            return Ok(senaryo);
        }

        [HttpPost]
        [Route("AddSenaryoSteps")]
        public async Task<IActionResult> AddSenaryoSteps(SenaryoKeywordRlAddDto senaryoKeywordRlAddDto)
        {

            SenaryoKeywordRlDto senaryoKeyword = new SenaryoKeywordRlDto()
            {
                SenaryoId = senaryoKeywordRlAddDto.SenaryoId,
                KeywordId = senaryoKeywordRlAddDto.KeywordId,
                OrderId = senaryoKeywordRlAddDto.OrderId,
                CreatedDate = senaryoKeywordRlAddDto.CreatedDate,
                CreatedBy = senaryoKeywordRlAddDto.CreatedBy
            };



            _advanceContext.SenaryoKeywords.Add(senaryoKeyword);
            _advanceContext.SaveChanges();

            return Ok();
        }


        [HttpPost]
        [Route("AddSenaryoSteps")]
        public async Task<IActionResult> AddSenaryoSteps(List<SenaryoKeywordRlAddDto> senaryoKeywordRlAddDto)
        {
            foreach (var item in senaryoKeywordRlAddDto)
            {
                SenaryoKeywordRlDto senaryoKeyword = new SenaryoKeywordRlDto()
                {
                    SenaryoId = item.SenaryoId,
                    KeywordId = item.KeywordId,
                    OrderId = item.OrderId,
                    CreatedDate = item.CreatedDate,
                    CreatedBy = item.CreatedBy
                };



            _advanceContext.SenaryoKeywords.Add(senaryoKeyword);
            _advanceContext.SaveChanges();

        }

            return Ok();
        }





    }
}
