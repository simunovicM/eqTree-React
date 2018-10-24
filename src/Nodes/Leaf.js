import React from 'react';
import leafWrapper from './LeafWrapper';

const leaf = (props) => {
    let disabledClass = props.isDisabled ? ' disabled' : '';
    return (<span title={props.title}>
                <i role="presentation" className={('eqtree-icon eqtree-themeicon eqtree-themeicon-custom' + disabledClass)} onClick={props.onNodeClick} />
                <label className={((props.isSelected ? 'treeClicked' : '') + disabledClass)} onClick={props.onNodeClick}>{props.text}</label>
            </span>);
}

export default leafWrapper(leaf);