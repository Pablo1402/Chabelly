using chabelly.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace chabelly.Service.Interface
{
    public interface IGrupoService
    {
        List<grupo> GetAllGrupos();
        List<grupo> GetAllGrupos(params Expression<Func<grupo, object>>[] navigationProperties);
        void Add(grupo model);
        void Update(grupo model);
        grupo GetById(long id);
        grupo GetById(long id, params Expression<Func<grupo, object>>[] navigationProperties);
        void RemoveGroupPermisson(long permissaoId, long grupoId);
    }
}
