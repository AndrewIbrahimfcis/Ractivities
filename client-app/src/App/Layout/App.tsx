import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import Homepage from '../../feature/activities/Home/Homepage';
import Dashboard from '../../feature/activities/dashboard/Dashboard';
import ActivityForm from '../../feature/activities/Form/ActivityForm';
import Details from '../../feature/activities/Details/ActivityDetails';
import TestErrors from '../../feature/activities/Error/TestError';
import { ToastContainer } from 'react-toastify';
import notfound from '../../feature/activities/Error/NotFound';
import ServerError from '../../feature/activities/Error/ServerError';
function App() {
  const loacation = useLocation();
  return (
    <>
      <Route exact path='/' component={Homepage} />
      <Route path={'/(.+)'}
        render={() => (
          <>
            <ToastContainer position= 'bottom-right' hideProgressBar/>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
            <Switch>
              <Route exact path='/activities' component={Dashboard} />
              <Route path='/activities/:id' component={Details} />
              <Route key={loacation.key} path={['/CreateActivity', '/manage/:id']} component={ActivityForm} />
              <Route path='/errors'component={TestErrors}/>
              <Route path='/server-error 'component={ServerError}/>
              <Route component={notfound}/>

            </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
