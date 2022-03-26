using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using TestAdvance.Business.Interfaces;
using TestAdvance.DataAccess.Repository.Abstract;
using TestAdvance.Entities.Concrete;

namespace TestAdvance.Business.Concrete
{
    class TestRunDetailManager : GenericManager<TestRunDetail>, ITestRunDetailService
    {
        public TestRunDetailManager(IGenericDal<TestRunDetail> genericDal) : base(genericDal)
        {

        }
    }
}
