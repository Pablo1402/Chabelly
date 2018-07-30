using chabelly.Repository.Dal;
using chabelly.Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using chabelly.Model;
using System.Linq.Expressions;

namespace chabelly.Service.Service
{
    public class GrupoService : IGrupoService
    {
        private readonly GrupoRepository _repo;

        public GrupoService()
        {
            _repo = new GrupoRepository();
        }

        public void Add(grupo model)
        {
            _repo.AddNoValidate(model);
        }

        public List<grupo> GetAllGrupos()
        {
            return _repo.GetAll().ToList();
        }

        public List<grupo> GetAllGrupos(params Expression<Func<grupo, object>>[] navigationProperties)
        {
            return _repo.GetAll(navigationProperties).ToList();
        }

        public grupo GetById(long id)
        {
            return _repo.GetSingle(x => x.id == id);
        }

        public grupo GetById(long id, params Expression<Func<grupo, object>>[] navigationProperties)
        {
            return _repo.GetSingle(x => x.id == id, navigationProperties);
        }

        public void RemoveGroupPermisson(long permissaoId, long grupoId)
        {
            _repo.RemoveGrupoPermissao(grupoId,permissaoId);
        }

        public void Update(grupo model)
        {
            _repo.UpdateNoValidate(model);
        }
    }
}
