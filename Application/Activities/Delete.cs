using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Presistence;

namespace Application.Activities
{
    public class Delete
    {
        public class command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<command,Result<Unit>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<Unit>> Handle(command request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities.FindAsync(request.Id);
                // if(activity == null)
                //     return null;
                context.Remove(activity);
                var result = await context.SaveChangesAsync()>0;
                if(!result)
                    return Result<Unit>.Failure("Failed to delete Activity");
                return Result<Unit>.Success(Unit.Value);
            }
        }

    }
}