using Dapper;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Data;
using WebApi.Context;

namespace WebApi.Services
{
    public class UsuarioServices : IUsuarioServices
    {
        private readonly ApplicationDBContext _context;

        public UsuarioServices(ApplicationDBContext context)
        {
            _context = context;
        }
        //Obtencion de todos los usuarios
            public async Task<Response<List<Usuario>>> GetUsuarios()
            {
                try
                {
                    List<Usuario> response = await _context.Usuarios.Include(y => y.Roles).ToListAsync();

                    return new Response<List<Usuario>>(response);   
                }
                catch (Exception ex) 
                {
                    throw new Exception("Sucedio un error catastrofico"+ex.Message);
                }
            }
        //Crear usuario
        public async Task<Response<UsuariosResponse>> CrearUsuario(UsuariosResponse request)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@nombre", request.nombre, DbType.String);
                parameters.Add("@correo", request.correo, DbType.String);
                parameters.Add("@password", request.password, DbType.String);
                parameters.Add("@telefono", request.telefono, DbType.String);
                parameters.Add("@rol_id", request.rol_id, DbType.Int32);
                parameters.Add("@resultado", dbType: DbType.String, size: 250, direction: ParameterDirection.Output);

                using (var connection = _context.Database.GetDbConnection())
                {   
                    await connection.ExecuteAsync("spRegisterUser", parameters, commandType: CommandType.StoredProcedure);
                    var resultado = parameters.Get<string>("@resultado");

                    if (resultado.StartsWith("Error"))
                    {
                        return new Response<UsuariosResponse>(null, resultado);
                    }

                    return new Response<UsuariosResponse>(request, "Usuario registrado exitosamente.");
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Sucedió un error macabro: " + ex.Message);
            }
        }

        //Actualizar usuario
        public async Task<Response<UsuariosResponse>> ActualizarUsuario(int id, UsuariosResponse request)
        {
            try
            {
                var usuario = await _context.Usuarios.FindAsync(id);
                if (usuario == null)
                {
                    return new Response<UsuariosResponse>(false,"No existe ese usuario");
                }

                usuario.nombre = request.nombre;
                usuario.email = request.correo;
                usuario.password = request.password;
                usuario.FkRol = request.rol_id;


                _context.Usuarios.Update(usuario);
                await _context.SaveChangesAsync();
                return new Response<UsuariosResponse>(request);
            }
            catch (Exception ex)
            {
                throw new Exception("No se pudo actualizar el usuario: " + ex.Message);
            }
        }
        // Eliminar usuario
        public async Task<Response<bool>> EliminarUsuario(int id)
        {
            try
            {
                var usuario = await _context.Usuarios.FindAsync(id);
                if (usuario == null)
                {
                    return new Response<bool>(false,"No existe el usuario");
                }

                _context.Usuarios.Remove(usuario);
                await _context.SaveChangesAsync();
                return new Response<bool>(true);
            }
            catch (Exception ex)
            {
                throw new Exception("Error al eliminar el usuario: " + ex.Message);
            }
        }


        //public async Task<Response<LoginResponse>> LoginUser(LoginUser request)
        //{
        //    try
        //    {
        //        var parameters = new DynamicParameters();
        //        parameters.Add("@correo", request.email, DbType.String);
        //        parameters.Add("@password", request.password, DbType.String);
        //        parameters.Add("@resultado", dbType: DbType.Boolean, size: 250, direction: ParameterDirection.Output);
        //        parameters.Add("@rol", dbType: DbType.String, size: 25, direction: ParameterDirection.Output);
        //        parameters.Add("@id", dbType: DbType.Int32, direction: ParameterDirection.Output);
        //        parameters.Add("@nombre", dbType: DbType.String, size: 25, direction: ParameterDirection.Output);
        //        parameters.Add("@email", dbType: DbType.String, size: 40, direction: ParameterDirection.Output);
        //        parameters.Add("@telefono", dbType: DbType.String, size: 40, direction: ParameterDirection.Output);

        //        using (var connection = _context.Database.GetDbConnection())
        //        {
        //            await connection.ExecuteAsync("spLoginUser", parameters, commandType: CommandType.StoredProcedure);

        //            var resultado = parameters.Get<bool>("@resultado");
        //            var rol = parameters.Get<string>("@rol");
        //            var id = parameters.Get<int>("@id");
        //            var nombre = parameters.Get<string>("@nombre");
        //            var email = parameters.Get<string>("@email");
        //            var telefono = parameters.Get<string>("@telefono");                    

        //            var loginResponse = new LoginResponse
        //            {
        //                Resultado = resultado,
        //                Rol = rol,
        //                Id = id,
        //                Nombre = nombre,
        //                Email = email,
        //                Telefono = telefono
        //            };

        //            return new Response<LoginResponse>(loginResponse, "Usuario logueado exitosamente.");
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("Sucedió un error macabro: " + ex.Message);
        //    }
        //}



        public async Task<Response<Usuario>> GetByID(int id)
        {
            try
            {
                Usuario res = await _context.Usuarios.FirstOrDefaultAsync(x=> x.PkUsuario == id);

                return new Response<Usuario>(res);
            }
            catch (Exception ex) 
            {
            
            throw new Exception("Ocurrio un error"+ex.Message);
            }
        }
    }
}
