import React from 'react';
import { Query } from 'react-apollo';
import { CONSUMOS_USUARIO } from './queries';
import { Line } from 'react-chartjs-2';
import { chartOptions, formatChartData } from './config';
import withDashboardControl from '../../../global/components/Informacion/subcomponents/withDashboardControl';
import { INFO_COLLAPSE_ID } from '../../../global/components/Informacion/values';
import PanelOpciones from '../../../global/components/Medicion/subcomponents/PanelOpciones';
import { LoadingIcon } from '../../../../lib/icons';

const Grafico = ({ suministro }) => {

    return (
        <Query
            query={CONSUMOS_USUARIO}
            variables={{ suministro }}
        >
            {({ data, loading, error }) => {
                if (loading) return <div className="text-center mt-2"><LoadingIcon /></div>;
                if (error) return <p>{error.message}</p>;

                const chartData = formatChartData(data.comercial.consumosUsuario);

                return <div style={{ width: '100%', height: '500px' }}>
                    <Line
                        data={chartData}
                        height={500}
                        options={chartOptions}
                    />
                </div>
            }}
        </Query>
    );
}

const Consumos = ({
    suministro,
    nombre_usuario,
    dashboardControl: { regresar }
}) => {
    return <div>
        <PanelOpciones handleAtras={regresar} nombreCollapseBtnAtras={INFO_COLLAPSE_ID}
            titulo={`Suministro: ${suministro} - ${nombre_usuario}`} />
        <Grafico suministro={suministro} />
    </div>
}
export default withDashboardControl(Consumos);