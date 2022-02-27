using System;
using System.Collections.Generic;
using System.Text;
using TestAdvance.Entities.Abstract;

namespace TestAdvance.Entities.Concrete
{
    public class TestSuite: IEntity
    {
        public int Id { get; set; }
        public string SuiteAdi { get; set; }
        public int ModulId { get; set; }
        List<TestCase> testcases { get; set; }
    }
}
