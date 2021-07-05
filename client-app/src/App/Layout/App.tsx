import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../Models/Activity';
import NavBar from './NavBar';
import Dashboard from '../../feature/activities/dashboard/Dashboard';
import { v4 as uuid } from 'uuid';
import agent from '../Api/Agent';
import Loadingcomponent from './Loadingcomponnent';
function App() {

  const [activities, setactivities] = useState<Activity[]>([]);
  const [Selectedactivity, SetSelectedActivity] = useState<Activity | undefined>(undefined);
  const [Editmode, seteditmode] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [Submetting, setsubmetting] = useState(false);
  useEffect(() => {
    agent.activities.list().then(Response => {
      let activities: Activity[] = [];
      Response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      })
      setactivities(activities);
      setLoading(false);
    }
    )
  }, [])
  function handleSelectedActivity(id: string) {
    SetSelectedActivity(activities.find(x => x.id === id));
  }
  function cancelActivity() {
    SetSelectedActivity(undefined);
  }
  function handleopenform(id?: string) {
    id ? handleSelectedActivity(id) : cancelActivity();
    seteditmode(true);
  }
  function handlecloseform() {
    seteditmode(false);
  }
  function handlecreateoredit(activity: Activity) {
    setsubmetting(true);
    if (activity.id) {
      agent.activities.update(activity).then(() => {
        setactivities([...activities.filter(x => x.id !== activity.id), activity])
      })
      seteditmode(false);
      SetSelectedActivity(activity);
      setsubmetting(false)
    }
    else{
      activity.id =uuid();
      agent.activities.create(activity).then(()=>{
        setactivities([...activities, activity])
        seteditmode(false);
        SetSelectedActivity(activity);
        setsubmetting(false)
      }
      )
    }
  }
  function handledelte(id: string) {
    setsubmetting(true);
    agent.activities.delete(id).then(()=>{
      setactivities([...activities.filter(x => x.id !== id)]);
      setsubmetting(false)
    })
  }
  if (Loading) return <Loadingcomponent content='Loading APP' />
  return (
    <>
      <NavBar openform={handleopenform} />
      <Container style={{ marginTop: '7em' }}>
        <Dashboard activities={activities}
          selectedactivity={Selectedactivity}
          selectActivity={handleSelectedActivity}
          CancelActivity={cancelActivity}
          editmode={Editmode}
          openform={handleopenform}
          closeform={handlecloseform}
          creatoredit={handlecreateoredit}
          deleteactivity={handledelte}
          submetting = {Submetting}
        />
      </Container>
    </>
  );
}

export default App;
