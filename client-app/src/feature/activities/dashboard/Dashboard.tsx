import { observer } from "mobx-react-lite";
import React from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../App/Stores/Store";
import ActivityDetails from "../Details/ActivityDetails";
import Activityform from "../Form/ActivityForm";
import Activitylist from "./Activitylist";


export default observer(function Dashboard() {
    const {ActivityStore} = useStore();
    const{editMode,selectedActivity}=ActivityStore;
    return (
        <Grid>
            <Grid.Column width='10' >
                <Activitylist/>
            </Grid.Column>
            <Grid.Column width='6' >
                {selectedActivity && !editMode &&
                <ActivityDetails/>}
                {editMode &&
                <Activityform/>}

            </Grid.Column>

        </Grid>
    );
})