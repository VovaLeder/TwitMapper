import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import axios from "axios";
import { resetSession, setSession } from './features';

const LoginPage = lazy(() => import('./pages').then((e) => ({ default: e.LoginPage })));
const MainPage = lazy(() => import('./pages').then((e) => ({ default: e.MainPage })));

const token = localStorage.getItem('token');

axios.defaults.headers.common["auth"] = token;
export function App() {
    useEffect(() => {
        axios.get(`http://127.0.0.1:8080/getMe`)
            .then(response => {
                setSession(token ?? "huh", response.data.data.login, response.data.data.isAdmin);
            })
            .catch(err => {
                resetSession();
                console.error(err.response.data.error.description)
            })
            .catch(err => {
                console.error(err);  
            });
    })

    return (
        <div className="App">
            <Suspense fallback={<CircularProgress />}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/main" element={<MainPage />} />
                        <Route path="/" element={<Navigate replace to="/login"/>}/>
                    </Routes>
                </BrowserRouter>
            </Suspense>
        </div>
    );
}
