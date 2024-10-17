using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class LoginCliente
    {
        public bool Resultado { get; set; }
        public int ID { get; set; }
        public string Nombre { get; set; }
        public string Email { get; set; }
    }
}
