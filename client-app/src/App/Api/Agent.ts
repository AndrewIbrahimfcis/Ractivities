import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { Activity } from "../Models/Activity";
import { store } from "../Stores/Store";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}
axios.defaults.baseURL = 'http://Localhost:5000/api';
axios.interceptors.response.use(async Response => {
    await sleep(1000);
    return Response;

}, (error: AxiosError) => {
    const { data, status ,config} = error.response!;
    switch (status) {
        case 400:
            if(typeof data === 'string')
            {
                toast.error(data); 
            }
            if(config.method === "get" && data.errors.hasOwnProperty('id')){
                history.push('/not-found');
            }
            if (data.errors) {
                const modelstateerror = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelstateerror.push(data.errors[key])
                    }
                } throw modelstateerror.flat()
            }
           
            break;
        case 401:
            toast.error('unauthorised');
            break;
        case 404:
            history.push('/not-found');
            break;
        case 500:
            store.commanstore.setServerError(data);
            history.push('/Server-Error');
            break;
    }
    return Promise.reject(error);
}
)
const responsebody = <T>(Response: AxiosResponse<T>) => Response.data;
const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responsebody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responsebody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responsebody),
    del: <T>(url: string) => axios.delete<T>(url).then(responsebody),
}
const activities = {
    list: () => requests.get<Activity[]>('/activities'),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => requests.post('activities', activity),
    update: (activity: Activity) => requests.put(`activities/${activity.id}`, activity),
    delete: (id: string) => requests.del(`/activities/${id}`),
}
const agent = {
    activities
}
export default agent;