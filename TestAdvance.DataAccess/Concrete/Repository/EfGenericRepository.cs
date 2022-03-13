using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using TestAdvance.DataAccess.DataContexts;
using TestAdvance.DataAccess.Repository.Abstract;

namespace TestAdvance.DataAccess.Repository.Concrete
{
    public class EfGenericRepository<T> : IGenericDal<T> where T : class
    {

        AdvanceContext c = new AdvanceContext();
        internal DbSet<T> dbset;

        public async Task<List<T>> GetAllAsync()
        {
            using var context = new AdvanceContext();
            return await context.Set<T>().ToListAsync();
        }

        public async Task<List<T>> GetAllAsync(Expression<Func<T, bool>> filter)
        {
            using var context = new AdvanceContext();
            return await context.Set<T>().Where(filter).ToListAsync();
        }

        public async Task<T> FindByIdAsync(int id)
        {
            using var context = new AdvanceContext();
            return await context.FindAsync<T>(id);
        }

        public async Task AddAsync(T entity)
        {
            using var context = new AdvanceContext();
            await context.AddAsync(entity);
            await context.SaveChangesAsync();
        }

        public async Task UpdateAsync(T entity)
        {
            using var context = new AdvanceContext();
            context.Update(entity);
            await context.SaveChangesAsync();
        }

        public async Task RemoveAsync(T entity)
        {
            using var context = new AdvanceContext();
            context.Remove(entity);
            await context.SaveChangesAsync();
        }

        public async Task<T> GetAsync(Expression<Func<T, bool>> filter)
        {
            using var context = new AdvanceContext();
            return await context.Set<T>().FirstOrDefaultAsync(filter);
        }
    }
}
