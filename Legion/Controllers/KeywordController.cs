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
        private readonly ILogger<PhotographController> logger;
        private readonly IKeywordService keywordService;

        public KeywordController(ILogger<PhotographController> logger, IKeywordService keywordService)
        {
            this.logger = logger;
            this.keywordService = keywordService;
        }

        [HttpGet]
        public async Task<ActionResult<List<KeywordModel>>> GetAll()
        {
            List<Keyword> keywords = await this.keywordService.GetAllKeywords();
            this.logger.LogInformation($"GetAll: returning {keywords.Count}");

            return this.Ok(keywords);
        }
    }
}