using DWx.Repository.DTO;
using DWx.Repository.Repository;
using Microsoft.AspNetCore.Mvc;

namespace DWx.API.Controllers
{
    [Route("api/[controller]")]
    public class DroidsController : Controller
    {
        readonly IDroidRepository droidRepo;
        public DroidsController(IDroidRepository repository)
        {
            droidRepo = repository;
        }

        /// <summary>
        /// Get all the droids
        /// </summary>
        /// <returns>all droids in the database</returns>
        [HttpGet]
        public IActionResult GetAll()
        {
            var droids = droidRepo.GetAll();
            return new OkObjectResult(droids);
        }

        /// <summary>
        /// Get a droid by id
        /// </summary>
        /// <param name="id">droid id</param>
        /// <returns>an eventual droid matching the given name</returns>
        [HttpGet("{id}", Name = nameof(GetById))]
        public IActionResult GetById(int id)
        {
            var droid = droidRepo.Get(id);
            if (droid == null)
            {
                return new NotFoundObjectResult(
                    new Error
                    {
                        HttpCode = 404,
                        Message = $"Droid with id:{id} - No such Droid in database!"
                    }
                );
            }
            return new OkObjectResult(droidRepo.Get(id));
        }

        /// <summary>
        /// Store a new droid
        /// </summary>
        /// <param name="droid">a droid</param>
        /// <returns>route to the new droid</returns>
        [HttpPost]
        public IActionResult Create([FromBody] Droid droid)
        {
            if (!ModelState.IsValid)
            {
                return new BadRequestObjectResult(new Error
                {
                    HttpCode = 400,
                    Message = $"Invalid payload: {ModelState}"
                });
            }

            var result = droidRepo.Create(droid);
            return new CreatedAtRouteResult(nameof(GetById), new { id = droid.Id }, droid);
        }


        /// <summary>
        /// Remove a droid
        /// </summary>
        /// <param name="id">id of the droid</param>
        /// <returns>HTTP 204 No Content on success</returns>
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var result = droidRepo.Delete(id);

            if (result == null)
            {
                return new BadRequestObjectResult(new Error
                {
                    HttpCode = 404,
                    Message = "No such Droid in database!"
                });
            }

            return new NoContentResult();
        }


        /// <summary>
        /// Update a droid 
        /// The entire droid is updated, the update is idempotent
        /// </summary>
        /// <param name="id">id of the droid</param>
        /// <param name="droid">new data</param>
        /// <returns>the updated droid</returns>
        [HttpPut]
        public IActionResult Update([FromBody] Droid droid)
        {
            if (!ModelState.IsValid)
            {
                return new BadRequestObjectResult(new Error
                {
                    HttpCode = 400,
                    Message = "Invalid payload"
                });
            }

            var result = droidRepo.Update(droid);

            if (result == null)
            {
                return new NotFoundObjectResult(new Error
                {
                    HttpCode = 410,
                    Message = "Could not find Droid in database!"
                });
            }

            return new OkObjectResult(droid);
        }
    }


    public class Error
    {
        public int HttpCode { get; set; }
        public string Message { get; set; }
    }
}