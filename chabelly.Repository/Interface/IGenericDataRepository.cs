using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace chabelly.Repository.Interface
{
    public interface IGenericDataRepository<T> where T : class
    {
        IList<T> GetAll(params Expression<Func<T, object>>[] navigationProperties);
        IList<T> GetListNoPage(Func<T, bool> where, params Expression<Func<T, object>>[] navigationProperties);
        IList<T> GetListNoPage(Func<T, bool> where, int limit, params Expression<Func<T, object>>[] navigationProperties);
        IList<T> GetList(Func<T, bool> where,
                                        out int TotalPages,
                                        string SortBy = null,
                                        bool ascending = true,
                                        int pageIndex = 0,
                                        int pageSize = 20,
                                        params Expression<Func<T, object>>[] navigationProperties);

        IList<T> GetList(Func<T, bool> where,
                                        out int TotalPages,
                                        string SortBy = null,
                                        string SortBy2 = null,
                                        bool ascending = true,
                                        bool ascending2 = true,
                                        int pageIndex = 0,
                                        int pageSize = 20,
                                        params Expression<Func<T, object>>[] navigationProperties);
        T GetSingle(Func<T, bool> where,
             params Expression<Func<T, object>>[] navigationProperties);

        void Add(params T[] items);

        void AddNoValidate(params T[] items);

        void Update(params T[] items);

        void UpdateNoValidate(params T[] items);

        void Remove(params T[] items);
    }
}
