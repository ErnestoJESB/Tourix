using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Usuario
    {
        [Key]
        public int PkUsuario { get; set; }
        public string nombre { get; set; }

        public string email { get; set; }

        public string password { get; set; }
        public string telefono { get; set; }

        [ForeignKey("Roles")]
        public int? FkRol {  get; set; }

        public Rol Roles { get; set; }
    }
}
