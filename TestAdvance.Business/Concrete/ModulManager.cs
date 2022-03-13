using System;
using System.Collections.Generic;
using System.Text;
using TestAdvance.Business.Interfaces;
using TestAdvance.DataAccess.Repository.Abstract;
using TestAdvance.Entities.Concrete;

namespace TestAdvance.Business.Concrete
{
    public class ModulManager : GenericManager<Modul>, IModulService
    {
        public ModulManager(IGenericDal<Modul> genericDal) : base(genericDal)
        {
        }
    }
}
