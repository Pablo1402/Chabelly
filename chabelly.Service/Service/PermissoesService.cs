using chabelly.Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using chabelly.Model;
using chabelly.Repository.Dal;

namespace chabelly.Service.Service
{
    public class PermissoesService : IPermissoesService
    {
        private readonly PermissoesRepository _repo;

        public PermissoesService()
        {
            _repo = new PermissoesRepository();
        }

        public void Add(permissoes model)
        {
            _repo.AddNoValidate(model);
        }

        public List<permissoes> GetAllPermissoes()
        {
            return _repo.GetAll().ToList();
        }

        public permissoes GetById(long id)
        {
            return _repo.GetSingle(x => x.id == id);
        }

        public void Update(permissoes model)
        {
            _repo.UpdateNoValidate(model);
        }
    }
}
