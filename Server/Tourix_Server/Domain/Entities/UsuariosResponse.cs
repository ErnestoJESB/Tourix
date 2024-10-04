using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class UsuariosResponse
    {
      
        public string nombre { get; set; }
        public string correo { get; set; }
        public string password { get; set; }
        public string telefono { get; set; }
        public int rol_id { get; set; }
    }
}
