import React from 'react';
import leafWrapper from './LeafWrapper';

const leaf = (props) => (
    <label className={(props.isSelected ? 'treeClicked' : '')} onClick={props.onNodeClick}>{props.text}</label>);

export default leafWrapper(leaf);