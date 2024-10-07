using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.DTO
{
    public class ActividadDTO
    {
        public int AgenciaID { get; set; }

        public string NombreActividad { get; set; }

        public string? Descripcion { get; set; }  // Nullable, ya que en la BD permite null

        public decimal Precio { get; set; }  // Cambiado a decimal para reflejar mejor el tipo monetario

        public int Duracion { get; set; }

        public string Direccion { get; set; }

        // Cambio de float a double en la definición de propiedades
        public double Latitud { get; set; }

        public double Longitud { get; set; }

    }
}
