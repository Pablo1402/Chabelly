using chabelly.Model;
using chabelly.Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace chabelly.Repository.Dal
{
    public class ProdutoRepository : GenericDataRepository<produto>, IProdutoRepository
    {
    }
}
