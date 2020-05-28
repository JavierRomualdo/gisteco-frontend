import React, { useState, useEffect } from 'react';
import {
    TITULO_ARCHIVO, PCHR_TITULO_ARCHIVO, LABEL_FORMATO, LISTA_FORMATO, LABEL_EXPORTAR,
    LABEL_CREANDO_ARCHIVO, EXTENSION_FORMATO, archivoInicial
} from './values';
import InputText from '../../global/components/InputText';
import AutoCompleteCapas from '../../global/components/AutoCompleteCapas';
import classnames from 'classnames';
import SelectOption from '../../global/components/SelectOption';
import ButtonAction from '../../global/components/ButtonAction';
import { type } from '../../global/values';
import { FileExport } from '../../../lib/icons';
import TipoArchivo from '../../global/components/TipoArchivo';
import ProgressBarAnimated from '../../global/components/ProgressbarAnimated';
import Alert, { mensajeInicial, TIPO_ALERTA } from '../../../lib/alerts';
import { generarTituloArchivoPorDefecto } from '../../util';
import { withStore } from '../../../pages/Mapa/store/Store';

/*const resolveFormDataFromCapa = (capa) =>
    !capa ?
        ({ etiqueta: '' }) :
        ({ etiqueta: 'sin_etiqueta' }),*/
const capaInputId = 'capaEstilos';

const ExportarArchivo = ({ capa, storeContext: { map } }) => {
    const [capaSeleccionada, setCapaSeleccionada] = useState(capa);
    const [tituloArchivo, setTituloArchivo] = useState('');
    const [formato, setFormato] = useState(LISTA_FORMATO[0].id);
    const [urlArchivo, setUrlArchivo] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [mensaje, setMensaje] = useState(mensajeInicial);
    const [archivo, setArchivo] = useState(archivoInicial);

    useEffect(() => {
        setCapaSeleccionada(capa);
    }, [capa]);

    useEffect(() => {
        if (capaSeleccionada) {
            setTituloArchivo(generarTituloArchivoPorDefecto(capaSeleccionada.get('nombre')));
        } else {
            setTituloArchivo('');
        }
    }, [capaSeleccionada]);

    function handleCapaSelect(e) {
        const capaSeleccionada = map.getCapaById(e.value.id);
        setCapaSeleccionada(capaSeleccionada);
    }

    function handleCapaChange(e) {
        setCapaSeleccionada(null);
    }

    function handleChangeTituloArchivo(e) {
        setTituloArchivo(e.target.value);
    }

    function handleChangeFormato(e) {
        setFormato(e.target.value);
    }

    function handleSubmitExportarArchivo(e) {
        e.preventDefault();
        setMensaje(mensajeInicial);
        if (capaSeleccionada) {
            const exportParams = { outputFormat: formato }
            if (capaSeleccionada.getFilter()) exportParams.CQL_FILTER = capaSeleccionada.getFilter();
            const url = capaSeleccionada.exportFeatures(exportParams);
            //console.log(url);

            setUrlArchivo(null);
            setCargando(true);
            fetch(url).then(resp => resp.blob()).then(archivo => {
                const urlFile = URL.createObjectURL(archivo);
                setUrlArchivo(urlFile);
                setArchivo({ nombre: tituloArchivo, extension: EXTENSION_FORMATO[formato] });
                setCargando(false);
            }).catch(error => {
                setMensaje({ texto: error, tipo: TIPO_ALERTA.ERROR });
                setArchivo({ nombre: '', extension: '' });
                setCargando(false);
            });

        } else {
            setMensaje({ texto: 'Ingrese y seleccione la capa.', tipo: TIPO_ALERTA.ADVERTENCIA });
        }
    }

    const capaInputText = capaSeleccionada ? capaSeleccionada.get('nombre') : '';

    return (
        <div className='p-2'>
            <form onSubmit={handleSubmitExportarArchivo}>
                <AutoCompleteCapas
                    value={capaInputText}
                    inputId={capaInputId}
                    autoFocus={true}
                    inputClassName={classnames({ 'is-invalid': !capaSeleccionada })}
                    onSelect={handleCapaSelect}
                    onChange={handleCapaChange}
                />
                <InputText value={tituloArchivo} name="tituloArchivo" etiqueta={TITULO_ARCHIVO} placeholder={PCHR_TITULO_ARCHIVO}
                    onChangeInput={handleChangeTituloArchivo} required />
                <SelectOption value={formato} name='formato' etiqueta={LABEL_FORMATO} lista={LISTA_FORMATO}
                    onChangeSelect={handleChangeFormato} autoFocus={true} />
                <ButtonAction type={type.submit} title={LABEL_EXPORTAR} className={"btn btn-sm btn-primary mb-2"}>
                    <FileExport /> {LABEL_EXPORTAR}
                </ButtonAction>
                {cargando && <ProgressBarAnimated titulo={LABEL_CREANDO_ARCHIVO} />}
                {urlArchivo &&
                    <div className="list-group">
                        <a href={urlArchivo} download={`${archivo.nombre}.${archivo.extension}`}
                            className='list-group-item list-group-item-action p-2' title="Descargar">
                            <TipoArchivo tipo_archivo={EXTENSION_FORMATO[formato]} /> <strong>{`${archivo.nombre}.${archivo.extension}`}</strong>
                        </a>
                    </div>
                }
                {mensaje.texto && <Alert tipo={mensaje.tipo}>{mensaje.texto}</Alert>}
            </form>
        </div>
    );
}

export default withStore(ExportarArchivo);