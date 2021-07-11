import React from "react";
import { Image, Card, Button } from "semantic-ui-react";
import Loadingcomponent from "../../../App/Layout/Loadingcomponnent";
import { useStore } from "../../../App/Stores/Store";

export default function Details() {
    const { ActivityStore } = useStore();
    const { selectedActivity: activity, openAcvtivity, cancelActivity } = ActivityStore;
    if (!activity) return <Loadingcomponent/>;
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
                <Button.Group widths='2'>
                    <Button onClick={() => openAcvtivity(activity.id)} basic color='blue' content='Edit' />
                    <Button onClick={cancelActivity} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>

    );
}