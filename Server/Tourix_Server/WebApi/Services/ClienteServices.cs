using Dapper;
using Domain.DTO;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Data;
using WebApi.Context;

namespace WebApi.Services
{
    public class ClienteServices : IClienteServices
    {
        private readonly ApplicationDBContext _context;
        public ClienteServices(ApplicationDBContext context)
        {
            _context = context;
        }

        //Obtencion de todos los clientes
        public async Task<Response<List<Cliente>>> GetClientes()
        {
            try
            {
                List<Cliente> response = await _context.Clientes.ToListAsync();

                return new Response<List<Cliente>>(response);
            }
            catch (Exception ex)
            {
                throw new Exception("Sucedio un error catastrofico" + ex.Message);
            }
        }
        //crear cliente
        public async Task<Response<ClienteResponse>> CrearCliente(ClienteResponse request)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Nombre", request.Nombre, DbType.String);
                parameters.Add("@Apellido", request.Apellido, DbType.String);
                parameters.Add("@Email", request.Email, DbType.String);
                parameters.Add("@Password", request.Password, DbType.String);
                parameters.Add("@Telefono", request.Telefono, DbType.String);
                parameters.Add("@Resultado", dbType: DbType.String, size: 250, direction: ParameterDirection.Output);

                using (var connection = _context.Database.GetDbConnection())
                {
                    await connection.ExecuteAsync("spRegisterCliente", parameters, commandType: CommandType.StoredProcedure);
                    var resultado = parameters.Get<string>("@Resultado");

                    if (resultado.StartsWith("Error"))
                    {
                        return new Response<ClienteResponse>(null, resultado);
                    }

                    return new Response<ClienteResponse>(request, "Cliente registrado exitosamente.");
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Sucedió un error macabro: " + ex.Message);
            }
        }

        //Get cliente by id
        public async Task<Response<Cliente>> GetByID(int id)
        {
            try
            {
                Cliente response = await _context.Clientes.FirstOrDefaultAsync(x => x.ClienteID == id);

                if (response == null)
                {
                    return new Response<Cliente>(null, "Cliente no encontrado.");
                }

                return new Response<Cliente>(response);
            }
            catch (Exception ex)
            {
                throw new Exception("Sucedio un error catastrofico" + ex.Message);
            }
        }

        //Actualizar cliente con spUpdateCliente
        public async Task<Response<ClienteDTO>> ActualizarCliente(int id, ClienteDTO request)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@ClienteID", id, DbType.Int32);
                parameters.Add("@Nombre", request.Nombre, DbType.String);
                parameters.Add("@Apellido", request.Apellido, DbType.String);
                parameters.Add("@Email", request.Email, DbType.String);
                parameters.Add("@Password", request.Password, DbType.String);
                parameters.Add("@Telefono", request.Telefono, DbType.String);
                parameters.Add("@Resultado", dbType: DbType.String, size: 250, direction: ParameterDirection.Output);

                using (var connection = _context.Database.GetDbConnection())
                {
                    await connection.ExecuteAsync("spUpdateCliente", parameters, commandType: CommandType.StoredProcedure);
                    var resultado = parameters.Get<string>("@Resultado");

                    if (resultado.StartsWith("Error"))
                    {
                        return new Response<ClienteDTO>(null, resultado);
                    }

                    return new Response<ClienteDTO>(request, "Cliente actualizado exitosamente.");
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Sucedió un error macabro: " + ex.Message);
            }
        }

        //Eliminar cliente con spDeleteCliente
        public async Task<Response<bool>> EliminarCliente(int id)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@ClienteID", id, DbType.Int32);
                parameters.Add("@Resultado", dbType: DbType.String, size: 250, direction: ParameterDirection.Output);

                using (var connection = _context.Database.GetDbConnection())
                {
                    await connection.ExecuteAsync("spDeleteCliente", parameters, commandType: CommandType.StoredProcedure);
                    var resultado = parameters.Get<string>("@Resultado");

                    if (resultado.StartsWith("Error"))
                    {
                        return new Response<bool>(false, resultado);
                    }

                    return new Response<bool>(true, "Cliente eliminado exitosamente.");
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Sucedió un error macabro: " + ex.Message);
            }
        }
        //login cliente con spLoginCliente
        public async Task<Response<LoginCliente>> Login(LoginUser request)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@EmailInput", request.email, DbType.String);
                parameters.Add("@Password", request.password, DbType.String);
                parameters.Add("@Resultado", dbType: DbType.Boolean, size: 250, direction: ParameterDirection.Output);
                parameters.Add("@ID", dbType: DbType.Int32, direction: ParameterDirection.Output);
                parameters.Add("@Nombre", dbType: DbType.String, size: 250, direction: ParameterDirection.Output);
                parameters.Add("@EmailOutput", dbType: DbType.String, size: 250, direction: ParameterDirection.Output);

                using (var connection = _context.Database.GetDbConnection())
                {
                    await connection.ExecuteAsync("spLoginClientes", parameters, commandType: CommandType.StoredProcedure);
                    var resultado = parameters.Get<bool>("@Resultado");
                    
                    if (!resultado)
                    {
                        return new Response<LoginCliente>(null, "Credenciales incorrectas.");
                    }

                    return new Response<LoginCliente>(new LoginCliente
                    {
                        ID = parameters.Get<int>("@ID"),
                        Nombre = parameters.Get<string>("@Nombre"),
                        Email = parameters.Get<string>("@EmailOutput"),
                        Resultado = parameters.Get<bool>("@Resultado")
                    });
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Sucedió un error macabro: " + ex.Message);
            }
        }
    }
}
