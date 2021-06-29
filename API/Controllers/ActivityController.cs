using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Presistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> Getactivities()
        {
            return await mediator.Send(new List.Query());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id) 
        {
            return await mediator.Send(new Details.Query{ID = id});
        }
        [HttpPost]
        public async Task<IActionResult> createActivity(Activity activity){
            return Ok(await mediator.Send(new Create.command {Activity=activity}));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity( Guid id ,Activity activity)
        {
            activity.id = id;
            return Ok(await mediator.Send(new Edit.command{Activity=activity}));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return Ok(await mediator.Send(new Delete.command{Id=id}));
        }
    }

}