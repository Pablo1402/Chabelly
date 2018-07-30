using chabelly.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace chabelly.Service.Interface
{
    public interface IPermissoesService
    {
        List<permissoes> GetAllPermissoes();
        void Add(permissoes model);
        void Update(permissoes model);
        permissoes GetById(long id);
    }
}
