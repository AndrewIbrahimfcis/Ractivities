import React, { SyntheticEvent } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../App/Stores/Store";

export default function Activitylist() {
    const [target, settarget] = useState('');
    const { ActivityStore } = useStore();
    const{deleteActivity,activitybydate,loading}=ActivityStore;
    function handledeleteactivity(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        settarget(e.currentTarget.name);
        deleteActivity(id);
    }
    return (
        <Segment>
            <Item.Group>
                {activitybydate.map(activity =>
                    <Item key={activity.id} >
                        <Item.Content>
                            <Item.Header as='a' >{activity.title}</Item.Header>
                            <Item.Meta >{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.enue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button as ={Link} to ={`/activities/${activity.id}`} floated='right' content='View' color='blue'></Button>
                                <Button
                                    name={activity.id}
                                    loading={loading && target === activity.id}
                                    onClick={(e) => handledeleteactivity(e, activity.id)} floated='right' content='Delete' color='red'></Button>
                                <Label basic content={activity.category}></Label>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                )}

            </Item.Group>

        </Segment>
    );

}