using chabelly.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace chabelly.Service.Interface
{
    public interface IDominioService
    {
        List<dominio> GetAllDominios();
        void Add(dominio model);
        void Update(dominio model);
        dominio GetById(long id);
    }
}
