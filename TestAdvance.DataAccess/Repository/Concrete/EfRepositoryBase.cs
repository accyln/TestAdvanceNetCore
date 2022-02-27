using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using TestAdvance.DataAccess.DataContexts;
using TestAdvance.DataAccess.Repository.Abstract;

namespace TestAdvance.DataAccess.Repository.Concrete
{
    public class EfRepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        private readonly TestContext _ctx;
        internal DbSet<T> dbset;

        public EfRepositoryBase(TestContext ctx)
        {
            _ctx = ctx;
            this.dbset = _ctx.Set<T>();
        }
        public void Add(T entity)
        {

            dbset.Add(entity);
        }

        public void Delete(T entity)
        {
            dbset.Remove(entity);
        }

        public List<T> GetFromQuery(Expression<Func<T,bool>> filter)
        {

            return _ctx.Set<T>().Where(filter).ToList();
        }

    }
}
