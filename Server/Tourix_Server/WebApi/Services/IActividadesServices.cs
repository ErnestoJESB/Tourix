using Domain.DTO;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using static WebApi.Services.ActividadesServices;

namespace WebApi.Services
{
    public interface IActividadesServices
    {
        public Task<Response<List<Actividades>>> GetActividades();
        public Task<Response<ActividadDTO>> CrearActividad(ActividadDTO request);

    }
}
