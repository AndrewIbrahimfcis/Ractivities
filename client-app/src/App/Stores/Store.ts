import { createContext, useContext } from "react";
import ActivityStore from "./ActivityStore";
import CommanStore from "./CommanStore";

interface Store{
    ActivityStore:ActivityStore;
    commanstore:CommanStore;

}
export const store : Store={
    ActivityStore :new ActivityStore(),
    commanstore:new CommanStore()
}
export const StoreContext = createContext(store);
export function useStore(){
    return useContext(StoreContext);
}