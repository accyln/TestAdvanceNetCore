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
    public class TestSuiteManager : GenericManager<TestSuite>, ITestSuiteService
    {
        private readonly IGenericDal<TestSuite> _genericDal;
        private readonly ITestSuiteDal _testSuiteDal;
        public TestSuiteManager(IGenericDal<TestSuite> genericDal,ITestSuiteDal testSuiteDal) : base(genericDal)
        {
            _genericDal = genericDal;
            _testSuiteDal = testSuiteDal;
        }


        public async Task<List<TestSuite>> GetAllTestSuites()
        {
            var result = await _testSuiteDal.GetAllAsync();

            return result;
        }


    }
}
