import { useStore } from 'effector-react';
import * as React from 'react';
import { Field, Form, FieldRenderProps } from 'react-final-form';
import { Button, Input, Tab} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { StackPanel } from '../../ui';
import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';

const StyledPage = styled.div`
    width: 30%;
    height: 30%;
    margin: auto;
    margin-top: 15%;
`;

type LogRegFormProps = {
    action: 'register' | 'login';
};

function LogRegForm(props: LogRegFormProps) {

    const req = {
        login: "admin",
        pass: "admin"
    }

    function onSubmit() {
        axios.post(`http://127.0.0.1:8080/login`, req)
            .then(response => {console.log(response.data.data)})
            .catch(err => {console.log(err)});
    }

    return (
        <Form onSubmit={onSubmit}>
            {(formState) => {
                return (
                    <form onSubmit={formState.handleSubmit}>
                        <StackPanel orientation={'vertical'}>
                            <Input placeholder="Login"></Input>
                            <Input placeholder="Password" type="password"></Input>
                            <Button type="submit">{props.action === 'register' ? 'Register' : 'Login'}</Button>
                            <a href="main">Main</a>
                        </StackPanel>
                    </form>
                )
            }}
        </Form>
    )
}

export function LoginPage() {
    const [tabValue, setTabValue] = useState('0');

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
    };

    return (
        <StyledPage>
            <TabContext value={tabValue}>
                <TabList onChange={handleTabChange}>
                    <Tab label="Register" value="0" />
                    <Tab label="Log In" value="1" />
                </TabList>
                <TabPanel value="0">{LogRegForm({action: "register"})}</TabPanel>
                <TabPanel value="1">{LogRegForm({action: "login"})}</TabPanel>
            </TabContext>
        </StyledPage>
    );
}
