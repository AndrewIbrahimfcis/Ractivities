using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Presistence;

namespace Application.Activities
{
    public class Create
    {
        public class command : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }
        }
        public class commandvalidator : AbstractValidator<command>
        {
            public commandvalidator()
            {
                RuleFor(x=>x.Activity).SetValidator(new ActivityValidator());
            }
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
                context.Activities.Add(request.Activity);
                var result = await context.SaveChangesAsync()>0;
                if(!result)
                    return Result<Unit>.Failure("Failed to create activity");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}