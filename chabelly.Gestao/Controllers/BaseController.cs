using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace chabelly.Gestao.Controllers
{
    public class BaseController : Controller
    {
        internal enum cssMessageOptions
        {
            success,
            error,
            warning,
            info
        }

        internal void SetMessage(string message, cssMessageOptions CssMessage)
        {
            TempData["Message"] = message;
            TempData["CssMessage"] = CssMessage.ToString();
        }
        internal void SetTrace(string message)
        {
            System.Web.HttpContext.Current.Trace.Warn(message);
        }
    }
}