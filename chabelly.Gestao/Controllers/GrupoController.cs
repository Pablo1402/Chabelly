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
    public class GrupoController : BaseController
    {
        private readonly IGrupoService _grupoService;

        public GrupoController()
        {
            _grupoService = new GrupoService();
        } 

        // GET: Grupo
        public ActionResult Index()
        {
            return View();
        }

        public PartialViewResult Grid()
        {
            var model = _grupoService.GetAllGrupos();
            return PartialView("_gridGrupos", model);
        }

        public ActionResult Novo()
        {
            return RedirectToAction("Editar", new { id = 0 });
        }

        public ActionResult Editar(long id)
        {
            grupo model = new grupo();
            if (id > 0)
                model = _grupoService.GetById(id, x => x.permissoes);
            return View(model);
        }

        [HttpPost]
        public ActionResult Editar(grupo model)
        {
            if (string.IsNullOrEmpty(model.nome))
            {
                SetMessage("Favor! Informe o nome do grupo",cssMessageOptions.warning);
                return View(model);
            }
            if (model.id == 0)
                _grupoService.Add(model);
            else
                _grupoService.Update(model);

            SetMessage("Grupo cadastrado com sucesso!", cssMessageOptions.success);
            return RedirectToAction("Index");
        }


        #region Ajax
        [HttpPost]
        public JsonResult RemoverPermissao(long grupoId, long permissaoId)
        {
            try
            {
                return Json(new { });
            }
            catch (Exception e)
            {
                HttpContext.Trace.Warn("ERRO AO REMOVER PERMISSAO: " + e.Message);
                return Json(new { success = false, message = "ERRO! Não foi possível remover a permissão" });
            }
        }


        #endregion

    }
}