using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;
using TestAdvance.Entities.Concrete;

namespace TestAdvance.DataAccess.DataContexts
{
    public class TestContext:DbContext
    {
        public TestContext(DbContextOptions<TestContext> options) : base(options)
        {

        }

     

        public DbSet<TestCase> TestCases { get; set; }
        public DbSet<TestSuite> TestSuites { get; set; }
        public DbSet<Modul> Moduls { get; set; }
        public DbSet<TestRun> TestRuns { get; set; }
        public DbSet<TestRunDetails> TestRunDetails { get; set; }
    }
}
