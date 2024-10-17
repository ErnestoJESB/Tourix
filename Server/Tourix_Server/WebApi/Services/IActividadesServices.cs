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
        public Task<Response<Actividades>> GetByID(int id);
        public Task<Response<ActividadDTO>> ActualizarActividad(int id, ActividadDTO request);
        public Task<Response<bool>> EliminarActividad(int id);
        public Task<Response<List<Actividades>>> GetActividadesByAgencia(int id);

    }
}
