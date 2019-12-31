namespace Legion.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Legion.Models;
    using Legion.Services;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;

    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class KeywordController : Controller
    {
        private readonly ILogger<PhotographController> logger;
        private readonly IPhotographService photographService;

        public KeywordController(ILogger<PhotographController> logger, IPhotographService photographService)
        {
            this.logger = logger;
            this.photographService = photographService;
        }

        [HttpGet]
        public async Task<ActionResult<List<KeywordModel>>> GetAll()
        {
            List<KeywordModel> photographs = await this.photographService.GetAllKeywords();
            this.logger.LogInformation($"GetAll: returning {photographs.Count}");

            return this.Ok(photographs);
        }
    }
}