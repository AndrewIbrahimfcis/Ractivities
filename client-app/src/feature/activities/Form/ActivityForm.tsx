import { observer } from "mobx-react-lite";
import React from "react";
import { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../App/Stores/Store";

export default observer( function Activityform() {
    const { ActivityStore } = useStore();
    const { selectedActivity, closeActivity, createActivity, updateActivity, loading } = ActivityStore;
    const intialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        enue: '',
    }
    function handlesubmit() {
        activity.id ? updateActivity(activity) : createActivity(activity)
    }
    function inputchange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setactivity({ ...activity, [name]: value })
    }
    const [activity, setactivity] = useState(intialState);
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
                <Button onClick={closeActivity} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})