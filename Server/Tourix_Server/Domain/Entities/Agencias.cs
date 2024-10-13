using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Agencias
    {
        [Key]
        public int AgenciaID { get; set; }
        public string NombreAgencia { get; set; }
        public string Email { get; set; }
        public string Telefono { get; set; }    
        public string Direccion { get; set; }
        public string Descripcion { get; set; }
        public DateTime FechaRegistro { get; set; }
        public string Password { get; set; }


    }
}
