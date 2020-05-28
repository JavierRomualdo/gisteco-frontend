import React, { useState } from 'react';
import NoFoto from '../../../../assets/img/nofoto.png';
import Pdf from '../../../../assets/img/pdf_file.png';
import Excel from '../../../../assets/img/excel_file.png';
import Word from '../../../../assets/img/word_file.png';
import Autocad from '../../../../assets/img/autocad_file.png';
import Shp from '../../../../assets/img/shape_file.png';

const TipoArchivo = ({tipo_archivo}) => {
    const [archivo] = useState(generarImagen(tipo_archivo));

    function generarImagen(tipo_archivo) {
        let miImagen = NoFoto;
        let titulo = "NoTitulo";
        switch (tipo_archivo) {
            case 'pdf':
                miImagen = Pdf;
                titulo = "pdf";
                break;
            case 'doc':
            case 'docx':
            case 'documento':
                miImagen = Word;
                titulo = "documento";
                break;
            case 'xls':
            case 'xlsx':
            case 'csv':
            case 'hoja_calculo':
                miImagen = Excel;
                titulo = "hoja_calculo";
                break;
            case 'dwg':
            case 'dxf':
            case 'cad':
                miImagen = Autocad;
                titulo = "cad";
                break;
            case 'shp':
                miImagen = Shp;
                titulo = 'shape';
                break;
            default:
                miImagen = NoFoto;
                break;
        }
        return {imagen: miImagen, titulo};
    }
    return (
        <img src={archivo.imagen} title={archivo.titulo} className="rounded mx-auto" width="25" height="25" alt='' />
        // d-block
    );
}

export default TipoArchivo;