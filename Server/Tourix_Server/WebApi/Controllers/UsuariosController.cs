using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly IUsuarioServices _usuarioServices;
        public UsuariosController(IUsuarioServices usuarioServices) 
        {

            _usuarioServices = usuarioServices;
        }
        //Obtener todos los usuarios
        [HttpGet]
        public async Task<IActionResult> GetUsuarios()
        {
            var response = await _usuarioServices.GetUsuarios();

            return Ok(response);
        }
        //Obtener usuario x id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var response = await _usuarioServices.GetByID(id);
            return Ok(response);
        }
        
        //Creacion del usuario
        [HttpPost]
        public async Task<IActionResult> Crear([FromBody] UsuariosResponse request)
        {
            var response = await _usuarioServices.CrearUsuario(request);

            return Ok(response);
        }

        //Actualizacion del usuario
        [HttpPut("{id}")]
        public async Task<IActionResult> Actualizar(int id, [FromBody] UsuariosResponse request)
        {
            var response = await _usuarioServices.ActualizarUsuario(id, request);
            if (!response.Success)
            {
                return NotFound(response.Message);
            }
            return Ok(response);
        }

        //Eliminacion del usuario
        [HttpDelete("{id}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            var response = await _usuarioServices.EliminarUsuario(id);
            if (!response.Success)
            {
                return NotFound(response.Message);
            }
            return Ok(response);
        }

        //[HttpPost("login")]
        //public async Task<IActionResult> Login(LoginUser request)
        //{
        //    var response = await _usuarioServices.LoginUser(request);

        //    if (!response.Success)
        //    {
        //        return BadRequest(response);
        //    }

        //    return Ok(response);
        //}


    }
}
