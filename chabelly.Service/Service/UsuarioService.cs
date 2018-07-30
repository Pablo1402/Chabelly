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
    public class UsuarioService : IUsuarioService
    {
        private readonly UsuarioRepository _repo;

        public UsuarioService()
        {
            _repo = new UsuarioRepository();
        }

        public void Add(usuario model)
        {
            _repo.AddNoValidate(model);
        }

        public List<usuario> GetAllUsuarios()
        {
            return _repo.GetAll().ToList();
        }

        public usuario GetById(long id)
        {
            return _repo.GetSingle(x => x.id == id);
        }

        public void Update(usuario model)
        {
            _repo.UpdateNoValidate(model);
        }
    }
}
