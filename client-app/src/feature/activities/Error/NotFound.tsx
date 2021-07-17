import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
export default function notfound(){
    return(
        <Segment placeholder>
            <Header icon>
                <Icon name='search'/>
                Oops-we 'looked everyware and not find this.
            </Header>
            <Segment.Inline>
                <Button as={Link} to ='/activities' primary>
                    retun to activities
                </Button>
            </Segment.Inline>
        </Segment>
    )
}