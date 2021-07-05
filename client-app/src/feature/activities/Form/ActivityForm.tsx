import React from "react";
import {ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../App/Models/Activity";
interface props {   
    activity: Activity | undefined;
    closeform:()=>void;
    creatoredit:(activity:Activity)=>void;
}
export default function Activityform({closeform, activity:selectedactivity,creatoredit}:props){
    const intialState = selectedactivity ??{
        id: '',
        title:'',
        category:'',
        description:'',
        date:'',
        city:'',
        enue:'',
    } 
    function handlesubmit(){
        creatoredit(activity);
    }
    function inputchange(event:ChangeEvent<HTMLInputElement> ){
        const{name,value}= event.target;
        setactivity({...activity,[name]:value})
    }
    const [activity,setactivity] = useState(intialState);
    return(
        <Segment clearing>
            <Form onSubmit = {handlesubmit} autoComplete = 'off'>
                <Form.Input placeholder = 'Tittle' value = {activity.title} name='title' onChange={inputchange}/>
                <Form.Input placeholder = 'Description'value = {activity.description} name='description' onChange={inputchange}/>
                <Form.Input placeholder = 'Category'value = {activity.category} name='category' onChange={inputchange}/>
                <Form.Input placeholder = 'Date'value = {activity.date} name='date' onChange={inputchange}/>
                <Form.Input placeholder = 'City'value = {activity.city} name='city' onChange={inputchange}/>
                <Form.Input placeholder = 'Aveneu'value = {activity.enue} name='enue' onChange={inputchange}/>
                <Button floated = 'right' positive type = 'Submit' content='Submit'/>
                <Button onClick = {closeform} floated = 'right'  type = 'button' content='Cancel'/>
            </Form>
        </Segment>
    )
}