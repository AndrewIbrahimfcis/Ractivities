import { format } from "date-fns";
import { makeAutoObservable, runInAction } from "mobx"
import agent from "../Api/Agent"
import { Activity } from "../Models/Activity"


export default class ActivityStore {
    //activities: Activity[] = []
    activityRegester = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined
    editMode = false
    loading = false
    loadingInitial = false

    constructor() {
        makeAutoObservable(this)
    }
    get activitybydate() {
        return Array.from(this.activityRegester.values()).sort((a, b) => a.date!.getTime() - b.date!.getTime());
    }
    get groupactivities(){
        return Object.entries(
            this.activitybydate.reduce((activities,activity)=>{
            const date=format(activity.date!,'dd MMM yyyy');
            activities[date]=activities[date]?[...activities[date],activity]:[activity];
            return activities;
            },{} as {[key:string]:Activity[]})
        )
    }
    loadActivities = async () => {
        this.setloadingInitial(true);
        try {
            const activities = await agent.activities.list();
            activities.forEach(activity => {
                this.setActivity(activity);
            })
            this.setloadingInitial(false)
        }
        catch (error) {
            console.log(error)
            this.setloadingInitial(false)
        }
    }

    loadActivity = async (id: string)=>{
        let activity = this.getactivity(id);
        if (activity) {
            this.selectedActivity = activity;
            return activity;
        }
        else {
            this.loadingInitial = true;
            try {
                activity = await agent.activities.details(id);
                this.setActivity(activity);
                this.selectedActivity=activity;
                this.setloadingInitial(false);
                return activity;
            }
            catch (error) {
                console.log(error)
                this.setloadingInitial(false);
            }
        }
    }
    private setActivity = (activity: Activity) => {
        activity.date = new Date(activity.date!);
        this.activityRegester.set(activity.id, activity);
    }

    private getactivity = (id: string) => {
        return this.activityRegester.get(id);
    }

    setloadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
    
    createActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.activities.create(activity)
            runInAction(() => {
                this.activityRegester.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        }
        catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.activities.update(activity)
            runInAction(() => {
                this.activityRegester.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        }
        catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.activities.delete(id);
            runInAction(() => {
                this.activityRegester.delete(id);
                this.loading = false;
            })

        }
        catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}