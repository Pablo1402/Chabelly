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
    public class DominioService : IDominioService
    {
        private readonly DominioRepository _repo;

        public DominioService()
        {
            _repo = new DominioRepository();
        }

        public void Add(dominio model)
        {
            _repo.AddNoValidate(model);
        }

        public List<dominio> GetAllDominios()
        {
            return _repo.GetAll().ToList();
        }

        public dominio GetById(long id)
        {
            return _repo.GetSingle(x => x.id == id);
        }

        public void Update(dominio model)
        {
            _repo.UpdateNoValidate(model);
        }
    }
}
