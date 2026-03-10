using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StarsController : ControllerBase
    {
        private static int starCount = 5;

        [HttpGet]
        public IActionResult GetStars()
        {
            return Ok(new { count = starCount });
        }

        [HttpPost("add")]
        public IActionResult AddStar()
        {
            starCount++;
            return Ok(new { count = starCount });
        }

        [HttpPost("remove")]
        public IActionResult RemoveStar()
        {
            if (starCount > 0)
                starCount--;

            return Ok(new { count = starCount });
        }
    }
}