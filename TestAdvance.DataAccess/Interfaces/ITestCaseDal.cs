using System;
using System.Collections.Generic;
using System.Text;
using TestAdvance.DataAccess.Repository.Abstract;
using TestAdvance.Entities.Concrete;

namespace TestAdvance.DataAccess.Interfaces
{
    public interface ITestCaseDal: IGenericDal<TestCase>
    {
    }
}
