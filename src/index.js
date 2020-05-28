/** scripts */
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/carousel';
import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/src/tab';
/**------ */
import '@fortawesome/fontawesome-free/css/all.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'animate.css';
import 'hover.css/css/hover-min.css';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './estilos.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { LicenseManager } from "ag-grid-enterprise";
LicenseManager.setLicenseKey("[TRIAL]_23_December_2019_[v2]_MTU3NzA1OTIwMDAwMA==39f3c0363abb64b1ded83c423732dd51");

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();