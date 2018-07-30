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
    public class PermissaoController : BaseController
    {
        private readonly IPermissoesService _permissaoService;

        public PermissaoController()
        {
            _permissaoService = new PermissoesService();
        }

        // GET: Permissao
        public ActionResult Index()
        {
            return View();
        }


        public PartialViewResult Grid()
        {
            var result = _permissaoService.GetAllPermissoes();
            return PartialView("_permissoesGrid", result);
        }

        public ActionResult Novo()
        {
            return RedirectToAction("Editar", new { id = 0});
        }

        public ActionResult Editar(long id)
        {
            permissoes model = new permissoes();
            if (id > 0)
                model = _permissaoService.GetById(id);
            return View(model);
        }

        [HttpPost]
        public ActionResult Editar(permissoes model)
        {
            try
            {
                if(string.IsNullOrEmpty(model.descricao))
                {
                    SetMessage("Favor! Informe uma descrição para a permissão ", cssMessageOptions.warning);
                    return View(model);
                }
                if (string.IsNullOrEmpty(model.sigla))
                {
                    SetMessage("Favor! Informe uma sigla para a permissão ", cssMessageOptions.warning);
                    return View(model);
                }
                if (model.id == 0)
                    _permissaoService.Add(model);
                else
                    _permissaoService.Update(model);
                SetMessage("Permissão salva com sucesso!", cssMessageOptions.success);
                return RedirectToAction("Index");
            }
            catch (Exception e)
            {
                HttpContext.Trace.Warn("ERRO AO SALVAR PERMISSAO: " + e.Message);
                SetMessage("Não foi possível salvar a permissão", cssMessageOptions.error);
                return View(model);
            }
        }
    }
}