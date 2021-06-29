using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Presistence;

namespace Application.Activities
{
    public class Delete
    {
        public class command : IRequest
        {
            public Guid Id { get; set; }
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
                var activity = await context.Activities.FindAsync(request.Id);
                context.Remove(activity);
                await context.SaveChangesAsync();
                return Unit.Value;
            }
        }

    }
}