import React, { useState, useImperativeHandle, forwardRef, Fragment } from 'react';
import { Slider } from 'primereact/slider';
import { ColorPicker } from 'primereact/colorpicker';
import { serializeEnv, useGetStyleEnvConfiguration, useLayerInfo } from './util';
import { Button } from 'primereact/button';
import classnames from 'classnames';
import { TITULO_APLICAR_ESTILO } from '../values';
import ButtonAction from '../../../global/components/ButtonAction';
import { PaintBrushIcon } from '../../../../lib/icons';

const SelectorEstilo = ({ estilos, ...restProps }) => {
    return <select className='form-control' {...restProps}>
        {estilos.map((e, index) => <option key={index} value={e.name}>{e.name}</option>)}
    </select>
};

const SelectorLabel = ({ properties, ...restProps }) => {
    return <select className='form-control' {...restProps} style={{ maxWidth: "280px" }}>
        {properties.map((e, index) => <option key={index} value={e.name}>{e.name}</option>)}
    </select>
}

const SymbologyStylePanel = forwardRef(({ envConfig, layerInfo }, ref) => {
    const [estilo, setEstilo] = useState(envConfig);

    useImperativeHandle(ref, () => ({
        getValues: () => ({ ENV: serializeEnv(estilo) }),
        getStyleConfiguration: () => estilo
    }));

    function handleInputChange(e) {
        const name = e.target.name,
            value = e.value || e.target.value;

        if (name.startsWith("label")) {
            setEstilo(prev => ({
                ...prev,
                label: { ...prev.label, [name]: value }
            }));
        } else {
            setEstilo(prevEstilo => ({ ...prevEstilo, [name]: value }));
        }
    }

    function handleToggleButtonChange(e) {
        const name = e.currentTarget.name;
        setEstilo(prevEstilo => ({ ...prevEstilo, [name]: !prevEstilo[name] }))
    }

    const { stroke, strokeWidth, fill, fillOpacity, mark, markSize, label, fontSize, italic, bold } = estilo;
    const showStrokeSection = stroke || strokeWidth,
        showFillOpacity = fillOpacity || fillOpacity === 0,
        showFillSection = fill || showFillOpacity,
        showMarkSection = mark || markSize;

    return <Fragment>
        {showStrokeSection && <section className='mb-2'>
            <p className='font-weight-bold mb-1'>Borde</p>
            <div className="form-inline">
                {stroke && <Fragment><label className='mr-2'>Color</label>
                    <ColorPicker name="stroke" value={stroke} onChange={handleInputChange} /></Fragment>}
                {strokeWidth && <Fragment><label className='mx-2'>Ancho</label>
                    <input
                        type='number'
                        name='strokeWidth'
                        className='form-control mr-1'
                        min={1}
                        value={strokeWidth}
                        style={{ width: '80px' }}
                        onChange={handleInputChange}
                    /> px
                </Fragment>}
            </div>
        </section>}
        {showFillSection &&
            <section className='mb-2'>
                <p className='font-weight-bold mb-1'>Relleno</p>
                <div className='form-inline'>
                    {fill && <Fragment><label className='mr-2'>Color</label>
                        <ColorPicker name="fill" value={fill} onChange={handleInputChange} /></Fragment>}
                    {showFillOpacity && <Fragment><label className='ml-2 mr-3'>Opacidad</label>
                        <Slider
                            className='mr-3'
                            step={1}
                            max={100}
                            value={fillOpacity}
                            style={{ width: '6em' }}
                            onChange={(e) => {
                                setEstilo(prevEstilo => ({ ...prevEstilo, fillOpacity: e.value }))
                            }}
                        />
                        {fillOpacity}%</Fragment>}
                </div>
            </section>}
        {showMarkSection &&
            <section className='mb-2'>
                <p className='font-weight-bold mb-1'>Marcador</p>
                <div className='form-inline'>
                    {mark && <Fragment><label className='mr-2'>Símbolo</label>
                        <select name='mark' className='form-control mr-2' value={mark} onChange={handleInputChange}>
                            <option value='circle'>Círculo</option>
                            <option value='square'>Cuadrado</option>
                            <option value='triangle'>Triángulo</option>
                            <option value='arrow'>Flecha</option>
                            <option value='cross'>Cruz</option>
                            <option value='star'>Estrella</option>
                        </select></Fragment>}
                    {markSize && <Fragment><label className='mr-2'>Tamaño</label>
                        <input
                            type='number'
                            name='markSize'
                            className='form-control mr-1'
                            min={1}
                            value={markSize}
                            style={{ width: '80px' }}
                            onChange={handleInputChange}
                        /> px</Fragment>}
                </div>
            </section>}
        {label && <Fragment>
            <section className='mb-2'>
                <p className='font-weight-bold mb-1'>Etiqueta</p>
                {Object.keys(label).map((key, index) => {
                    return (
                        <div key={index} className="form-inline mb-2">
                            <label className='mr-2'>Propiedad</label>
                            <SelectorLabel
                                name={key}
                                properties={layerInfo.properties}
                                value={label[key]}
                                onChange={handleInputChange}
                            />
                        </div>
                    );
                })}

            </section>
            <div className='form-inline'>
                {fontSize && <Fragment><label className='mr-2'>Tamaño de letra</label>
                    <input
                        type='number'
                        name='fontSize'
                        className='form-control mr-1'
                        min={1}
                        value={fontSize}
                        style={{ width: '80px' }}
                        onChange={handleInputChange}
                    /> px
                    </Fragment>}
                {bold !== undefined && <Button
                    type='button'
                    label='N'
                    className={classnames('ml-2 font-weight-bold', 'p-button-secondary', { 'p-button-raised': !bold })}
                    name='bold'
                    onClick={handleToggleButtonChange} />}
                {italic !== undefined && <Button
                    type='button'
                    label='I'
                    name='italic'
                    className={classnames('font-italic', 'p-button-secondary', { 'p-button-raised': !italic })}
                    onClick={handleToggleButtonChange} />}
            </div>
        </Fragment>
        }
    </Fragment>
});

