import React, { useState, useEffect } from 'react';
import { Label, FormControl, Progress, FileLink } from './components'
import { Query } from 'react-apollo';
import { GET_PRINT_INFO } from './queries';
import { LoadingIcon } from '../../../../lib/icons';
import Select from '../Select';
import classnames from 'classnames';
import { getReclamo, usePrintingSheetFeature, createPrintingRequest } from './util';
import { useApolloClient } from 'react-apollo-hooks';
import { withStore } from '../../../../pages/Mapa/store/Store';

const initFormData = {
    plantilla: '0',
    numReclamo: '',
    titulo: '',
    ubicacion: '',
    comentario: '',
    layout: 'A4 portrait',
    escala: '500.0',
    nombreReclamante: '',
    horizontal: false,
    leyenda: false
};

const initialDwnldState = {
    loading: false,
    error: null,
    url: null
};

const PrintForm = ({ printInfo, storeContext: { map, store } }) => {

    const [dwnldState, setDwnldState] = useState(initialDwnldState);
    const [formData, setFormData] = useState(initFormData);
    const apollo = useApolloClient();
    const ps = usePrintingSheetFeature(
        printInfo.layouts.find(el => el.nombre === formData.layout).map,
        formData.escala, map, store, formData.horizontal);

    useEffect(() => {
        if (formData.plantilla === 1) {
            document.getElementById("numReclamoInput").focus();
        }
    }, [formData.plantilla]);

    function handleChange(e) {
        const name = e.target.name,
            value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'numReclamo') {
            setFormData(prev => ({
                ...prev,
                titulo: '',
                ubicacion: '',
                comentario: '',
                nombreReclamante: ''
            }))
        }
    }

    function handleNumReclamoOnBlur() {
        getReclamo(apollo, formData.numReclamo)
            .then(reclamo => {
                if (reclamo) {
                    setFormData(prev => ({
                        ...prev,
                        titulo: 'SISTEMA DE AGUA POTABLE',
                        ubicacion: reclamo.direccion_predio,
                        nombreReclamante: reclamo.nombre_reclamante,
                        comentario: `PLANO DE CURVAS DE NIVEL | SUMINISTRO: ${reclamo.suministro} | Nº Reclamo: ${reclamo.num_reclamo}`
                    }))
                } else {
                    setFormData(prev => ({
                        ...prev,
                        nombreReclamante: 'Reclamo no existe'
                    }))
                }
            })
    }
    function handleSubmit(e) {
        e.preventDefault();
        const preq = createPrintingRequest(ps, formData, map);

        setDwnldState({ loading: true, error: null, url: null });

        fetch(printInfo.createURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: "spec=" + encodeURIComponent(JSON.stringify(preq))
        })
            .then(res => res.json())
            .then(data =>
                fetch(data.getURL)
                    .then(res => res.blob()))
            .then(blob => {

                const file = new File([blob], 'mapa_impresion.pdf');
                const url = URL.createObjectURL(file);

                setDwnldState({ loading: false, error: null, url });
            })
            .catch(error => {
                console.log(error);
                setDwnldState({ loading: false, error, url: null });
            });
    }

    return (
        <div className='p-3'>
            <form onSubmit={handleSubmit} className='form'>
                <div className="form-group row">
                    <Label>Plantilla</Label>
                    <FormControl>
                        <select
                            className="form-control form-control-sm"
                            name='plantilla'
                            value={formData.plantilla}
                            onChange={handleChange}
                            required={true}
                        >
                            <option value="0">General</option>
                            <option value="1">Reporte operacional</option>
                        </select>
                    </FormControl>
                </div>
                <strong>Información</strong>
                <div className={classnames("form-group row", { "d-none": formData.plantilla !== "1" })}>
                    <Label>Nº Reclamo</Label>
                    <FormControl>
                        <input
                            id="numReclamoInput"
                            type="text"
                            className="form-control form-control-sm"
                            name='numReclamo'
                            value={formData.numReclamo}
                            onChange={handleChange}
                            onBlur={handleNumReclamoOnBlur}
                        />
                        <p className='font-weight-bold form-text text-success m-0'>Reclamante: {formData.nombreReclamante}</p>
                    </FormControl>
                </div>
                <div className="form-group row">
                    <Label>Título</Label>
                    <FormControl>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            name='titulo'
                            value={formData.titulo}
                            onChange={handleChange}
                            required={true}
                        />
                    </FormControl>
                </div>
                <div className="form-group row">
                    <Label>Ubicación</Label>
                    <FormControl>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            name='ubicacion'
                            value={formData.ubicacion}
                            onChange={handleChange}
                            required={true}
                        />
                    </FormControl>
                </div>
                <div className="form-group row">
                    <Label>Comentario</Label>
                    <FormControl>
                        <textarea
                            className='form-control form-control-sm'
                            rows="3"
                            name='comentario'
                            value={formData.comentario}
                            onChange={handleChange}
                        />
                    </FormControl>
                </div>
                <strong>Ajustes</strong>
                <div className="form-group row">
                    <Label>Layout</Label>
                    <FormControl>
                        <Select
                            className="form-control form-control-sm"
                            valueFieldName="value"
                            lista={printInfo.layouts}
                            name='layout'
                            value={formData.layout}
                            onChange={handleChange}
                            required={true}
                        />
                    </FormControl>
                </div>
                <div className="form-group row">
                    <Label>Escala</Label>
                    <FormControl>
                        <Select
                            className="form-control form-control-sm"
                            valueFieldName="value"
                            lista={printInfo.scales}
                            name='escala'
                            value={formData.escala}
                            onChange={handleChange}
                            required={true}
                        />
                    </FormControl>
                </div>
                <div className="form-group row">
                    <div className="col-sm-9 offset-sm-3">
                        <div className="form-check form-check-inline">
                            <input
                                type="checkbox"
                                id="printAlignCheckBox"
                                className="form-check-input"
                                name='horizontal'
                                checked={formData.horizontal}
                                onChange={handleChange}
                            />
                            <label className='form-check-label' htmlFor='printAlignCheckBox'>Horizontal</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                type="checkbox"
                                id="addLegend2PrintCB"
                                className="form-check-input"
                                name='leyenda'
                                checked={formData.leyenda}
                                onChange={handleChange}
                            />
                            <label className='form-check-label' htmlFor='addLegend2PrintCB'>Incluir leyenda</label>
                        </div>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-9 offset-sm-3">
                        <div className="d-flex align-items-center">
                            <button
                                type='submit'
                                className="btn btn-primary btn-sm"
                            >
                                <i className='fas fa-print mr-2' />
                                Imprimir
                            </button>
                            {dwnldState.loading && <Progress />}
                            {dwnldState.url && <FileLink url={dwnldState.url} />}
                            {dwnldState.error && <p className='text-danger m-0 ml-2'>¡Ocurrión un error!</p>}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
};

const PrintFormWithStore = withStore(PrintForm);

export default () =>
    <Query
        query={GET_PRINT_INFO}
    >
        {({ data, loading, error }) => {
            if (loading) return <div className='text-center'> <LoadingIcon /> </div>;
            if (error) return <p className='text-danger'>{error.message}</p>;
            return <PrintFormWithStore printInfo={data.sistema.printInfo} />
        }}
    </Query>