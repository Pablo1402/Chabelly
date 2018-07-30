using chabelly.Helpers;
using chabelly.Model;
using chabelly.Repository.Interface;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace chabelly.Repository.Dal
{
    public class GenericDataRepository<T> where T : class
    {
        public virtual IList<T> GetAll(params Expression<Func<T, object>>[] navigationProperties)
        {
            List<T> list;
            using (var context = new ChabellyEntities())
            {
                IQueryable<T> dbQuery = context.Set<T>();

                if (navigationProperties != null)
                {
                    dbQuery = navigationProperties.Aggregate(dbQuery, (current, include) => current.Include(include));
                }

                //Apply eager loading
                foreach (Expression<Func<T, object>> navigationProperty in navigationProperties)
                    dbQuery = dbQuery.Include<T, object>(navigationProperty);

                list = dbQuery
                   .AsNoTracking()
                   .ToList<T>();
            }
            return list;
        }

        public virtual IList<T> GetListNoPage(Func<T, bool> where, params Expression<Func<T, object>>[] navigationProperties)
        {
            List<T> list;
            using (var context = new ChabellyEntities())
            {
                IQueryable<T> dbQuery = context.Set<T>();

                //Apply eager loading
                foreach (Expression<Func<T, object>> navigationProperty in navigationProperties)
                    dbQuery = dbQuery.Include<T, object>(navigationProperty);

                dbQuery = dbQuery
                    .AsNoTracking()
                    .Where(where).AsQueryable<T>();

                list = dbQuery
                    .ToList<T>();
            }
            return list;
        }

        public virtual IList<T> GetListNoPage(Func<T, bool> where, int limit, params Expression<Func<T, object>>[] navigationProperties)
        {
            List<T> list;
            using (var context = new ChabellyEntities())
            {
                IQueryable<T> dbQuery = context.Set<T>();

                //Apply eager loading
                foreach (Expression<Func<T, object>> navigationProperty in navigationProperties)
                    dbQuery = dbQuery.Include<T, object>(navigationProperty);

                if (limit != 0)
                {
                    dbQuery = dbQuery
                    .AsNoTracking()
                    .Where(where).Take(limit).AsQueryable<T>();
                }
                else
                {
                    dbQuery = dbQuery
                        .AsNoTracking()
                        .Where(where).AsQueryable<T>();
                }

                list = dbQuery
                    .ToList<T>();
            }
            return list;
        }


        /// <summary>
        /// Lista os Registros Utilizando Paginação e Ordenação 
        /// </summary>
        /// <param name="where"></param>
        /// <param name="TotalPages"></param>
        /// <param name="orderby"></param>
        /// <param name="ascending"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <param name="navigationProperties"></param>
        /// <returns></returns>
        public virtual IList<T> GetList(Func<T, bool> where,
                                        out int TotalPages,
                                        string SortBy = null,
                                        bool ascending = true,
                                        int pageIndex = 0,
                                        int pageSize = 20,
                                        params Expression<Func<T, object>>[] navigationProperties)
        {
            List<T> list;
            using (var context = new ChabellyEntities())
            {
                IQueryable<T> dbQuery = context.Set<T>();

                //Apply eager loading
                foreach (Expression<Func<T, object>> navigationProperty in navigationProperties)
                    dbQuery = dbQuery.Include<T, object>(navigationProperty);

                if (SortBy != null)
                {
                    if (ascending)
                        dbQuery = dbQuery
                               .AsNoTracking()
                               .Where(where)
                               .OrderBy(chabelly.Helpers.Helpers.GetExpression<T>(SortBy))
                               .AsQueryable<T>().Paged<T>(pageIndex, pageSize, out TotalPages);
                    else
                        dbQuery = dbQuery
                                .AsNoTracking()
                                .Where(where)
                                .OrderByDescending(chabelly.Helpers.Helpers.GetExpression<T>(SortBy))
                                .AsQueryable<T>().Paged<T>(pageIndex, pageSize, out TotalPages);
                }
                else // Sem Order By(without orderby)
                    dbQuery = dbQuery
                            .AsNoTracking()
                            .Where(where)
                            .AsQueryable<T>().Paged<T>(pageIndex, pageSize, out TotalPages);

                list = dbQuery
                    .ToList<T>();
            }
            return list;
        }

        public virtual IList<T> GetList(Func<T, bool> where,
                                        out int TotalPages,
                                        string SortBy = null,
                                        string SortBy2 = null,
                                        bool ascending = true,
                                        bool ascending2 = true,
                                        int pageIndex = 0,
                                        int pageSize = 20,
                                        params Expression<Func<T, object>>[] navigationProperties)
        {
            List<T> list;
            using (var context = new ChabellyEntities())
            {
                IQueryable<T> dbQuery = context.Set<T>();

                //Apply eager loading
                foreach (Expression<Func<T, object>> navigationProperty in navigationProperties)
                    dbQuery = dbQuery.Include<T, object>(navigationProperty);

                if (SortBy != null && SortBy2 != null)
                {
                    if (ascending && ascending2)
                        dbQuery = dbQuery.AsNoTracking().Where(where).OrderBy(chabelly.Helpers.Helpers.GetExpression<T>(SortBy)).ThenBy(chabelly.Helpers.Helpers.GetExpression<T>(SortBy2))
                            .AsQueryable<T>().Paged<T>(pageIndex, pageSize, out TotalPages);
                    else if (ascending && !ascending2)
                        dbQuery = dbQuery.AsNoTracking().Where(where).OrderBy(chabelly.Helpers.Helpers.GetExpression<T>(SortBy)).ThenByDescending(chabelly.Helpers.Helpers.GetExpression<T>(SortBy2))
                            .AsQueryable<T>().Paged<T>(pageIndex, pageSize, out TotalPages);
                    else if (!ascending && ascending2)
                        dbQuery = dbQuery.AsNoTracking().Where(where).OrderByDescending(chabelly.Helpers.Helpers.GetExpression<T>(SortBy)).ThenBy(chabelly.Helpers.Helpers.GetExpression<T>(SortBy2))
                            .AsQueryable<T>().Paged<T>(pageIndex, pageSize, out TotalPages);
                    else
                        dbQuery = dbQuery.AsNoTracking().Where(where).OrderByDescending(chabelly.Helpers.Helpers.GetExpression<T>(SortBy)).ThenByDescending(chabelly.Helpers.Helpers.GetExpression<T>(SortBy2))
                            .AsQueryable<T>().Paged<T>(pageIndex, pageSize, out TotalPages);
                }
                else // Sem Order By(without orderby)
                    dbQuery = dbQuery
                            .AsNoTracking()
                            .Where(where)
                            .AsQueryable<T>().Paged<T>(pageIndex, pageSize, out TotalPages);

                list = dbQuery
                    .ToList<T>();
            }
            return list;
        }



       

        public virtual T GetSingle(Func<T, bool> where,
             params Expression<Func<T, object>>[] navigationProperties)
        {
            T item = null;
            using (var context = new ChabellyEntities())
            {
                IQueryable<T> dbQuery = context.Set<T>();

                //Apply eager loading
                foreach (Expression<Func<T, object>> navigationProperty in navigationProperties)
                    dbQuery = dbQuery.Include<T, object>(navigationProperty);

                item = dbQuery
                    .AsNoTracking()
                    .FirstOrDefault(where); //Apply where clause
            }
            return item;
        }

        public virtual void Add(params T[] items)
        {
            using (var context = new ChabellyEntities())
            {
                foreach (T item in items)
                {
                    context.Entry(item).State = System.Data.EntityState.Added;
                }
                context.SaveChanges();
            }
        }

        public virtual void AddNoValidate(params T[] items)
        {
            using (var context = new ChabellyEntities())
            {
                context.Configuration.ValidateOnSaveEnabled = false;
                foreach (T item in items)
                {
                    context.Entry(item).State = System.Data.EntityState.Added;
                }

                context.SaveChanges();
            }
        }

        public virtual void Update(params T[] items)
        {
            using (var context = new ChabellyEntities())
            {
                foreach (T item in items)
                {
                    context.Entry(item).State = System.Data.EntityState.Modified;
                }
                context.SaveChanges();
            }
        }

        public virtual void UpdateNoValidate(params T[] items)
        {
            try
            {
                using (var context = new ChabellyEntities())
                {
                    context.Configuration.ValidateOnSaveEnabled = false;
                    foreach (T item in items)
                    {
                        context.Entry(item).State = System.Data.EntityState.Modified;
                    }
                    context.SaveChanges();
                }
            }
            catch (DbEntityValidationException e)
            {
                foreach (var eve in e.EntityValidationErrors)
                {
                    Console.WriteLine("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                        eve.Entry.Entity.GetType().Name, eve.Entry.State);
                    foreach (var ve in eve.ValidationErrors)
                    {
                        Console.WriteLine("- Property: \"{0}\", Error: \"{1}\"",
                            ve.PropertyName, ve.ErrorMessage);
                    }
                }
                throw;
            }
        }

        public virtual void Remove(params T[] items)
        {
            using (var context = new ChabellyEntities())
            {
                foreach (T item in items)
                {
                    context.Entry(item).State = System.Data.EntityState.Deleted;
                }
                context.SaveChanges();
            }
        }
    }
}
