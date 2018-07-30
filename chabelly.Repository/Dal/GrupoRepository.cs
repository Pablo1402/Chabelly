using chabelly.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace chabelly.Repository.Dal
{
    public class GrupoRepository :GenericDataRepository<grupo>
    {
        public void RemoveGrupoPermissao(long grupoId, long permissaoId)
        {
            string sql =
                string.Format(@"delete from grupo_permissao where grupo_id = {0} and permissao_id = {1}", grupoId, permissaoId);


            using (var context = new ChabellyEntities())
            {
                context.Database.ExecuteSqlCommand(sql);
            }
        }
    }
}
