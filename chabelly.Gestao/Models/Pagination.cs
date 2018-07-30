using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace chabelly.Gestao.Models
{
    public class Pagination<T>
    {
        public Pagination()
        {
            CurrentPage = 1;
            PageSize = 5;
        }

        public IEnumerable<T> Model { get; set; }
        public int TotalPage { get; set; }
        public int CurrentPage { get; set; }
        public int First
        {
            get { return 1; }
        }
        public int LastPage
        {
            get { return TotalPage; }
        }
        public int NextPage
        {
            get
            { return CurrentPage + 1; }
        }
        public int Previous
        {
            get { return CurrentPage - 1; }
        }
        public int PageSize { get; set; }

        public bool HasPrevPage
        {
            get { return CurrentPage > 1; }
        }

        public bool HasNextPage
        {
            get { return CurrentPage < LastPage; }
        }
    }
}