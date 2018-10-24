import React from 'react';
import Aux from '../Auxx';

const leafWrapper = (Leaf) => (props) => {
    return (<Aux>
            <i className={('eqtree-icon eqtree-ocl' + (props.isRoot ? ' rootName' : ''))} onClick={props.onNodeOpenClick}></i>
            <Leaf {...props} />
        </Aux>);
}

export default leafWrapper;