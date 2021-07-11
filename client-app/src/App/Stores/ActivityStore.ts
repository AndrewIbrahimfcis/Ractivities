import { makeAutoObservable, runInAction } from "mobx"
import agent from "../Api/Agent"
import { Activity } from "../Models/Activity"
import { v4 as uuid } from 'uuid';

export default class ActivityStore {
    //activities: Activity[] = []
    activityRegester = new Map<string,Activity>();
    selectedActivity: Activity | undefined = undefined
    editMode = false
    loading = false
    loadingInitial = true

    constructor() {
        makeAutoObservable(this)
    }
    get activitybydate(){
        return Array.from(this.activityRegester.values()).sort((a,b)=>Date.parse(a.date)-Date.parse(b.date));    }
    loadActivities = async () => {
        try {
            const activities = await agent.activities.list();
            activities.forEach(activity => {
                activity.date = activity.date.split('T')[0];
                this.activityRegester.set(activity.id,activity);
            })
            this.setloadingInitial(false)
        }
        catch (error) {
            console.log(error)
            this.setloadingInitial(false)
        }
    }
    setloadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
    selectActivity = (id: string) => {
        this.selectedActivity = this.activityRegester.get(id);
    }
    cancelActivity = () => {
        this.selectedActivity = undefined;
    }
    openAcvtivity = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelActivity()
        this.editMode = true
    }
    closeActivity = () => {
        this.editMode = false
    }
    createActivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuid();
        try {
            await agent.activities.create(activity)
            runInAction(() => {
                this.activityRegester.set(activity.id,activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = true;
            })
        }
        catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = true;
            })
        }
    }
    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.activities.update(activity)
            runInAction(() => {
                this.activityRegester.set(activity.id,activity);
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
                if (this.selectedActivity?.id === id)  this.cancelActivity() ;
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