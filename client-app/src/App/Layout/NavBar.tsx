import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
interface props{
    openform:()=>void;
}

export default function Navbar({openform}:props) {
    return (
        <Menu inverted fixed = 'top'>
            <Container>
                <Menu.Item header>
                    <img src="../assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities' />
                <Menu.Item>
                    <Button onClick= {openform} positive content='Creat Activity' />
                </Menu.Item>
            </Container>

        </Menu>
    );
}