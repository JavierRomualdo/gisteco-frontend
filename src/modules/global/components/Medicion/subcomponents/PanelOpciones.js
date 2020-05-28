import React from 'react';
import ButtonAction from '../../ButtonAction';
import { TrashIcon, ExpandIcon, CalculatorIcon, SaveIcon, ArrowLeftIcon, SyncAltIcon } from '../../../../../lib/icons';
import { LABEL_ELIMINAR, LABEL_ZOOM, type, LABEL_CALCULAR, LABEL_GUARDAR, LABEL_ATRAS, LABEL_ACTUALIZAR } from '../../../values';
import ButtonFile from '../../ButtonFile';

const PanelOpciones = ({ nfilas, handleSubir, refFile, acceptFile, handleEliminar, handleGuardar, handleClickActualizar, handleAtras, nombreCollapseBtnAtras,
    handleZoom, handleCalcular, titulo }) => (
    <div className="card border-primary text-white bg-primary border-radius-0">
        <div className="card-header p-1">
            {
                nfilas > 0 ? <div><strong>{nfilas} seleccionados</strong>
                    <div className="card-header-actions">
                        {
                            handleCalcular && <ButtonAction type={type.button} className={"card-header-action btn btn-sm bt-secundary btn-sm pb-0 pt-0 text-white"}
                                title={LABEL_CALCULAR} onClickButton={handleCalcular}>
                                <CalculatorIcon />
                            </ButtonAction>
                        }
                        {
                            handleZoom && <ButtonAction type={type.button} className={"card-header-action btn btn-sm bt-secundary btn-sm pb-0 pt-0 text-white"}
                                title={LABEL_ZOOM} onClickButton={handleZoom}>
                                <ExpandIcon />
                            </ButtonAction>
                        }
                        {
                            handleClickActualizar && <ButtonAction type={type.button} className={"card-header-action btn btn-sm bt-secundary btn-sm pb-0 pt-0 text-white"}
                                title={LABEL_ACTUALIZAR} onClickButton={handleClickActualizar}>
                                <SyncAltIcon />
                            </ButtonAction>
                        }
                        {
                            handleAtras && <ButtonAction type={type.button} className={"card-header-action btn btn-sm bt-secundary btn-sm pb-0 pt-0 text-white"}
                                title={LABEL_ATRAS} data-toggle="collapse" data-target={`#${nombreCollapseBtnAtras}`} aria-expanded="false"
                                aria-controls={`${nombreCollapseBtnAtras}`} onClickButton={handleAtras}>
                                <ArrowLeftIcon />
                            </ButtonAction>
                        }
                        {
                            handleSubir && <ButtonFile multiple onChange={handleSubir} refFile={refFile} accept={acceptFile} />
                        }
                        {
                            handleEliminar && <ButtonAction type={type.button} className={"card-header-action btn btn-sm bt-secundary btn-sm pb-0 pt-0 text-white"}
                                title={LABEL_ELIMINAR} onClickButton={handleEliminar}>
                                <TrashIcon />
                            </ButtonAction>
                        }
                        {
                            handleGuardar && <ButtonAction type={type.button} className={"card-header-action btn btn-sm bt-secundary btn-sm pb-0 pt-0 text-white"}
                                title={LABEL_GUARDAR} onClickButton={handleGuardar}>
                                <SaveIcon />
                            </ButtonAction>
                        }
                    </div></div> : <div>
                        <strong>{titulo}</strong>
                        <div className="card-header-actions">
                            {
                                handleClickActualizar && <ButtonAction type={type.button} className={"card-header-action btn btn-sm bt-secundary btn-sm pb-0 pt-0 text-white"}
                                    title={LABEL_ACTUALIZAR} onClickButton={handleClickActualizar}>
                                    <SyncAltIcon />
                                </ButtonAction>
                            }
                            {
                                handleAtras && <ButtonAction type={type.button} className={"card-header-action btn btn-sm bt-secundary btn-sm pb-0 pt-0 text-white"}
                                    title={LABEL_ATRAS} data-toggle="collapse" data-target={`#${nombreCollapseBtnAtras}`} aria-expanded="false"
                                    aria-controls={`${nombreCollapseBtnAtras}`} onClickButton={handleAtras}>
                                    <ArrowLeftIcon />
                                </ButtonAction>
                            }
                            {
                                handleSubir && <ButtonFile multiple onChange={handleSubir} refFile={refFile} accept={acceptFile} />
                            }
                            {
                                handleGuardar && <ButtonAction type={type.button} className={"card-header-action btn btn-sm bt-secundary btn-sm pb-0 pt-0 text-white"}
                                    title={LABEL_GUARDAR} onClickButton={handleGuardar}>
                                    <SaveIcon />
                                </ButtonAction>
                            }
                        </div>
                    </div>
            }
        </div>
    </div>
);

export default PanelOpciones;