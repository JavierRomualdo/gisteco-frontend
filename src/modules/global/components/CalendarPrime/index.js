import React from 'react';
import { Calendar } from 'primereact/calendar';

const es = {
    firstDayOfWeek: 1,
    dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
    dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
    monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
    monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]
};

const CalendarPrime = ({ etiqueta, onChangeCalendar, ...props }) => (
    <div className="p-col-12 p-md-6 col-md-6">
        <label><strong>{etiqueta}</strong></label><br />
        <Calendar onChange={onChangeCalendar} {...props} locale={es} appendTo={document.getElementsByTagName('body')[0]} />
    </div>
);

export default CalendarPrime;