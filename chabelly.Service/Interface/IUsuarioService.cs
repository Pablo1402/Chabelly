using chabelly.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace chabelly.Service.Interface
{
    public interface IUsuarioService
    {
        List<usuario> GetAllUsuarios();
        usuario GetById(long id);
        void Add(usuario model);
        void Update(usuario model);
    }
}
