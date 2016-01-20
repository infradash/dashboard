'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import routes from './config/routes';

ReactDOM.render(
    routes,
    document.getElementById('app')
);
