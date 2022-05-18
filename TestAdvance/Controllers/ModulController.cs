﻿using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestAdvance.Business.Interfaces;
using TestAdvance.CustomFilters;
using TestAdvance.DataAccess.DTOs.ModulDtos;
using TestAdvance.Entities.Concrete;

namespace TestAdvance.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ModulController : AuthenticatedBaseController
    {
            private readonly ILogger<ModulController> _logger;
            private readonly IModulService _modulService;
            private readonly IMapper _mapper;

        public ModulController(IModulService modulService, ILogger<ModulController> logger,IMapper mapper)
            {
                _logger = logger;
                _modulService = modulService;
                _mapper = mapper;
            }


            [HttpGet]
            [Route("GetAllModules")]
            public async Task<IActionResult> GetAllModules()
            {

                var result = await _modulService.GetAllAsync();

                return Ok(result);
            }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetModul(int id)
        {

            var result = await _modulService.GetAllAsync(a=>a.Id==id);

            return Ok(result);
        }

        [HttpPost("[action]")]
        [ValidModel]
        public async Task<IActionResult> AddModul(ModulAddDto modulAddDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            await _modulService.AddAsync(_mapper.Map<Modul>(modulAddDto));
            return Created("", modulAddDto);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> UpdateModul(Modul modul)
        {
            await _modulService.UpdateAsync(modul);
            return Ok(modul);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> DeleteModul(int modulId)
        {
            var modul = _modulService.GetAllAsync(a => a.Id == modulId).Result.FirstOrDefault();

            await _modulService.RemoveAsync(modul);

            return Ok(modul);
        }
    }
}
