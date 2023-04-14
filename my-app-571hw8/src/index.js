import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './components/App'


ReactDOM.render(
    <BrowserRouter>
        <App />
        {/* <Test_App /> */}
    </BrowserRouter>,
    document.getElementById("root")
)