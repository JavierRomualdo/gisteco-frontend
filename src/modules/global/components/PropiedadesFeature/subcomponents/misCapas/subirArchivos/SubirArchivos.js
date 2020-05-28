import React, { useState, useEffect } from 'react';
import PanelOpciones from '../../../../Medicion/subcomponents/PanelOpciones';
import AgGrid from '../../../../AgGrid';
import { columnDefs, LABEL_LISTA_ARCHIVOS } from './values';
import { ESTADO_NORMAL, ESTADO_CARGANDO, ESTADO_ERROR, ESTADO_CLOUD } from '../../../../../values';
import Alert, { mensajeInicial, TIPO_ALERTA } from '../../../../../../../lib/alerts';
import { useApolloClient } from 'react-apollo-hooks';
import { UPLOAD_FILE, ELIMINAR_ARCHIVO, ACTUALIZAR_ARCHIVO } from '../mutations';
import { LISTAR_ARCHIVOS } from '../queries';

const SubirArchivos = ({ propiedades, handleClickAtras, nombreCollapseBtnAtras }) => {

    const [archivos, setArchivos] = useState([]);
    const [mensaje, setMensaje] = useState(mensajeInicial);
    const client = useApolloClient();
    // parametros AG-GRID
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [filasSeleccionadas, setFilasSeleccionadas] = useState([]);
    const [filtroGlobal, setFiltroGlobal] = useState("");
    const refFile = React.createRef();

    useEffect(() => {
        client.query({
            query: LISTAR_ARCHIVOS,
            variables: { featureGid: propiedades.gid, idCapa: parseInt(propiedades.capa.get('id')) },
            fetchPolicy: "network-only"
        }).then(({ data }) => {
            const { listarArchivos } = data.comercial;
            console.log("listarArchivos: ", listarArchivos);
            if (listarArchivos.length > 0) {
                listarArchivos.filter(item => {
                    const { ruta, nombre, descripcion, tipo_archivo, gid } = item;
                    setArchivos(archs => archs.concat({ archivo: `http://localhost:3030/${ruta}`, descripcion, estado: ESTADO_CLOUD, file: null, gid, ruta, tipo_archivo, nombre }));
                });
            }
        }).catch((error) => {
            setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ERROR });
        });
    }, [true]);

    // se selecciona la archivo y los muestra en el panel
    function onSelect(event) {
        console.log("event onselect files: ", refFile.current.files);
        for (let file of refFile.current.files) {
            console.log("file, ", file);
            const reader = new FileReader();
            // this.archivo es la url de la archivo
            reader.onload = (e) => {
                if (!hayRepeticionArchivo(file)) {
                    const array = file.name.split(".");
                    const tipo_archivo = array[array.length - 1];
                    setArchivos(archs => archs.concat({ archivo: e.target.result, descripcion: '', estado: ESTADO_NORMAL, file, gid: 0, ruta: `uploads/mispuntosreferencia/${file.name}`, tipo_archivo, nombre: file.name }));
                }
            };
            reader.readAsDataURL(file);
        }
    }

    // validar si el archivo no se puede repetir
    function hayRepeticionArchivo(file) {
        const archivo = archivos.find(archivo => archivo.nombre === file.name);
        return archivo;
    }

    function handleGuardarArchivo() {
        const hayvacios = archivos.find(archivo => archivo.descripcion === '');
        setMensaje(mensajeInicial);
        if (!hayvacios) {
            /**Archivos nuevas para guardar */
            const archivosPaGuardar = archivos.filter(archivo => archivo.estado === ESTADO_NORMAL);
            if (archivosPaGuardar.length > 0) {
                archivosPaGuardar.forEach((archivo, index) => {
                    const { file, ruta, tipo_archivo, descripcion } = archivo;
                    updateItemsColumnEstado(ESTADO_CARGANDO, ruta);
                    client.mutate({
                        mutation: UPLOAD_FILE,
                        variables: { file, gid: propiedades.gid, idCapa: parseInt(propiedades.capa.get('id')), ruta, tipo_archivo, descripcion }
                    }).then((data) => {
                        if (data.data.comercial.uploadFile) {
                            updateItemsColumnEstado(ESTADO_CLOUD, ruta);
                        } else {
                            updateItemsColumnEstado(ESTADO_ERROR, ruta);
                        }
                    }).catch((error) => {
                        setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ERROR });
                        updateItemsColumnEstado(ESTADO_ERROR, ruta);
                    });
                });
            }
        } else {
            setMensaje({ texto: 'Hay vacíos en la descripción', tipo: TIPO_ALERTA.ADVERTENCIA });
        }
    }

    function handleModificarArchivo(e) {
        const { archivo, ruta, gid, descripcion, estado } = e.data;
        console.log("archivos: ", archivos);
        if (estado === ESTADO_CLOUD) {
            updateItemsColumnEstado(ESTADO_CARGANDO, ruta);
            console.log("vamos a actualizar la archivo: ", e.data)
            client.mutate({
                mutation: ACTUALIZAR_ARCHIVO,
                variables: { gidArchivo: gid, descripcion }
            }).then(({ data }) => {
                const { actualizarArchivo } = data.comercial;
                if (actualizarArchivo) {
                    updateItemsColumnEstado(ESTADO_CLOUD, ruta);
                } else {
                    updateItemsColumnEstado(ESTADO_ERROR, ruta);
                }
            }).catch((error) => {
                setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ERROR });
                updateItemsColumnEstado(ESTADO_ERROR, ruta);
            });
        }
    }

    function hangleEliminarArchivo() {
        const archivosPaEliminar = [];
        const archivosPaEliminar2 = [];
        // let bandera =  false;
        // let bandera2 = false;
        filasSeleccionadas.forEach((fila, index) => {
            /**Aqui vamos a eliminar las archivos */
            const { archivo, gid, ruta, estado } = fila;
            console.log("* Estado: ", estado);
            if (estado === ESTADO_CLOUD) {
                console.log("ESTADO_CLOUD");
                updateItemsColumnEstado(ESTADO_CARGANDO, ruta);
                console.log("vamos a eliminar la archivo: ", fila);
                client.mutate({
                    mutation: ELIMINAR_ARCHIVO,
                    variables: { gidArchivo: gid, ruta }
                }).then(({ data }) => {
                    const { eliminarArchivo } = data.comercial;
                    console.log("se ha eliminadod de la bd: ", eliminarArchivo);
                    if (eliminarArchivo) {
                        archivosPaEliminar.push(fila);
                        // eliminarItemFilaImagenes(fila);
                    } else {
                        updateItemsColumnEstado(ESTADO_ERROR, ruta);
                    }
                }).catch((error) => {
                    setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ERROR });
                    updateItemsColumnEstado(ESTADO_ERROR, ruta);
                }).finally((event) => {
                    console.log("finalluy index: ", index);
                    if (index === (filasSeleccionadas.length - archivosPaEliminar2.length - 1)) {
                        console.log("========= archivos actuales ==: ", archivos);
                        console.log("archivosPaEliminar: ", archivosPaEliminar);
                        if (archivosPaEliminar.length > 0) {
                            // bandera2 = true;
                            console.log("archivosPaEliminar !!");
                            const archivosCopia = archivos.slice();
                            archivosPaEliminar.forEach((arch) => {
                                archivosCopia.splice(archivosCopia.indexOf(arch), 1);
                            });
                            console.log("archivosNoEliminadas: ", archivosCopia);
                            setArchivos(archivosCopia)
                        }
                    }
                });
            } else {
                archivosPaEliminar2.push(fila);
                // eliminarItemFilaImagenes(fila);
                if (index === (filasSeleccionadas.length - archivosPaEliminar.length - 1)) {
                    console.log("========= archivos actuales 2: ", archivos);
                    console.log("archivosPaEliminar 22: ", archivosPaEliminar2);
                    if (archivosPaEliminar2.length > 0) {
                        // bandera = true;
                        console.log("archivosPaEliminar22 !!");
                        const archivosCopia = archivos.slice();
                        archivosPaEliminar2.forEach((arch) => {
                            archivosCopia.splice(archivosCopia.indexOf(arch), 1);
                        });
                        console.log("archivosNoEliminadas 222: ", archivosCopia);
                        setArchivos(archivosCopia)
                    }
                }
            }
        });
    }

    function eliminarImagenesAgGrid(bandera, bandera2, archivosPaEliminar, archivosPaEliminar2) {
        if (bandera && bandera2) {
            const archivosCopia = archivos.slice();
            if (archivosPaEliminar2.length > 0) {
                archivosPaEliminar2.forEach((arch) => {
                    archivosCopia.splice(archivosCopia.indexOf(arch), 1);
                });
                console.log("archivosNoEliminadas 222: ", archivosCopia);
            }
            if (archivosPaEliminar.length > 0) {
                archivosPaEliminar.forEach((arch) => {
                    archivosCopia.splice(archivosCopia.indexOf(arch), 1);
                });
                console.log("archivosNoEliminadas 222: ", archivosCopia);
            }
            setArchivos(archivosCopia);
        }
    }

    function updateItemsColumnEstado(estado, ruta) {
        const itemsToUpdate = [];
        gridApi.forEachNodeAfterFilterAndSort(function (rowNode) {
            if (rowNode.data.ruta === ruta) {
                const data = rowNode.data;
                data.estado = estado;
                itemsToUpdate.push(data);
            }
        });
        gridApi.updateRowData({ update: itemsToUpdate });
    }

    function eliminarItemFilaImagenes(archivo) {
        // const files = archivos.filter( file => file.archivo !== archivo.archivo);
        // console.log("eliminarItemFilaImagenes: ", files);
        // setArchivos(files);
        const itemsEliminar = [];
        itemsEliminar.push(archivo);
        // const selectedData = gridApi.getSelectedRows();
        gridApi.updateRowData({ remove: itemsEliminar });
    }

    // funciones ag-grid
    function onGridReady(params) {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    }

    function onSelectionChanged() {
        var selectedRows = gridApi.getSelectedRows();
        setFilasSeleccionadas(selectedRows);
    }

    function redimensionarColumnas() {
        gridApi && gridApi.sizeColumnsToFit();
    }

    function handleChangeFiltrarRapido(e) {
        setFiltroGlobal(e.target.value);
        gridApi && gridApi.setQuickFilter(e.target.value);
    }

    return (
        <div>
            <AgGrid filtroGlobal={filtroGlobal} onChangeFiltro={handleChangeFiltrarRapido}
                heightTabla={"calc(100vh - 290px)"} columnDefs={columnDefs} rowSelection={"multiple"} onGridReady={onGridReady}
                rowData={archivos} onSelectionChanged={onSelectionChanged} onGridSizeChanged={redimensionarColumnas}
                localeText={{ noRowsToShow: "No hay archivos" }} onCellValueChanged={handleModificarArchivo}>
                <div className="row">
                    <div className="col-md-12">
                        <PanelOpciones nfilas={filasSeleccionadas.length} handleEliminar={hangleEliminarArchivo} handleGuardar={handleGuardarArchivo} handleSubir={onSelect}
                            handleAtras={handleClickAtras} nombreCollapseBtnAtras={nombreCollapseBtnAtras}
                            refFile={refFile} acceptFile={'.xls, .xlsx, .csv, .doc, .docx, .pdf, .dwg, .dxf'} titulo={LABEL_LISTA_ARCHIVOS} />
                    </div>
                </div>
            </AgGrid>
            {mensaje.texto && <Alert tipo={mensaje.tipo}>{mensaje.texto}</Alert>}
        </div>
    );
}
export default SubirArchivos;