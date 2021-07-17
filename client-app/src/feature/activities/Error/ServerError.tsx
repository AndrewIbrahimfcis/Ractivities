import { observer } from "mobx-react-lite";
import React from "react";
import { Container, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../../App/Stores/Store";
export default observer( function ServerError(){
    const{commanstore}=useStore();
    return(
        <Container>
            <Header as='h1'content='Server Error'/>
            <Header sub as='h5'color='red' content={commanstore.error?.message}/>
            {
                commanstore.error?.details &&
                <Segment>
                    <Header as = 'h4'content='Stack trace' color='teal'/>
                    <code style={{marginTop:'10px   '}}>{commanstore.error.details}</code>
                </Segment>
            }
        </Container>
    )
})