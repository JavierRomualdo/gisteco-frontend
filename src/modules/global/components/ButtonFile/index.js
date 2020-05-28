import React from 'react';
import { FolderOpenIcon } from '../../../../lib/icons';

const ButtonFile = ({title, refFile, ...otrasPropieades}) => {
    return (
        <div className="file btn card-header-action btn btn-sm bt-secundary btn-sm pb-0 pt-0 text-white">
            <FolderOpenIcon/> {title}
            <input type="file" name="file" ref={refFile} {...otrasPropieades}/>
        </div>
    );
}


export default ButtonFile;