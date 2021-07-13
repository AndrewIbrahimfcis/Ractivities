import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { ChangeEvent, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import Loadingcomponent from "../../../App/Layout/Loadingcomponnent";
import { useStore } from "../../../App/Stores/Store";
import { v4 as uuid } from 'uuid';


export default observer( function Activityform() {
    const history = useHistory();
    const { ActivityStore } = useStore();
    const { createActivity, updateActivity, loading ,loadActivity,loadingInitial} = ActivityStore;
    const { id } = useParams<{ id: string }>()
    const [activity,setactivity]=useState({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        enue: '',
    })
    useEffect(() => {
        if(id) loadActivity(id).then(activity=>setactivity(activity!)); 
    }, [id, loadActivity]);
  
    function handlesubmit() {
        if(activity.id.length === 0)
        {
            let newactivity={
                ...activity,
                id: uuid()
        }
            createActivity(newactivity).then(()=>history.push(`/activities/${activity.id}`));
        }
        else{
            updateActivity(activity).then(()=>history.push(`/activities/${activity.id}`))
        }
    }
    function inputchange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setactivity({ ...activity, [name]: value })
    }
    if(loadingInitial) return <Loadingcomponent content = 'Loading activity....'/>
    return (
        <Segment clearing>
            <Form onSubmit={handlesubmit} autoComplete='off'>
                <Form.Input placeholder='Tittle' value={activity.title} name='title' onChange={inputchange} />
                <Form.Input placeholder='Description' value={activity.description} name='description' onChange={inputchange} />
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={inputchange} />
                <Form.Input type='Date' placeholder='Date' value={activity.date} name='date' onChange={inputchange} />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={inputchange} />
                <Form.Input placeholder='Aveneu' value={activity.enue} name='enue' onChange={inputchange} />
                <Button loading={loading} floated='right' positive type='Submit' content='Submit' />
                <Button as = {Link} to='/activities' floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})