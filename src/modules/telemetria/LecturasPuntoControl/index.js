import React, { useState, useEffect, useRef, useCallback } from 'react';
import TabComponentContainer from '../../global/components/TabComponentContainer';
import { TabView, TabPanel } from 'primereact/tabview'
import { useQuery } from 'react-apollo-hooks';
import { LECTURAS_PUNTO_CONTROL } from '../queries';
import { formatChartData, formatChartOptions, initFormData, formatFormData4ChartQuery } from './utils';
import FormControl from './subcomponents/FormControl';
import TablaLecturas from './subcomponents/TablaLecturas';
import { Scatter, Bar } from 'react-chartjs-2';

/*
    puntoControl is a 'puntoControl' GraphQLType
*/

const initialFormData = initFormData();

const ChartData = ({ children, variables }) => {
    const { data, loading, error } = useQuery(LECTURAS_PUNTO_CONTROL, { variables });
    if (loading) return <p className='font-weight-bold text-primary text-center'>Cargando...</p>;
    if (error) return <p className='font-weight-bold text-danger'>{error.message}</p>;
    return children(
        formatChartData(data.telemetria.puntoControl.lecturas, variables),
        formatChartOptions(variables),
        data.telemetria.puntoControl.lecturas
    )
}

export default ({ puntoControl }) => {

    const [chartVariables, setChartVariables] = useState(formatFormData4ChartQuery(puntoControl.id, initialFormData));
    const formRef = useRef(null);

    const updateChartVariables = useCallback(function () {
        const queryData = formatFormData4ChartQuery(puntoControl.id, formRef.current.getData());
        setChartVariables(queryData);
    }, [puntoControl.id]);

    useEffect(() => {
        updateChartVariables();
    }, [puntoControl, updateChartVariables])

    function handleFormSubmit(e) {
        e.preventDefault();
        updateChartVariables();
    }

    const { propiedadFisica } = chartVariables;
    const Chart = propiedadFisica === 'consumo' ? Bar : Scatter;

    return (
        <TabComponentContainer>
            <p>
                <strong className='mr-2'>Punto de control:</strong>{puntoControl.nombre}
                <strong className='mx-2'>Código:</strong>{puntoControl.codigo}
            </p>
            <FormControl
                ref={formRef}
                initialData={initialFormData}
                onSubmit={handleFormSubmit}
            />
            <div className='mt-2'>
                <ChartData variables={chartVariables}>
                    {(data, options, lecturas) => {
                        return (
                            <TabView renderActiveOnly={false}>
                                <TabPanel header="Gráfico">
                                    <div style={{ width: '100%', height: '500px' }}>
                                        <Chart
                                            data={data}
                                            options={options}
                                            height={500}
                                        />
                                    </div>
                                </TabPanel>
                                {
                                    lecturas.map((lectura, index) => {
                                        return (
                                            <TabPanel
                                                key={index}
                                                header={lectura.id_medidor || lectura.variable_control}
                                            >
                                                <TablaLecturas lecturas={lectura.lecturas} />
                                            </TabPanel>
                                        );
                                    })
                                }
                            </TabView>
                        )
                    }}
                </ChartData>
            </div>
        </TabComponentContainer >
    );
}