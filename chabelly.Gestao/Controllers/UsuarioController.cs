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
    public class UsuarioController : Controller
    {
        private readonly IUsuarioService _usuarioService;

        public UsuarioController()
        {
            _usuarioService = new UsuarioService();
        }
        // GET: Usuario
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Grid()
        {
            var usuarios = _usuarioService.GetAllUsuarios();
            return PartialView("_gridUsuarios", usuarios);
        }

        public ActionResult Novo()
        {
            return RedirectToAction("Editar", new { id = 0 });
        }

        public ActionResult Editar(long id)
        {
            usuario model = new usuario();
            if (id > 0)
                model = _usuarioService.GetById(id);
            return View(model);
        }

        [HttpPost]
        public ActionResult Editar(usuario model)
        {
            try
            {
                if (model.id == 0)
                    _usuarioService.Add(model);
                else
                    _usuarioService.Update(model);
                TempData["Message"] = "Usuário salvo com sucesso!";
                TempData["CssMessage"] = "success";
                return RedirectToAction("Index");
            }
            catch (Exception e)
            {
                HttpContext.Trace.Warn("ERRO AO SALVAR USUARIO: " + e.Message);
                TempData["Message"] = "Não foi possível salvar o usuário";
                TempData["CssMessage"] = "error";
                return View (model);

            }

        }
    }
}