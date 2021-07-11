import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../Stores/Store';

export default function Navbar() {
    const {ActivityStore} = useStore();
    return (
        <Menu inverted fixed = 'top'>
            <Container>
                <Menu.Item header>
                    <img src="../assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities' />
                <Menu.Item>
                    <Button onClick= {()=>ActivityStore.openAcvtivity()} positive content='Create Activity' />
                </Menu.Item>
            </Container>

        </Menu>
    );
}