using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Presistence;

namespace Application.Activities
{
    public class Edit
    {
        public class command : IRequest
        {
            public Activity Activity { get; set; }
        }
        public class Handler : IRequestHandler<command>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
            }

            public async Task<Unit> Handle(command request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities.FindAsync(request.Activity.id);
                mapper.Map(request.Activity,activity);
                await context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}