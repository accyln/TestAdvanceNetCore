using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TestAdvance.Business.Interfaces;
using TestAdvance.DataAccess.Interfaces;
using TestAdvance.DataAccess.Repository.Abstract;
using TestAdvance.Entities.Concrete;

namespace TestAdvance.Business.Concrete
{
    public class TestRunManager : GenericManager<TestRun>, ITestRunService
    {
        private readonly IGenericDal<TestRun> _genericDal;
        private readonly ITestRunDal _testRunDal;

        public TestRunManager(IGenericDal<TestRun> genericDal, ITestRunDal testRunDal) : base(genericDal)
        {
            _testRunDal = testRunDal;
            _genericDal = genericDal;
        }

        public async Task<List<TestRun>> GetAllSortedByIdAsync()
        {
            return await _genericDal.GetAllAsync(I => I.Id>0);
        }
    }
}
