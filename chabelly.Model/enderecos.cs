//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace chabelly.Model
{
    using System;
    using System.Collections.Generic;
    
    public partial class enderecos
    {
        public long id { get; set; }
        public long usuario_id { get; set; }
        public sbyte tipo { get; set; }
        public string logadouro { get; set; }
        public string complemento { get; set; }
        public string numero { get; set; }
        public string bairro { get; set; }
        public string cidade { get; set; }
        public string estado { get; set; }
        public string pais { get; set; }
    
        public virtual usuario usuario { get; set; }
    }
}
