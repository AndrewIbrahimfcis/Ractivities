import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../Models/Activity';
import NavBar from './NavBar';
import Dashboard from '../../feature/activities/dashboard/Dashboard';
import {v4 as uuid} from 'uuid';
function App() {

  const [activities, setactivities] = useState<Activity[]>([]);
  const [Selectedactivity, SetSelectedActivity] = useState<Activity | undefined>(undefined);
  const [Editmode,seteditmode]= useState(false); 
  useEffect(() => {
    axios.get<Activity[]>('http://Localhost:5000/api/activities').then(
      Response => {
        console.log(Response);
        setactivities(Response.data)
      }
    )
  }, [])
  function handleSelectedActivity(id: string) {
    SetSelectedActivity(activities.find(x => x.id === id));
  }
  function cancelActivity() {
    SetSelectedActivity(undefined);
  }
  function handleopenform(id ?: string){
    id? handleSelectedActivity(id) : cancelActivity();
    seteditmode(true);
  }
  function handlecloseform(){
    seteditmode(false);
  }
  function handlecreateoredit(activity:Activity){
    activity.id ? setactivities([...activities.filter(x=>x.id !== activity.id),activity]) :
    setactivities([...activities,{...activity,id: uuid()}])
    seteditmode(false);
    SetSelectedActivity(activity);
  }
  function handledelte(id:string){
    setactivities([...activities.filter(x=>x.id !== id)]); 
  }

  return (
    <>
      <NavBar openform = {handleopenform} />
      <Container style={{ marginTop: '7em' }}>
        <Dashboard activities={activities}
         selectedactivity ={Selectedactivity}
         selectActivity = {handleSelectedActivity}
         CancelActivity = {cancelActivity}
         editmode = {Editmode}
         openform = {handleopenform}
         closeform = {handlecloseform}
         creatoredit = {handlecreateoredit}
         deleteactivity = {handledelte}
        />
      </Container>
    </>
  );
}

export default App;
