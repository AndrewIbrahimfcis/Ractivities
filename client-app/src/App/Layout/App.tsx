import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import Homepage from '../../feature/activities/Home/Homepage';
import Dashboard from '../../feature/activities/dashboard/Dashboard';
import ActivityForm from '../../feature/activities/Form/ActivityForm';
import Details from '../../feature/activities/Details/ActivityDetails';
function App() {
  const loacation = useLocation();
  return (
    <>
      <Route exact path='/' component={Homepage} />
      <Route path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Route exact path='/activities' component={Dashboard} />
              <Route path='/activities/:id' component={Details} />
              <Route key={loacation.key} path={['/CreateActivity', '/manage/:id']} component={ActivityForm} />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
