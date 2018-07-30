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
    public class CategoriaService:  ICategoriaService
    {
        private readonly CategoriaRepository _categoriaRepo;

        public CategoriaService()
        {
            _categoriaRepo = new CategoriaRepository();
        }

        public List<categoria> GetAllAtivas(long? IdException )
        {
            if (IdException != null)
                return _categoriaRepo.GetListNoPage(x => x.data_desativacao == null && x.id != IdException.Value).ToList();
            else
                return _categoriaRepo.GetListNoPage(x => x.data_desativacao == null).ToList();
        }

        public categoria GetById(long id)
        {
            return _categoriaRepo.GetSingle(x => x.id == id);
        }

        public List<categoria> GetBySearch(string nome, int status, int pageIndex, int pageSize , out int totalPage, params Expression<Func<categoria, object>>[] navigationProperties)
        {
            List<categoria> lista = new List<categoria>();
            lista = _categoriaRepo
                .GetList(x =>
                                (string.IsNullOrEmpty(nome) || x.nome.Trim().ToLower().Contains(nome.Trim().ToLower())),
                                 out totalPage, null,true,pageIndex,pageSize,navigationProperties
                ).ToList();

            return lista;
        }

        public void Add(categoria model)
        {
            _categoriaRepo.AddNoValidate(model);
        }

        public void Update(categoria model)
        {
            _categoriaRepo.UpdateNoValidate(model);
        }

        public void AlterarStatusCategoria(long categoriaId, DateTime? dataDesativacao, long? usuarioAlteracao)
        {
            var categoria = GetById(categoriaId);
            categoria.data_desativacao = dataDesativacao;
            categoria.usuario_destativacao = usuarioAlteracao;
            Update(categoria);

        }
    }
}
