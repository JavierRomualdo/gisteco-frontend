import React, { useState, useEffect } from 'react';
import PanelOpciones from '../../../../Medicion/subcomponents/PanelOpciones';
import AgGrid from '../../../../AgGrid';
import { columnDefs, LABEL_LISTA_IMAGENES } from './values';
import { ESTADO_NORMAL, ESTADO_CARGANDO, ESTADO_ERROR, ESTADO_CLOUD } from '../../../../../values';
import Alert, { mensajeInicial, TIPO_ALERTA } from '../../../../../../../lib/alerts';
import { useApolloClient } from 'react-apollo-hooks';
import { UPLOAD_FILE, ELIMINAR_ARCHIVO, ACTUALIZAR_ARCHIVO } from '../mutations';
import { LISTAR_IMAGENES } from '../queries';

const SubirImagenes = ({ propiedades, setImagenesCorusel, handleClickAtras, nombreCollapseBtnAtras }) => {

    const [imagenes, setImagenes] = useState([]);
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
            query: LISTAR_IMAGENES,
            variables: { featureGid: propiedades.gid, idCapa: parseInt(propiedades.capa.get('id')) },
            fetchPolicy: "network-only"
        }).then(({ data }) => {
            const { listarImagenes } = data.comercial;
            console.log("listarImagenes: ", listarImagenes);
            if (listarImagenes.length > 0) {
                listarImagenes.filter(item => {
                    const { ruta, nombre, descripcion, gid } = item;
                    setImagenes(imgs => imgs.concat({ imagen: `http://localhost:3030/${ruta}`, descripcion, estado: ESTADO_CLOUD, file: null, gid, ruta, nombre }));
                });
            }
        }).catch((error) => {
            setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ERROR });
        });
    }, [true]);

    // se selecciona la imagen y los muestra en el panel
    function onSelect(event) {
        console.log("event onselect files: ", refFile.current.files);
        for (let file of refFile.current.files) {
            console.log("file, ", file);
            const reader = new FileReader();
            // this.imagen es la url de la imagen
            reader.onload = (e) => {
                if (!hayRepeticionArchivo(file)) {
                    const array = file.name.split(".");
                    const tipo_archivo = array[array.length - 1];
                    setImagenes(imgs => imgs.concat({ imagen: e.target.result, descripcion: '', estado: ESTADO_NORMAL, file, gid: 0, ruta: `uploads/mispuntosreferencia/${file.name}`, tipo_archivo, nombre: file.name }));
                }
            };
            reader.readAsDataURL(file);
        }
    }

    // validar si el archivo no se puede repetir
    function hayRepeticionArchivo(file) {
        const imagen = imagenes.find(imagen => imagen.nombre === file.name);
        return imagen;
    }

    function handleGuardarArchivo() {
        const hayvacios = imagenes.find(imagen => imagen.descripcion === '');
        setMensaje(mensajeInicial);
        if (!hayvacios) {
            /**Imagenes nuevas para gaurdar */
            const imagenesPaGuardar = imagenes.filter(imagen => imagen.estado === ESTADO_NORMAL);
            if (imagenesPaGuardar.length > 0) {
                imagenesPaGuardar.forEach((imagen, index) => {
                    const { file, ruta, tipo_archivo, descripcion } = imagen;
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
        const { imagen, ruta, gid, descripcion, estado } = e.data;
        console.log("imagenes: ", imagenes);
        if (estado === ESTADO_CLOUD) {
            updateItemsColumnEstado(ESTADO_CARGANDO, ruta);
            console.log("vamos a actualizar la imagen: ", e.data)
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
        const imagenesPaEliminar = [];
        const imagenesPaEliminar2 = [];
        // let bandera =  false;
        // let bandera2 = false;
        filasSeleccionadas.forEach((fila, index) => {
            /**Aqui vamos a eliminar las imagenes */
            const { imagen, gid, ruta, estado } = fila;
            console.log("* Estado: ", estado);
            if (estado === ESTADO_CLOUD) {
                console.log("ESTADO_CLOUD");
                updateItemsColumnEstado(ESTADO_CARGANDO, ruta);
                console.log("vamos a eliminar la imagen: ", fila);
                client.mutate({
                    mutation: ELIMINAR_ARCHIVO,
                    variables: { gidArchivo: gid, ruta }
                }).then(({ data }) => {
                    const { eliminarArchivo } = data.comercial;
                    console.log("se ha eliminadod de la bd: ", eliminarArchivo);
                    if (eliminarArchivo) {
                        imagenesPaEliminar.push(fila);
                        // eliminarItemFilaImagenes(fila);
                    } else {
                        updateItemsColumnEstado(ESTADO_ERROR, ruta);
                    }
                }).catch((error) => {
                    setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ERROR });
                    updateItemsColumnEstado(ESTADO_ERROR, ruta);
                }).finally((event) => {
                    console.log("finalluy index: ", index);
                    if (index === (filasSeleccionadas.length - imagenesPaEliminar2.length - 1)) {
                        console.log("========= imagenes actuales ==: ", imagenes);
                        console.log("imagenesPaEliminar: ", imagenesPaEliminar);
                        if (imagenesPaEliminar.length > 0) {
                            // bandera2 = true;
                            console.log("imagenesPaEliminar !!");
                            const imagenesCopia = imagenes.slice();
                            imagenesPaEliminar.forEach((img) => {
                                imagenesCopia.splice(imagenesCopia.indexOf(img), 1);
                            });
                            console.log("imagenesNoEliminadas: ", imagenesCopia);
                            setImagenes(imagenesCopia)
                        }
                    }
                });
            } else {
                imagenesPaEliminar2.push(fila);
                // eliminarItemFilaImagenes(fila);
                if (index === (filasSeleccionadas.length - imagenesPaEliminar.length - 1)) {
                    console.log("========= imagenes actuales 2: ", imagenes);
                    console.log("imagenesPaEliminar 22: ", imagenesPaEliminar2);
                    if (imagenesPaEliminar2.length > 0) {
                        // bandera = true;
                        console.log("imagenesPaEliminar22 !!");
                        const imagenesCopia = imagenes.slice();
                        imagenesPaEliminar2.forEach((img) => {
                            imagenesCopia.splice(imagenesCopia.indexOf(img), 1);
                        });
                        console.log("imagenesNoEliminadas 222: ", imagenesCopia);
                        setImagenes(imagenesCopia)
                    }
                }
            }
        });
    }

    function eliminarImagenesAgGrid(bandera, bandera2, imagenesPaEliminar, imagenesPaEliminar2) {
        if (bandera && bandera2) {
            const imagenesCopia = imagenes.slice();
            if (imagenesPaEliminar2.length > 0) {
                imagenesPaEliminar2.forEach((img) => {
                    imagenesCopia.splice(imagenesCopia.indexOf(img), 1);
                });
                console.log("imagenesNoEliminadas 222: ", imagenesCopia);
            }
            if (imagenesPaEliminar.length > 0) {
                imagenesPaEliminar.forEach((img) => {
                    imagenesCopia.splice(imagenesCopia.indexOf(img), 1);
                });
                console.log("imagenesNoEliminadas 222: ", imagenesCopia);
            }
            setImagenes(imagenesCopia);
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

    function eliminarItemFilaImagenes(imagen) {
        // const files = imagenes.filter( file => file.imagen !== imagen.imagen);
        // console.log("eliminarItemFilaImagenes: ", files);
        // setImagenes(files);
        const itemsEliminar = [];
        itemsEliminar.push(imagen);
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
        <div className="fadeIn animated">
            <AgGrid filtroGlobal={filtroGlobal} onChangeFiltro={handleChangeFiltrarRapido}
                heightTabla={"calc(100vh - 290px)"} columnDefs={columnDefs} rowSelection={"multiple"} onGridReady={onGridReady}
                rowData={imagenes} onSelectionChanged={onSelectionChanged} onGridSizeChanged={redimensionarColumnas}
                localeText={{ noRowsToShow: "No hay imágenes" }} onCellValueChanged={handleModificarArchivo}>
                <div className="row">
                    <div className="col-md-12">
                        <PanelOpciones nfilas={filasSeleccionadas.length} handleEliminar={hangleEliminarArchivo} handleGuardar={handleGuardarArchivo} handleSubir={onSelect}
                            handleAtras={handleClickAtras} nombreCollapseBtnAtras={nombreCollapseBtnAtras}
                            refFile={refFile} acceptFile={'.gif, .jpeg, .jpg, .png, .JPG, .JPEG, .PNG'} titulo={LABEL_LISTA_IMAGENES} />
                    </div>
                </div>
            </AgGrid>
            {mensaje.texto && <Alert tipo={mensaje.tipo}>{mensaje.texto}</Alert>}
        </div>
    );
}
export default SubirImagenes;