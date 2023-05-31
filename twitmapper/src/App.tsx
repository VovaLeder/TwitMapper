import React, { lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const LoginPage = lazy(() => import('./pages').then((e) => ({ default: e.LoginPage })));
const MainPage = lazy(() => import('./pages').then((e) => ({ default: e.MainPage })));

export function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" Component={LoginPage} />
          <Route path="/main" Component={MainPage} />
          <Route path="/" element={<Navigate replace to="/login"/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
