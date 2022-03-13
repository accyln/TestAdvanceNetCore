using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using TestAdvance.Business.Interfaces;
using TestAdvance.DataAccess.Concrete.Repository;
using TestAdvance.DataAccess.Interfaces;
using TestAdvance.DataAccess.Repository.Abstract;
using TestAdvance.Entities.Concrete;

namespace TestAdvance.Business.Concrete
{
    public class TestCaseManager : GenericManager<TestCase>,ITestCaseService
    {
        private readonly IGenericDal<TestCase> _genericDal;
        private readonly ITestCaseDal _testCaseDal;

        public TestCaseManager(IGenericDal<TestCase> genericDal,ITestCaseDal testCaseDal) : base(genericDal)
        {
            _genericDal = genericDal;
            _testCaseDal = testCaseDal;
        }

      
    }
}
