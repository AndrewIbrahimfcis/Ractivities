import { createContext, useContext } from "react";
import ActivityStore from "./ActivityStore";

interface Store{
    ActivityStore:ActivityStore
}
export const store : Store={
    ActivityStore :new ActivityStore()
}
export const StoreContext = createContext(store);
export function useStore(){
    return useContext(StoreContext);
}