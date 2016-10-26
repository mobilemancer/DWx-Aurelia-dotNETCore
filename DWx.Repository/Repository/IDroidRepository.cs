using System.Collections.Generic;
using DWx.Repository.DTO;

namespace DWx.Repository.Repository
{
    public interface IDroidRepository
    {
        IEnumerable<Droid> GetAll();
        bool Create(Droid newDroid);
        Droid Get(int id);
        Droid Update(Droid droid);
        Droid Delete(int id);
    }
}
