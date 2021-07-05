import React from "react";
import { Image, Card, Button } from "semantic-ui-react";
import { Activity } from "../../../App/Models/Activity";
interface prop {
    activity: Activity;
    CancelActivity:()=>void; 
    openform:(id:string)=>void;
}
export default function Details({activity,CancelActivity,openform}:prop) {
    return (
        <Card fluid>
            <Image src={`/Assets/categoryimages/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>{activity.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
            <Button.Group widths = '2'>
                <Button onClick = {()=>openform(activity.id)} basic color = 'blue'  content = 'Edit'/>
                <Button onClick={CancelActivity} basic color = 'grey'  content = 'Cancel'/>
            </Button.Group>
            </Card.Content>
        </Card>

    );
}