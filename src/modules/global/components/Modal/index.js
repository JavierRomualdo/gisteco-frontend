import React, {Component} from 'react';
import {Dialog} from 'primereact/dialog';
import modalApiContainer from './modal';

const defaultModalState = {
    header:"",
    content: {},
    visible: false,
    otherDialogProps: {}
}

export class Modal extends Component{
    constructor(props){
        super(props);
        this.state = defaultModalState;
    }
    //inicio API
    abrirModal = ({header,content,...otherDialogProps}) => {
        /*
            header,
            content: {component, props},
            ... resto de propiedades
        */
       this.setState({
           header,
           content,
           visible: true,
           otherDialogProps
       })
    }
    cerrarModal = () => {
        this.setState(defaultModalState);
    }
    //fin API
    onHide = (e) => {
        const { onHide } = this.state.otherDialogProps;
        this.cerrarModal();
        onHide && onHide(e);
    }
    componentDidMount(){
        const {abrirModal,cerrarModal} = this;
        const api = {abrirModal,cerrarModal};
        modalApiContainer.setApi(api);
    }
    render(){
        if (!this.state.visible) return <div />

        const { header,visible, otherDialogProps, content } = this.state;
        const { onHide } = this;
        const { component: Component, props } = content;
        const dialogProps = {...otherDialogProps, onHide, header,visible};
        return <Dialog {...dialogProps}>
            {Component && <Component {...props}/>}
        </Dialog>
    }
};

export default modalApiContainer;