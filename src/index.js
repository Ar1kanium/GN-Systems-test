import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import dayjs from "dayjs";
require('dayjs/locale/ru')

dayjs.locale('ru')

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
