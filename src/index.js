import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import 'antd/dist/antd.css';
import reportWebVitals from './reportWebVitals';
import MainMenu from './components/menu.js';
import MainContent from './components/MainContent.js';
const routing = (
  <Router>
    <div style={{display: 'flex'}}>
      <MainMenu />
      <MainContent />
    </div>
  </Router>
)

ReactDOM.render(routing,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
