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
    
    public partial class contato_usuario
    {
        public long id { get; set; }
        public Nullable<long> usuario_id { get; set; }
        public sbyte tipo { get; set; }
        public string valor { get; set; }
        public string descricao { get; set; }
        public Nullable<System.DateTime> data_desativacao { get; set; }
    
        public virtual usuario usuario { get; set; }
    }
}
