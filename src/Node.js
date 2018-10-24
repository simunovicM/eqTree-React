import React from 'react';
import Aux from './Auxx';

const node = (props) => {
    let disabledClass = props.isDisabled ? ' disabled' : '';
    return (<Aux>
            <i className={('eqtree-icon eqtree-ocl' + (props.isRoot ? ' rootName' : ''))} onClick={props.onNodeOpenClick}></i>
            <span title={props.title}>
                <i role="presentation" className={('eqtree-icon eqtree-themeicon eqtree-themeicon-custom' + disabledClass)} onClick={props.onNodeClick} />
                <label className={((props.isSelected ? 'treeClicked' : '') + disabledClass)} onClick={props.onNodeClick}>{props.name}</label>
            </span>
        </Aux>);
}

export default node;