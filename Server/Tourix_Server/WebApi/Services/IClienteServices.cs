using Domain.DTO;
using Domain.Entities;
namespace WebApi.Services
{
    public interface IClienteServices
    {
        public Task<Response<List<Cliente>>> GetClientes();

        public Task<Response<ClienteResponse>> CrearCliente(ClienteResponse request);
        public Task<Response<Cliente>> GetByID(int id);

        public Task<Response<ClienteDTO>> ActualizarCliente(int id, ClienteDTO request);

        public Task<Response<bool>> EliminarCliente(int id);
        public Task<Response<LoginCliente>> Login(LoginUser request);


    }
}
