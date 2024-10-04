using Domain.DTOs.Imagenes;
using Domain.Entities;

namespace WebApi.Services
{
    public interface IImagenServices
    {
        public Task<Response<List<ImagenDTO>>> GetImagenes();
        public Task<Response<CreateImageDTO>> CreateImage(CreateImageDTO request);
        public Task<Response<List<CreateImageDTO>>> GetMainImage();
        public Task<Response<List<ImagenDTO>>> GetImagesByProductId(int id);
    }
}
