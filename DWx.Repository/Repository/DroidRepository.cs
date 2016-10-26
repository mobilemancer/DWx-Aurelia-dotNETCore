using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using DWx.Repository.DTO;

namespace DWx.Repository.Repository
{
    public class DroidRepository : IDroidRepository
    {
        private static ConcurrentDictionary<int, Model.Droid> repo { get; } = new ConcurrentDictionary<int, Model.Droid>();
        private static int id;
        public DroidRepository()
        {
            Seed();
        }

        public bool Create(Droid newDroid)
        {
            var droid = new Model.Droid(newDroid);
            newDroid.Id = id++;
            repo.TryAdd(newDroid.Id, new Model.Droid(newDroid));
            return true;
        }

        public Droid Delete(int id)
        {
            Model.Droid modelDroid;
            repo.TryRemove(id, out modelDroid);
            return new Droid(modelDroid);
        }

        public Droid Get(int id)
        {
            var droid = repo.Values.FirstOrDefault(d => d.Id == id);
            if (droid != null)
            {
                return new Droid(droid);
            }
            return null;
        }

        public IEnumerable<Droid> GetAll()
        {
            var droids = new List<Droid>();
            foreach (var droid in repo.Values)
            {
                var newDroid = new Droid(droid);
                droids.Add(newDroid);
            }
            return droids.OrderBy(d => d.Id);
        }

        public Droid Update(Droid droid)
        {
            if (repo.ContainsKey(droid.Id))
            {
                droid.Id = repo[droid.Id].Id;
                repo[droid.Id] = new Model.Droid(droid);
                return droid;
            }
            return null;
        }

        /// <summary>
        /// Seed the database with a few initial droids
        /// </summary>
        private static void Seed()
        {
            var ig88B = new Model.Droid
            {
                Id = id++,
                ImperialContractId = Guid.Parse("0B450FDD-F484-423B-8685-4193E9FA583D"),
                Name = "IG-88B",
                CreditBalance = 4500000,
                ProductSeries = "IG-88",
                Height = 1.96M,
                Armaments = new List<string> {
                    "DAS-430 Neural Inhibitor", "Heavy pulse cannon", "Poison darts",
                    "Toxic gas dispensers", "Vibroblades"
                },
                Equipment = new List<string>()
            };
            repo.TryAdd(ig88B.Id, ig88B);

            var c3po = new Model.Droid
            {
                Id = id++,
                Name = "C-3PO",
                ProductSeries = "3PO-series Protocol Droid",
                Height = 1.71M,
                Armaments = new List<string>(),
                Equipment = new List<string>
                {
                    "TranLang III communication module"
                }
            };
            repo.TryAdd(c3po.Id, c3po);

            var r2d2 = new Model.Droid
            {
                Id = id++,
                Name = "R2-D2",
                ProductSeries = "R-Series",
                Height = 0.96M,
                Armaments = new List<string> {
                    "Buzz saw", "Electric pike"
                },
                Equipment = new List<string>
                {
                    "Drinks tray (only on sail barge)", "Fusion welder",
                    "Com link", "Power recharge coupler",
                    "Rocket boosters", "Holographic projector/recorder",
                    "Motorized, all-terrain treads", "Retractable third leg",
                    "Periscope", "Fire extinguisher", "Hidden lightsaber compartment with ejector",
                    "Data probe", "Life-form scanner", "Utility arm"
                }
            };
            repo.TryAdd(r2d2.Id, r2d2);
        }
    }
}