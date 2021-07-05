import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../App/Models/Activity";
import ActivityDetails from "../Details/ActivityDetails";
import Activityform from "../Form/ActivityForm";
import Activitylist from "./Activitylist";

interface props {
    activities: Activity[];
    selectedactivity: Activity | undefined;
    selectActivity: (id: string) => void;
    CancelActivity: () => void;
    editmode: boolean;
    openform:(id:string)=>void;
    closeform:()=>void;
    creatoredit:(activity:Activity)=>void;
    deleteactivity:(id:string)=>void;
    submetting:boolean;
}

export default function Dashboard({ activities, selectedactivity, selectActivity, CancelActivity, editmode,
openform, closeform, creatoredit, deleteactivity,submetting}: props) {
    return (
        <Grid>
            <Grid.Column width='10' >
                <Activitylist activities={activities}
                 selectActivity = {selectActivity} 
                 deleteactivity = {deleteactivity}
                 submetting ={submetting}
                />
            </Grid.Column>
            <Grid.Column width='6' >
                {selectedactivity && !editmode &&
                <ActivityDetails
                    activity={selectedactivity}
                    CancelActivity={CancelActivity}
                    openform = {openform}
                />}
                {editmode &&
                <Activityform
                closeform = {closeform}
                activity = {selectedactivity} 
                creatoredit={creatoredit} 
                submetting = {submetting}
                />}

            </Grid.Column>

        </Grid>
    );
}