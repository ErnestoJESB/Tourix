using Domain.DTO;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClientesController : ControllerBase
    {
        private readonly IClienteServices _clienteServices;
        public ClientesController(IClienteServices clienteServices)
        {
            _clienteServices = clienteServices;
        }
        //Obtener todos los clientes
        [HttpGet]
        public async Task<IActionResult> GetClientes()
        {
            var response = await _clienteServices.GetClientes();

            return Ok(response);
        }
        //Obtener cliente x id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var response = await _clienteServices.GetByID(id);
            return Ok(response);
        }

        //Creacion del cliente
        [HttpPost]
        public async Task<IActionResult> Crear([FromBody] ClienteResponse request)
        {
            var response = await _clienteServices.CrearCliente(request);

            return Ok(response);
        }

        //Actualizacion del cliente
        [HttpPut("{id}")]
        public async Task<IActionResult> ActualizarCliente(int id, [FromBody] ClienteDTO request)
        {
            var response = await _clienteServices.ActualizarCliente(id, request);
            if (!response.Success)
            {
                return NotFound(response.Message);
            }
            return Ok(response);
        }

        //Eliminacion del cliente
        [HttpDelete("{id}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            var response = await _clienteServices.EliminarCliente(id);
            if (!response.Success)
            {
                return NotFound(response.Message);
            }
            return Ok(response);
        }

        //Login del cliente
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUser request)
        {
            var response = await _clienteServices.Login(request);
            if (!response.Success)
            {
                return NotFound(response.Message);
            }
            return Ok(response);
        }
    }
}
