using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace TestAdvance.DataAccess.Repository.Abstract
{
    public interface IRepositoryBase<T> where T : class
    {
        List<T> GetFromQuery(Expression<Func<T, bool>> filter);
        void Add(T entity);
        void Delete(T entity);
    }
}
