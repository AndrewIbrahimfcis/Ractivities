import React, { Fragment } from "react";
import { Header} from "semantic-ui-react";
import { useStore } from "../../../App/Stores/Store";
import ActivityListitem from "./ActivityListitem";

export default function Activitylist() {
    const { ActivityStore } = useStore();
    const { groupactivities } = ActivityStore;

    return (
        <>
            {groupactivities.map(([group, activities]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>

                    {activities.map(activity =>
                        <ActivityListitem key={activity.id} activity={activity}></ActivityListitem>
                    )}



                </Fragment>
            ))}
        </>
    );

}