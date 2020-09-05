namespace Legion.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Legion.Models;
    using Legion.Models.Data;
    using Legion.Services;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;

    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class KeywordController : Controller
    {
        private readonly ILogger<KeywordController> logger;
        private readonly IPhotographService photographService;

        public KeywordController(ILogger<KeywordController> logger, IPhotographService photographService)
        {
            this.logger = logger;
            this.photographService = photographService;
        }

        [HttpGet("published")]
        [AllowAnonymous]
        public async Task<List<KeywordModel>> GetPublishedAll()
        {
            List<KeywordModel> keywords = await this.photographService.GetAllKeywords();
            this.logger.LogInformation($"GetAll: returning {keywords.Count}");

            return keywords;
        }
    }
}