using Domain.DTO;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Query.Internal;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class ActividadesController : ControllerBase
    {
        private readonly IActividadesServices _actividadesServices;
        public ActividadesController(IActividadesServices actividadesServices)
        {
            _actividadesServices = actividadesServices;
        }

        //Obtener Actividades
        [HttpGet]
        public async Task<IActionResult> GetActividades()
        {
            var response = await _actividadesServices.GetActividades();

            return Ok(response);
        }

        //Creacion de actividades
        [HttpPost]
        public async Task<IActionResult> CrearActividad([FromBody] ActividadDTO request)
        {
            var response = await _actividadesServices.CrearActividad(request);

            return Ok(response);
        }
    }
}
