﻿using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AgenciasController : Controller
    {
        public readonly IAgenciasServices _administradoresServices;

        public AgenciasController(IAgenciasServices administradoresServices)
        {
            _administradoresServices = administradoresServices;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUser login)
        {
            var response = await _administradoresServices.Login(login);
            return Ok(response);
        }
    }
}
