using Microsoft.AspNetCore.Mvc;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Application.Core;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        private IMediator mediatoR;
        protected IMediator mediator => mediatoR ??= HttpContext.RequestServices.GetService<IMediator>();

        protected ActionResult HandleResult<T>(Result<T> result)
        {
            if(result==null)
                return NotFound();
            if(result.value!=null&&result.IsSuccess)
                return Ok(result.value);
            if(result.IsSuccess&&result.value==null)
                return NotFound();
            return BadRequest(result.error);
        }
    }
}