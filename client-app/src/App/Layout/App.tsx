import React, { useEffect } from 'react';
import {  Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import Dashboard from '../../feature/activities/dashboard/Dashboard';
import Loadingcomponent from './Loadingcomponnent';
import { useStore } from '../Stores/Store';
import { observer } from 'mobx-react-lite';
function App() {

  const {ActivityStore} = useStore();

  useEffect(() => {
    ActivityStore.loadActivities();
  }, [ActivityStore])
  
  if (ActivityStore.loadingInitial) return <Loadingcomponent content='Loading APP' />
  return (
    <>
      <NavBar  />
      <Container style={{ marginTop: '7em' }}>
        <Dashboard/>
      </Container>
    </>
  );
}

export default observer(App);
