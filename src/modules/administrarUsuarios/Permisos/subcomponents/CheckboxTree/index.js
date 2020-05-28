import React, { useState } from 'react';
import CheckboxTree from 'react-checkbox-tree';

export default (props) => {
    const [expanded, setExpanded] = useState([]);

    return <CheckboxTree
        icons={{
            check: <i className="far fa-check-square"></i>,
            uncheck: <i className="far fa-square"></i>,
            halfCheck: <i className="far fa-check-square text-muted"></i>,
            expandClose: <i className="fas fa-angle-right text-muted"></i>,
            expandOpen: <i className="fas fa-angle-down text-muted"></i>,
            expandAll: <i className="fas fa-plus-square"></i>,
            collapseAll: <i className="fas fa-minus-square"></i>,
            parentClose: <i className="far fa-folder"></i>,
            parentOpen: <i className="far fa-folder-open"></i>,
            leaf: <i className="far fa-clipboard"></i>
        }}
        expanded={expanded}
        onExpand={expanded => setExpanded(expanded)}
        {...props}
    />
}