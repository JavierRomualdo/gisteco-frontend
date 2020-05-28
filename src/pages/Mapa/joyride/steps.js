import {
    mainMenuInfo,
    googleAutocompleteInfo,
    userMenuInfo,
    sidebarInfo,
    capasInfo,
    tareasInfo,
    medicionInfo,
    info,
    leyendaInfo,
    impresionInfo,
    reportesInfo,
    indentificationInfo,
    streetViewInfo
} from "./components";

export default [
    {
        target: "#mainMenuWdgt",
        content: mainMenuInfo,
        placement: 'bottom',
        disableBeacon: true
    },
    {
        target: "#identificationWdgt",
        content: indentificationInfo,
        placement: 'bottom'
    },
    {
        target: '#googleAutocompleteWdgt',
        content: googleAutocompleteInfo,
        placement: 'bottom'
    },
    {
        target: '#userMenuWdgt',
        content: userMenuInfo,
        placement: 'bottom'
    },
    {
        target: '.sidebar .sidebar-tabs ul',
        content: sidebarInfo,
        placement: 'right'
    },
    {
        target: '.sidebar ul li:nth-child(1)',
        content: capasInfo,
        placement: 'right'
    },
    {
        target: '.sidebar ul li:nth-child(2)',
        content: tareasInfo,
        placement: 'right'
    },
    {
        target: '.sidebar ul li:nth-child(3)',
        content: medicionInfo,
        placement: 'right'
    },
    {
        target: '.sidebar ul li:nth-child(4)',
        content: info,
        placement: 'right'
    },
    {
        target: '.sidebar ul li:nth-child(5)',
        content: leyendaInfo,
        placement: 'right'
    },
    {
        target: '.sidebar ul li:nth-child(6)',
        content: impresionInfo,
        placement: 'right'
    },
    {
        target: '.sidebar ul li:nth-child(7)',
        content: reportesInfo,
        placement: 'right'
    }, {
        target: '.sidebar ul li:nth-child(8)',
        content: streetViewInfo,
        placement: 'right'
    }
];