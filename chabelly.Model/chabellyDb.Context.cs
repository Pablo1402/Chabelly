﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class ChabellyEntities : DbContext
    {
        public ChabellyEntities()
            : base("name=ChabellyEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public DbSet<atributo_produto> atributo_produto { get; set; }
        public DbSet<categoria> categoria { get; set; }
        public DbSet<contato_usuario> contato_usuario { get; set; }
        public DbSet<dominio> dominio { get; set; }
        public DbSet<enderecos> enderecos { get; set; }
        public DbSet<estoque_produto> estoque_produto { get; set; }
        public DbSet<foto_produto> foto_produto { get; set; }
        public DbSet<grupo> grupo { get; set; }
        public DbSet<historico_estoque> historico_estoque { get; set; }
        public DbSet<permissoes> permissoes { get; set; }
        public DbSet<preco_produto> preco_produto { get; set; }
        public DbSet<produto> produto { get; set; }
        public DbSet<tipo_atributo> tipo_atributo { get; set; }
        public DbSet<usuario> usuario { get; set; }
    }
}
