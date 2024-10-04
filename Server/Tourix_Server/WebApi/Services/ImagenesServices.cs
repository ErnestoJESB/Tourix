using Dapper;
using Domain.DTOs.Imagenes;
using Domain.DTOs.Inventario;
using Domain.DTOs.Productos;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Data;
using WebApi.Context;

namespace WebApi.Services
{
    public class ImagenesServices : IImagenServices
    {
        private readonly ApplicationDBContext _context;
        public ImagenesServices(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<Response<List<ImagenDTO>>> GetImagenes()
        {
            try
            {
                List<ImagenDTO> response = new List<ImagenDTO>();
                var result = await _context.Database.GetDbConnection().QueryAsync<ImagenDTO>(
                    "spGetImagenes",
                    new { },
                    commandType: CommandType.StoredProcedure
                );
                
                response = result.ToList();

                return new Response<List<ImagenDTO>>(response);
            }
            catch (Exception ex)
            {
                throw new Exception("Sucedio un error catastrofico: " + ex.Message);
            }
        }

        public async Task<Response<CreateImageDTO>> CreateImage(CreateImageDTO request)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@FkProducto", request.FkProducto, DbType.Int32);
                parameters.Add("@Url", request.UrlImg, DbType.String);

                using (var connection = _context.Database.GetDbConnection())
                {
                    await connection.ExecuteAsync("spCreateImages", parameters, commandType: CommandType.StoredProcedure);
                    return new Response<CreateImageDTO>(request, "Imagén registrada exitosamente.");
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Sucedio un error catastrofico: " + ex.Message);
            }
        }

        public async Task<Response<List<CreateImageDTO>>> GetMainImage()
        {
            try
            {
                List<CreateImageDTO> response = new List<CreateImageDTO>();
                var result = await _context.Database.GetDbConnection().QueryAsync<CreateImageDTO>(
                    "spGetMainImgProduct",
                    new { },
                    commandType: CommandType.StoredProcedure
                );

                response = result.ToList();

                return new Response<List<CreateImageDTO>>(response);
            }
            catch (Exception ex)
            {
                throw new Exception("Sucedio un error catastrofico: " + ex.Message);
            }
        }

        public async Task<Response<List<ImagenDTO>>> GetImagesByProductId(int id)
        {
            try
            {
                List<ImagenDTO> response = new List<ImagenDTO>();
                var parameters = new DynamicParameters();
                parameters.Add("@PkProducto", id, DbType.Int32);    
                var result = await _context.Database.GetDbConnection().QueryAsync<ImagenDTO>(
                    "spGetImagesByProduct",
                    parameters,
                    commandType: CommandType.StoredProcedure
                );

                response = result.ToList();

                return new Response<List<ImagenDTO>>(response);
            }
            catch (Exception ex)
            {
                throw new Exception("Sucedio un error catastrofico: " + ex.Message);
            }
        }
    }
}
