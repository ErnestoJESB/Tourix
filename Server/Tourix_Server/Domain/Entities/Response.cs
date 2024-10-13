using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Response<T>
    {    

        public Response(T data, string message = null)
        {
            Success = true;
            Message = message;
            Result = data;
        }

        public Response(bool success, string message)
        {
            Success = success;
            Message = message;
        }

        public Response(bool success, string message, T result)
        {
            Success = success;
            Message = message;
            Result = result;
        }

        public bool Success { get; set; }
        public string Message { get; set; }
        public T Result { get; set; }
    }

}
