import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import Loadingcomponent from "../../../App/Layout/Loadingcomponnent";
import { useStore } from "../../../App/Stores/Store";
import ActivityDetailedchat from "./Activitydetailedchat";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedsideBar from "./ActivitydetailedsideBar";
import ActivityDetailedinfo from "./Activitydetaledinfo";

export default observer (function Details() {
    const { ActivityStore } = useStore();
    const { selectedActivity: activity, loadActivity,loadingInitial } = ActivityStore;
    const { id } = useParams<{ id: string }>()
    useEffect(() => {
        if (id) loadActivity(id);
    }, [id, loadActivity]);

    if (loadingInitial || !activity) return <Loadingcomponent />;
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={activity}/>
                <ActivityDetailedinfo activity={activity}/>
                <ActivityDetailedchat/>
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailedsideBar/>
            </Grid.Column>
       </Grid>

    );
})