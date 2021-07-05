import axios, { AxiosResponse } from "axios";
import { Activity } from "../Models/Activity";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}
axios.defaults.baseURL = 'http://Localhost:5000/api';
axios.interceptors.response.use(async Response => {
    try {
        await sleep(1000);
        return Response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})
const responsebody = <T>(Response: AxiosResponse<T>) => Response.data;
const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responsebody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responsebody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responsebody),
    del: <T>(url: string) => axios.delete<T>(url).then(responsebody),
}
const activities = {
    list: () => requests.get<Activity[]>('/activities'),
    details: (id:string)=>requests.get<Activity>(`/activities/${id}`),
    create:(activity:Activity)=>requests.post('activities',activity),
    update:(activity:Activity)=>requests.put(`activities/${activity.id}`,activity),
    delete:(id:string)=>requests.del(`/activities/${id}`),
}
const agent = {
    activities
}
export default agent;