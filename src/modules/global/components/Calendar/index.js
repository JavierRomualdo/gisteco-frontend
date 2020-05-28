import React from 'react';
import { Calendar } from 'primereact/calendar';

export const es = {
    firstDayOfWeek: 1,
    dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
    dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
    monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
    monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]
};

export default (props) =>
    <div className='p-fluid'>
        <Calendar
            showIcon={true}
            maxDate={new Date()}
            dateFormat={"dd/mm/yy"}
            inputClassName="form-control-sm"
            {...props}
            appendTo={document.getElementsByTagName('body')[0]}
            locale={es}
        />
    </div>