//import { useState ,  SyntheticEvent } from "react";
import { format } from "date-fns/esm";
import { Link } from "react-router-dom";
import { Button, Icon, Item,  Segment } from "semantic-ui-react";
import { Activity } from "../../../App/Models/Activity";
//import { useStore } from "../../../App/Stores/Store";

interface props{
    activity:Activity;
}
export default function ActivityListitem({activity}:props){
   
    return(
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size = 'tiny' circular src='../assets/user.png'/>
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}>
                                {activity.title}
                            </Item.Header>
                            <Item.Description>Hosted by me</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name = 'clock'/>{format(activity.date!,'dd MMM yyyy h:m aa')}
                    <Icon name = 'marker'/>{activity.enue}
                </span>
            </Segment>
            <Segment secondary>
                Attends to go there
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button
                    as ={Link} 
                    to={`/activities/${activity.id}`}
                    color = 'teal'
                    floated='right'
                    content='view'
                />
            </Segment>
        </Segment.Group>
       )
}