using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace chabelly.Model.Utils
{
    public class RetornoJson
    {
        public string message { get; set; }
        public bool status { get; set; }
        public dynamic data { get; set; }
    }
}
