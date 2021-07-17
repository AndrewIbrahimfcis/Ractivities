using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Presistence;

namespace Application.Activities
{
    public class Edit
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
            private readonly IMapper mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
            }

            public async Task<Result<Unit>> Handle(command request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities.FindAsync(request.Activity.id);
                if(activity ==null)
                    return null;
                mapper.Map(request.Activity,activity);
                var result = await context.SaveChangesAsync()>0;
                if(!result) 
                    return Result<Unit>.Failure("Cannot Update The Activity");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}