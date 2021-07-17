using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Presistence;

namespace Application.Activities
{
    public class Details
    {
        public class Query:IRequest<Result<Activity>>{
            public Guid ID {get;set;}  
            
        }
        public class Handler : IRequestHandler<Query, Result<Activity>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity=  await this.context.Activities.FindAsync(request.ID);
                return Result<Activity>.Success(activity);
            }
        }
    }
}