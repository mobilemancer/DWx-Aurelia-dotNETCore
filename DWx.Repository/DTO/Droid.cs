using System;
using System.Collections.Generic;

namespace DWx.Repository.DTO
{
    public class Droid
    {
        public Droid()
        {

        }
        public Droid(Model.Droid modelDroid)
        {
            Id = modelDroid.Id;
            ImperialContractId = modelDroid.ImperialContractId;
            Name = modelDroid.Name;
            CreditBalance = modelDroid.CreditBalance;
            ProductSeries = modelDroid.ProductSeries;
            Height = modelDroid.Height;
            Weight = modelDroid.Weight;
            Armaments = modelDroid.Armaments;
            Equipment = modelDroid.Equipment;
        }

        public int Id { get; set; }
        public Guid ImperialContractId { get; set; }
        public string Name { get; set; }
        public long CreditBalance { get; set; }
        public string ProductSeries { get; set; }

        public decimal Height { get; set; }
        public decimal Weight { get; set; }
        public IEnumerable<string> Armaments { get; set; }
        public IEnumerable<string> Equipment { get; set; }
    }
}
