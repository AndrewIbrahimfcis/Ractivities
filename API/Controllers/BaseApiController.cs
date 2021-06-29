using Microsoft.AspNetCore.Mvc;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        private IMediator mediatoR;
        protected IMediator mediator => mediatoR ??= HttpContext.RequestServices.GetService<IMediator>();

        
    }
}