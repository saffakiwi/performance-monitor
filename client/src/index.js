import React from 'react';
import './index.css';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import ClientMonitor from './pages/clientMonitor';
import Home from './pages/home';
import Landing from './pages/landing';

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/home" element={<Home/>}/>
    <Route path="/client" element={<ClientMonitor/>}/>
    </Routes>
  </BrowserRouter>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