const PanelContent = forwardRef(({ gslayer, estiloCapa, layerInfo }, ref) => {
    const { loading, error, data } = useGetStyleEnvConfiguration(gslayer, estiloCapa);
    if (loading) return <p>Analizando estilo...</p>;
    if (error) return <p>{error.message}</p>;
    return <SymbologyStylePanel
        ref={ref}
        envConfig={data.envConfig}
        gslayer={gslayer}
        estiloCapa={estiloCapa}
        layerInfo={layerInfo}
    />
});

const resolveSelectedStyle = (gslayer, layerInfo) => gslayer.getStyle() || layerInfo.layerDefinition.defaultStyle.name;

const SymbologyPanelBase = forwardRef(({ gslayer, layerInfo }, ref) => {
    const { layerDefinition } = layerInfo;
    const estilos = layerDefinition.styles ? layerDefinition.styles.style : [];
    const [estiloCapa, setEstiloCapa] = useState(resolveSelectedStyle(gslayer, layerInfo));

    function handleChangeEstilo(e) {
        const estilo = e.target.value;
        setEstiloCapa(estilo);
    }

    function handleClick(e) {
        const { ENV } = ref.current.getValues();
        gslayer.getSource().updateParams({ ENV });
        gslayer.setStyle(estiloCapa);
        gslayer.get('estilos')[estiloCapa] = ENV;
    }
    return (
        <div>
            <section className='form'>
                <div className="form-group">
                    <label className='font-weight-bold'>Estilo</label>
                    <SelectorEstilo
                        value={estiloCapa}
                        onChange={handleChangeEstilo}
                        estilos={estilos}
                    />
                </div>
            </section>
            <PanelContent gslayer={gslayer} estiloCapa={estiloCapa} layerInfo={layerInfo} ref={ref} />
            <ButtonAction
                onClickButton={handleClick}
                className={"btn btn-sm btn-primary mt-2"}
            >
                <PaintBrushIcon />
                <span className="d-none d-md-inline"> {TITULO_APLICAR_ESTILO} </span>
            </ButtonAction>
        </div>
    );
});

const SymbologyPanel = forwardRef(({ gslayer }, ref) => {
    const { data, loading, error } = useLayerInfo(gslayer);
    // layerInfo contiene las propiedades de los features, estilos disponibles y objeto 'env'
    if (loading) return <p>Cargando...</p>
    if (error) return <p>{error.message}</p>
    if (!data) return <p>Sin datos aún...</p>
    return <SymbologyPanelBase
        layerInfo={data}
        ref={ref}
        gslayer={gslayer}
    />
});

export default SymbologyPanel;