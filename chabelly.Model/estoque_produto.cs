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
    
    public partial class estoque_produto
    {
        public long id { get; set; }
        public long produto_id { get; set; }
        public long atributo_produto_id { get; set; }
        public int estoque_produto1 { get; set; }
        public int estoque_atributo { get; set; }
    
        public virtual atributo_produto atributo_produto { get; set; }
        public virtual produto produto { get; set; }
    }
}
