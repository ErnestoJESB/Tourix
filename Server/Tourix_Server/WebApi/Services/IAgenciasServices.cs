using Domain.DTO;
using Domain.Entities;

namespace WebApi.Services
{
    public interface IAgenciasServices
    {
        public Task<Response<AgenciasResponseDTO>> Login(LoginUser login);
        public Task<Response<AgenciasResponseDTO>> Register(AgenciaCreateDTO agencia);
    }
}
