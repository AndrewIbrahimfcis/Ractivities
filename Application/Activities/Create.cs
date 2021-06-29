using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Presistence;

namespace Application.Activities
{
    public class Create
    {
        public class command : IRequest
        {
            public Activity Activity { get; set; }
        }
        public class Handler : IRequestHandler<command>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Unit> Handle(command request, CancellationToken cancellationToken)
            {
                context.Activities.Add(request.Activity);
                await context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}