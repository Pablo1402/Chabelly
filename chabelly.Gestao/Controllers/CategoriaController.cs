using chabelly.Model;
using chabelly.Model.Utils;
using chabelly.Service.Interface;
using chabelly.Service.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace chabelly.Gestao.Controllers
{
    public class CategoriaController : BaseController
    {
        private int pageSize = 25;

        private readonly ICategoriaService _categoriaservice;

        public CategoriaController()
        {
            _categoriaservice = new CategoriaService();
        }

        // GET: Categoria
        public ActionResult Index()
        {
            return View();
        }
        public PartialViewResult Grid(int? page, string nome)
        {
            page = page ?? 1;
            int totalPage = 1;
            var lista = _categoriaservice.GetBySearch(nome, 0, page.Value, pageSize, out totalPage, x => x.categoria2);
            return PartialView("_gridCategorias", new Models.Pagination<categoria>()
            {
                CurrentPage = page.Value,
                Model = lista,
                PageSize = pageSize,
                TotalPage = totalPage
            });
        }

        public ActionResult Novo()
        {
            return RedirectToAction("Editar", new { id = 0 });
        }

        public ActionResult Editar(long id)
        {
            // lista de categorias
            ViewBag.categorias = _categoriaservice.GetAllAtivas(id);
            categoria model = new categoria();
            if (id != 0)
                model = _categoriaservice.GetById(id);

            return View(model);
        }

        [HttpPost]
        public ActionResult Editar(categoria model)
        {
            string message;
            try
            {
                if (ValidaCategoria(model, out message))
                {
                    if (model.id == 0)
                    {
                        model.data_criacao = DateTime.Now;
                        _categoriaservice.Add(model);
                    }
                    else
                        _categoriaservice.Update(model);
                    SetMessage("Categoria salva com sucesso", cssMessageOptions.success);
                    return RedirectToAction("Index");
                }
                else
                {
                    SetMessage(message, cssMessageOptions.warning);
                    return View(model);
                }
                    

            }
            catch (Exception e)
            {
                SetMessage("NAO FOI POSSIVEL SALVAR A CATEGORIA", cssMessageOptions.error);
                SetTrace("ERRO AO SALVAR CATEGORIA: " + e.Message);
                return View();
            }
            
            
        }

        public JsonResult AtivarCategoria(long categoriaId)
        {
            try
            {
                _categoriaservice.AlterarStatusCategoria(categoriaId, null, null);
                return Json(new RetornoJson() { message = "Categoria Ativada com sucesso!", status = true});
            }
            catch (Exception e)
            {
                SetTrace("Erro ao ativar categoria: " + e.Message);
                return Json(new RetornoJson() {message  = "Erro ao ativar categoria", status = false});
            }
        }

        public JsonResult DesativarCategoria(long categoriaId)
        {
            try
            {
                _categoriaservice.AlterarStatusCategoria(categoriaId, DateTime.Now, null);
                return Json(new RetornoJson() { message = "Categoria Desativada com sucesso!", status = true});
            }
            catch (Exception e)
            {
                SetTrace("Erro ao desativar categoria: " + e.Message);
                return Json(new RetornoJson() { message = "Erro ao desativar categoria", status = false });
            }
        }

        private bool ValidaCategoria(categoria model, out string message)
        {
            message = "";
            if (string.IsNullOrEmpty(model.nome))
                message = "Informe o nome da categoria";
            return string.IsNullOrEmpty(message); 
        }


    }
}