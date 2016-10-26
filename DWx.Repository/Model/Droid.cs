using System;
using System.Collections.Generic;

namespace DWx.Repository.Model
{
    public class Droid
    {
        private DateTime CreateDate { get; } = DateTime.UtcNow;
        private DateTime EditDate { get; } = DateTime.UtcNow;
        private DateTime DeleteDate { get; } = DateTime.UtcNow;
        private bool IsDeleted { get; }

        public int Id { get; set; }
        public Guid ImperialContractId { get; set; }
        public string Name { get; set; }
        public long CreditBalance { get; set; }
        public string ProductSeries { get; set; }

        public decimal Height { get; set; }
        public decimal Weight { get; set; }
        public IEnumerable<string> Armaments { get; set; }
        public IEnumerable<string> Equipment { get; set; }

        public Droid()
        {
            CreateDate = DateTime.UtcNow;
            EditDate = DateTime.UtcNow;
            DeleteDate = DateTime.MinValue;
        }

        public Droid(DTO.Droid dtoDroid)
        {
            CreateDate = DateTime.UtcNow;
            EditDate = DateTime.UtcNow;
            DeleteDate = DateTime.MinValue;

            Id = dtoDroid.Id;
            ImperialContractId = dtoDroid.ImperialContractId;
            Name = dtoDroid.Name;
            CreditBalance = dtoDroid.CreditBalance;
            ProductSeries = dtoDroid.ProductSeries;
            Height = dtoDroid.Height;
            Weight = dtoDroid.Weight;
            Armaments = dtoDroid.Armaments;
            Equipment = dtoDroid.Equipment;
        }
    }
}