namespace Legion.Controllers
{
    using System.Collections.Generic;
    using System.IO;
    using System.Threading.Tasks;

    using Legion.Models.Data;
    using Legion.Services;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;

    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PhotographController : ControllerBase
    {
        private readonly ILogger<PhotographController> logger;
        private readonly IPhotographService photographService;
        private readonly IImageMetadataExtractor imageMetadataExtractor;

        public PhotographController(ILogger<PhotographController> logger, IPhotographService photographService, IImageMetadataExtractor imageMetadataExtractor)
        {
            this.logger = logger;
            this.photographService = photographService;
            this.imageMetadataExtractor = imageMetadataExtractor;
        }

        [HttpGet]
        public async Task<ActionResult<List<Photograph>>> GetAll()
        {
            List<Photograph> photographs = await this.photographService.GetAll();
            this.logger.LogInformation($"GetAll: returning {photographs.Count}");

            return this.Ok(photographs);
        }

        [HttpGet("published")]
        [AllowAnonymous]
        public async Task<ActionResult<List<Photograph>>> GetPublished()
        {
            List<Photograph> photographs = await this.photographService.GetPublished();

            photographs.Sort((a, b) => a.DateTimeDigitized.HasValue && b.DateTimeDigitized.HasValue ? a.DateTimeDigitized.Value.CompareTo(b.DateTimeDigitized.Value) : 0);
            this.logger.LogInformation($"GetPublished: returning {photographs.Count}");

            return this.Ok(photographs);
        }

        [HttpGet("{id}", Name = "GetPhotograph")]
        [AllowAnonymous]
        public async Task<ActionResult<Photograph>> GetById(string id)
        {
            Photograph photograph = await this.photographService.GetPhotographByIdAsync(id);

            if (photograph == null)
            {
                return this.NotFound();
            }

            return photograph;
        }

        [HttpPatch("{id}/publish")]
        public async Task<ActionResult<Photograph>> Publish(string id)
        {
            Photograph photograph = await this.photographService.PublishPhotograph(id);

            if (photograph == null)
            {
                return this.NotFound();
            }

            return photograph;
        }

        [HttpPatch("{id}/retract")]
        public async Task<ActionResult<Photograph>> Retract(string id)
        {
            Photograph photograph = await this.photographService.RetractPhotograph(id);

            if (photograph == null)
            {
                return this.NotFound();
            }

            return photograph;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateOrCreate(string id, [FromBody] Photograph photograph)
        {
            await this.photographService.UpdatePhotograph(id, photograph);

            return this.Ok();
        }

        [HttpPost]
        public async Task<ActionResult> AddPhotographs(IFormFile file)
        {
            if (file == null || file.Length <= 0)
            {
                return this.BadRequest();
            }

            var size = file.Length;

            var filePath = Path.GetTempFileName();

            await using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            await this.photographService.AddPhotographAsync(filePath, file.FileName);

            return this.Ok(
                new
                {
                    count = 1, size, filePath,
                });
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult> UpdatePhotograph(string id, [FromBody] Photograph photograph)
        {
            await this.photographService.UpdatePhotograph(id, photograph);

            Photograph updated = await this.photographService.GetPhotographByIdAsync(id);

            return this.Ok(updated);
        }
    }
}