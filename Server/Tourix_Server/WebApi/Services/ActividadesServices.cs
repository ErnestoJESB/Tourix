using Dapper;
using Domain.DTO;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Data;
using WebApi.Context;

namespace WebApi.Services
{
    public class ActividadesServices : IActividadesServices
    {
        private readonly ApplicationDBContext _context;

        public ActividadesServices(ApplicationDBContext context)
        {
            _context = context;
        }

        //obtencion de actividades
        public async Task<Response<List<Actividades>>> GetActividades()
        {
            try
            {
                List<Actividades> response = await _context.Actividades
                    .Select(a => new Actividades
                    {
                        ActividadID = a.ActividadID,
                        AgenciaID = a.AgenciaID,
                        NombreActividad = a.NombreActividad,
                        Descripcion = a.Descripcion,
                        Precio = a.Precio,
                        Duracion = a.Duracion,
                        Direccion = a.Direccion,
                        Latitud = (float)a.Latitud,  // Conversión explícita de double a float
                        Longitud = (float)a.Longitud,  // Conversión explícita de double a float
                        FechaCreacion = a.FechaCreacion
                    })
                    .ToListAsync();

                return new Response<List<Actividades>>(response);
            }
            catch (Exception ex)
            {
                throw new Exception("Sucedio un error catastrofico: " + ex.Message);
            }
        }

        public async Task<Response<ActividadDTO>> CrearActividad(ActividadDTO request)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@AgenciaID", request.AgenciaID, DbType.Int32);
                parameters.Add("@Nombre", request.NombreActividad, DbType.String);
                parameters.Add("@Descripcion", request.Descripcion, DbType.String);
                parameters.Add("@Precio", request.Precio, DbType.Decimal);
                parameters.Add("@Duracion", request.Duracion, DbType.Int32);
                parameters.Add("@Direccion", request.Direccion, DbType.String);
                parameters.Add("@Latitud", request.Latitud, DbType.Double);
                parameters.Add("@Longitud", request.Longitud, DbType.Double);

                using (var connection = _context.Database.GetDbConnection())
                {
                    await connection.ExecuteAsync("spCreateActividad", parameters, commandType: CommandType.StoredProcedure);            

                    return new Response<ActividadDTO>(request, "Actividad registrada exitosamente.");
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Sucedió un error macabro: " + ex.Message);
            }
        }

        public async Task<Response<Actividades>> GetByID(int id)
        {
            try
            {
                Actividades res = await _context.Actividades.FirstOrDefaultAsync(x => x.ActividadID == id);

                return new Response<Actividades>(res);
            }
            catch (Exception ex)
            {

                throw new Exception("Ocurrio un error" + ex.Message);
            }
        }
        //Actualizacion de actividad con spUpdateActividad
        public async Task<Response<ActividadDTO>> ActualizarActividad(int id, ActividadDTO request)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@ActividadID", id, DbType.Int32);
                parameters.Add("@Nombre", request.NombreActividad, DbType.String);
                parameters.Add("@Descripcion", request.Descripcion, DbType.String);
                parameters.Add("@Precio", request.Precio, DbType.Decimal);
                parameters.Add("@Duracion", request.Duracion, DbType.Int32);
                parameters.Add("@Direccion", request.Direccion, DbType.String);
                parameters.Add("@Latitud", request.Latitud, DbType.Double);
                parameters.Add("@Longitud", request.Longitud, DbType.Double);

                using (var connection = _context.Database.GetDbConnection())
                {
                    await connection.ExecuteAsync("spUpdateActividad", parameters, commandType: CommandType.StoredProcedure);

                    return new Response<ActividadDTO>(request, "Actividad actualizada exitosamente.");
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Sucedió un error macabro: " + ex.Message);
            }
        }
        //Eliminacion de actividad con spDeleteActividad
        public async Task<Response<bool>> EliminarActividad(int id)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@ActividadID", id, DbType.Int32);

                using (var connection = _context.Database.GetDbConnection())
                {
                    await connection.ExecuteAsync("spDeleteActividad", parameters, commandType: CommandType.StoredProcedure);

                    return new Response<bool>(true, "Actividad eliminada exitosamente.");
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Sucedió un error macabro: " + ex.Message);
            }
        }
        //get actividades by agencia con [spGetActividadesByAgencia]
        public async Task<Response<List<Actividades>>> GetActividadesByAgencia(int id)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@AgenciaID", id, DbType.Int32);

                using (var connection = _context.Database.GetDbConnection())
                {
                    var res = await connection.QueryAsync<Actividades>("spGetActividadesByAgencia", parameters, commandType: CommandType.StoredProcedure);

                    return new Response<List<Actividades>>(res.ToList());
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Sucedió un error macabro: " + ex.Message);
            }
        }

    }
}
