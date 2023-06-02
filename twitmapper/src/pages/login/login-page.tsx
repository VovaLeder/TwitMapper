import * as React from "react";
import { Button, Tab, TextField} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { StackPanel } from "src/ui";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { withRouter, RouterProps, setSession } from 'src/features';
import { Navigate } from 'react-router-dom';

const StyledPage = styled.div`
    width: 30%;
    height: 30%;
    margin: auto;
    margin-top: 15%;
`;

type LogRegFormProps = {
    action: "register" | "login",
    router: RouterProps,
};

function LogRegForm(props: LogRegFormProps) {
    const [errorsValue, setErrorsValue] = useState( { hasError: false, errorMsg: ""});

    function onSubmit(event: any) {
        event.preventDefault();

        const req = {
            login: event.target.login.value,
            pass: event.target.pass.value
        }

        axios.post(`http://127.0.0.1:8080/${props.action === "register" ? "reg" : "login"}`, req)
            .then(response => {
                if (props.action === "register") {
                    setErrorsValue( { hasError: true,  errorMsg: "Успешная регистрация. Вы можете войти в аккаунт." }); 
                }
                else {
                    setSession(response.data.data.token, req.login);
                    props.router.navigate("/main");
                }
            })
            .catch(err => {
                setErrorsValue( { hasError: true,  errorMsg: err.response.data.error.description });
            })
            .catch(err => {
                console.error(err);
                setErrorsValue( { hasError: true,  errorMsg: "Произошла непредвиденная ошибка. Обратитесь к администратору." });
            });
    }

    return (
        <form onSubmit={onSubmit}>
            <StackPanel orientation={"vertical"}>
                <TextField error = {errorsValue.hasError} placeholder="Логин" name="login" />
                <TextField error = {errorsValue.hasError} helperText={errorsValue.errorMsg} placeholder="Пароль" name="pass" type="password" />
                <Button type="submit">{props.action === "register" ? "Зарегестрироваться" : "Войти"}</Button>
            </StackPanel>
        </form>
    )
}

type LoginPageProps = {
    authorized: string;
    router: RouterProps,
} 

function LoginPage(props: LoginPageProps) {
    const [tabValue, setTabValue] = useState("1");

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
    };

    return (
        <StyledPage>
            {(sessionStorage.getItem("login") != null) && <Navigate replace to="/main"/>}
            <TabContext value={tabValue}>
                <TabList onChange={handleTabChange}>
                    <Tab label="Регистрация" value="0" />
                    <Tab label="Вход" value="1" />
                </TabList>
                <TabPanel value="0">{LogRegForm({action: "register", router: props.router})}</TabPanel>
                <TabPanel value="1">{LogRegForm({action: "login", router: props.router})}</TabPanel>
            </TabContext>
        </StyledPage>
    );
}

export default withRouter(LoginPage);