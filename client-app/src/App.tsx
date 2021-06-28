import React, { useEffect, useState } from 'react';
//import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';
function App() {

  const[activity,setactivities] = useState([]);
  useEffect(()=>{
    axios.get('http://Localhost:5000/api/activities').then(
      Response =>{
        console.log(Response);
        setactivities(Response.data)
      }
    )
  },[])


  return (
    
    <div>
      <Header as ='h2' icon='users' content = 'reactivites'/>
       
        <List>
          {activity.map((activity:any)=>(
            <List.Item key ={activity.id}>
              {activity.title}
            </List.Item>
          ))}
        </List>
    </div>
  );
}

export default App;
