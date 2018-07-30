using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace chabelly.Helpers
{
    public static class Helpers
    {
        public static IQueryable<T> Paged<T>(this IQueryable<T> source, int pageIndex, int pageSize, out int TotalPages)
        {
            int TotalCount = source.Count();
            TotalPages = (int)Math.Ceiling(TotalCount / (double)pageSize);

            return source.Skip((pageIndex * pageSize) - pageSize).Take(pageSize);
        }

        /// <summary>
        /// Get Expression for Order by
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sortby"></param>
        /// <returns></returns>
        public static Func<T, Object> GetExpression<T>(String sortby)
        {
            var param = Expression.Parameter(typeof(T));
            var sortExpression = Expression.Lambda<Func<T, Object>>(Expression.Convert(Expression.Property(param, sortby), typeof(Object)), param);
            return sortExpression.Compile();
        }
        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="table"></param>
        /// <returns></returns>
        public static List<T> ToList<T>(this DataTable table) where T : new()
        {
            List<PropertyInfo> properties = typeof(T).GetProperties().ToList();
            List<T> result = new List<T>();
            for (int i = 0; i < table.Rows.Count; i++)
            {
                result.Add(CreateItemFromRow<T>((DataRow)table.Rows[i], properties));
            }
            GC.Collect();
            return result;
        }
        private static T CreateItemFromRow<T>(DataRow row, List<PropertyInfo> properties) where T : new()
        {
            List<PropertyInfo> porpertiesitem = typeof(T).GetProperties().ToList();

            T item = new T();
            foreach (var property in properties)
            {
                try
                {
                    if (row.Table.Columns.Contains(property.Name))
                    {
                        if (row[property.Name] != DBNull.Value)
                        {
                            //Convert.ChangeType(row[property.Name], porpertiesitem.Where(x => x.Name == property.Name).FirstOrDefault().PropertyType);
                            Type tipo = porpertiesitem.Where(x => x.Name == property.Name).FirstOrDefault().PropertyType;
                            if (tipo.IsGenericType && tipo.GetGenericTypeDefinition() == typeof(Nullable<>))
                            {
                                try
                                {
                                    var convertedValue = System.Convert.ChangeType(row[property.Name], Nullable.GetUnderlyingType(porpertiesitem.Where(x => x.Name == property.Name).FirstOrDefault().PropertyType));
                                    property.SetValue(item, convertedValue, null);
                                }
                                catch
                                {

                                }
                            }
                            else
                                property.SetValue(item, Convert.ChangeType(row[property.Name], tipo), null);
                        }
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
            return item;
        }
    }
}
