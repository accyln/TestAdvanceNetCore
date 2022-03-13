﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using TestAdvance.Entities.Concrete;

namespace TestAdvance.DataAccess.DataContexts
{
    public class AdvanceContext:DbContext
    {
        public AdvanceContext() :base()
        {

        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer("Server=DESKTOP-HF8RPF0\\SQLEXPRESS;Database=Tesuto;Trusted_Connection=True;MultipleActiveResultSets=true");
        }
         protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }

        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<TestCase> TestCases { get; set; }
        public DbSet<TestSuite> TestSuites { get; set; }
        public DbSet<Modul> Moduls { get; set; }
        public DbSet<TestRun> TestRuns { get; set; }
        public DbSet<TestRunDetail> TestRunDetails { get; set; }
    }
}