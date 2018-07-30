using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace chabelly.Gestao.Controllers
{
    public class ProdutoController : BaseController
    {
        // GET: Produto
        public ActionResult Index()
        {
            return View();
        }
    }
}