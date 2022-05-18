﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestAdvance.Business.Interfaces;
using TestAdvance.DataAccess.DTOs.AppUserDtos;
using TestAdvance.Services.JwtService;

namespace TestAdvance.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAppUserService _appUserService;
        private readonly IJwtService _jwtService;
        public AuthController(IAppUserService appUserService, IJwtService jwtService)
        {
            _appUserService = appUserService;
            _jwtService = jwtService;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> SignIn(AppUserLoginDto appUserLoginDto)
        {
            
            var user = await _appUserService.CheckUserAsync(appUserLoginDto);
            if (user != null)
            {
                LoginResponseDto loginResponse = new LoginResponseDto()
                {
                    Name = user.Name,
                    SurName = user.SurName,
                    Token = _jwtService.GenerateJwt(user).Token
                };

                return Created("", loginResponse);
            }
            return BadRequest("Kullanıcı adı veya şifre hatalı");

        }

        [HttpGet("[action]")]
        public async Task<IActionResult> ActiveUser()
        {
            var user = await _appUserService.FindByNameAsync(User.Identity.Name);

            return Ok(new AppUserDto { Id = user.Id, Name = user.Name, SurName = user.SurName });
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetToken()
        {
            AppUserLoginDto userDto = new AppUserLoginDto() { UserName = "Admin", Password = "admin" };
            var user = await _appUserService.CheckUserAsync(userDto);
            if (user != null)
            {
                return Created("", "Bearer " + _jwtService.GenerateJwt(user).Token);
            }
            return BadRequest("Kullanıcı adı veya şifre hatalı");
        }
    }
}
