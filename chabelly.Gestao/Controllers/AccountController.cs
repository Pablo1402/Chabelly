using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace chabelly.Gestao.Controllers
{
    public class AccountController : Controller
    {
        // GET: Account
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Login(string login , string senha)
        {
            try
            {
                if (login == "pablo" && senha =="123")
                {
                    return Json(new { message = "Logado com sucesso", status = true, url="/Home" });
                }
                else
                {
                    return Json(new { message = "Login e senha inválidos", status =false });
                }
            }
            catch (Exception)
            {
                return Json(new { message = "Login e senha inválidos", status = false });
            }
        }
    }
}