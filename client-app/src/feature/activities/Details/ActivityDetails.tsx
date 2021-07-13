import { observer } from "mobx-react-lite";
import React from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Image, Card, Button } from "semantic-ui-react";
import Loadingcomponent from "../../../App/Layout/Loadingcomponnent";
import { useStore } from "../../../App/Stores/Store";

export default observer (function Details() {
    const { ActivityStore } = useStore();
    const { selectedActivity: activity, loadActivity,loadingInitial } = ActivityStore;
    const { id } = useParams<{ id: string }>()
    useEffect(() => {
        if (id) loadActivity(id);
    }, [id, loadActivity]);

    if (loadingInitial || !activity) return <Loadingcomponent />;
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
                    <Button as= {Link} to={`/manage/${activity.id}`} basic color='blue' content='Edit' />
                    <Button as={Link} to = {'/activities'} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>

    );
})