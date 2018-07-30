using chabelly.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace chabelly.Service.Interface
{
    public interface ICategoriaService
    {
        List<categoria> GetBySearch(string nome, int status, int pageIndex, int pageSize, out int totalPage, params Expression<Func<categoria, object>>[] navigationProperties);
        categoria GetById(long id);
        void Add(categoria model);
        void Update(categoria model);
        List<categoria> GetAllAtivas(   );
        void AlterarStatusCategoria(long categoriaId, DateTime? dataDesativacao, long? usuarioAlteracao);
    }
}
