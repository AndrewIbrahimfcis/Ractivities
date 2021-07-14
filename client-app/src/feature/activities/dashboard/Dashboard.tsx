import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import Loadingcomponent from "../../../App/Layout/Loadingcomponnent";
import { useStore } from "../../../App/Stores/Store";
import ActivityFilters from "./ActivityFilters";
import Activitylist from "./Activitylist";


export default observer(function Dashboard() {
    const {ActivityStore} = useStore();
    const {activityRegester,loadActivities}=ActivityStore;

    useEffect(() => {
        if(activityRegester.size <=1)    loadActivities();
      }, [activityRegester.size,loadActivities])
      
      if (ActivityStore.loadingInitial) return <Loadingcomponent content='Loading APP' />
    return (
        <Grid>
            <Grid.Column width='10' >
                <Activitylist/>
            </Grid.Column>
            <Grid.Column width='6' >
                <ActivityFilters/>
            </Grid.Column>

        </Grid>
    );
})