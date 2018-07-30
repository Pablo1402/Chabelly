using chabelly.Model;
using chabelly.Service.Interface;
using chabelly.Service.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace chabelly.Gestao.Controllers
{
    public class DominioController : BaseController
    {
        private readonly IDominioService _dominioService;

        public DominioController()
        {
            _dominioService = new DominioService();
        }

        // GET: Dominio
        public ActionResult Index()
        {
            return View();
        }

        public PartialViewResult Grid()
        {
            var dominios = _dominioService.GetAllDominios();
            return PartialView("_gridDominios", dominios);
        }

        public ActionResult Novo()
        {
            return RedirectToAction("Editar", new { id = 0 });
        }

        public ActionResult Editar(long id)
        {
            dominio model = new dominio();
            if (id > 0)
                model = _dominioService.GetById(id);
            return View(model);
        }

        [HttpPost]
        public ActionResult Editar(dominio model)
        {
            try
            {
                if (model.id == 0)
                    _dominioService.Add(model);
                else
                    _dominioService.Update(model);
                SetMessage("Dominio salvo com sucesso", cssMessageOptions.success);
                return RedirectToAction("Index");
            }
            catch (Exception e)
            {
                HttpContext.Trace.Warn("ERRO AO CADASTRAR O DOMINIO: " + e.Message);
                SetMessage("Erro ao salvar o dominio", cssMessageOptions.error);
                return View(model);
            }
        }
    }
}