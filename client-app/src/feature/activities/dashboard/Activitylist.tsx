import React from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../App/Models/Activity";
interface props {
    activities: Activity[];
    selectActivity:(id:string)=>void;
    deleteactivity:(id:string)=>void;
}
export default function Activitylist({ activities, selectActivity, deleteactivity}: props) {
    return (
        <Segment>
            <Item.Group>
                {activities.map(activity =>
                    <Item key={activity.id} >
                        <Item.Content>
                            <Item.Header as='a' >{activity.title}</Item.Header>
                            <Item.Meta >{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.enue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={()=>selectActivity(activity.id)} floated='right' content='View' color='blue'></Button>
                                <Button onClick={()=>deleteactivity(activity.id)} floated='right' content='Delete' color='red'></Button>
                                <Label basic content = {activity.category}></Label>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                )}

            </Item.Group>

        </Segment>
    );

}