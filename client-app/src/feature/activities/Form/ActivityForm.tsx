import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import {  useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import Loadingcomponent from "../../../App/Layout/Loadingcomponnent";
import { useStore } from "../../../App/Stores/Store";
import { Formik ,Form } from "formik";
import * as yup from 'yup';
import MytextInput from "../../../App/Common/Form/MyTextinput";
import MytextArea from "../../../App/Common/Form/Mytextarea";
import MySelectedInput from "../../../App/Common/Form/MySelectedInput";
import { categoryoptions } from "../../../App/Common/Options/Options";
import MyDateresuable from "../../../App/Common/Form/TheDateResubl";
import { Activity } from "../../../App/Models/Activity";
import { v4 as uuid } from 'uuid';
export default observer( function Activityform() {
    const history = useHistory();
    const { ActivityStore } = useStore();
    const { createActivity, updateActivity, loading ,loadActivity,loadingInitial} = ActivityStore;
    const { id } = useParams<{ id: string }>()
    const [activity,setactivity]=useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: null,
        city: '',
        enue: '',
    })
    const validationSchema=yup.object({
        title:yup.string().required('the activity title is required'),
        description:yup.string().required('the activity Description is required'),
        category:yup.string().required('the activity Category is required'),
        date:yup.string().required('the activity Date is required'),
        city:yup.string().required('the activity City is required'),
        enue:yup.string().required('the activity Venue is required'),
    })
    useEffect(() => {
        if(id) loadActivity(id).then(activity=>setactivity(activity!)); 
    }, [id, loadActivity]);
  
    function handleFormsubmit(activity:Activity) {
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
  
    if(loadingInitial) return <Loadingcomponent content = 'Loading activity....'/>
    return (
        <Segment clearing>
            <Header content='Activity Details'sub color='teal'/>
            <Formik validationSchema={validationSchema} enableReinitialize initialValues = {activity} onSubmit={values=>handleFormsubmit(values)}>
                {({handleSubmit,isValid,isSubmitting,dirty})=>(
                    
            <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                <MytextInput placeholder='Title' name='title' />
                <MytextArea row={3} placeholder='Description' name='description'  />
                <MySelectedInput options ={categoryoptions} placeholder='Category'  name='category'  />
                <MyDateresuable
                    placeholderText='Date'  
                    name='date'
                    showTimeSelect
                    timeCaption = 'time'
                    dateFormat ='MMMM d, yyyy h:m aa'
                />
            <Header content='Location Details'sub color='teal'/>
                <MytextInput placeholder='City' name='city'  />
                <MytextInput placeholder='Veneu' name='enue' />
                <Button 
                    disabled={isSubmitting||!dirty||!isValid}
                    loading={loading} floated='right' positive type='Submit' content='Submit' />
                <Button as = {Link} to='/activities' floated='right' type='button' content='Cancel' />
            </Form>
                )}
            </Formik>
        </Segment>
    )
})